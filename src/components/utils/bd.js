import { MongoClient } from "mongodb";
async function connectBD() {
  const BD_URI = import.meta.env.BD_URI ?? "";
  const BD_NAME = import.meta.env.BD_NAME ?? "";
  const client = new MongoClient(BD_URI);
  await client.connect();
  const bd = client.db(BD_NAME);

  return bd;
}

export default connectBD;
