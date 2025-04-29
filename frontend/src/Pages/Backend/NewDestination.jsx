import DestinationForm from "../../layout/Backend/DestinationForm.jsx";
import useFunction from "../../hooks/useFunction.jsx";
import '../../layout/Backend/addUpdateFile.css';

export default function NewDestination() {
    const { handleAddDestination } = useFunction();

    return (
        <DestinationForm method='post' onPress={handleAddDestination} />
    );
}