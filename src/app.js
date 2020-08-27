
const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast")


app.set("view engine","hbs");
app.set("views", path.join(__dirname,"../templates/views"));
hbs.registerPartials(path.join(__dirname,"../templates/partials"))

app.use(express.static(path.join(__dirname,"../public")));




app.get("", (req,res) =>{
    res.render("index",{
        title: "Dewesh Weather App",
        name: "Dewesh Agarwal"
    });
});


app.get("/help", (req,res) =>{
    res.render("about",{
        title: "Help Page",
        name: "Dewesh Agarwal"
    });
});

app.get("/about", (req,res) =>{
    res.render("about",{
        title: "About Page",
        name: "Dewesh Agarwal - Kol(c)"
    });
});

app.get("/weather", (req,res) =>{
    if(!req.query.address)
    {
        return res.send({error: "No input"});
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) =>{
        if(error){
         return res.send({ error });
        
        }
            
        forecast(latitude, longitude, (error,data) =>{
            if(error){
                return res.send({ error });
            }
            res.send(data);
            //res.send("Data: ", data);
        });
    });
    
});



app.get("/help/*", (req,res) =>{
    res.render("error",{
        title: "404 - Help Article Not Found",
        name: "Dewesh Agarwal - Kol(c)"
    });
});

app.get("*", (req,res) =>{
    res.render("error",{
        title: "404 - Page Not found",
        name: "Dewesh Agarwal - Kol(c)"
    });
});

//console.log(path.join(__dirname,"../public"));

app.listen(3000, () =>{
    console.log("Server is up on port 3000");
});