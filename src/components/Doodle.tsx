import React, { useRef, useEffect } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import roboData from '../../assets/.aistudio/robo.json';

interface DoodleProps {
  className?: string;
}

export default function Doodle({ className = "w-full h-full" }: DoodleProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.9);
    }
  }, []);

  const handleMouseEnter = () => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(1.8);
    }
  };

  const handleMouseLeave = () => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.9);
    }
  };

  return (
    <div 
      className={`${className} flex items-center justify-center overflow-hidden cursor-pointer`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={roboData}
        loop={true}
        autoplay={true}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

