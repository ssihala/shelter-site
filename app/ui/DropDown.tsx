import React, { useState, useEffect } from 'react';

interface ShelterDetails {
  name: string;
  place_id: string;
}

interface ShelterDropdownProps {
  placeIds: string[];
  onShelterSelect: (place_id: string) => void;
}

const ShelterDropdown: React.FC<ShelterDropdownProps> = ({ placeIds, onShelterSelect }) => {
  const [shelters, setShelters] = useState<ShelterDetails[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch shelter names from the API
  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const promises = placeIds.map(async (place_id) => {
          const response = await fetch(`/api/shelter?place_id=${place_id}`);
          const data = await response.json();
          return { name: data.name, place_id };
        });
        
        const shelterData = await Promise.all(promises);
        setShelters(shelterData);
      } catch (error) {
        console.error('Error fetching shelters:', error);
      }
    };

    fetchShelters();
  }, [placeIds]);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          Select Shelter
          <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white ring-1 shadow-lg ring-black/5">
          <div className="py-1">
            {shelters.map((shelter) => (
              <a
                key={shelter.place_id}
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={(e) => {
                  e.preventDefault();
                  onShelterSelect(shelter.place_id);
                  setIsOpen(false); // Close dropdown after selection
                }}
              >
                {shelter.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShelterDropdown;
