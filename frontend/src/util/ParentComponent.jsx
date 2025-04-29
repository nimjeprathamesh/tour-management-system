import { useState } from 'react';
import DestinationList from './Destination_Details_Page/InnerArea/DestinationList';
import DestinationContent from './Destination_Page/DestinationContent';
import { destinationsData } from './DestinationsData';

export default function DestinationPage() {
    const [selectedDestination, setSelectedDestination] = useState(null);

    const handleReadMoreClick = (destinationId) => {
        setSelectedDestination(destinationId);
    };

    const filteredDestinations = destinationsData.filter(
        (destination) => destination.id !== selectedDestination
    );

    return (
        <div>
        <DestinationContent
            id={selectedDestination}
            onReadMoreClick={handleReadMoreClick}
        />
        <DestinationList
            destinations={filteredDestinations}
        />
        </div>
    );
}
