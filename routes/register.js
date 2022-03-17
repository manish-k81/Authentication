var express = require('express');
var router = express.Router();
const { MongoClient, MongoUrl } = require('../database/mongo');

/* GET home page. */
router.post('/register', function(req, res) {
    MongoClient.connect(MongoUrl,(err,db)=>{
        if(err){
            res.json({
                message:"Could not Connect to MonogoDb"
            })
        }
        const dbo = db.db(process.env.DB_MONGO1_NAME)
        const myObj = { name:req.body.name, email:req.body.email, password:req.body.password }
        console.log(myObj)
        dbo.collection(process.env.DB_COLLECTION_NAME1).insertOne(myObj,(err,result)=>{
            if(err){
                res.json({
                    messsage:"Not able to add the data"
                })
            }
            res.json({
                message:"Registered and added the data to DB"
            })
        })
    })
});

module.exports = router;
