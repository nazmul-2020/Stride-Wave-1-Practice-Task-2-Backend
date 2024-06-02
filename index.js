const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    const shoesCollection = productDB.collection("shoesCollection");

    // product routes
    app.post("/shoes", async (req, res) => {
      const shoesData = req.body;
      const result = await shoesCollection.insertOne(shoesData);
      res.send(result);
    });

    app.get("/shoes", async (req, res) => {
      const shoesData = shoesCollection.find();
      const result = await shoesData.toArray();
      res.send(result);
    });

    app.get("/shoes/:id", async (req, res) => {
      const id = req.params.id;
      const shoesData = await shoesCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(shoesData);
    });

    app.patch("/shoes/:id", async (req, res) => {
      const id = req.params.id;
      const updateData = req.body;
      const result = await shoesCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );
      res.send(result)
    });

    console.log("DataBase is Connect");
  } finally {
    // await client.close();
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
