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
    useDisclosure
} from "@chakra-ui/react";
import ActionButton from "../ActionButton/ActionButton";
import {useForm} from "react-hook-form";
import environment from "../../util/environment";

export default function ActionModal() {

    const {isOpen, onOpen, onClose} = useDisclosure();

    const {formState: {errors}, register, handleSubmit} = useForm();

    const onSubmit = async (data: any) => {
        const env = environment();
        const {url, short} = data;

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
        console.log(result);
    };

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
                                <ActionButton text={'Submit'} type={'submit'}/>
                            </Flex>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}