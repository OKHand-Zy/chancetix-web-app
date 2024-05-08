'use client';
import React, { useCallback, useEffect, useRef } from 'react'
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType
} from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import Image from 'next/image'
import Link from 'next/link';
import {
  Card,
  CardHeader, 
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from '@/components/ui/Shadcn/card';
import { Badge } from '@/components/ui/Shadcn/badge';

const TWEEN_FACTOR_BASE = 0.84

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max)

interface AcSlide {
  images: string;
  ArtName: string;
  AcName: string;
  url: string;
  badges: string[];
}

type PropType = {
  slides: number[]
  AcSlide: AcSlide[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, AcSlide } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const tweenFactor = useRef(0)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
  }, [])

  const tweenOpacity = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine()
      const scrollProgress = emblaApi.scrollProgress()
      const slidesInView = emblaApi.slidesInView()
      const isScrollEvent = eventName === 'scroll'

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress
        const slidesInSnap = engine.slideRegistry[snapIndex]

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target()

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target)

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress)
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress)
                }
              }
            })
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
          const opacity = numberWithinRange(tweenValue, 0, 1).toString()
          emblaApi.slideNodes()[slideIndex].style.opacity = opacity
        })
      })
    },
    []
  )

  useEffect(() => {
    if (!emblaApi) return

    setTweenFactor(emblaApi)
    tweenOpacity(emblaApi)
    emblaApi
      .on('reInit', setTweenFactor)
      .on('reInit', tweenOpacity)
      .on('scroll', tweenOpacity)
  }, [emblaApi, tweenOpacity])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index, slideIndex) => (
            <div className="embla__slide" key={index}>
              <Card>
                <CardHeader className="p-4">
                  <Image
                      className="embla__slide__img"
                      src={AcSlide[slideIndex].images}
                      alt="Your alt text"
                      width={512}
                      height={288}
                    />
                </CardHeader>
                <CardContent className="aspect-banner">
                  <CardTitle className="text-xl font-semibold">
                    {AcSlide[slideIndex].ArtName}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-xl">
                      <Link href={AcSlide[slideIndex].url}>
                        {AcSlide[slideIndex].AcName}
                      </Link> 
                  </CardDescription>
                </CardContent>
                <CardFooter className='flex space-x-2 p-6 bg-gray-100 rounded'>
                  {AcSlide[slideIndex].badges.map((badge_tag, index) => (
                      <span key={index}>
                        <Badge>
                          {badge_tag}
                        </Badge>
                      </span>
                  ))}
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        </div>
          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <DotButton 
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={'embla__dot '.concat(
                  index === selectedIndex ? 'embla__dot--selected' : ''
                )}
              />
            ))}
          </div>
        <div className="embla__buttons">
          <NextButton 
            onClick={onNextButtonClick} 
            disabled={nextBtnDisabled} 
          />
        </div>
      </div>

    </div>
  )
}

export default EmblaCarousel
