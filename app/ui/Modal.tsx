import React, { useState } from 'react';
import Button from './Button';

interface ShelterInfo {
  name: string;
  formatted_address: string;
  formatted_phone_number: string;
  website: string;
  place_id: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  shelter: ShelterInfo | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, shelter }) => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  
  const handleSubmission = async (email: string, password: string, place_id: string|undefined) => {
    console.log("Json:", { email, password, place_id });
    try {
      const response = await fetch('/api/authenticate/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, param_place_id: place_id }),
      });
      const data = await response.json();
      console.log('Sign up response:', data);
      setShowSignUp(false);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  }
    
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg w-96">
        {showSignUp ? (
          <>
            <h2 className="text-xl font-bold mb-4">Sign Up</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}  
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button
                type="button"
                className=" text-white p-2 rounded"
                onClick={() => handleSubmission(email,password,shelter?.place_id)}
              >
                Submit
              </Button>
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
        <Button onClick={onClose} className="mt-10 text-white p-2 rounded">
          Close
        </Button>
      </div>
    </div>
  );
};

export default Modal;