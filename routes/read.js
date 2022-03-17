const express = require('express');
const router = express.Router();
const { MongoClient2, MongoUrl2 } = require('../database/mongo2');
const verifyToken = require('../utils/middlewear')

router.get('/read',verifyToken,(req,res)=>{
    MongoClient2.connect(MongoUrl2,(err,db)=>{
        if(err){
            res.json({
                message:"Could not connect to MongoDb"
            })
        }
        var dbo = db.db(process.env.DB_MONGO2_NAME)
        dbo.collection(process.env.DB_COLLECTION_NAME2).find({}).toArray((err,final)=>{
            if(err){
                res.json({
                    message:"Could not fetch the data"
                })
            }
            res.json({
                message:"Fetched the data from MongoDb",
                allData:final
            })
            db.close();
        })
    })
})

module.exports = router