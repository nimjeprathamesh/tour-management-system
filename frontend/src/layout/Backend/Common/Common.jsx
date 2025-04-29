import { Outlet } from 'react-router-dom';
import { useTheme } from "../../../hooks/useTheme";
import SidebarWithHeader from './InnerArea/SidebarWithHeader';

export default function BackendCommon() {
    const { themeCss } = useTheme();

    return (
        <div style={themeCss}>
            <SidebarWithHeader>
                <Outlet />
            </SidebarWithHeader>
        </div>
    );
}