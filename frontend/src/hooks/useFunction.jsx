import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TourContext } from '../context/context.jsx';
import { SliderData } from '../util/constant.jsx';

export default function useFunction() {
    const {
        subscribe: mail, formData, loginFormData, triggerDataRefresh, destinationFormData, packageFormData, testimonialsFormData, membershipFormData, handleSetNull, handleSuccessToast, handleErrorToast, resetTimeout, setManualNavigation, setIndex, setTransitionEnabled, setShowMenu, toggleColorMode, setShowThemeOptions, colorMode, setShowNotifications, showThemeOptions, showNotifications
    } = useContext(TourContext);
    const navigate = useNavigate();

    const nextSlide = useCallback(() => {
        resetTimeout();
        setManualNavigation(false);
        setIndex((prevIndex) => {
            if (prevIndex === SliderData.length - 1) {
                setTransitionEnabled(false);
                return 0;
            } else {
                return prevIndex + 1;
            }
        });
    }, [resetTimeout, setIndex, setManualNavigation, setTransitionEnabled]);

    const prevSlide = useCallback(() => {
        resetTimeout();
        setManualNavigation(true);
        setIndex((prevIndex) => {
            if (prevIndex === 0) {
                setTransitionEnabled(false);
                return SliderData.length - 1;
            } else {
                return prevIndex - 1;
            }
        });
    }, [resetTimeout, setIndex, setManualNavigation, setTransitionEnabled]);

    function handleSetTheme(themeMode) {
        if (themeMode === 'system') {
            toggleColorMode();
        } else if (themeMode === 'light' && colorMode !== 'light') {
            toggleColorMode();
        } else if (themeMode === 'dark' && colorMode !== 'dark') {
            toggleColorMode();
        }
        setShowMenu(false);
        setShowThemeOptions(false);
    }

    function handleMenuItemClick() {
        setShowThemeOptions(!showThemeOptions)
    }

    function handleBellIconClick() {
        setShowNotifications(!showNotifications);
    }

    async function handleSignUp(event) {
        event.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/api/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginFormData),
            });

            const data = await response.json();

            if (!response.ok) {
                handleErrorToast(data.message);
                handleSetNull();
            } else {
                triggerDataRefresh();
                handleSuccessToast(data.message);
                handleSetNull();
                navigate("/admin/signIn");
            }
        } catch (error) {
            handleErrorToast(error.message);
            handleSetNull();
        }
    };

    async function handleSignIn(event) {
        event.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/api/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginFormData),
            });

            const data = await response.json();

            if (!response.ok) {
                handleErrorToast(data.message);
                handleSetNull();
            } else {
                triggerDataRefresh();
                handleSuccessToast(data.message);
                console.log("data", data);
                localStorage.setItem("token", data.token);
                localStorage.setItem("id", data.id);
                handleSetNull();
                navigate(`/admin/${data.id}/homepage`);
            }
        } catch (error) {
            handleErrorToast(error.message);
            handleSetNull();
        }
    };

    async function handleAddDestination(event) {
        event.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/destination`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(destinationFormData),
            });

            const data = await response.json();

            if (!response.ok) {
                handleErrorToast(data.message);
                handleSetNull();
            } else {
                triggerDataRefresh();
                handleSuccessToast(data.message);
                handleSetNull();
                navigate("/admin/destination");
            }
        } catch (error) {
            handleErrorToast(error.message);
            handleSetNull();
        }
    };

    async function handleUpdateDestination(event, destination) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const rawDate = formData.get("date");

        const formattedDate = rawDate || null;
        if (!formattedDate || isNaN(new Date(formattedDate))) {
            handleErrorToast("Please select a valid date");
            return;
        }

        const updatedDestination = {
            id: destination.id,
            date: formattedDate,
            name: formData.get("name"),
            duration: formData.get("duration"),
            details: formData.get("details"),
            image: formData.get("image"),
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/destination?id=${destination.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedDestination),
            });

            const data = await response.json();

            if (!response.ok) {
                handleErrorToast(data.message);
                handleSetNull();
            } else {
                triggerDataRefresh();
                handleSuccessToast(data.message);
                handleSetNull();
                navigate("/admin/destination");
            }
        } catch (error) {
            handleErrorToast(error.message);
            handleSetNull();
        }
    }

    async function handleDeleteDestination(id) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/destination?id=${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (!response.ok) {
                handleErrorToast(data.message);
            } else {
                triggerDataRefresh();
                handleSuccessToast(data.message);
            }
        } catch (error) {
            handleErrorToast(error.message);
        }
    }

    async function handleAddPackage(event) {
        event.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/package`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(packageFormData),
            });

            const data = await response.json();

            if (!response.ok) {
                handleErrorToast(data.message);
                handleSetNull();
            } else {
                triggerDataRefresh();
                handleSuccessToast(data.message);
                handleSetNull();
                navigate("/admin/package");
            }
        } catch (error) {
            handleErrorToast(error.message);
            handleSetNull();
        }
    };

    async function handleUpdatePackage(event, packages) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const updatedPackage = {
            id: packages.id,
            title: formData.get("title"),
            location: formData.get("location"),
            duration: formData.get("duration"),
            details: formData.get("details"),
            price: formData.get("price"),
            image: formData.get("image"),
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/package?id=${packages.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedPackage),
            });

            const data = await response.json();

            if (!response.ok) {
                handleErrorToast(data.message);
                handleSetNull();
                console.log("not ok", data.message);
            } else {
                triggerDataRefresh();
                handleSuccessToast(data.message);
                handleSetNull();
                navigate("/admin/package");
            }
        } catch (error) {
            handleErrorToast(error.message);
            handleSetNull();
            console.log("error", error.message);
        }
    };

    async function handleDeletePackage(id) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/packages?id=${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (!response.ok) {
                handleErrorToast(data.message);
                console.log("not ok", data.message);
            } else {
                triggerDataRefresh();
                handleSuccessToast(data.message);
                console.log("ok", data.message);
            }
        } catch (error) {
            handleErrorToast(error.message);
            console.log("error", error.message);
        }
    }

    async function handleAddTestimonial(event) {
        event.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/testimonial`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(testimonialsFormData),
            });

            const data = await response.json();

            if (!response.ok) {
                handleErrorToast(data.message);
                handleSetNull();
            } else {
                triggerDataRefresh();
                handleSuccessToast(data.message);
                handleSetNull();
                navigate("/admin/testimonial");
            }
        } catch (error) {
            handleErrorToast(error.message);
            handleSetNull();
        }
    };

    async function handleUpdateTestimonial(event, testimonial) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const updatedTestimonial = {
            id: testimonial.id,
            name: formData.get("name"),
            designation: formData.get("designation"),
            image: formData.get("image"),
            feedback: formData.get("feedback"),
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/testimonial?id=${testimonial.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedTestimonial),
            });

            const data = await response.json();

            if (!response.ok) {
                handleErrorToast(data.message);
                handleSetNull();
                console.log("not ok", data.message);
            } else {
                triggerDataRefresh();
                handleSuccessToast(data.message);
                handleSetNull();
                navigate("/admin/testimonial");
            }
        } catch (error) {
            handleErrorToast(error.message);
            handleSetNull();
            console.log("error", error.message);
        }
    };

    async function handleDeleteTetimonial(id) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/testimonial?id=${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (!response.ok) {
                handleErrorToast(data.message);
                console.log("not ok", data.message);
            } else {
                triggerDataRefresh();
                handleSuccessToast(data.message);
                console.log("ok", data.message);
            }
        } catch (error) {
            handleErrorToast(error.message);
            console.log("error", error.message);
        }
    }

    async function handleAddMembership(event) {
        event.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/membership`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(membershipFormData),
            });

            const data = await response.json();

            if (!response.ok) {
                handleErrorToast(data.message);
                handleSetNull();
            } else {
                triggerDataRefresh();
                handleSuccessToast(data.message);
                handleSetNull();
                navigate("/admin/membership");
            }
        } catch (error) {
            handleErrorToast(error.message);
            handleSetNull();
        }
    };

    async function handleUpdateMembership(event, membership) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const updatedMembership = {
            id: membership.id,
            image: formData.get("image"),
            type: formData.get("type"),
            location: formData.get("location"),
            price: formData.get("price"),
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/membership?id=${membership.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedMembership),
            });

            const data = await response.json();

            if (!response.ok) {
                handleErrorToast(data.message);
                handleSetNull();
                console.log("not ok", data.message);
            } else {
                triggerDataRefresh();
                handleSuccessToast(data.message);
                handleSetNull();
                navigate("/admin/membership");
            }
        } catch (error) {
            handleErrorToast(error.message);
            handleSetNull();
            console.log("error", error.message);
        }
    };

    async function handleDeleteMembership(id) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/membership?id=${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (!response.ok) {
                handleErrorToast(data.message);
                console.log("not ok", data.message);
            } else {
                triggerDataRefresh();
                handleSuccessToast(data.message);
                console.log("ok", data.message);
            }
        } catch (error) {
            handleErrorToast(error.message);
            console.log("error", error.message);
        }
    }

    async function handleAddSubscription(event) {
        event.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/subscription`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ subscribe: mail }),
            });

            const data = await response.json();

            if (!response.ok) {
                handleErrorToast(data.message);
                handleSetNull();
            } else {
                triggerDataRefresh();
                handleSuccessToast(data.message);
                handleSetNull();
            }
        } catch (error) {
            handleErrorToast(error.message);
            handleSetNull();
        }
    };

    async function handleAddFeedback(event) {
        event.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/feedback`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                handleErrorToast(data.message);
                handleSetNull();
            } else {
                triggerDataRefresh();
                handleSetNull();
                handleSuccessToast(data.message);
            }
        } catch (error) {
            handleErrorToast(error.message);
            handleSetNull();
        }
    };

    async function handleDeleteSubscription(id) {
        const url = import.meta.env.VITE_BACKEND_URL + '/api/subscription/' + id;

        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (!response.ok) {
                handleErrorToast(data.message);
                handleSetNull();
            } else {
                triggerDataRefresh();
                handleSuccessToast(data.message);
                handleSetNull();
            }
        } catch (error) {
            handleErrorToast(error.message);
            handleSetNull();
        }
    };

    async function handleDeleteContact(id) {
        const url = import.meta.env.VITE_BACKEND_URL + '/api/contactinfo/' + id;

        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (!response.ok) {
                handleErrorToast(data.message);
                handleSetNull();
            } else {
                triggerDataRefresh();
                handleSuccessToast(data.message);
                handleSetNull();
            }
        } catch (error) {
            handleErrorToast(error.message);
            handleSetNull();
        }
    }

    async function handleLogout() {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem("id");
            navigate('/admin/signIn');
            setShowMenu(false);
            handleSuccessToast("You have successfully logged out");
        } catch (error) {
            handleErrorToast(error.message);
        }
    }

    return {
        nextSlide, prevSlide, handleSignUp, handleSignIn, handleDeleteContact, handleDeleteSubscription, handleAddSubscription, handleAddFeedback, handleAddDestination, handleUpdateDestination, handleDeleteDestination, handleAddPackage, handleDeletePackage, handleAddTestimonial, handleDeleteTetimonial, handleAddMembership, handleDeleteMembership, handleUpdatePackage, handleUpdateTestimonial, handleUpdateMembership, handleLogout, handleSetTheme, handleMenuItemClick, handleBellIconClick
    };
}