'use client'
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { Carousel, Card } from "../components/ui/apple-cards-carousel";
import { SiAudiobookshelf } from "react-icons/si";
import { Cover } from '../components/ui/cover';
import { FcIdea } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { fatchSlider } from '../redux/slices/sliderSlice';


const Audio = () => {

  const [sliderData, setSliderData] = useState([])
  const [filepath, setFilepath] = useState('')

  const dispatch = useDispatch()

  const sliders = useSelector((state) => state.slider.value)
  // console.log(sliders)


  useEffect(() => {
    dispatch(fatchSlider())
  }, [dispatch])

  useEffect(() => {
    if (sliders.data) setSliderData(sliders.data)
      if(sliders.data) setFilepath(sliders.filepath)

  }, [sliders])

  // console.log('sliderData',sliderData)

  const cards = sliderData.map((card, index) => (
    <Card key={filepath + card.thumbnail} card={card} index={index} filepath={filepath} />
  ));
  return (
    <div>
      <div className="w-full h-full py-20">
        <h3 className=' sm:text-2xl lg:text-7xl text-center font-medium'><Cover className="mx-auto flex gap-4"> Where Ideas Come to Life <FcIdea /> </Cover></h3>


        <Carousel items={cards} filepath={filepath} />
      </div>
    </div>
  )
}

export default Audio


// const data = [
//   {
//     category: "Artificial Intelligence",
//     title: "You can do more with AI.",
//     src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     category: "Productivity",
//     title: "Enhance your productivity.",
//     src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     category: "Product",
//     title: "Launching the new Apple Vision Pro.",
//     src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },

//   {
//     category: "Product",
//     title: "Maps for your iPhone 15 Pro Max.",
//     src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     category: "iOS",
//     title: "Photography just got better.",
//     src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     category: "Hiring",
//     title: "Hiring for a Staff Software Engineer",
//     src: "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
// ];
