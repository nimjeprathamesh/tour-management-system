import { useLocation } from 'react-router-dom';
import MembershipForm from '../../layout/Backend/MembershipForm.jsx';
import '../../layout/Backend/addUpdateFile.css';
import useFunction from '../../hooks/useFunction.jsx';

export default function EditMembership() {
    const { handleUpdateMembership } = useFunction();
    const location = useLocation();
    const membership = location?.state?.membership || [];

    return (
        <MembershipForm method='put' membership={membership} onPress={handleUpdateMembership} />
    );
}