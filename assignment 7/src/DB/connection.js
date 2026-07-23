import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

export let db;
async function DBconnection() {
  try {
    await client.connect();
    console.log("DB connected successfully");
    db = client.db("library")
  } catch (error) {
    console.log({ message: error.message });
  }
}

export default DBconnection;
