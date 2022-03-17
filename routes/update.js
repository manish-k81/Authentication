const express = require('express');
const router = express.Router();
const { MongoClient2, MongoUrl2 } = require('../database/mongo2');
const verifyToken = require('../utils/middlewear')


router.put('/update',verifyToken,(req,res)=>{
    MongoClient2.connect(MongoUrl2,(err,db)=>{
        if(err){
            res.json({
                message:"Could not connect to MongoDb"
            })
        }
        const dbo = db.db(process.env.DB_MONGO2_NAME);
        const myQuery = { desc:req.body.desc }
        const newValues = { $set:{ title:req.body.title } }
        dbo.collection(process.env.DB_COLLECTION_NAME2).updateOne(myQuery,newValues,(err,final)=>{
            if(err){
                res.json({
                    message:"Could not update the values"
                })
            }
            res.json({
                message:"Updated one value"
            })
            db.close()
        })
    })
})

module.exports = router