'use client';

import Image from 'next/image';
import { useRef } from 'react';
import logo from '../../../public/V3_2.png';

const Card3d = () => {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 18}deg) rotateX(${-y * 18}deg) scale3d(1.04, 1.04, 1.04)`;
  }

  function onLeave() {
    if (ref.current) {
      ref.current.style.transform =
        'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
    }
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transition: 'transform 0.15s ease-out',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      className="cursor-pointer"
    >
      <Image
        src={logo}
        alt="Fight Link"
        loading="eager"
        className="object-contain select-none"
        style={{ filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.55))' }}
      />
    </div>
  );
};

export default Card3d;
