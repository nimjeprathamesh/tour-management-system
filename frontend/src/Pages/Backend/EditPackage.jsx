import { useLocation } from 'react-router-dom';
import PackageForm from '../../layout/Backend/PackageForm.jsx';
import '../../layout/Backend/addUpdateFile.css';
import useFunction from '../../hooks/useFunction.jsx';

export default function EditPackages() {
    const { handleUpdatePackage } = useFunction();
    const location = useLocation();
    const packages = location?.state?.packages;

    return (
        <PackageForm method='put' packages={packages} onPress={handleUpdatePackage} />
    );
}