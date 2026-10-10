import { MongoClient } from "mongodb";

export async function GET() {
  try {
    const client = new MongoClient(process.env.MONGODB_URI as string);
    await client.connect();
    const collections = await client.db("bazar-dor").listCollections().toArray();
    await client.close();

    return Response.json({ ok: true, collections: collections.map((c) => c.name) });
  } catch (error) {
    return Response.json({ ok: false, error: String(error) }, { status: 500 });
  }
}