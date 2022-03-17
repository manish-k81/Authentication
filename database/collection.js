const MongoClient = require('mongodb').MongoClient
const MongoUrl = process.env.COMMON_MONGO_URL

MongoClient.connect(MongoUrl,(err,db)=>{
    if(err){
        throw err
    }
    const dbo = db.db("RegisteredUsers")
    dbo.createCollection(process.env.DB_COLLECTION_NAME1,(err,result)=>{
        if(err){
            throw err
        }
        // console.log("Collection created!");
        db.close()
    })
})
