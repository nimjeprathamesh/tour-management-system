import { Form } from "react-router-dom";
import LoginPage from "./Backend/LoginPage";
import useFunction from "../hooks/useFunction";

export default function SignIn() {
    const { handleSignIn } = useFunction();

    return (
        <Form onSubmit={handleSignIn}>
            <LoginPage />
        </Form>
    );
}