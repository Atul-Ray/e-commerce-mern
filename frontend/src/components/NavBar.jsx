import React from "react";
import { Link } from "react-router-dom";
import {ShoppingCart} from 'lucide-react'

function NavBar({ isAuthenticated, onLogout }) {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white text-lg font-bold">
              MyApp
            </Link>
          </div>

          <div className="hidden md:flex space-x-4">
            <Link to="/" className="text-gray-300 hover:text-white">
              Home
            </Link>
           
            <Link to="/cart" className="text-gray-300 hover:text-white">
              <ShoppingCart />
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-300 hover:text-white">
                  Dashboard
                </Link>
                <button
                  onClick={onLogout}
                  className="text-red-400 hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-white">
                  Login
                </Link>
                <Link to="/signup" className="text-gray-300 hover:text-white">
                  Register
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
