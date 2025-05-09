'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fatchBook } from '../redux/slices/allBooksSlice';
import Card from '../common/Card';
import FilterSection from '../common/FilterSection';
import { RiBookShelfFill } from "react-icons/ri";
import { IoFilter } from "react-icons/io5";

const Page = () => {
  const dispatch = useDispatch();
  const [booksData, setBooksData] = useState([]);
  const [filePath, setFilePath] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  const books = useSelector((state) => state.allBooks.value);

  useEffect(() => {
    dispatch(fatchBook());
  }, [dispatch]);

  useEffect(() => {
    if (books.data) setBooksData(books.data);
    setFilePath(books.filepath);
  }, [books]);

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 flex justify-center items-center gap-2">
            All Books <RiBookShelfFill className="text-indigo-600" />
          </h1>
          <p className="text-gray-500 mt-2">Browse our curated library for your next favorite read.</p>
        </div>

        {/* Mobile filter toggle */}
        <div className="lg:hidden flex justify-end mb-4">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 bg-white border border-indigo-500 text-indigo-600 px-4 py-2 rounded-md shadow-sm"
          >
            <IoFilter className="text-xl" />
            <span>{showFilter ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter sidebar */}
          <aside
            className={`lg:block ${showFilter ? 'block' : 'hidden'} w-full lg:w-1/4 bg-white shadow rounded-lg p-4`}
          >
            <FilterSection />
          </aside>

          {/* Book grid */}
          <section className="w-full mx-auto ">
            {booksData.length > 0 ? (
              <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  ">
                {booksData.map((product, index) => (
                  <Card key={index} product={product} filePath={filePath} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 text-lg mt-10">No books found.</div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default Page;
