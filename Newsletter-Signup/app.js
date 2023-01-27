//Express already handles body-parser as well.
const express = require("express")
const app = express();

// Configuring mailchimp
const client = require("@mailchimp/mailchimp_marketing");
const audienceID = "YOUR_AUDIENCE_ID_HERE";
client.setConfig({
    apiKey: "YOUR_API_KEY_HERE",
    server: "SERVER_HERE",
  });

// Our styles.css and images are static, we need to configure this.
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req, res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    
    async function run() {
        const response = await client.lists.addListMember(audienceID, {
            email_address: email,
            status: "subscribed",
            merge_fields: {
            FNAME: firstName,
            LNAME: lastName
            }
        });

        //If all goes well logging the contact's id
        res.redirect("/success")
        console.log(`Successfully added contact as an audience member. The contact's id is ${
        response.id}.`);
    }
    //Running the function and catching the errors (if any)
    run().catch(e => res.redirect('/failure'));
});

app.get("/failure", function(req, res){
    res.sendFile(__dirname + "/failure.html");
});

app.get("/success", function(req, res){
    res.sendFile(__dirname + "/success.html");
});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.post("/success", function(req, res){
    res.redirect("/");
});

app.listen(3000, function(){
    console.log("Server running on port 3000.");
});

