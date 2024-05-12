'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { ref, push } from 'firebase/database'
import { db } from '@/app/libs/firebase'
import { usePathname } from 'next/navigation'
import { toast } from '../ui/use-toast'
import { Check, ChevronsUpDown, PlusIcon } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useSongSuggestions } from '@/app/libs/hooks/useSongSuggestions'
import { CommandList } from 'cmdk'
import TooltipButton from '../ui/tooltipButton'

export function SubmitDialog() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const roomId = pathname ? pathname.split('/').pop() : ''
  const [selectedInstruments, setSelectedInstruments] = React.useState<string[]>([])
  const [username, setUsername] = React.useState('')

  const [note, setNote] = React.useState('')
  const instruments = ['vocal', 'guitar', 'electric-guitar', 'bass', 'piano', 'drums']

  const { song, setSong, songSuggestions, isLoading, isError } = useSongSuggestions()

  const handleInstrumentClick = (instrument: string) => {
    const index = selectedInstruments.indexOf(instrument)
    if (index === -1) {
      setSelectedInstruments([...selectedInstruments, instrument])
    } else {
      setSelectedInstruments(selectedInstruments.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!username.trim()) {
      toast({ description: 'Please enter a username' })
      return
    }

    if (selectedInstruments.length === 0) {
      toast({ description: 'Please select at least one instrument' })
      return
    }

    if (!song.trim()) {
      toast({ description: 'Please select a song' })
      return
    }

    const sessionData = {
      username,
      instruments: selectedInstruments,
      song,
      note,
      timestamp: Date.now(),
    }
    const roomRef = ref(db, `rooms/${roomId}/sessions`)
    push(roomRef, sessionData)
    setOpen(false)
    toast({ description: '演奏順に追加されました！' })
    setUsername('')
    setSelectedInstruments([])
    setSong('')
    setNote('')
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <TooltipButton
            onClick={() => setOpen(true)}
            className='fixed bottom-10 border-gray-200 rounded-full right-10 md:right-48'
            message='演奏順に追加する'
          >
            <PlusIcon />
          </TooltipButton>
        </DialogTrigger>

        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>演奏順に追加</DialogTitle>
            <DialogDescription>下記を入力すると演奏順に追加されます</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className={'items-start gap-4 sm:max-w-[425px] mt-2'}>
            <Label htmlFor='instruments'>楽器</Label>
            <div className='flex justify-center space-x-1'>
              {instruments.map((instrument) => (
                <button
                  key={instrument}
                  type='button'
                  className={`rounded-full p-2 ${
                    selectedInstruments.includes(instrument) ? 'bg-white' : 'bg-gray-500'
                  }`}
                  onClick={() => handleInstrumentClick(instrument)}
                >
                  <Image src={`/Icons/${instrument}.png`} alt={instrument} width={40} height={40} />
                </button>
              ))}
            </div>
            <div className='gap-2 mt-2'>
              <Label htmlFor='username'>名前</Label>
              <Input
                id='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete='off'
              />
            </div>
            <div className='gap-2 mt-2'>
              <Label htmlFor='song'>演奏する曲</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <div className='relative w-full'>
                    <Input
                      id='song'
                      value={song}
                      onChange={(e) => setSong(e.target.value)}
                      placeholder='曲のタイトルを検索'
                      className='pr-10'
                      autoComplete='off'
                    />
                    <ChevronsUpDown className='absolute right-2 top-2.5 h-4 w-4 shrink-0 opacity-50' />
                  </div>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0'>
                  <Command>
                    <CommandEmpty>No song found.</CommandEmpty>
                    <CommandGroup>
                      <CommandList>
                        {!isLoading &&
                          songSuggestions?.map((suggestion) => (
                            <CommandItem
                              key={suggestion.trackId}
                              value={`${suggestion.trackName} - ${suggestion.artistName}`}
                              onSelect={(currentValue) => {
                                setSong(currentValue)
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  song === suggestion.trackName ? 'opacity-100' : 'opacity-0',
                                )}
                              />
                              {suggestion.trackName} - {suggestion.artistName}
                            </CommandItem>
                          ))}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className='gap-2 mt-2'>
              <Label htmlFor='note'>コメント</Label>
              <Input
                id='note'
                placeholder='ex 歌ってくれる人いませんか？'
                value={note}
                onChange={(e) => setNote(e.target.value)}
                autoComplete='off'
              />
            </div>
            <Button type='submit' className=' mt-4'>
              送信する
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
