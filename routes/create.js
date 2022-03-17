const express = require('express')
const router = express.Router()
const { MongoClient2, MongoUrl2 } = require('../database/mongo2')
const verifyToken = require('../utils/middlewear')

router.post('/create',verifyToken,(req,res)=>{
    MongoClient2.connect(MongoUrl2,(err,db)=>{
        if(err){
            res.json({
                message:"Could not connect to MongoDb!"
            })
        }
        var dbo = db.db(process.env.DB_MONGO2_NAME)
        const myObj = {title:req.body.title ,desc:req.body.desc}
        dbo.collection(process.env.DB_COLLECTION_NAME2).insertOne(myObj,(err,final)=>{
            if(err){
                res.json({
                    message:"Not able to insert the data"
                })
            }
            res.json({
                message:"One Data inserted",
                data:final
            })
            db.close();
        })
    })
})

module.exports = router