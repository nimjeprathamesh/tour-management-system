import { useContext } from 'react';
import { TourContext } from '../../context/context.jsx';
import './HomePage.css';
import ContactInfo from '../../layout/Backend/HomePage/ContactInfo.jsx';
import Subscription from '../../layout/Backend/HomePage/Subscription.jsx';

export default function HomePage() {
    const {
        contactinfo, contactinfoError, contactinfoLoader, subscription, subscriptionError, subscriptionLoader
    } = useContext(TourContext);

    return (
        <section id="homePage">
            <div className="row table_container">
                <div className='row'>
                    <div className='col-md-8'>
                        <ContactInfo feedback={contactinfo} error={contactinfoError} loader={contactinfoLoader} />
                    </div>
                    <div className='col-md-4'>
                        <Subscription subscribe={subscription} error={subscriptionError} loader={subscriptionLoader} />
                    </div>
                </div>
            </div>
        </section>
    );
}
