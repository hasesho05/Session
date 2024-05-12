'use client'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { usePathname } from 'next/navigation'
import TooltipButton from '../ui/tooltipButton'
import QRCode from 'react-qr-code'
import { QrCodeIcon } from 'lucide-react'

export function QrCodeDialog() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const roomId = pathname ? pathname.split('/').pop() : ''
  const qrCodeUrl = `https://session-livid.vercel.app/${roomId}`

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <TooltipButton
            onClick={() => setOpen(true)}
            className='fixed bottom-10 border-gray-200 rounded-full left-10 md:left-48'
            message='QRコードを表示する'
          >
            <QrCodeIcon />
          </TooltipButton>
        </DialogTrigger>

        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>QRコード</DialogTitle>
            <DialogDescription>
              このQRコードを読み取ると、現在のルームURLにアクセスできます。
            </DialogDescription>
          </DialogHeader>
          <div className='flex justify-center mt-4'>
            <QRCode value={qrCodeUrl} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
