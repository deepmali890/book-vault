'use client';
import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards";
import { Cover } from "../components/ui/cover";
import { SiAudiobookshelf } from "react-icons/si";
import { ImBlog } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { fatchBlog } from "../redux/slices/blogSlice";

const Blog = () => {

    const dispatch = useDispatch();
    const [blogData, setBlogData] = useState([]);

    const blogs = useSelector((state) => state.blog.value);

    useEffect(() => {
        dispatch(fatchBlog());
    }, [dispatch]);

    useEffect(() => {
        if (blogs.data) setBlogData(blogs.data);
    }, [blogs]);

    return (
        <div>
            {/* Heading */}
            <h3 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center font-medium'>
                <Cover className="mx-auto flex gap-4">
                    Blogs <ImBlog />
                </Cover>
            </h3>

            {/* Infinite Moving Cards Section */}
            <div className="my-10 md:my-20 rounded-md flex flex-col items-center justify-center relative overflow-hidden">
                <InfiniteMovingCards
                    blogData={blogData}
                    direction="right"
                    speed="slow"
                />
            </div>
        </div>
    );
};

export default Blog;


const testimonials = [
    {
        quote:
            "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
        name: "Charles Dickens",
        title: "A Tale of Two Cities",
    },
    {
        quote:
            "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
        name: "William Shakespeare",
        title: "Hamlet",
    },
    {
        quote: "All that we see or seem is but a dream within a dream.",
        name: "Edgar Allan Poe",
        title: "A Dream Within a Dream",
    },
    {
        quote:
            "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
        name: "Jane Austen",
        title: "Pride and Prejudice",
    },
    {
        quote:
            "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
        name: "Herman Melville",
        title: "Moby-Dick",
    },
];
