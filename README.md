# Google Apps Script Project
EK Klinkman, EJ Rouse
Neurobionics Lab, Department of Robotics, University of Michigan, 2024

## Overview

This repository contains the code for a Google Apps Script (GAS) project. The project is designed to build an automated, monthly feedback form sent to a team, the results of which are complied, saved, and sent to the Principal Investigator (PI).  The tool is ‘deploy and forget,’ meaning once the infrastructure is in place, it operates automatically in perpetuity. This tool was written for the Neurobionics Lab at the University of Michigan Department of Robotics. The purpose of this tool is to establish a quick, no-overhead feedback mechanism where students can share anything they’d like to say to their advisor.  Each month, this tool will:

* Automatically email a pre-defined questionnaire on the same day every month
* Collect responses in a google sheet and generate a PDF report of the current month’s responses over two days
* Save the PDF feedback report in a google drive folder for record keeping
* Email the PDF report to the lab PI 

Features:

**Integration with Google Services:** Integrates with Google Forms, Google Sheets and Google Drive to manage, store, and read data.

**Google Apps Script (GAS) works with Clasp for local development and version control**

**NOTE:** Further documentation for the project can be found [here](https://docs.google.com/document/d/1rP3qm6TnD3SodcFQG3da_QGBGn75UaBeSfXE4aAc2_c/edit?usp=sharing). It is recommended to read this documentation before cloning this GitHub repository.

## Files

- `Code.js`: Contains the main script logic for processing form data and sending emails.
- `send_neurobionics_form.html`: HTML file of sample email asking for team members to fill out feedback form.

## Setup

To set up and deploy this project on your local machine, follow these steps:

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

### 5. Link the project with Google Apps Script

1. Create your own Google Apps Script Project
   Start [here](https://www.google.com/script/start/).  Click on ‘Start Scripting’. Leave the project blank for now.
   
2. Link the project to your local directory
   ```ruby
   clasp link
   ```
   Follow the prompts to link the project. You may need to provide the Script ID of your Google Apps Script project. You can find the Script ID in the URL of your project, https://script.google.com/home/projects/<PROJECTID>
   
### 6. Deploy the project

To deploy the project to Google Apps Script (GAS):

1. Push the code to GAS
   ```ruby
   clasp push
   ```
   This command uploads your local code to your new GAS project

2. Deploy the project (if needed)
   To create or update a deployment, for example, for a web app, use:
   ```ruby
   clasp deploy
   ```
   Follow the prompts to create or update the deployment. You may need to provide information such as deployment description and version number.
   
   **NOTE:** If you would like to schedule execution of the tool, you will need to set up triggers manually within the project itself before deployment. 
             [See project documentation for more detailed instructions for triggers and deployment](https://docs.google.com/document/d/1rP3qm6TnD3SodcFQG3da_QGBGn75UaBeSfXE4aAc2_c/edit?usp=sharing)
			
## Contact
   If you have any questions or need further assistance, feel free to reach out:
   * Name: Emily Klinkman, MS.
   * Email: emilykk@umich.edu
   * GitHub: https://github.com/emklinkman