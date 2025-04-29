import useFunction from "../../hooks/useFunction.jsx";
import MembershipForm from "../../layout/Backend/MembershipForm.jsx";
import '../../layout/Backend/addUpdateFile.css';

export default function NewMembership() {
    const { handleAddMembership } = useFunction();

    return (
        <MembershipForm method='post' onPress={handleAddMembership} />
    );
}