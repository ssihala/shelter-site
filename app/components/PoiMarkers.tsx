import React, { useState } from 'react';
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
  rating: number;
  user_ratings_total: number;
  current_opening_hours: {
    weekday_text: string[];
  };
  place_id: string;
}

interface PoiMarkersProps {
  pois: Shelter[];
  importanceMap: Record<string, number>;
}

const PoiMarkers: React.FC<PoiMarkersProps> = ({ pois, importanceMap }) => {
  const [selectedShelter, setSelectedShelter] = useState<ShelterInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [highlightedPlaceId, setHighlightedPlaceId] = useState<string | null>(null);

  const getMarkerColor = (importance: number) => {
    if (importance === 1) return 'green';  // Low importance
    if (importance === 2) return 'yellow'; // Medium importance
    if (importance === 3) return 'red';    // High importance
    return 'gray'; 
  };

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
          rating: data.rating,
          place_id: poi.place_id,
          user_ratings_total: data.user_ratings_total,
          current_opening_hours: data.current_opening_hours,
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
    <div className="relative w-full h-[700px]"> 

      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-4 w-72">
        <ShelterDropdown
          placeIds={pois.map((poi) => poi.place_id)}
          onShelterSelect={handleShelterSelect}
        />
      </div>

      {/* Markers for Shelters */}
      {pois.map((poi) => {
        const importance = importanceMap[poi.place_id] || 'gray'; // Default to importance 1 if not found
        return (
          <AdvancedMarker
            key={poi.place_id}
            position={{ lat: poi.location.lat, lng: poi.location.lng }}
            onClick={() => handleMarkerClick(poi)}
          >
            <Pin
              background={highlightedPlaceId === poi.place_id ? "#FBBC04" : getMarkerColor(importance)} // Use getPinColor for background
              glyphColor="#000"
              borderColor="#000"
              scale={highlightedPlaceId === poi.place_id ? 1.5 : 1.2} // Larger size for selected pin
            />
          </AdvancedMarker>
        );
      })}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} shelter={selectedShelter} />
    </div>
  );
};

export default PoiMarkers;
