import {Box, Flex, Image, Link, Spacer} from "@chakra-ui/react";

export default function Navbar(){
    return (
        <Box position={'fixed'} minW={'100vw'} bg={'cyan.500'} py={8} px={16} color={'whiteAlpha.900'}>
            <Flex direction={'row'} alignItems={'center'} >
                <Box>
                    <Link href={'/'}>Shorten.</Link>
                </Box>
                <Spacer />
                <Box>
                    <Link href={'https://github.com/TiveCS/shorten'} target={'_blank'}>
                        <Image src={'/icons/github.svg'} alt={'Repository'} />
                    </Link>
                </Box>
            </Flex>
        </Box>
    )
}