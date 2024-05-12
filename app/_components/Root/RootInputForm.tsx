'use client'

import React, { useState } from 'react'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const RoomInputForm: React.FC = () => {
  const [roomId, setRoomId] = useState('')
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (roomId.trim() !== '') {
      router.push(`/${roomId}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex w-full max-w-sm items-center space-x-2 mx-auto'>
        <Input placeholder='roomId' onChange={(e) => setRoomId(e.target.value)} />
        <Button type='submit'>Join room</Button>
      </div>
    </form>
  )
}

export default RoomInputForm
