const MongoClient = require('mongodb').MongoClient
const MongoUrl = `mongodb://localhost:27017/${process.env.DB_MONGO1_NAME}`

MongoClient.connect(MongoUrl,(err,db)=>{
    if(err){
        throw err
    }
    // console.log("Database Created!");
    db.close()
})

module.exports = { MongoClient , MongoUrl }