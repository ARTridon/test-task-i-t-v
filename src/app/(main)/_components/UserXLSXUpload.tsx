import { type ChangeEvent, useRef } from 'react'

import * as XLSX from 'xlsx'

import { Upload } from 'lucide-react'

import { useUploadXLSXAction } from '@/hooks/useXLSXAction'

import { Button } from '@/components/ui/button'

type SheetDataType = Array<{
  Name: string
  Email: string
  'Created At': string
}>

export const UserXLSXUpload = () => {
  const ref = useRef<HTMLInputElement>(null)
  const { mutate } = useUploadXLSXAction({
    successfullyCallback: () => {
      if (ref.current) {
        ref.current.value = ''
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
