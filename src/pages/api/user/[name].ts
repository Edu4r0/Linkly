import connectBD from "@/components/utils/bd";

export async function GET({ params}) {
  const { name } = await params;
  const bd = await connectBD();
  const collection = bd.collection("users");
  const result = collection.find({ "session.user.name": name }).toArray();
  return new Response(JSON.stringify(await result));
}

