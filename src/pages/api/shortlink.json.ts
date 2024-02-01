import ShortUniqueId from "short-unique-id";
import connectBD from "@/components/utils/bd";
import moment from "moment";

const uid = new ShortUniqueId({ length: 10 });

const generateUniqueToken = async () => {
  const ipResponse = await fetch("https://api64.ipify.org?format=json");
  const ipData = await ipResponse.json();
  const userIP = ipData.ip;
  const uniqueToken = `${userIP}`;
  return uniqueToken;
};

export async function POST({ request }) {
  const { fullurl, session } = await request.json();
  try {
    const userToken = await generateUniqueToken();
    const bd = await connectBD();
    const collection = bd.collection(`${session ? 'users' : 'link'}`);
    if (!session) {
      const limit = collection.find({ userToken: userToken }).toArray();
      if ((await limit).length >= 5) {
        return new Response(
          JSON.stringify({
            limit: {
              title: "Limit of urls created",
              description:
                "You have reached the limit of allowed URLs. Sign up to create more.",
            },
          })
        );
      }
    }
    const url = new URL(fullurl);
    const data = {
      short_url: uid.rnd(),
      session,
      icon: url.hostname,
      status: true,
      userToken,
      clicks: 0,
      createAt: moment().format("ll"),
      originalLink: fullurl,
    };
    const result = await collection.insertOne(data);
    if (result.insertedId) {
      return new Response(JSON.stringify(data));
    }
  } catch (error) {
    return new Response(error);
  }
}
