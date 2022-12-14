const express = require("express");
const path = require('path');
const app = express();
const dotenv = require("dotenv");
dotenv.config()


const connected = require("./connection.js");


connected 
.then(()=>{
    console.log("connected!");
    app.set('port',process.env.PORT||8080);
    const server = app.listen(app.settings.port, ()=>console.log("Listening"));
});
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://catty-tech.herokuapp.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());//parse JSON requests made using axios

const router=require("./routes/index.js");

app.use('/api/',router);
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})










