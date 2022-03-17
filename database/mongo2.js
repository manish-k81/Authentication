const MongoClient2 = require('mongodb').MongoClient
const MongoUrl2 = `mongodb://localhost:27017/${process.env.DB_MONGO2_NAME}`

MongoClient2.connect(MongoUrl2,(err,db)=>{
    if(err){
        throw err
    }
    // console.log("Database Created!");
    db.close()
})

module.exports = { MongoClient2 , MongoUrl2 }