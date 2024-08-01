"use client"; // Make sure this is the first line

import React, { useState } from "react";
import {
  HomeIcon,
  PlusCircleIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { Modal } from "../components/Modal";
console.log("Modal:", Modal);
import "./globals.css"; // Import your global styles here

const Layout = ({ children }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSave = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log("Product added");
    closeModal();
  };

  return (
    <html lang="en">
      <body className="flex h-screen bg-gray-100 font-sans">
        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <header className="bg-gray-900 shadow-md p-4 flex items-center justify-between border-b border-gray-800">
            {/* Left section (Dashboard and Products) */}
            <div className="flex space-x-4">
              <a
                href="/"
                className="text-gray-100 hover:text-white transition-colors duration-300 flex items-center space-x-2"
              >
                <HomeIcon className="h-6 w-6" />
                <span className="hidden md:inline">Dashboard</span>
              </a>
              <a
                href="/products"
                className="text-gray-100 hover:text-white transition-colors duration-300 flex items-center space-x-2"
              >
                {/* <ArchiveBoxIcon className="h-6 w-6" /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
                <span className="hidden md:inline">Products</span>
              </a>
            </div>

            {/* Center section (Searchbar) */}
            <div className="relative flex-grow max-w-lg mx-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full border border-gray-700 rounded-full py-2 px-4 pl-10 bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <SearchIcon className="absolute inset-y-0 left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>

            {/* Right section (Add Product) */}
            <button
              onClick={openModal}
              className="text-gray-100 hover:text-white transition-colors duration-300 flex items-center space-x-2 bg-gray-800 py-2 px-4 rounded-full"
            >
              <PlusCircleIcon className="h-6 w-6" />
              <span className="hidden md:inline">Add Product</span>
            </button>
          </header>

          {/* Content */}
          <main className="p-6 flex-1 bg-gray-50">{children}</main>
        </div>

        {/* Modal for adding product */}
        <Modal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
      </body>
    </html>
  );
};

export default Layout;
