// server/index.js

const express = require("express");
const Joi = require("joi");
const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');
dotenv.config();

const PORT = process.env.PORT || 3001;

const URI = process.env.DB_URI;

const app = express();

app.use(express.json());

const client = new MongoClient(URI);

(async () => await client.connect())();

// use client to work with db
const find = async (dbName, collectionName) => {
  try {
    const collection = client.db(dbName).collection(collectionName);
    const result = await collection.find().toArray()
    return result;
  } catch (err) {
    console.error(err);
  }
}

const cleanup = (event) => { // SIGINT is sent for example when you Ctrl+C a running process from the command line.
  console.log("cleanup initiated");
  client.close(); // Close MongodDB Connection when Process ends
  process.exit(); // Exit with default success-code '0'.
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);


// abstract out validation functionality
function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(course, schema);
}

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  console.log(`Server listening on ${URI}`);
});

app.get("/api/courses", (req, res) => {
  res.json({ message: "updated courses" });
});

app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body);
  console.log(result);  // object destructuring error??

  if (error) {
    res.status(400).send(result.error);
    return;
  }
})

app.delete('/api/courses/:id', (req, res) => {
  // look up course
  
  // not existing, return 404

  // delete
})


// main().catch(console.error);

// list all databases in cluster
async function listDatabases() {
  var databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

// // create listing
// // params - client : client object, newListing : document to be added
// async function createListing(newListing){
//   const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
//   console.log(`New listing created with the following id: ${result.insertedId}`);
// }

// // create listing
// // params - client : client object, newListing : array of documents to be added
// async function createMultipleListings(newListings){
//   const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListings);

//   console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
//   console.log(result.insertedIds);       
// }

// // query listing by name
// async function findOneListingByName(nameOfListing) {
//   const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({ name: nameOfListing });

//   if (result) {
//       console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
//       console.log(result);
//   } else {
//       console.log(`No listings found with the name '${nameOfListing}'`);
//   }
// }

// // query listing by fields
// async function findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews({
//     minimumNumberOfBedrooms = 0,
//     minimumNumberOfBathrooms = 0,
//     maximumNumberOfResults = Number.MAX_SAFE_INTEGER
// } = {}) {
//     const cursor = client.db("sample_airbnb").collection("listingsAndReviews").find(
//                             {
//                                 bedrooms: { $gte: minimumNumberOfBedrooms },
//                                 bathrooms: { $gte: minimumNumberOfBathrooms }
//                             }
//                             ).sort({ last_review: -1 })
//                             .limit(maximumNumberOfResults);

//     const results = await cursor.toArray();

//     if (results.length > 0) {
//         console.log(`Found listing(s) with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms:`);
//         results.forEach((result, i) => {
//             var date = new Date(result.last_review).toDateString();

//             console.log();
//             console.log(`${i + 1}. name: ${result.name}`);
//             console.log(`   _id: ${result._id}`);
//             console.log(`   bedrooms: ${result.bedrooms}`);
//             console.log(`   bathrooms: ${result.bathrooms}`);
//             console.log(`   most recent review date: ${new Date(result.last_review).toDateString()}`);
//         });
//     } else {
//         console.log(`No listings found with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms`);
//     }
// }

// // update
// async function updateListingByName(nameOfListing, updatedListing) {
//   const result = await client.db("sample_airbnb").collection("listingsAndReviews")
//                       .updateOne({ name: nameOfListing }, { $set: updatedListing });

//   console.log(`${result.matchedCount} document(s) matched the query criteria.`);
//   console.log(`${result.modifiedCount} document(s) was/were updated.`);
// }

// // delete
// async function deleteListingByName(nameOfListing) {
//   const result = await client.db("sample_airbnb").collection("listingsAndReviews")
//           .deleteOne({ name: nameOfListing });
//   console.log(`${result.deletedCount} document(s) was/were deleted.`);
// }
// module.exports.listDatabases = listDatabases;

// const crud = () =>{
//   return {
//     listDatabases,
//   }
// }