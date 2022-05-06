import {NextApiRequest, NextApiResponse} from "next";
import {connectToDatabase} from "../../../../lib/mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const {db} = await connectToDatabase();

    const data = await db.collection("shorten-url").find({}).toArray();

    res.status(200).json(data);
}