import React from 'react'
import EmblaCarousel from './EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'
//import './css/base.css'
import './css/embla.css'

const OPTIONS: EmblaOptionsType = { loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export default function NewCarouselSlide() {
  const AcSlide = [
    {
      images: '/images/activity_img/Null.png',
      ArtName: 'Art1',
      AcName: 'Ac1',
      url: '/Ac1',
      badges: ['Now','VIP'],
    },
    {
      images: '/images/activity_img/Null.png',
      ArtName: 'Art2',
      AcName: 'Ac2',
      url: '/Ac2',
      badges: ['Now'],
    },
    {
      images: '/images/activity_img/Null.png',
      ArtName: 'Art3',
      AcName: 'Ac3',
      url: '/Ac3',
      badges: ['Now','VIP'],
    },
    {
      images: '/images/activity_img/Null.png',
      ArtName: 'Art4',
      AcName: 'Ac4',
      url: '/Ac4',
      badges: ['VIP'],
    },
    {
      images: '/images/activity_img/Null.png',
      ArtName: 'Art5',
      AcName: 'Ac5',
      url: '/Ac5',
      badges: [],
    }
  ]

  return (
    <>
      <EmblaCarousel slides={SLIDES} options={OPTIONS} AcSlide={AcSlide} />
    </>
  )
}

// Ref: https://codesandbox.io/p/sandbox/embla-carousel-opacity-react-crqqpr?file=%2Fsrc%2Fjs%2FEmblaCarousel.tsx%3A21%2C19
// Ref: https://www.embla-carousel.com/examples/predefined/#opacity
