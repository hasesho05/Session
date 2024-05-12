'use client'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { ref, onChildAdded, remove } from 'firebase/database'
import { db } from '../libs/firebase'
import { SubmitDialog } from '@/components/room/SubmitDialog'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { QrCodeDialog } from '@/components/room/QrCodeDialog'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface Session {
  id: string
  username: string
  instruments: string[]
  song: string
  note: string
  timestamp: number
}

const Room: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([])
  const pathname = usePathname()
  const roomId = pathname ? pathname.split('/').pop() : ''
  const sessionsWrapper = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!roomId) return

    const roomSessionsRef = ref(db, `rooms/${roomId}/sessions`)
    const unsubscribeSessions = onChildAdded(roomSessionsRef, (snapshot) => {
      const session = {
        id: snapshot.key,
        ...snapshot.val(),
      }
      setSessions((prev) => [...prev, session])
    })

    return () => {
      unsubscribeSessions()
    }
  }, [roomId])

  useEffect(() => {
    const newSession = sessionsWrapper.current?.lastElementChild
    if (newSession) {
      gsap.fromTo(
        newSession,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      )
    }
  }, [sessions])

  const handleDeleteSession = (sessionId: string) => {
    if (!roomId) return
    const sessionRef = ref(db, `rooms/${roomId}/sessions/${sessionId}`)
    remove(sessionRef)
      .then(() => {
        gsap.to(`#session-${sessionId}`, {
          x: -500,
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            setSessions((prev) => prev.filter((session) => session.id !== sessionId))
          },
        })
      })
      .catch((error) => {
        console.error('Error removing session: ', error)
      })
  }

  useGSAP(() => {
    gsap.to('.session', {
      delay: 0.2,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.05,
      y: 0,
    })
  }, [sessions])

  return (
    <div className='container mx-auto py-8 max-w-xl'>
      <div>
        <div className=''>
          <div className='space-y-8' ref={sessionsWrapper}>
            {sessions.map((session, index) => (
              <div key={session.id} id={`session-${session.id}`} className='border-b pb-4 session'>
                <div className='flex flex-col md:flex-row md:items-center mb-2'>
                  <span className='text-xl font-bold mb-2 md:mb-0 md:mr-2'>{session.song}</span>
                  {index === 0 && (
                    <div className='flex ml-auto gap-2'>
                      <Button variant='secondary' size='sm' className='text-xs h-5'>
                        演奏中
                      </Button>
                      <Button
                        variant='destructive'
                        size='sm'
                        className='text-xs h-5'
                        onClick={() => handleDeleteSession(session.id)}
                      >
                        演奏終了
                      </Button>
                    </div>
                  )}
                  {index === 1 && (
                    <Button
                      variant='secondary'
                      size='sm'
                      className='ml-auto text-xs h-5'
                      onClick={() => handleDeleteSession(session.id)}
                    >
                      Next
                    </Button>
                  )}
                </div>
                <div className='flex flex-wrap items-center mb-2 -mx-1'>
                  {session.instruments?.map((instrument) => (
                    <Button
                      variant={'outline'}
                      key={instrument}
                      className='bg-white rounded-full p-2 m-1'
                    >
                      <Image
                        src={`/Icons/${instrument}.png`}
                        alt={instrument}
                        width={24}
                        height={24}
                      />
                    </Button>
                  ))}
                </div>
                <p className='text-md mb-1 '>{session.username}</p>
                <p className='text-gray-500'>{session.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <QrCodeDialog />
        <SubmitDialog />
      </div>
    </div>
  )
}

export default Room
