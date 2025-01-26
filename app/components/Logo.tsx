import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Logo: React.FC = () => {
  return (
    <Link href="/" passHref>
      <div className="flex justify-center md:justify-start items-center cursor-pointer">
        <Image
          src="/ssLogo.png" 
          alt="Shelter Seek Logo"
          className="w-36 md:w-48 lg:w-56"
          width={200}  
          height={200} 
          layout="intrinsic" 
        />
      </div>
    </Link>
  );
};

export default Logo;


