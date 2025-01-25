'use client'
import React from 'react';
import { SearchBar } from './components/SearchBar';
import { APIProvider, Map, MapCameraChangedEvent } from '@vis.gl/react-google-maps';

const Home = () => {
  return (
    <div className="flex flex-col w-full space-y-4 items-center"> 
      <div className="bg-gray-200 p-4 text-gray-800 text-lg rounded-md w-[600px]"> 
        <p className="font-semibold">
          Shelter Seek is intended to assist individuals in need in searching for service providers near them.
        </p>
        <p className="mt-2">
          We are not responsible for the service providers listed on this site and does not endorse any of the service providers listed.
        </p>
      </div>

      <div className="flex flex-row w-full space-x-60 justify-center"> 
        <APIProvider
          apiKey={'AIzaSyCAYOCiKQp8Fts2p4wf_riVl5uW9g-ns9w'}
          onLoad={() => console.log('Maps API has loaded.')}
        >
          <div className="h-[600px] w-[600px]">
            <Map
              defaultZoom={13}
              defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
              onCameraChanged={(ev: MapCameraChangedEvent) =>
                console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
              }
              style={{ width: '100%', height: '100%' }} 
            />
          </div>
        </APIProvider>

        {/* Search Bar */}
        <div className="flex flex-col items-start mt-4">
          <SearchBar placeholder="Search for location..." className="search-bar" />
          <div className="mt-2 text-lg font-redhat text-gray-600">
            Search for shelters near you
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

