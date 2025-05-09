'use client'
import React from 'react'

const OutStory = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Text Content */}
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-snug">
              Building Stronger Communities through Collaboration and Empowerment
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              Through collaboration, diverse perspectives and strengths are leveraged to create inclusive environments where everyone has the opportunity to thrive. This approach not only fosters personal growth and achievement but also strengthens the fabric of society.
            </p>
            <div className="mt-4 flex justify-center lg:justify-start">
              <button className="px-5 py-3 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300">
                Explore All
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center lg:justify-end">
            <img
              className="w-full max-w-md rounded-3xl object-cover shadow-lg"
              src="https://pagedone.io/asset/uploads/1717751272.png"
              alt="About Us"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default OutStory
