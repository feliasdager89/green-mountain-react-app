import React from 'react'

export default function Listings() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">
        Patient Listings
      </h1>
    <div className="bg-white rounded-xl shadow-md p-6
        hover:shadow-xl hover:scale-[1.02]
        transition cursor-pointer
        flex flex-col justify-between
        min-h-[180px]">
      
    {/* Headline */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Elderly patient seeking assistance with daily activities
        </h2>
    {/* Date */}
        <p className="text-sm text-gray-500">
          /// Date Posted ///
        </p>

     {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">

        {["Tag1", "Tag2", "Tag3"].map((tag, index) => (
          <span
            key={index}
            className="
              bg-blue-100 text-blue-700
              text-xs font-medium
              px-3 py-1 rounded-full
            "
          >
            {tag}
          </span>
        ))}

      </div>

      </div>
    </div>
      
    </div>
  )
}
