const express = require("express");
const path = require("path");
require("./db/conn");
const User = require("./models/usermessage");
const hbs = require("hbs");
const { registerPartials } = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

// setting the path
const staticpath = path.join(__dirname, "../public"); // setting path to static files (CSS and images)
const templatepath = path.join(__dirname, "../templates/views"); // setting path to views (HTML templates)
const partialpath = path.join(__dirname, "../templates/partials"); // setting path to handlebars partials 


//middleware
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")));
app.use(express.urlencoded({ extended: false }))
app.use(express.static(staticpath))
app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partialpath);

//routing
app.get("/", (req, res) => {
    res.render("index");
})

// app.get("/contact", (req, res) => {
//     res.render("contact");
// })

app.post("/contact", async (req, res) => {
    try {
        //   res.send(req.body);
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index");
    } catch (error) {
        res.status(500).send(error);
    }
})

//server create
app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})