import { api } from '@/trpc/react'
import { Upload } from 'lucide-react'
import { toast } from 'sonner'
import * as XLSX from 'xlsx'

import { useRouter } from 'next/navigation'

import { type ChangeEvent, useRef } from 'react'

import { Button } from '@/components/ui/button'

type SheetDataType = Array<{
  Name: string
  Email: string
  'Created At': string
}>

export const UserXLSXUpload = () => {
  const ref = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { mutate } = api.user.uploadXLSX.useMutation({
    onSuccess: ({ message }) => {
      console.log(message)

      if (message === 'Users uploaded successfully') {
        toast.success(message)
        if (ref.current) {
          ref.current.value = ''
        }
        router.refresh()
      }
    },
  })

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    if (target.files) {
      const file = target.files[0]!

      const reader = new FileReader()

      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          const workbook = XLSX.read(event.target.result, { type: 'binary' })
          const sheetName = workbook.SheetNames[0]
          const sheet = workbook.Sheets[sheetName!]
          const sheetData = XLSX.utils.sheet_to_json(sheet!) as SheetDataType
          const data = sheetData.map((user) => ({
            name: user.Name,
            email: user.Email,
            created_at: user['Created At'] as unknown as Date,
          }))
          mutate(data)
        }
      }

      reader.readAsBinaryString(file)
    }
  }

  return (
    <Button className="relative flex items-center justify-between gap-1" variant="outline">
      <input
        ref={ref}
        className="absolute inset-0 opacity-0"
        type="file"
        onChange={handleFileUpload}
      />
      <Upload />
      Upload XLSX
    </Button>
  )
}
