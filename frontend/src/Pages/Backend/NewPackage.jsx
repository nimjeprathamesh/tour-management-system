import PackageForm from "../../layout/Backend/PackageForm.jsx";
import '../../layout/Backend/addUpdateFile.css';
import useFunction from '../../hooks/useFunction.jsx';

export default function NewPackage() {
    const { handleAddPackage } = useFunction();

    return (
        <PackageForm method='post' onPress={handleAddPackage} />
    );
}