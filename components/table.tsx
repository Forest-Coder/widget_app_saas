"use client";
import React from 'react'
import { ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft } from 'lucide-react'
import Ratings from './ratings';

import {
  Column,
  ColumnDef,
  PaginationState,
  Table as TanstackTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { InferSelectModel } from "drizzle-orm";
import { feedbacks } from "@/db/schema";
import { Input } from './ui/input';

type Feedback = InferSelectModel<typeof feedbacks>;

export default function Table(props: { data: Feedback[] }) {
  // const rerender = React.useReducer(() => ({}), {})[1]

  const columns = React.useMemo<ColumnDef<Feedback>[]>(
    () => [
      {
        accessorKey: 'userName',
        header: 'Name',
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.userEmail,
        id: 'userEmail',
        cell: info => info.getValue(),
        header: () => <span>Email</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.rating,
        id: 'rating',
        cell: info => info.getValue() === null ? <span>N/A</span> : <Ratings rating={info.getValue() as number} count={5} />,
        header: () => <span>Rating</span>,
        footer: props => props.column.id,
      },
      {
        accessorKey: 'message',
        header: () => 'Message',
        footer: props => props.column.id,
        size: 400,
        minSize: 200,
        maxSize: 600,
      }
    ],
    []
  )



  return (
    <>
      <MyTable
        {...{
          data: props.data,
          columns,
        }}
      />
    </>
  )
}

function MyTable({
  data,
  columns,
}: {
  data: Feedback[]
  columns: ColumnDef<Feedback>[]
}) {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const totalFeedback = data.length

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  })

  if (totalFeedback == 0){
    return (
      <div className='flex items-center justify-center text-3xl font-bold text-center my-4'>
        No Feedback yet
      </div>
    )
  }
  return (
    <div className="p-2 ">
      <div className="h-2" />
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="border-b ">
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} className="text-left    p-4" colSpan={header.colSpan}>
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: ' ⬆',
                        desc: ' ⬇',
                      }[header.column.getIsSorted() as string] ?? null}
                      {header.column.getCanFilter() ? (
                        <div className="mt-6">
                          <Filter column={header.column} table={table} />
                        </div>
                      ) : null}
                    </div>
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td key={cell.id} className="p-4 border-b" style={{
                      width: cell.column.getSize(),
                    }}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {/* TODO Conditional render below */}
      <div className="flex items-center gap-2 mt-5">
        <button
          className="border rounded p-1  cursor-pointer"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronsLeft />
        </button>
        <button
          className="border rounded p-1  cursor-pointer"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft />
        </button>
        <button
          className="border rounded p-1  cursor-pointer"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight />
        </button>
        <button
          className="border rounded p-1  cursor-pointer"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronsRight />
        </button>
        <span className="flex items-center gap-1">
          | Go to page:
          <Input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

function Filter({
  column,
  table,
}: {
  column: Column<any, any>
  table: TanstackTable<any>
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  return typeof firstValue === 'number' ? (
    <div className="flex space-x-2" onClick={e => e.stopPropagation()}>
      <Input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={e =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ])
        }
        placeholder={`  Min`}
        className="w-24 border shadow rounded "
      />
      <Input
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={e =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ])
        }
        placeholder={`  Max`}
        className="w-24 border shadow rounded"
      />
    </div>
  ) : (
    <Input
      onChange={e => column.setFilterValue(e.target.value)}
      onClick={e => e.stopPropagation()}
      placeholder={`Search...`}
      type="text"
      value={(columnFilterValue ?? '') as string}
    />
  )
}
