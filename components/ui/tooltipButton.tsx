'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { Button } from './button'
import { PlusIcon } from 'lucide-react'

type Props = {
  children: React.ReactNode
  className?: string
  onClick: () => void
  message?: string
}

const TooltipButton: React.FC<Props> = ({ className, children, onClick, message }) => {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <Button onClick={onClick} className={`${className}`} variant='outline'>
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent side='top'>{message}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default TooltipButton
