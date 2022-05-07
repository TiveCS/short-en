import {GetServerSideProps} from "next";
import {ObjectId} from "mongodb";
import environment from "../util/environment";
import {Center, Text} from "@chakra-ui/react";
import {useEffect} from "react";

interface ShortenProps{
    _id: ObjectId,
    short: string,
    url: string
}

export default function ShortenPage(props: ShortenProps){

    const { short, url } = props;

    useEffect(() => {
        window.location.assign(url);
    });

    return (
        <Center minH={'100vh'}>
            <Text fontSize={'3xl'}>Redirecting to {short}</Text>
        </Center>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { short } = context.query;
    const env = environment();

    console.log(env);

    const fetcher = await fetch(`${env}/api/shorten/get/${short}`);
    const data = await fetcher.json();

    return {
        props: {
            _id: data._id,
            short: data.short,
            url: data.url
        }
    }
}