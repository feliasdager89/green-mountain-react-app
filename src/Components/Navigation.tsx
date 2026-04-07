import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../auth/AuthContext';

export default function Navigation() { 
 const navigate = useNavigate();
 const { isAuthenticated, logout, user } = useAuth();
 const [profileOpen, setProfileOpen] = useState(false);
 const [mobileOpen, setMobileOpen] = useState(false);

  const closeMenus = () => {
    setProfileOpen(false);
    setMobileOpen(false);
  };

  const navItems = isAuthenticated
    ? ([
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Listings', to: '/listings' },
        { label: 'Profile', to: '/profile' },
      ] as const)
    : ([
        { label: 'Login', to: '/login' },
        { label: 'Register', to: '/register' },
      ] as const);

  const handleLogout = () => {
    logout();
    closeMenus();
    navigate("/login", { replace: true });
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'px-3 py-2 rounded-md text-sm font-medium',
      isActive
        ? 'bg-gray-900 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
    ].join(' ');

  return (
    <nav className="fixed right-0 left-0 top-0 bg-gray-800 z-50">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <div className="flex items-center ">
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
                  {isAuthenticated ? (
                    <>
                      <div className="border-b border-gray-700 px-4 py-3 text-sm text-gray-300">
                        <p className="font-medium text-white">
                          {user ? `${user.first_name} ${user.last_name}` : "Signed in"}
                        </p>
                        <p className="truncate text-xs text-gray-400">{user?.email}</p>
                      </div>

                      <NavLink
                        to="/profile"
                        onClick={closeMenus}
                        className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700"
                      >
                        Your Profile
                      </NavLink>

                      <NavLink
                        to="/dashboard"
                        onClick={closeMenus}
                        className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700"
                      >
                        Dashboard
                      </NavLink>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="block w-full cursor-pointer px-4 py-2 text-left text-gray-300 hover:bg-gray-700"
                      >
                        Sign out
                      </button>
                    </>
                  ) : (
                    <>
                      <NavLink
                        to="/login"
                        onClick={closeMenus}
                        className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700"
                      >
                        Login
                      </NavLink>

                      <NavLink
                        to="/register"
                        onClick={closeMenus}
                        className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700"
                      >
                        Register
                      </NavLink>
                    </>
                  )}

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
