var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const { MongoClient, MongoUrl } = require('../database/mongo');

router.post('/login',(req, res) =>{
    MongoClient.connect(MongoUrl,(err,db)=>{
        
        if(err){
            res.json({
                message:"Could not Connect to MonogoDb"
            })
        } 
        var dbo = db.db(process.env.DB_MONGO1_NAME);
        dbo.collection(process.env.DB_COLLECTION_NAME1).find({},{ projection: { _id: 0, email: 1, password: 1 } }).toArray((err,results)=>{
            let newArray = []
            if(err){
                res.json({
                    message:"there is some error"
                })
            }
            results.forEach(result=>{
                newArray.push(result.email)
                console.log(newArray)
            })
            newArray.filter(na =>{
                if(na === req.body.email){
                    const access_token = jwt.sign({sub: req.body.email},process.env.JWT_ACCESS_KEY,{expiresIn: process.env.JWT_ACCESS_TIME})
                    // const refresh_token = jwt.sign({sub: req.body.email},process.env.JWT_REFRESH_KEY,{expiresIn: process.env.JWT_REFRESH_TIME})
                    return res.json({           // Always return 
                        message:"Logged In",
                        Access_Token :access_token
                        // Refresh_Token: refresh_token
                    })
                }else{
                    console.log("Please Register")  // ??
                }
            })
        })
    })
})

module.exports = router;

// let filter = { }
//         if(bodyEmail){
//             filter = { email : bodyEmail }
//         }
//         let result = await dbo.collection('credentials').find(filter).toArray();
