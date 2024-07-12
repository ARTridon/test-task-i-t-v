'use client'

import { type Dispatch, type ReactNode, type SetStateAction } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

type DialogWrapperPropsType = {
  children?: ReactNode
  title: string
  description?: string
  btnSubmit: ReactNode
  btnTrigger: ReactNode
  btnClose?: ReactNode
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const DialogWrapper = ({
  children,
  title,
  description,
  btnSubmit,
  btnTrigger,
  btnClose,
  open,
  setOpen,
}: DialogWrapperPropsType) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{btnTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>

          {!!description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {!!children && <>{children}</>}
        <DialogFooter>
          {!!btnSubmit && <>{btnSubmit}</>}
          {!!btnClose ? (
            <>{btnClose}</>
          ) : (
            <Button type="button" variant="secondary">
              Close
            </Button>
          )}

          <DialogClose asChild></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
