# Google Apps Script Project
EK Klinkman, EJ Rouse
Neurobionics Lab, Department of Robotics, University of Michigan, 2024

## Overview

This repository contains the code for a Google Apps Script (GAS) project. The project is designed to build an automated, monthly feedback form sent to a team, the results of which are complied, saved, and sent to the Principal Investigator (PI).  The tool is ‘deploy and forget,’ meaning once the infrastructure is in place, it operates automatically in perpetuity. This tool was written for the Neurobionics Lab at the University of Michigan Department of Robotics. The purpose of this tool is to establish a quick, no-overhead feedback mechanism where students can share anything they’d like to say to their advisor.  Each month, this tool will:

* Automatically email a pre-defined questionnaire on the same day every month
* Collect responses in a google sheet and generate a PDF report of the current month’s responses over two days
* Save the PDF feedback report in a google drive folder for record keeping
* Email the PDF report to the lab PI 

To get started, you will need to create and modify some Google documents, which will then set the tool up for your group.  Once it’s created and launched, it will operate monthly in perpetuity. 

To create the tool for your group, you will need to: 1) create a google form, 2) draft an email, 3) create a google apps script project.  This document will walk through the steps required, which may take an hour. 

Features:

**Integration with Google Services:** Integrates with Google Forms, Google Sheets and Google Drive to manage, store, and read data.

**Google Apps Script (GAS) works with Clasp for local development and version control**

