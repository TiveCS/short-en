import {NextApiRequest, NextApiResponse} from "next";
import {connectToDatabase} from "../../../../lib/mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {short, url} = req.query;

    const shortenUrlObject = {
        "short": short,
        "url": url
    };

    const {db} = await connectToDatabase();
    await db.collection("shorten-url").insertOne(shortenUrlObject);

    res.status(200).json({
        message: 'Successfully shorten the url'
    });
}