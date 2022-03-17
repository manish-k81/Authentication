const {MongoClient2 , MongoUrl2} = require('./mongo2')
MongoClient2.connect(MongoUrl2,(err,db)=>{
    if(err){
        throw err
    }
    const dbo = db.db("crudApp")
    dbo.createCollection(process.env.DB_COLLECTION_NAME2,(err,result)=>{
        if(err){
            throw err
        }
        // console.log("Collection created!");
        db.close()
    })
})
