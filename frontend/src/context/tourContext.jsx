import { useColorMode } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Bounce, toast } from 'react-toastify';
import useFetch from '../hooks/useFetch.jsx';
import { TourContext } from './context.jsx';

export const TourContextProvider = ({ children }) => {
    const [refreshKey, setRefreshKey] = useState(0);
    const triggerDataRefresh = () => {
        setRefreshKey(prevKey => prevKey + 1);
    }
    const { data: destinations, error: destinationError, loader: destinationLoader } = useFetch('/api/destinations', refreshKey);
    const { data: packages, error: packageError, loader: packageLoader } = useFetch('/api/packages', refreshKey);
    const { data: testimonials, error: testimonialError, loader: testimonialLoader } = useFetch('/api/testimonials', refreshKey);
    const { data: memberships, error: membershipError, loader: membershipLoader } = useFetch('/api/memberships', refreshKey);
    const { data: contactinfo, error: contactinfoError, loader: contactinfoLoader } = useFetch('/api/contactinfo', refreshKey);
    const { data: subscription, error: subscriptionError, loader: subscriptionLoader } = useFetch('/subscription', refreshKey);
    const [index, setIndex] = useState(0);
    const [subscribe, setSubscribe] = useState(null);
    const [transitionEnabled, setTransitionEnabled] = useState(true);
    const [manualNavigation, setManualNavigation] = useState(false);
    const [excludeName, setExcludeName] = useState({ destinationName: null, packageName: null });
    const [initialLoad, setInitialLoad] = useState({ destination: true, package: true });
    const [showThemeOptions, setShowThemeOptions] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const timeoutRef = useRef(null);
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === 'dark';
    const themeCss = {
        backgroundColor: isDark ? '#1a202c' : '#f9f9f9',
        color: isDark ? '#f9f9f9' : '#1a202c'
    };
    const [formData, setFormData] = useState({
        name: null,
        email: null,
        subject: null,
        message: null,
    });
    const [loginFormData, setLoginFormData] = useState({
        email: null,
        password: null,
    });
    const [destinationFormData, setDestinationFormData] = useState({
        date: null,
        name: null,
        duration: null,
        details: null,
        image: null,
    });
    const [packageFormData, setPackageFormData] = useState({
        title: null,
        location: null,
        duration: null,
        details: null,
        price: null,
        image: null,
    });
    const [testimonialsFormData, setTestimonialsFormData] = useState({
        name: null,
        designation: null,
        image: null,
        feedback: null,
    });
    const [membershipFormData, setMembershipFormData] = useState({
        type: null,
        location: null,
        image: null,
        price: null,
    });
    const notificationsRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
                setShowThemeOptions(false);
            }
            if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef, notificationsRef]);

    useEffect(() => {
        if (packages) {
            setInitialLoad((prev) => ({ ...prev, package: false }));
        }
    }, [packages]);

    const updateExcludedName = (key, value) => {
        setExcludeName((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    const handleSubscribeChange = (event) => {
        setSubscribe(event.target.value);
    };

    const handleFormDataChange = (field) => (value) => {
        setFormData({
            ...formData,
            [field]: value
        });
        setLoginFormData({
            ...loginFormData,
            [field]: value
        });
        setDestinationFormData({
            ...destinationFormData,
            [field]: field === "date" ? value : value,
        });
        setPackageFormData({
            ...packageFormData,
            [field]: value
        });
        setTestimonialsFormData({
            ...testimonialsFormData,
            [field]: value
        });
        setMembershipFormData({
            ...membershipFormData,
            [field]: value
        });
        setRefresh((prev) => !prev);
    };

    function handleSetNull() {
        setSubscribe(null);
        setLoginFormData({
            email: null,
            password: null,
        });
        setFormData({
            name: null,
            email: null,
            subject: null,
            message: null,
        });
        setDestinationFormData({
            date: null,
            name: null,
            duration: null,
            details: null,
            image: null,
        });
        setPackageFormData({
            title: null,
            location: null,
            duration: null,
            details: null,
            price: null,
            image: null,
        });
        setTestimonialsFormData({
            name: null,
            designation: null,
            image: null,
            feedback: null,
        });
        setMembershipFormData({
            type: null,
            location: null,
            image: null,
            price: null,
        });
    }

    function handleSuccessToast(message) {
        toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    }

    function handleErrorToast(message) {
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    }

    const values = {
        destinations, destinationError, destinationLoader, packages, packageError, packageLoader, testimonials, testimonialError, testimonialLoader, memberships, membershipError, membershipLoader, contactinfo, contactinfoError, contactinfoLoader, subscription, subscriptionError, subscriptionLoader, transitionEnabled, index, timeoutRef, manualNavigation, excludeName, initialLoad, updateExcludedName, subscribe, handleSuccessToast, handleErrorToast, handleSubscribeChange, setInitialLoad, resetTimeout, setManualNavigation, setIndex, setTransitionEnabled, isDark, themeCss, colorMode, toggleColorMode, handleSetNull, setSubscribe, formData, handleFormDataChange, destinationFormData, packageFormData, triggerDataRefresh, refreshKey, testimonialsFormData, membershipFormData, refresh, showThemeOptions, showNotifications, showMenu, setShowMenu, setShowThemeOptions, setShowNotifications, notificationsRef, menuRef, loginFormData
    };

    return (
        <TourContext.Provider value={values}>
            {children}
        </TourContext.Provider>
    );
};

TourContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};