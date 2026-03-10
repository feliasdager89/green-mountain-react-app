import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React from 'react'

export default function Search() {
  return (
    <div className= "w-full max-w-md min-w-[200px]">
        <div className="relative">
            <input
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border
                 border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none 
                 focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Search..."
            />
            <MagnifyingGlassIcon className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2
                 bg-blue-600 text-white px-4 py-2 rounded-r-md
                 hover:bg-blue-700 transition duration-300 ease"
                 type="button"
            >
                Search
            </button>
        </div>
      
    </div>
  )
}
