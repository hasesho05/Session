'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import Autoplay from 'embla-carousel-autoplay'

import Image from 'next/image'
import React from 'react'

export default function Hero() {
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }))

  return (
    <section className='flex flex-col md:flex-row items-center justify-between py-15 px-4 md:px-8'>
      <div className='md:w-1/2 text-center md:text-left items-center flex flex-col'>
        <h1 className='text-4xl  text-center md:text-5xl font-bold mb-4'>
          Embrace the Music, Effortlessly!
        </h1>
        <p className='text-xl text-center  md:text-2xl text-gray-500'>
          Ever felt overwhelmed during music sessions?
        </p>
        <p className='text-xl  text-center md:text-2xl text-gray-500 mb-8'>
          Leave the hassle of coordination to us and start playing with ease!
        </p>
        <Button size='lg'>Get Started</Button>
      </div>
      <div className='md:w-1/2 mt-8 md:mt-0'>
        <Carousel
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            <CarouselItem>
              <div className='relative w-full h-96'>
                <Image
                  src='/root/guitar.png'
                  alt='Guitar'
                  fill
                  objectFit='contain'
                  className='w-full h-auto'
                />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className='relative w-full h-96'>
                <Image
                  src='/root/piano.png'
                  alt='Piano'
                  fill
                  objectFit='contain'
                  className='w-full h-auto'
                />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className='relative w-full h-96'>
                <Image
                  src='/root/base.png'
                  alt='Base'
                  fill
                  objectFit='contain'
                  className='w-full h-auto'
                />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className='relative w-full h-96'>
                <Image
                  src='/root/violin.png'
                  alt='Violin'
                  fill
                  objectFit='contain'
                  className='w-full h-auto'
                />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className='relative w-full h-96'>
                <Image
                  src='/root/drum.png'
                  alt='Drum'
                  fill
                  objectFit='contain'
                  className='w-full h-auto'
                />
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
