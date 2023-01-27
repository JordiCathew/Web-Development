# Newsletter - Sign up

A Web Application that allows users to sign up to a newsletter. Developed using Node.js and the Mailchimp API, you're free use this code and adapt it if you wish to.

## Background 

This application is built using the Express.js framework and the Mailchimp Marketing API. Express.js is a popular, minimal web application framework for Node.js that makes it easy to handle HTTP requests and responses. The Mailchimp Marketing API allows you to interact with your Mailchimp audience and manage your contacts, campaigns, and other data.

The code above sets up an Express.js server and configures the Mailchimp client. 

In summary, this application allows users to submit a form with their first name, last name, and email address, and then adds that information to a Mailchimp audience. It also includes error handling and redirects the user to a success or failure page depending on the outcome of the process.

## Requirements

To run this application, you will need to have the following installed on your computer:

* Node.js: This application is built with Node.js, so you will need to have it installed in order to run the server. You can download it from the official website (https://nodejs.org/)

* A Mailchimp account: You will need to have a Mailchimp account in order to use the Mailchimp Marketing API.

* A Mailchimp API Key: You will also need to generate an API key for your Mailchimp account in order to use the Mailchimp client.

* A Mailchimp Audience ID: You will also need to know the ID of the audience you want to add members to. You can find instructions on how to do this in the Mailchimp documentation (https://developer.mailchimp.com/docs/mailchimp-api-3/lists/list-unique-id/)

* Express: This application is built with the Express framework, so you will need to have it installed. You can install it by running the command npm install express in your terminal.

* @mailchimp/mailchimp_marketing package: This package is used for connecting to the Mailchimp API. You can install it by running the command npm install @mailchimp/mailchimp_marketing in your terminal.

Once you have these requirements met, you can clone this repository and run the server by running the command node app.js in your terminal.

You will also need to replace the placeholder values in the code (YOUR_AUDIENCE_ID_HERE, YOUR_API_KEY_HERE, SERVER_HERE) with the appropriate values from your Mailchimp account.

## Usage 

Start the server by running this in your terminal:

```bash
$ node server.js
```

* Open http://localhost:3000/ in your browser.

* Fill out the form on the webpage to add yourself as an audience member.

* Check the terminal for a message confirming that the member has been added, and check your Mailchimp account to see the new member added to your audience.

