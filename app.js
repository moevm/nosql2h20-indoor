const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');

const db = require("./db");
const collection = "test";
const app = express();


app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

app.get('/getHello',(req,res)=>{
    db.getDB().collection(collection).find({}).toArray((err,documents)=>{
        if(err)
            console.log(err);
        else{
            res.json(documents);
        }
    });
});

app.post('/', (req, res) => {
    const userInput = req.body;
    db.getDB().collection(collection).insertOne(userInput, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json({result: result, document: result.ops[0]});
        }
    })
});

db.connect((err)=>{
    if(err){
        console.log('Unable to connect to database');
        process.exit(1);
    }
    else{
        app.listen(3000,()=>{
            console.log('Connected to database, app listening on http://127.0.0.1:3000/');
        });
    }
});