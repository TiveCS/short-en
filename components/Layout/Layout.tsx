import Navbar from "../Navbar/Navbar";
import {ReactElement} from "react";
import {Box} from "@chakra-ui/react";

export default function Layout({ children }: {children: ReactElement}){
    return (
        <>
            <Navbar />
            <Box>
                {children}
            </Box>
        </>
    )
}