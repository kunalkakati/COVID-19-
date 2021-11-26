require("dotenv").config();
const express = require("express");
const http = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req,res)=>{
    res.render("home")
});



app.post("/", (req,res)=>{
    const country = req.body.country;
    const options = {
        "method": "GET",
        "hostname": "covid-19-data.p.rapidapi.com",
        "port": null,
        "path": "/country?name=" + country,
        "headers": {
            "x-rapidapi-key": process.env.API_KEY,
            "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
            "useQueryString": true
        }
    };

    
   const https = http.request(options, function(respound){
        
        respound.on("data", function(data){
            const covid_data = JSON.parse(data);
            const country = covid_data[0].country;
            const cases = covid_data[0].confirmed;
            const recovered = covid_data[0].recovered;
            const critical = covid_data[0].critical;
            const death = covid_data[0].deaths;
            const updateTime = covid_data[0].lastUpdate;
            const icon = covid_data[0].code;
            const src = "http://purecatamphetamine.github.io/country-flag-icons/3x2/"+ icon + ".svg";
            res.render("result", {
                cntr: country,
                cases: cases,
                recover: recovered,
                critical: critical,
                death: death,
                time: updateTime,
                src:src
                });
        });
        
        
    });
    https.end();
    
});



app.listen(3000, ()=>{
    console.log("Server is running at port 30000");
});