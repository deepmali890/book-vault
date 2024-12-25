import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Cover } from '../components/ui/cover';
import { GiSecretBook } from 'react-icons/gi';
import Card from '../common/Card';
import { fatchBook } from '../redux/slices/allBooksSlice';
import { useDispatch, useSelector } from 'react-redux';

const RecentViewBook = () => {

    const dispatch = useDispatch()

  const [recentlyViewedBooks, setRecentlyViewedBooks] = useState([]);
   const [filepath, setFilePath] = useState('')

  useEffect(() => {
    // Fetch the recently viewed books from localStorage
    const savedBooks = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    setRecentlyViewedBooks(savedBooks);  // Update the state with the fetched books
  }, []); // Only run once when the component mounts


  const books = useSelector((state) => state.allBooks.value)



  useEffect(() => {
    dispatch(fatchBook())
  }, [dispatch])

  useEffect(() => {

    setFilePath(books.filepath)
  }, [books])


  const settings = {
    dots: false,               // Displays navigation dots below the slider
    infinite: true,            // Enables infinite loop for slides
    speed: 500,                // Duration of transition between slides
    slidesToShow: 5,           // Number of slides to show at once
    slidesToScroll: 1,         // Number of slides to scroll at a time
    autoPlay: true,            // Enables autoplay for the slider
    autoplaySpeed: 1000,       // Speed of autoplay transition
    pauseOnHover: true,        // Pauses autoplay when hovering
    arrows: true,              // Displays arrows for manual control
    responsive: [              // Responsive settings for different screen sizes
      {
        breakpoint: 1024, // For screens smaller than 1024px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 600, // For screens smaller than 600px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <>
     {recentlyViewedBooks.length > 0 && (
           <div>
           <section className='max-w-[1460px] mx-auto py-[50px]'>
             <h3 className='text-6xl text-center font-medium'>
               <Cover className='mx-auto flex items-center gap-4'>
                 Recently Viewed <GiSecretBook />
               </Cover>
             </h3>
             <div className='my-10'>
               <Slider {...settings} className='gap-4'>
                 {
                     recentlyViewedBooks.map((book, index) => (
                         <Card key={index} product={book} filePath={filepath}/>
                     ))
                 }
                
               </Slider>
             </div>
           </section>
         </div>
     )}
    </>
 
  );
};

export default RecentViewBook;
