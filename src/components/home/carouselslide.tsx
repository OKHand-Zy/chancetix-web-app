'use client';
import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/Shadcn/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/Shadcn/carousel";

const images = [
    "/images/activity_img/Null.png", 
    "/images/activity_img/Null.png",
    "/images/activity_img/Null.png",
    "/images/activity_img/Null.png",
    "/images/activity_img/Null.png",
];

export default function CarouselSlide() {
    const [activeIndex, setActiveIndex] = useState(0);
    const nextSlide = () => {
        setActiveIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setActiveIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="w-full lg:max-w-5xl mx-auto max-w-full max-h-full" >
            <Carousel className="relative w-full max-w-full max-h-full">
                <CarouselContent
                    style={{
                        transform: `translateX(-${activeIndex * 100}%)`,
                        transition: "transform 0.5s ease-in-out",
                    }}
                >
                {images.map((image, index) => (
                    <CarouselItem key={index} className="max-w-full max-h-full">
                        <div className="p-1 max-w-full max-h-full flex items-center justify-center">
                            <Card>
                            <CardContent className="aspect-banner ">
                                <Image className="w-auto h-auto object-contain mt-5"
                                    src={image}
                                    alt={`Slide ${index + 1}`}
                                    width={512} 
                                    height={288} 
                                    priority={true}
                                />
                            </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
                </CarouselContent>
                <CarouselPrevious onClick={prevSlide} />
                <CarouselNext onClick={nextSlide} />
            </Carousel>
            
            <div className="flex justify-center mt-4">
                {images.map((_, index) => (
                <span
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-4 h-4 mx-2 cursor-pointer rounded-full ${index === activeIndex ? "bg-red-600" : "bg-blue-600"
                    }`}
                ></span>
                ))}
            </div>

        </div> 
    );
}

/*
Carouselsilde
ref : https://frontendshape.com/post/how-to-use-carousel-slider-in-shadcn-ui-with-nextjs
*/