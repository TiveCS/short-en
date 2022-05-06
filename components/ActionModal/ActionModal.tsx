import {useDisclosure} from "@chakra-ui/hooks";
import {Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay} from "@chakra-ui/modal";
import ActionButton from "../ActionButton/ActionButton";
import {Box, FormLabel, Input, InputGroup, InputLeftAddon, Stack, useToast} from "@chakra-ui/react";
import {ChangeEvent, useState} from "react";

interface ToastProps {
    title: string;
    status: 'info' | 'success' | 'warning' | 'error' | undefined;
}

export default function ActionModal() {

    const {isOpen, onOpen, onClose} = useDisclosure();

    const [userUrl, setUserUrl] = useState<string>("");
    const [userShortener, setUserShortener] = useState<string>("");
    const [process, setProcess] = useState(false);

    const toast = useToast();
    const toastId = 'shorten-form';

    const showToast = ({title, status}: ToastProps) => {
        if (!toast.isActive(toastId)) {
            toast({
                id: toastId,
                title: title,
                isClosable: true,
                position: 'bottom',
                status: status
            });
        }
    }

    const handleSubmit = () => {
        if (!userShortener || !userUrl){
            showToast({title: `Link and Shortener is required!`, status: 'error'});
        }else{
            setProcess(true);

            const bodyJson = JSON.stringify({
                "url": userUrl,
                "short": userShortener
            });
        }
    }

    const handleUserUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setUserUrl(event.target.value);
    }

    const handleUserShortenerChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setUserShortener(event.target.value);
    }

    return (
        <>
            <ActionButton text={'Shorten Link'} type={'button'} onClick={onOpen}/>

            <Modal isOpen={isOpen} onClose={onClose} size={'lg'}>
                <ModalOverlay />

                <ModalContent>
                    <ModalCloseButton />

                    <ModalBody pt={16}>
                        <Stack spacing={4}>
                            <Box>
                                <FormLabel>Your Link</FormLabel>
                                <Input onChange={handleUserUrlChange} value={userUrl} placeholder={'Your long url'} />
                            </Box>
                            <Box>
                                <FormLabel>Shorten Link</FormLabel>
                                <InputGroup>
                                    <InputLeftAddon>shorten.com/</InputLeftAddon>
                                    <Input onChange={handleUserShortenerChange} value={userShortener} placeholder={'Link shortcut'} type={'text'} />
                                </InputGroup>
                            </Box>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <ActionButton text={'Submit'} type={'submit'} isLoading={process} onClick={() => handleSubmit()} />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}