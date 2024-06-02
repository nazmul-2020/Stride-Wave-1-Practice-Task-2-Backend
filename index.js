const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = 5000;

app.use(cors());
app.use(express.json());

// const uri = "mongodb+srv://nazmulcpi2012:<password>@cluster0.sgapx5m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const uri =
  "mongodb+srv://nazmulcpi2012:rMjp24POy2myiEY0@cluster0.sgapx5m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const productDB = client.db("productDB");
    const shoes = productDB.collection("shoes");
    console.log("DataBase is Connect");

    // product routes
    app.post("/shoes", async (req, res) => {});
  } 
  
  finally {
    await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// nazmulcpi2012
// rMjp24POy2myiEY0
