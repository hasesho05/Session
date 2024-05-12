import Image from 'next/image'
import RoomInputForm from './_components/Root/RootInputForm'
import { Button } from '@/components/ui/button'
import Hero from './_components/Hero'

const Home = () => {
  return (
    <>
      <Hero />
      <div className='container mx-auto px-4 py-20'>
        <div className='max-w-3xl mx-auto text-center'>
          <h2 className='text-3xl font-bold mb-8'>Join a Music Room</h2>
          <p className='text-xl text-gray-500 mb-8'>
            Enter the Room ID below to join a music session and start playing together with others.
          </p>
          <div className='mb-8'>
            <RoomInputForm />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
