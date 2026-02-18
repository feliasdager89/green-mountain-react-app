import React from 'react'

export default function Card({ title, description, onClick }: { title: string; description: string; onClick?: () => void }) {
  return (
    <div 
        className="bg-white rounded-xl shadow-md overflow-hidden
        hover:shadow-xl hover:scale-[1.02]
        transition cursor-pointer" 
        onClick={onClick} 
        >
      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {title}
        </h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}
