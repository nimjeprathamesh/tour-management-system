import { Form } from "react-router-dom";
import LoginPage from "./Backend/LoginPage";
import useFunction from "../hooks/useFunction";

export default function SignUp() {
    const { handleSignUp } = useFunction();

    return (
        <Form onSubmit={handleSignUp}>
            <LoginPage />
        </Form>
    );
};
