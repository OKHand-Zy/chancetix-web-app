"use client";
import React, { useState } from 'react';
import {Button} from "@/components/ui/Shadcn/button";
import {Card} from '@/components/ui/Shadcn/card';
import { useSpring, animated } from 'react-spring';

interface AnimatedButtonProps {
  children: React.ReactNode;
  className?: string;
  showGoTo?: boolean;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, className, showGoTo = false }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const goToSpring = useSpring({
    opacity: isHovered ? 1 : 0,
    transform: isHovered ? 'translateY(0px)' : 'translateY(20px)',
  });

  return (
    <Button
      variant="ghost"
      className={`${className} relative overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <animated.div>
        {children}
      </animated.div>
      {showGoTo && (
        <animated.div 
          style={goToSpring} 
          className="absolute top-24 left-12 text-5xl font-bold"
        >
          Go To
        </animated.div>
      )}
    </Button>
  );
};


const Home: React.FC = () => {

  return (
  <div
    className="relative w-screen h-screen bg-cover bg-center flex items-center justify-center"
    style={{ backgroundImage: 'url(/images/home-banner.jpg)' }}
  >
    <Card className="w-2/3 h-auto p-10 bg-gray-300 bg-opacity-85 rounded-lg shadow-lg">
      <div className="text-4xl font-bold mb-8">Welcome to ChanceTix!</div>
      <div className="flex flex-row items-center justify-center space-x-4 w-full">
        <AnimatedButton className="text-4xl font-bold w-96 h-96 hover:bg-orange-300" showGoTo>
          TicketStore
        </AnimatedButton>
        <div className="border-l-4 border-solid h-96 border-black"></div>
        <AnimatedButton className="text-4xl font-bold w-96 h-96 hover:bg-orange-300" showGoTo>
          TicketTrade
        </AnimatedButton>
      </div>
    </Card>
  </div>
  );
};

export default Home;
