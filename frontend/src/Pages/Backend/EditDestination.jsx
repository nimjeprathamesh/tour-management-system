import { useLocation } from 'react-router-dom';
import DestinationForm from '../../layout/Backend/DestinationForm.jsx';
import '../../layout/Backend/addUpdateFile.css';
import useFunction from '../../hooks/useFunction.jsx';

export default function EditDestination() {
    const { handleUpdateDestination } = useFunction();
    const location = useLocation();
    const destination = location?.state?.destination || [];

    return (
        <DestinationForm method='put' destination={destination} onPress={handleUpdateDestination} />
    );
}