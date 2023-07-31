// server/index.js

const express = require("express");
const Joi = require("joi");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const journalRoutes = require('./routes/journalRoutes');
const { MongoClient, ServerApiVersion } = require('mongodb');
dotenv.config();

const PORT = process.env.PORT || 3001;

const URI = process.env.DB_URI;

const app = express();

// middleware, fires on every req/res
app.use(express.json());

// middleware for logging purposes
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
})

const client = new MongoClient(URI);

mongoose.connect(URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log('listening on port', PORT);
    })
  })
  .catch((err) => {
    console.log(err);
  })
// (async () => await client.connect())();

// const cleanup = (event) => { // SIGINT is sent for example when you Ctrl+C a running process from the command line.
//   console.log("cleanup initiated");
//   client.close(); // Close MongodDB Connection when Process ends
//   process.exit(); // Exit with default success-code '0'.
// }

// process.on('SIGINT', cleanup);
// process.on('SIGTERM', cleanup);


// abstract out validation functionality
function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(course, schema);
}

// test endpoint
app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// get journals
app.get("/api/journals", (req, res) => {
  var reqResult = queryAllJournals("journalDatabase", "journal");
  console.log("response: " + reqResult);
  res.json({message: reqResult});

  // .then(reqResult => reqResult.forEach((result, i) => {
  //   console.log(`${i + 1}. name: ${result.content}`);
  //   console.log(`   _id: ${result._id}`);
});
// );
//   res.json({ message: reqResult})
// });


// main().catch(console.error);

// list all databases in cluster
async function listDatabases() {
  var databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

// use client to work with db
const queryAllJournals = async (dbName, collectionName) => {
  try {
    const collection = client.db(dbName).collection(collectionName);
    const result = (await collection.find().toArray());
    //result.forEach((x) => console.log(x.content));
    //console.log("test: " + JSON.stringify(result));
    return JSON.stringify(result);
  } catch (err) {
    console.error(err);
  }
}
