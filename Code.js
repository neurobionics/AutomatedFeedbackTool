// Neurobionics Automated Feedback Form script
// University of Michigan Robotics Department
// EK Klinkman, EJ Rouse
// Version 1.2 09.13.2024
// Version 1.1 08.28.2024


// Populate global variables with your information

var toEmailAddress = ""; // Recipient email address (initial email with feedback form link)
var htmlMessage = HtmlService.createHtmlOutputFromFile("name_of_your_file.html").getContent(); //e.g. "send_neurobionics_form.html"
var subject = "";// Enter email subject
var message = ""; // Can leave blank, .html file will overwrite
var spreadsheetURL = ''; // Form response spreadsheet URL
var sheetTab = ''; // The name of your sheet tab you want to include in the report
var folderID = ''; // The ID of the Google Folder within which you want to save a PDF of the report
// The ID of a google folder is the string of numbers and letters at the end of the folder URL
// You will need to create a Google Folder for this step
const recipient = ''; // Recipient email address (report email)
const subject = ''; // Report email subject
const body = ''; // Report email body. It is recommended to include links to the form, form results summary page, and previous months' responses (google sheet)


// Apps script code

function sendFormEmail() {
    MailApp.sendEmail(toEmailAddress, subject, message, {
        htmlBody: htmlMessage
    });
}


function refreshAndSendEmail() {
    const ss = SpreadsheetApp.openByUrl(spreadsheetURL);
    const tabsToSnapshot = [sheetTab]; 


    tabsToSnapshot.forEach(tabName => {
        const dataSheet = ss.getSheetByName(tabName);
        if (dataSheet) {
            refreshDataSourcesForSheet(dataSheet);
            filterCurrentMonthData(dataSheet);
        } else {
            console.log(`${tabName} not found.`);
        }
    });


    const pdfBlob = generatePDF(ss);
    savePDFToFolder(pdfBlob, folderID); 
    sendEmailWithAttachment(pdfBlob);
}


function refreshDataSourcesForSheet(sheet) {
    const dataSources = sheet.getDataSourceTables();
    dataSources.forEach(dataSource => {
        dataSource.refreshData();
        console.log(`Last refresh time for ${dataSource.getName()}: ${dataSource.getStatus().getLastRefreshTime()}`);
    });
}


function filterCurrentMonthData(sheet) {
    const currentMonthSheetName = 'CurrentMonth';
    let currentMonthSheet = sheet.getParent().getSheetByName(currentMonthSheetName);


    if (!currentMonthSheet) {
        currentMonthSheet = sheet.getParent().insertSheet(currentMonthSheetName);
    } else {
        currentMonthSheet.clear();
    }


    const dataRange = sheet.getDataRange();
    const data = dataRange.getValues();
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
   
    // Filter data for the current month and year
    const filteredData = data.filter((row, index) => {
        if (index === 0) return true; // Keep header row
        const date = new Date(row[0]);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });


    // Set the filtered data in the currentMonthSheet
    currentMonthSheet.getRange(1, 1, filteredData.length, filteredData[0].length).setValues(filteredData);


    // Set font size for the filtered data
    const lastRow = currentMonthSheet.getLastRow();
    const lastColumn = currentMonthSheet.getLastColumn();
    currentMonthSheet.getRange(1, 1, lastRow, lastColumn).setFontSize(13);


    // Set wrapped text for the filtered data
    currentMonthSheet.getRange(1, 1, lastRow, lastColumn).setWrap(true);


    // Adjust column widths to match column C's width
    const colCWidth = currentMonthSheet.getColumnWidth(3);
    currentMonthSheet.setColumnWidth(2, colCWidth); // Column B
    currentMonthSheet.setColumnWidth(4, colCWidth); // Column D
}


function generatePDF(ss) {
    const spreadsheetId = ss.getId();
    const sheetName = 'CurrentMonth'; // Specify the sheet to be exported
    const url = "https://docs.google.com/spreadsheets/d/" + spreadsheetId + "/export" +
        "?format=pdf&" +
        "size=7&" +
        "fzr=true&" +
        "portrait=false&" +
        "fitw=true&" +
        "gridlines=true&" +
        "printtitle=false&" +
        "top_margin=0.5&" +
        "bottom_margin=0.25&" +
        "left_margin=0.1&" +
        "right_margin=0.1&" +
        "sheetnames=false&" +
        "pagenum=UNDEFINED&" +
        "attachment=true&" +
        "gid=" + ss.getSheetByName(sheetName).getSheetId(); // Export only the CurrentMonth sheet


    const options = {
        headers: {
            Authorization: 'Bearer ' + ScriptApp.getOAuthToken()
        }
    };


    const response = UrlFetchApp.fetch(url, options);
    const pdfBlob = response.getBlob().setName('CurrentMonthSnapshot.pdf');
    return pdfBlob;
}


function savePDFToFolder(pdfBlob, folderId) {
    try {
        const folder = DriveApp.getFolderById(folderId);
        folder.createFile(pdfBlob);
        console.log('PDF saved to folder:', folderId);
    } catch (error) {
        console.error('Error saving PDF to folder:', error);
    }
}


function sendEmailWithAttachment(pdfBlob) {
    MailApp.sendEmail({
        to: recipient,
        subject: subject,
        body: body,
        attachments: [pdfBlob]
    });
}
