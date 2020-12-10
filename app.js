const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://12grace12:mickey1219@cluster0.qw272.mongodb.net/?retryWrites=true&w=majority";

const csv = require('csv-parser');
const fs = require('fs');

MongoClient.connect(url, function(err, db) {
  if (err) {
    throw err;
  }
  var dbo = db.db("companies");
  fs.createReadStream('companies-1.csv')
    .pipe(csv())
    .on('data', (r) => {
      var obj = r;
      dbo.collection("companies").insertOne(obj, function(err, res) {
        if (err)
        {
          throw err;
        } 
        console.log("A company has been successfully inserted");
        db.close();
      });
    })
});


