import {
    Flex,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import ActionButton from "../ActionButton/ActionButton";
import {useForm} from "react-hook-form";
import environment from "../../util/environment";
import {useEffect, useState} from "react";

export default function ActionModal() {

    const [isLoading, setIsLoading] = useState<boolean>();
    const [isSuccess, setIsSuccess] = useState<boolean>();

    const {isOpen, onOpen, onClose} = useDisclosure();
    const {formState: {errors}, register, handleSubmit} = useForm();

    const toast = useToast();

    const showToast = (title: string, status: "info" | "success" | "error") => {
        toast({
            isClosable: true,
            title,
            status
        });
    }

    const onSubmit = async (data: any) => {
        const env = environment();
        const {url, short} = data;

        if (!url || !short){
            showToast("URL or Short link is not set!", "error");
            return;
        }

        setIsLoading(true);
        const res = await fetch(`${env}/api/shorten/post/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                short: short,
                url: url
            })
        });

        const result = await res.json();
        const status = res.status === 200;
        setIsLoading(false);
        setIsSuccess(status);
    };

    useEffect(() => {
        if (isLoading != undefined) {
            if (isLoading) {
                showToast("Sending your request...", "info");
            } else {
                if (isSuccess) {
                    showToast("Successfully create short link", "success");
                } else {
                    showToast("Failed sending your request...", "error");
                }
                setIsSuccess(undefined);
            }
        }
    }, [isLoading]);

    return (
        <>
            <ActionButton text={'Shorten Link'} type={'button'} onClick={onOpen}/>
            <Modal size={'xl'} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalCloseButton/>
                    <ModalHeader/>
                    <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl>
                                <FormLabel htmlFor={'url'}>URL</FormLabel>
                                <Input type={'url'} placeholder={'Your long URL'} {...register('url')}/>
                            </FormControl>

                            <FormControl mt={4} mb={8}>
                                <FormLabel htmlFor={'short'}>Short Link</FormLabel>
                                <Input type={'text'} placeholder={'Your shortener link'} {...register('short')}/>
                            </FormControl>

                            <Flex mb={4} justifyContent={'flex-end'}>
                                <ActionButton isLoading={isLoading} text={'Submit'} type={'submit'}/>
                            </Flex>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}