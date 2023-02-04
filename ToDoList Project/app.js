const express = require("express");
const mongoose = require('mongoose');
// Custom made module to get date.
const date = require(__dirname + "/date.js")

const app = express();
app.set('view engine', 'ejs');
// To use body-parser
app.use(express.urlencoded({ extended: true }));
// This line allows us to show the static css files (We put them
// inside public for good practice).
app.use(express.static("public"));
mongoose.connect('mongodb://127.0.0.1:27017/todoListDB');

const itemSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please check your data entry, no name specified."]
    }
});

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({ 
    name: "Welcome to your todolist!"
});

const item2 = new Item({
    name: "Hit the button to add a new item."
});

const item3 = new Item({
    name: "<-- Hit this to delete an item."
});

// We package the items created
const defaultItems = [item1, item2, item3];

// For every new list that we create, the list is going to have a name and a list
// of documents associated with it as well.
const listSchema = new mongoose.Schema({
    name: String,
    items: [itemSchema]
});

const List = mongoose.model("List", listSchema);


app.get("/", function(req, res){
    /* day = date.getDate();
       res.render('list', {listTitle: day, newListItems: items}); We remove the day for
       simplicity to work with mongoose. */
    Item.find({}, function(error, items) {
        if (items.length === 0) {
            Item.insertMany(defaultItems, function(err){
                if (err) { 
                    console.log(err); 
                } 
                else { 
                    console.log("Succesfully saved all the default items to database."); 
                }
            });
        }

        res.render('list', {listTitle: "Today", newListItems: items});
    });
});

app.post("/", function(req, res){
    // New item introduced in the input of the form.
    const itemName = req.body.newItem;
    const listName = req.body.list;

    const newItem = new Item({ 
        name: itemName
    });
    // If the list is the default one
    if (listName == "Today") {
        newItem.save(() => res.redirect('/'));
    } 
    else {
        List.findOne({name: listName}, function(err, foundList) { 
            foundList.items.push(newItem);
            foundList.save(); 
            res.redirect("/" + listName);
        });
    }

});

/* Side note, while Angela's solution (below code) for creating custom lists is nice, 
   it isn't realistic. No one is going to create a custom list by simply adding a new name
   onto the end of the URL. The better solution would be to add a field to name a new list,
   then create a custom route within something like a  lists/:customListName. */
 app.get('/:customListName', function(req, res){
    const customListName = req.params.customListName;
    //find one just returns an object
    List.findOne({name: customListName}, function(err, foundList) {
        if (!err){
            if (!foundList){
                // if a list with that name doesn't exist yet: 
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });
            
                list.save();
                /* This solves the timing problem. The issue was that the code redirected before
                the document has finished saving, given that Javascript doesn't necessarily 
                wait for previous lines to execute before executing subsequent lines. */ 
                list.save(() => res.redirect('/' + customListName));
            }
            else{
                // If the list already exists we show the list page with the info of the 
                // existing list.
                res.render("list", {listTitle: foundList.name, newListItems: foundList.items})
            }
        }
    });

 });



app.get("/about", function(req, res){
    res.render("about");
});

app.post("/delete", function(req, res){
    // We trim the id because (for some reason) it has a space at the end and that causes
    // an error.
    const checkedItem = req.body.checkbox.trim();
    // We also need to know which list the checked item belongs to.
    const listName = req.body.listName.charAt(0).toUpperCase() + req.body.listName.slice(1).toLowerCase();

    if (listName === "Today") {
        Item.findByIdAndRemove (checkedItem, function(err) { 
            if (!err) { 
                console.log("Successfully deleted checked item.");
                res.redirect("/");
            }
        });
    }
    else {
        List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItem}}}, function(err, foundList){
            if (!err){
                res.redirect("/" + listName);
            }
        });
    }
});


app.listen(3000, function(){
    console.log("Server started on port 3000.");
});
