# To Do List

A to-do list web application using Node.js, EJS and MongoDB. Feel free
to grab and adapt any part of this code if you'd like!

## Important note before starting

It's important to note before starting that the implementation of some of the functionalities of this application __ARE NOT__ the most efficient ways. This is because this project is for learning purposes and not for deployment. While the implementation for creating custom lists is nice for example, it isn't realistic. No one is going to create a custom list by simply adding a new name onto the end of the URL. The better solution would be to add a field to name a new list, then create a custom route within something like a  lists/:customListName. 

Having said that let's get started.

## Requirements

* Node.js
* npm (Node Package Manager)
* MongoDB

Once you have these installed, it's time to install these frameworks using npm (you can simply do npm install and all of the dependencies will be installed):

* Mongoose
* Express.js

## Usage

```bash
node app.js
```

Your app should now be running on http://localhost:3000.

Check the checkboxes to remove an element. To create a new custom list use this example:

http://localhost:3000/__name_of_your_custom_list__





