import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../Pages/Backend/HomePage.jsx';
import PackagePage from '../Pages/Backend/PackagePage.jsx';
import TestimonialPage from '../Pages/Backend/TestimonialPage.jsx';
import DestinationDetails from '../Pages/Frontend/DestinationDetails.jsx';
import PackageDetails from '../Pages/Frontend/PackageDetails.jsx';
import SignIn from '../Pages/SignIn.jsx';
import SignUp from '../Pages/Signup.jsx';
import EditDestination from '../Pages/Backend/EditDestination.jsx';
import NewDestination from '../Pages/Backend/NewDestination.jsx';
import EditMembership from '../Pages/Backend/EditMembership.jsx';
import NewMembership from '../Pages/Backend/NewMembership.jsx';
import EditPackages from '../Pages/Backend/EditPackage.jsx';
import NewPackage from '../Pages/Backend/NewPackage.jsx';
import EditTestimonial from '../Pages/Backend/EditTestimonial.jsx';
import NewTestimonial from '../Pages/Backend/NewTestimonial.jsx';
import ErrorElement from '../components/Error/ErrorElement.jsx';
import Home from '../Pages/Frontend/Home.jsx';
import About from '../Pages/Frontend/About.jsx';
import TourPackage from '../Pages/Frontend/TourPackage.jsx';
import Destination from '../Pages/Frontend/Destination.jsx';
import ContactUs from '../Pages/Frontend/ContactUs.jsx';
import Common from '../layout/Frontend/Common/Common.jsx';
import BackendCommon from '../layout/Backend/Common/Common.jsx';
import DestinationPage from '../Pages/Backend/DestinationPage.jsx';
import MembershipPage from '../Pages/Backend/MembershipPage.jsx';
import { AdminRouteWrapper, ProtectedRoute } from './ProutectedRoutes.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Common />,
        errorElement: <ErrorElement />,
        children: [
            { index: true, element: <Home /> },
            { path: 'about', element: <About /> },
            { path: 'destination', element: <Destination /> },
            { path: 'destination/:id', element: <DestinationDetails /> },
            { path: 'package', element: <TourPackage /> },
            { path: 'package/:id', element: <PackageDetails /> },
            { path: 'contactUs', element: <ContactUs /> },
        ],
    },
    { path: 'admin/signIn', element: <SignIn /> },
    { path: 'admin/signUp', element: <SignUp /> },
    {
        path: 'admin/:adminId',
        element: (
            <AdminRouteWrapper>
                <BackendCommon />
            </AdminRouteWrapper>
        ),
        errorElement: <ErrorElement />,
        children: [
            { path: 'homepage', element: <ProtectedRoute><HomePage /></ProtectedRoute> },
            { path: 'destination', element: <ProtectedRoute><DestinationPage /></ProtectedRoute> },
            { path: 'destination/add', element: <ProtectedRoute><NewDestination /></ProtectedRoute> },
            { path: 'destination/:id', element: <ProtectedRoute><EditDestination /></ProtectedRoute> },
            { path: 'package', element: <ProtectedRoute><PackagePage /></ProtectedRoute> },
            { path: 'package/add', element: <ProtectedRoute><NewPackage /></ProtectedRoute> },
            { path: 'package/:id', element: <ProtectedRoute><EditPackages /></ProtectedRoute> },
            { path: 'testimonial', element: <ProtectedRoute><TestimonialPage /></ProtectedRoute> },
            { path: 'testimonial/add', element: <ProtectedRoute><NewTestimonial /></ProtectedRoute> },
            { path: 'testimonial/:id', element: <ProtectedRoute><EditTestimonial /></ProtectedRoute> },
            { path: 'membership', element: <ProtectedRoute><MembershipPage /></ProtectedRoute> },
            { path: 'membership/add', element: <ProtectedRoute><NewMembership /></ProtectedRoute> },
            { path: 'membership/:id', element: <ProtectedRoute><EditMembership /></ProtectedRoute> },
        ],
    },
]);

export default router;