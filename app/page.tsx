'use client'
import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import Button from './ui/Button';
import { APIProvider, Map, MapCameraChangedEvent } from '@vis.gl/react-google-maps';
import PoiMarkers from './components/PoiMarkers'; 

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

const api_key = process.env.NEXT_PUBLIC_MAPS_API_KEY;

const Home = () => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [pois, setPois] = useState<Shelter[]>([]); // stores shelters fetched from the API
  const [mapCenter, setMapCenter] = useState({
    lat: 29.6327107,  // Default: Gainesville, FL
    lng: -82.3429805,
  });

  // trigger the search
  const handleSearch = () => {
    let query = '';
    if (zip) {
      query = `zip=${zip}`;
    } else if (city && state) {
      query = `city=${city}&state=${state}`;
    }

    if (query) {
      fetchShelters(query);
    }
  };

  // Fetch shelters based on the query format (city, state, or zip)
  const fetchShelters = async (query: string) => {
    try {
      const response = await fetch(`/api/shelters?${query}`);
      const data = await response.json();

      console.log('Fetched data:', data); //debug
      
      if (Array.isArray(data)) {
        const shelters: Shelter[] = data.map((result: Shelter) => ({
          name: result.name,
          formatted_address: result.formatted_address,
          location: result.location,
          rating: result.rating,
          user_ratings_total: result.user_ratings_total,
          place_id: result.place_id,
        }));
        // Update the map center to the first shelter's location
      if (shelters.length > 0) {
        setMapCenter({
          lat: shelters[0].location.lat,
          lng: shelters[0].location.lng,
        });
      }
        setPois(shelters);  
      } else {
        console.error('Fetched data is not an array:', data);
        setPois([]);  // set an empty array if the data is invalid
      }
    } catch (error) {
      console.error('Error fetching shelters:', error);
    }
  };

  return (
    <div className="flex flex-col w-full space-y-4 items-center">
      <div className="mt-5 bg-gray-200 p-4 text-gray-800 text-lg rounded-md w-[600px]">
        <p className="font-semibold">
          Shelter Seek is intended to assist individuals in need in searching for service providers near them.
        </p>
        <p className="mt-2">
          We are not responsible for the service providers listed on this site and do not endorse any of the service providers listed.
        </p>
      </div>

      <div className="flex flex-row w-full space-x-40 justify-center">
        <APIProvider apiKey={api_key || ''}>
          <div className="h-[700px] w-[700px]">
            <Map
              mapId={'68edd6fb1645bd3'}
              defaultZoom={13}
              center={mapCenter}
              onCameraChanged={(ev: MapCameraChangedEvent) =>
                console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
              }
              style={{ width: '100%', height: '100%' }}
            >
              {/* Pass pois to PoiMarkers component */}
              <PoiMarkers pois={pois} />
            </Map>
          </div>
        </APIProvider>

        <div className="flex flex-col items-center mt-4 space-y-4 w-72">
          {/* Input Fields */}
          <div className="flex flex-col w-full space-y-3">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="border rounded p-2 w-full"
            />
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="State"
              className="border rounded p-2 w-full"
            />
            <input
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="Zip Code"
              className="border rounded p-2 w-full"
            />
            <Button
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>

          {/* SearchBar Component */}
          <SearchBar
            placeholder="Search"
            onSearch={handleSearch} 
            className="search-bar"
          />

          <div className="mt-4 text-lg center font-redhat text-gray-600">
            <p>Search for shelters near you by entering your city and state, or a</p>
            <p>zip code!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;



