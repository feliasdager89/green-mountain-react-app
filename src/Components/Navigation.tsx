
//import { Link } from 'react-router' 
import { useState } from 'react' 
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline'

export default function Navigation() { 
 const [profileOpen, setProfileOpen] = useState(false);
 const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="relative bg-gray-800">

      <div className="mx-auto max-w-7xl px-6">

        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <div className="flex items-center">
            <img
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              className="h-8 w-auto"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex space-x-4">

            <a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
              Dashboard
            </a>

            <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
              Posts
            </a>

            <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
              Activities
            </a>

          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">

            {/* Notification */}
            <button className="text-gray-400 hover:text-white">
              <BellIcon className="h-6 w-6" />
            </button>

            {/* Profile */}
            <div className="relative">

              <button
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <UserCircleIcon className="h-8 w-8 rounded-full cursor-pointer"/>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg">

                  <button className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700">
                    Your Profile
                  </button>

                  <button className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700">
                    Settings
                  </button>

                  <button className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700">
                    Sign out
                  </button>

                </div>
              )}

            </div>

            {/* Mobile menu button */}
            <button
              className="sm:hidden text-gray-400"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              ☰
            </button>

          </div>

        </div>

      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="sm:hidden px-6 pb-4 space-y-2">

          <div className="text-white">Dashboard</div>
          <div className="text-gray-300">Team</div>
          <div className="text-gray-300">Projects</div>

        </div>
      )}

    </nav>
  );
}

