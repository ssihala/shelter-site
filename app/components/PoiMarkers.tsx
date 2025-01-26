import React, { useState} from 'react';
import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import ShelterDropdown from '../ui/DropDown';
import Modal from '../ui/Modal';

interface Shelter {
  name: string;
  formatted_address: string;
  location: {
    lat: number;
    lng: number;
  };
  rating: number;
  user_ratings_total: number;
  place_id: string;
}

interface ShelterInfo {
  name: string;
  formatted_address: string;
  formatted_phone_number: string;
  website: string;
}

interface PoiMarkersProps {
  pois: Shelter[];
}

const PoiMarkers: React.FC<PoiMarkersProps> = ({ pois }) => {
  const [selectedShelter, setSelectedShelter] = useState<ShelterInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [highlightedPlaceId, setHighlightedPlaceId] = useState<string | null>(null);

  const handleMarkerClick = async (poi: Shelter) => {
    try {
      const response = await fetch(`/api/shelter?place_id=${poi.place_id}`);
      const data = await response.json();
      console.log("Fetched shelter data:", data);
      if (data && !data.error) {
        const shelterInfo: ShelterInfo = {
          name: data.name,
          formatted_address: data.formatted_address,
          formatted_phone_number: data.formatted_phone_number,
          website: data.website,
        };
        setSelectedShelter(shelterInfo);
        setIsModalOpen(true);
      } else {
        console.error('No data returned from backend');
      }
    } catch (error) {
      console.error('Error fetching shelter details:', error);
    }
  };
  const handleShelterSelect = (place_id: string) => {
    setHighlightedPlaceId(place_id);
    const selectedPoi = pois.find((poi) => poi.place_id === place_id);
    if (selectedPoi) {
      handleMarkerClick(selectedPoi); 
    }
  };

  return (
    <div className="relative">
    <div className="absolute top-100 left-1/2 transform -translate-x-1/2 z-10 w-72">
        <ShelterDropdown
          placeIds={pois.map((poi) => poi.place_id)}
          onShelterSelect={handleShelterSelect}
        />
      </div>
    
    {pois.map((poi) => (
      <AdvancedMarker
        key={poi.place_id}
        position={{ lat: poi.location.lat, lng: poi.location.lng }}
        onClick={() => handleMarkerClick(poi)}
      >
        <Pin
          background={highlightedPlaceId === poi.place_id ? "#FBBC04" : "#FF6347"} // Highlighted color
          glyphColor="#000"
          borderColor="#000"
          scale={highlightedPlaceId === poi.place_id ? 1.5 : 1.2} // Larger size for selected pin
        />
      </AdvancedMarker>
    ))}

    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} shelter={selectedShelter} />
  </div>
  );
};

export default PoiMarkers;



