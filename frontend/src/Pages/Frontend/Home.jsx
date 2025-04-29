import Destination from "../../layout/Frontend/Home_Page/Destination.jsx";
import Membership from "../../layout/Frontend/Home_Page/Membership.jsx";
import NewsLetter from "../../layout/Frontend/Home_Page/NewsLetter.jsx";
import Packages from "../../layout/Frontend/Home_Page/Packages.jsx";
import Slider from "../../layout/Frontend/Home_Page/Slider.jsx";
import Testimonial from "../../layout/Frontend/Home_Page/Testimonial.jsx";
import AboutUs from "../../layout/Frontend/Home_Page/AboutUs.jsx";
import Banner from "../../layout/Frontend/Home_Page/Banner.jsx";

export default function Home() {
    return (
        <>
            <Slider />
            <Destination />
            <Banner />
            <Packages />
            <Testimonial />
            <Membership />
            <AboutUs />
            <NewsLetter />
        </>
    );
}