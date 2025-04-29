import { Box, Button, Divider, FormControl, Heading, Input, Textarea } from "@chakra-ui/react";
import { useContext } from "react";
import { Form } from "react-router-dom";
import { TourContext } from "../../context/context.jsx";
import useFunction from "../../hooks/useFunction.jsx";
import { useTheme } from '../../hooks/useTheme.jsx';
import './DestinationInquiryForm.css';

export default function InquiryForm() {
    const { feedback, handleFormDataChange } = useContext(TourContext);
    const { handleAddFeedback } = useFunction();
    const { isDark } = useTheme();
    const buttonHoverClass = isDark ? 'submitButtonLight' : 'submitButtonDark';
    const borderColor = isDark ? 'lightBorder' : 'darkBorder';

    return (
        <Box>
            <Heading fontSize='1rem'>INQUIRY FORM</Heading>
            <Divider className="hr-1" />
            <Divider className={`hr-2 ${borderColor}`} />
            <Form method="post" className={borderColor} onSubmit={handleAddFeedback}>
                <FormControl id="name" mb={4}>
                    <Input
                        name='name'
                        type='text'
                        value={feedback?.name}
                        placeholder='Enter the name'
                        onChange={(e) => handleFormDataChange("name")(e.target.value)}
                    />
                </FormControl>
                <FormControl id="email" mb={4}>
                    <Input
                        name='email'
                        type='email'
                        value={feedback?.email}
                        placeholder='Enter the email address'
                        onChange={(e) => handleFormDataChange("email")(e.target.value)}
                    />
                </FormControl>
                <FormControl id="subject" mb={4}>
                    <Input
                        name='subject'
                        type='text'
                        value={feedback?.subject}
                        placeholder='Subject'
                        onChange={(e) => handleFormDataChange("subject")(e.target.value)}
                    />
                </FormControl>
                <FormControl id="message" mb={4}>
                    <Textarea
                        name='message'
                        value={feedback?.message}
                        placeholder='Write A Message'
                        rows={3}
                        onChange={(e) => handleFormDataChange("message")(e.target.value)}
                    />
                </FormControl>
                <Button type='submit' className={`submitButton ${buttonHoverClass}`}>
                    Submit
                </Button>
            </Form>
        </Box>
    );
}