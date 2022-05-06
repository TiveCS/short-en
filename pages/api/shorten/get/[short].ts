import {NextApiRequest, NextApiResponse} from "next";
import {connectToDatabase} from "../../../../lib/mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {short} = req.query;

    const {db} = await connectToDatabase();
    const found = await db.collection("shorten-url").findOne({short: short});

    if (found){
        res.status(200).send(found);
    }else{
        res.status(404).json({
            message: 'Shorten url not found!'
        });
    }
}