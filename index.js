const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

// config
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5070;

// middleware
app.use(express.json());
app.use(cors());

// Replace the following with your Atlas connection string
const uri = "mongodb://localhost:27017";

// Connect to your Atlas cluster
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const productCollection = client.db("wire-nest").collection("products");

    // add products
    app.post("/addProduct", async (req, res) => {
      try {
        const product = req.body;
        const result = await productCollection.insertOne(product);
        console.log(result);
        res.send(result);
      } catch (error) {
        console.log(error.message);
      }
    });

    console.log("Successfully connected to Atlas");
  } catch (err) {
    console.log(err.stack);
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Wire-nest sore is here");
});

app.listen(port, () => {
  console.log(`Wire-Nest server is running.....................!!${port}`);
});
