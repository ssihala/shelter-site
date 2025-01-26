import React, { useState } from 'react';
import Button from './Button';

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
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  shelter: ShelterInfo | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, shelter }) => {
    const [showSignUp, setShowSignUp] = useState(false);
  
    if (!isOpen) return null;
  
    const openingHoursText = shelter?.current_opening_hours?.weekday_text
      ? shelter.current_opening_hours.weekday_text.map((day, index) => (
          <p key={index} className="mb-1">
            <strong>{day.split(':')[0]}:</strong> {day.split(':')[1]}
          </p>
        )) 
      : 'No opening hours available';
  
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded shadow-lg w-96">
          {showSignUp ? (
            <>
              <h2 className="text-xl font-bold mb-4">Sign Up</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Your name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Your email"
                  />
                </div>
                {/* Button Group with Flexbox */}
                <div className="flex space-x-4 mt-4">
                  <Button
                    type="button"
                    className="text-white p-2 rounded"
                    href="/shelterWishlist"
                    onClick={() => setShowSignUp(false)}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <>
              {shelter && (
                <>
                  <h2 className="text-xl font-bold mb-4">{shelter.name}</h2>
                  <p className="mb-2"><strong>Address:</strong> {shelter.formatted_address}</p>
                  <p className="mb-2"><strong>Phone:</strong> {shelter.formatted_phone_number}</p>
                  <p className="mb-2"><strong>Website:</strong> <a href={shelter.website} target="_blank" rel="noopener noreferrer">{shelter.website}</a></p>
                  <p className="mb-2"><strong>Rating:</strong> {shelter.rating}</p>
                  <p className="mb-2"><strong>Total User Ratings:</strong> {shelter.user_ratings_total}</p>
                  <div className="mb-2">
                    <strong>Opening Hours:</strong>
                    {Array.isArray(openingHoursText) ? (
                      openingHoursText
                    ) : (
                      <p>{openingHoursText}</p>
                    )}
                  </div>
                </>
              )}
              <Button
                onClick={() => setShowSignUp(true)}
                className="mt-4 text-white p-2 rounded"
              >
                Sign Up
              </Button>
            </>
          )}
          {/* Wrap buttons in flex container for spacing */}
          <div className="flex space-x-4 mt-4">
            <Button onClick={onClose} className="text-white p-2 rounded">
              Close
            </Button>
          </div>
        </div>
      </div>
    );
  };

export default Modal;
