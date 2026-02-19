
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline'

export default function Navigation() { 
 const [profileOpen, setProfileOpen] = useState(false);
 const [mobileOpen, setMobileOpen] = useState(false);

  const closeMenus = () => {
    setProfileOpen(false);
    setMobileOpen(false);
  };

  const navItems = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Listings', to: '/listings' },
    { label: 'Profile', to: '/profile' },
  ] as const;

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'px-3 py-2 rounded-md text-sm font-medium',
      isActive
        ? 'bg-gray-900 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
    ].join(' ');

  return (
    <nav className="relative bg-gray-800">

      <div className="mx-auto max-w-7xl px-6">

        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" onClick={closeMenus} className="flex items-center">
              <img
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
                alt="Green Mountain"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex space-x-4">

            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={navLinkClass}
                onClick={closeMenus}
              >
                {item.label}
              </NavLink>
            ))}

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

                  <NavLink
                    to="/profile"
                    onClick={closeMenus}
                    className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700"
                  >
                    Your Profile
                  </NavLink>

                  <NavLink
                    to="/profile"
                    onClick={closeMenus}
                    className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700"
                  >
                    Settings
                  </NavLink>

                  <NavLink
                    to="/login"
                    onClick={closeMenus}
                    className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700"
                  >
                    Sign out
                  </NavLink>

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

          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  'block px-3 py-2 rounded-md text-base font-medium',
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                ].join(' ')
              }
              onClick={closeMenus}
            >
              {item.label}
            </NavLink>
          ))}

        </div>
      )}

    </nav>
  );
}

