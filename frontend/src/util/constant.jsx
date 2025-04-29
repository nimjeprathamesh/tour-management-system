import { FiBox, FiHome, FiInfo, FiMapPin } from 'react-icons/fi';
import { RiContactsBook2Fill } from "react-icons/ri";

export const testimonialSetting = (data, error) => ({
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 2000,
    draggable: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: (!data || data.length === 0 || error) ? false : true,
    dots: false,
    responsive: [
        {
            breakpoint: 991,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 850,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
});

export const SliderData = [
    {
        title: 'NOVEDA',
        image: 'https://www.luzukdemo.com/demo/inside-tours/wp-content/uploads/sites/35/2021/11/Slider-3-.jpg',
        text: 'The real journey of discovery consists not in exploring new landscapes, but in having new eyes.'
    },
    {
        title: 'NEW YORK',
        image: 'https://www.luzukdemo.com/demo/inside-tours/wp-content/uploads/sites/35/2021/11/slider-1-2.jpg',
        text: 'We are always looking for the most beautiful waterfalls around the world'
    },
    {
        title: 'CHICAGO',
        image: 'https://www.luzukdemo.com/demo/inside-tours/wp-content/uploads/sites/35/2021/11/Slider-2.jpg',
        text: 'TAKE ONLY MEMORIES, LEAVE ONLY FOOTPRINTS'
    },
    {
        title: 'FLORIDA',
        image: 'https://www.luzukdemo.com/demo/inside-tours/wp-content/uploads/sites/35/2021/11/slider1.jpg',
        text: 'Welcome to florida'
    },
];

export const menuItem = [
    {
        to: '',
        name: 'Home',
        icon: FiHome
    },
    {
        to: 'about',
        name: 'About',
        icon: FiInfo
    },
    {
        to: 'package',
        name: 'Tour Packages',
        icon: FiBox
    },
    {
        to: 'destination',
        name: 'Destination',
        icon: FiMapPin
    },
    {
        to: 'contactUs',
        name: 'Contact Us',
        icon: RiContactsBook2Fill
    },
];