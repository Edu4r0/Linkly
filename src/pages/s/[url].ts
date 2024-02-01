import connectBD from "@/components/utils/bd";

async function getLink(collection, url) {
  return await collection.findOne({ short_url: url });
}

async function updateLinkClicks(collection, result) {
  if (result) {
    await collection.updateOne({ _id: result._id }, { $inc: { clicks: 1 } });
  }
}

export async function GET({ params, request }) {
  const { url } = await params;
  try {
    const bd = await connectBD();
    const collection_link = await bd.collection("link");
    const collection_users = await bd.collection("users");

    const [result_link, result_user] = await Promise.all([
      getLink(collection_link, url),
      getLink(collection_users, url),
    ]);

    if (result_link) {
      await updateLinkClicks(collection_link, result_link);
      return Response.redirect(result_link.originalLink);
    } else {
      await updateLinkClicks(collection_users, result_user);
      return Response.redirect(result_user.originalLink);
    }
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
}