**NOTE:** Further documentation for the project can be found [here](https://docs.google.com/document/d/1rP3qm6TnD3SodcFQG3da_QGBGn75UaBeSfXE4aAc2_c/edit?usp=sharing). It is recommended to read this documentation before cloning this GitHub repository.

## Files

- `Code.js`: Contains the main script logic for processing form data and sending emails.
- `send_neurobionics_form.html`: HTML file of sample email asking for team members to fill out feedback form.

## Setup

To set up this project on your local machine, follow these steps:

### 1. Install Node.js and npm

Ensure you have Node.js and npm installed. You can download and install them from [nodejs.org](https://nodejs.org/).

### 2. Install Clasp

Clasp is a command-line tool used to manage Google Apps Script projects.

1. Open your Command Prompt, PowerShell, or terminal.
2. Install Clasp globally using npm:
   ```ruby
   npm install -g @google/clasp
   ```

### 3. Log In to Clasp

You will need to log in to Clasp to authorize it to access your Google account

1. Run the following command
   ```ruby
   clasp login
   ```
2. Follow the prompts to authorize Clasp with your google account

### 4. Clone the repository using Git

1. Clone the repository
2. Create a local directory for your project and navigate there using command line (terminal, etc.)

## Google Apps Script setup

### 1. Create a Google Form

Using your desired Google account, create a Google form.  Instructions for creating a google form can be found [here](https://support.google.com/docs/answer/6281888?hl=en&visit_id=638580463955952407-1339523159&rd=1).  Once you have created your form, navigate to the ‘Responses’ tab and click on ‘Link to Sheets’.
![LinkToSheets](https://github.com/user-attachments/assets/0d2e8e18-32d2-4c59-ae0a-36f19e0a9fab)

This will create a google sheet to record form responses, from which your Google Apps Script will operate.

To see a version of Dr. Rouse’s form, please see [this link](https://docs.google.com/forms/d/1OdzYMZ8z4nJ63IZNdYKkWeUzoCYgWLkl4dNn3VZCupY/prefill).

### 2. Draft an email

You will need to draft an email with your desired message that will be sent out to the target recipients of your form. Make sure to include the link to your google form within the body of this email. Once drafted, send the email to yourself. Open the email in your inbox and select ‘show original’.

![email](https://github.com/user-attachments/assets/142a5372-e1a0-4dad-8bab-5c7f5cad6ccc)

Copy everything that’s enclosed in the <html>...</html>  or <div…div> tags (including the tags).
This HTML text is coded as encoded-printable, and you will need to decode it. You can use this site [here](https://www.webatic.com/quoted-printable-convertor). Copy this code to your clipboard, you will need it in the next steps.

The email used by Prof. Rouse is provided as an example:

	Hello team--please take <5 minutes to fill out the monthly Lab feedback form sometime in the next 24 hours (link). 
 	The more people who participate in providing feedback, the better we can be at addressing team needs, supporting each other, 
  	and streamlining lab operations. 

	All responses are anonymous; we will not collect names or email addresses with your feedback. Please be respectful and constructive. 

	Thank you!

	-Elliott

### 3. Link the local GitHub repository with Google Apps Script

1. Create your own Google Apps Script Project
   Start [here](https://www.google.com/script/start/).  Click on ‘Start Scripting’. Leave the project blank for now.
   
2. Link the project to your local directory
   ```ruby
   clasp link
   ```
   Follow the prompts to link the project. You may need to provide the Script ID of your Google Apps Script project. You can find the Script ID in the URL of your project, https:// script. google.com /home /projects/ PROJECTID

### 4. Edit the local repository with your content

The following information within Code.gs and send_neurobionics_form.html will need to be populated with your information:

**Code.gs**
1. function sendFormEmail()
   * **toEmailAddress**: Replace this with the actual recipient's email
   * **name_of_your_file.html**: Rename 'send_neurobionics_form.html' to whatever you wish and populate here
   * **subject**: Enter email subject
   * **message**: Can leave blank, .html file will overwrite
2. function refreshAndSendEmail()
   * **REPLACE WITH YOUR FORM RESPONSE SPREADSHEET URL**: paste your forms spreadsheet URL between single quotes
   * **FEEDBACK**: paste your feedback tab name, if different, between single quotes
   * **YOUR GOOGLE FOLDER ID HERE**: paste google folder ID between single quotes. The ID of a google folder is the string of numbers and letters at the end of the folder URL (ex. ID = 1dyUEebJaFnWa3Z4n0BFMVAXQ7mfUH11g within the URL https:// drive. google. com/ drive/ folders/ 1dyUEebJaFnWa3Z4n0BFMVAXQ7mfUH11g)
3. function sendEmailWithAttachment()
   * **youremail@email.com**: replace with email address between single quotes of wherever you want to send response report
   * **subject**: replace with email subject between single quotes
   * **body**: insert email body between single quotes

### 5. Push the updated code to Google Apps Script

Push the code to GAS
   ```ruby
   clasp push
   ```
   This command uploads your local code to your new GAS project
   
### 6. Deploy the project

1. Add triggers within GAS environment

After testing the script locally within GAS, debugging, and customizing settings to your desired specifications, you will need to set up triggers in order to run the project. Click on ‘Triggers’ from the left hand sidebar.

![Trigger](https://github.com/user-attachments/assets/d37ffc20-0f9d-478d-ab5e-3087c861698a)

Click ‘Add Trigger’ - you will add a separate trigger for the ‘sendFormEmail’ and ‘refreshAndSendEmail’ functions. 

Customize your desired Trigger settings. 

For both ‘sendFormEmail’ and ‘refreshAndSendEmail’: I recommend a time-driven event source and month timer. These options will allow you to select which day of the month and time of day the initial email is sent out, and enable you to delay sending results (e.g. 48 hours after the initial email is sent). 

NOTE: It is possible to hard-code your triggers into the script itself. This project does not cover that functionality.

Once you have configured the triggers, you can deploy your project.

2. Deploy project within GAS environment

To deploy your project, click ‘Deploy’ → ‘New Deployment’

![deploy](https://github.com/user-attachments/assets/87c977ec-6471-444e-92f2-2d16418b2a43)

Enter your desired information in the pop-up window. It is recommended to test your trigger timing and deployment before sending to your desired audience.

## Troubleshooting

1. You will likely need to authorize the project by providing permission for the script to access your data.

![authorization](https://github.com/user-attachments/assets/d703df28-e5dc-4b27-a081-964ab0bfd970)

Allow the project to access your Google Account: press ‘Allow’.

2.  The script does not handle text wrapping/width formatting within the CurrentMonthSnapshot.pdf very well.

This may require you to manually adjust column widths within the CurrentMonth data sheet and run/debug the ‘refreshAndSendEmail’ function several times to preview the CurrentMonthSnapshot.pdf output until it meets your desired format.

## Contact
   If you have any questions or need further assistance, feel free to reach out:
   * Name: Emily Klinkman, MS.
   * Email: emilykk@umich.edu
   * GitHub: https://github.com/emklinkman
