import React from 'react';
// @ts-expect-error - static asset import
import customLogo from '../../assets/.aistudio/logo.png';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "w-full h-full" }: LogoProps) {
  return (
    <img
      src={customLogo}
      alt="NuAspect Logo"
      referrerPolicy="no-referrer"
      className={`${className} object-contain select-none`}
    />
  );
}
