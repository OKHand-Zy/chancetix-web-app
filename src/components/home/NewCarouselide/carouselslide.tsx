"use client";
import React from 'react'
import EmblaCarousel from './EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'
//import './css/base.css'
import './css/embla.css'

const OPTIONS: EmblaOptionsType = { loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export default function NewCarouselSlide() {
  const images = [
    '/images/activity_img/avenue.jpg',
    '/images/activity_img/boat.jpg',
    '/images/activity_img/Null.png',
    '/images/activity_img/cat.jpg',
    '/images/activity_img/rocks.jpg',
  ];

  return (
    <>
      <EmblaCarousel slides={SLIDES} options={OPTIONS} images={images} />
    </>
  )
}

// Ref: https://codesandbox.io/p/sandbox/embla-carousel-opacity-react-crqqpr?file=%2Fsrc%2Fjs%2FEmblaCarousel.tsx%3A21%2C19
// Ref: https://www.embla-carousel.com/examples/predefined/#opacity
