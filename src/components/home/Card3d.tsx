'use client';

import Image from 'next/image';
import logo from '@/assets/geminiFightLink.png';

const Card3d = () => {
  return (
    <div className="hover-3d">
      {/* content */}
      <figure className="max-w-200 rounded-2xl flex items-center justify-center">
        <Image
          src={logo}
          alt="Fight Link 3D Card"
          priority
          className="object-contain"
        />
      </figure>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Card3d;
