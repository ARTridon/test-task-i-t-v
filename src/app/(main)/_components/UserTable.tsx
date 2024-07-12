'use client'

import { UserCreateAndUpdateDialog } from '@/app/(main)/_components/UserCreateAndUpdateDialog'
import { UserDeleteDialog } from '@/app/(main)/_components/UserDeleteDialog'
import { UserXLSXUpload } from '@/app/(main)/_components/UserXLSXUpload'
import { type UserSchemaType } from '@/schemas/user-schema'
import { Pencil, Trash } from 'lucide-react'

import { useEffect, useState } from 'react'

import {
  type ColumnDef,
  type ColumnFiltersState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import dayjs from 'dayjs'

import { TableColumnHeader } from '@/components/table-helpers/TableColumnHeader'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { UserDeleteAll } from './UserDeleteAll'

type UserTablePropsType = {
  users: UserSchemaType[]
}

export const UserTable = ({ users }: UserTablePropsType) => {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const [data, setData] = useState<UserSchemaType[]>([])

  const columns: ColumnDef<UserSchemaType>[] = [
    {
      accessorKey: 'name',
      header: () => <TableColumnHeader title="Name" />,
      cell: ({ row }) => <div className="w-[80px]">{row.getValue('name')}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'email',
      header: () => <TableColumnHeader title="Email" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('email')}</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'createdAt',
      header: () => <TableColumnHeader title="Created At" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('createdAt')}</span>
          </div>
        )
      },
    },

    {
      id: 'actions',
      header: () => <TableColumnHeader title="Action" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <UserCreateAndUpdateDialog title="Create User" defaultValues={row.original}>
            <Button className="cursor-pointer" variant="ghost" size={'icon'} asChild>
              <Pencil />
            </Button>
          </UserCreateAndUpdateDialog>
          <UserDeleteDialog id={row.original.id!} name={row.original.name}>
            <Button className="cursor-pointer text-red-600" variant="ghost" size={'icon'} asChild>
              <Trash />
            </Button>
          </UserDeleteDialog>
        </div>
      ),
    },
  ]

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: {
        pageSize: data.length,
        pageIndex: 0,
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  useEffect(() => {
    if (users) {
      const data = users?.map((user) => ({
        ...user,
        createdAt: dayjs(user.created_at).format('YYYY-MM-DD'),
      }))
      setData(data)
    }
  }, [users])
  return (
    <section className="h-screen max-h-screen space-y-4 p-3">
      <div className="flex w-full items-center justify-end gap-x-3">
        <UserCreateAndUpdateDialog title="Create User">
          <Button variant="default">Create New</Button>
        </UserCreateAndUpdateDialog>
        <UserXLSXUpload />

        <UserDeleteAll />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  User Not Found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}
