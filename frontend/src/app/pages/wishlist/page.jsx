'use client'
import React from 'react'

const page = () => {
  return (
  <>
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4 transform transition duration-500 ease-in-out hover:scale-105">
          <img
            src="/placeholder.svg"
            alt="Product Image"
            width={200}
            height={200}
            className="aspect-square object-cover w-full rounded-lg overflow-hidden"
          />
          <h2 className="text-lg font-bold mt-2">Product Name</h2>
          <p className="text-gray-500">$99.99</p>
          <div className="flex justify-between items-center mt-4">
            <button size="sm">Add to Cart</button>
            <button size="sm" variant="outline">
              Remove from Wishlist
            </button>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 transform transition duration-500 ease-in-out hover:scale-105">
          <img
            src="/placeholder.svg"
            alt="Product Image"
            width={200}
            height={200}
            className="aspect-square object-cover w-full rounded-lg overflow-hidden"
          />
          <h2 className="text-lg font-bold mt-2">Product Name</h2>
          <p className="text-gray-500">$99.99</p>
          <div className="flex justify-between items-center mt-4">
            <button size="sm">Add to Cart</button>
            <button size="sm" variant="outline">
              Remove from Wishlist
            </button>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 transform transition duration-500 ease-in-out hover:scale-105">
          <img
            src="/placeholder.svg"
            alt="Product Image"
            width={200}
            height={200}
            className="aspect-square object-cover w-full rounded-lg overflow-hidden"
          />
          <h2 className="text-lg font-bold mt-2">Product Name</h2>
          <p className="text-gray-500">$99.99</p>
          <div className="flex gap-6 justify-between text-white items-center mt-4">
            <button className=' bg-black px-2 rounded-lg py-2'>Add to Cart</button>
            <button className=' bg-black px-2 rounded-lg py-2'>
              Remove from Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default page
