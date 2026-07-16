import React from 'react';
import doodleImage from '../../assets/Open Doodles - Doggie.png';

interface DoodleProps {
  className?: string;
}

export default function Doodle({ className = "w-full h-full" }: DoodleProps) {
  return (
    <div className={`${className} flex items-center justify-center overflow-hidden cursor-pointer`}>
      <img
        src={doodleImage}
        alt="Person with companion dog doodle"
        draggable={false}
        style={{ width: '100%', height: '100%' }}
        className="object-contain select-none"
      />
    </div>
  );
}

