'use client'
import React from 'react'
import footerlogo from '../../../public/White_Book_Store_Minimalist_Logo__3_-removebg-preview.png'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className="bg-[#1A1D2B] text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
                    
                    {/* Logo and Description */}
                    <div className="space-y-4">
                        <Link href="/">
                            <div className="flex items-center space-x-2 text-2xl font-semibold text-white">
                                <Image src={footerlogo} alt="Logo" width={64} height={64} className="w-16" />
                                <span>Book Vault</span>
                            </div>
                        </Link>
                        <p className="max-w-sm text-sm text-gray-400">
                            Discover knowledge and stories with our vast collection of books curated for every reader.
                        </p>
                        <div className="flex space-x-4">
                            {/* LinkedIn */}
                            <a href="#" className="hover:text-white">
                                <span className="sr-only">LinkedIn</span>
                                <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
                                    <path d="..." />
                                </svg>
                            </a>
                            {/* Twitter */}
                            <a href="#" className="hover:text-white">
                                <span className="sr-only">Twitter</span>
                                <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
                                    <path d="..." />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Our Solutions */}
                    <div className="md:col-span-1">
                        <h3 className="text-md font-semibold text-white mb-4">Our Solutions</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/aiplatform" className="hover:text-white">AI Platform</Link></li>
                            <li><Link href="/aialgorithms" className="hover:text-white">AI Algorithms</Link></li>
                            <li><Link href="/industryapplications" className="hover:text-white">Industry Applications</Link></li>
                        </ul>
                    </div>

                    {/* Resources and Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-md font-semibold text-white mb-4">Resources</h3>
                            <ul className="space-y-3 text-sm">
                                <li><Link href="/pages/subscription-page" className="hover:text-white">Pricing</Link></li>
                                <li><Link href="/pages/blog" className="hover:text-white">Blog</Link></li>
                                <li><Link href="/casestudies" className="hover:text-white">Case Studies</Link></li>
                                <li><Link href="/pages/team-page" className="hover:text-white">Terms of Service</Link></li>
                                <li><Link href="/pages/privacy-page" className="hover:text-white">Privacy Policy</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-md font-semibold text-white mb-4">Company</h3>
                            <ul className="space-y-3 text-sm">
                                <li><Link href="/pages/about" className="hover:text-white">About Us</Link></li>
                                <li><Link href="/pages/contact" className="hover:text-white">Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
                    © 2024 Book Vault. Crafted with <span className="text-white">♥</span> by AI enthusiasts at <a href="/" className="text-white hover:underline">AIOps</a>.
                </div>
            </div>
        </footer>
    )
}

export default Footer
