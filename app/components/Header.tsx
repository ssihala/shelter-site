'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Button from '../ui/Button'
import cn from 'clsx'

const tabBarItems = [
    {
        key: 'home',
        label: 'Home',
        href: '/'
    },
    {
        key: 'wishlist',
        label: 'Wish List',
        href: '/wishlist'
    },
    { 
        key: 'contact',
        label: 'Contact',
        href: '/contact'
    },
]

export const Header = () => {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const isHomepage = pathname === '/'

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const closeMenu = () => {
        setIsOpen(false)
    }

    return (
        <header
            className={cn(
                'sticky top-0 z-50 w-full font-poppins font-medium shadow-md',
                {
                    'bg-black text-white': isHomepage,
                    'bg-white text-black': !isHomepage,
                }
            )}
        >
            <nav className="relative flex h-16 items-center justify-between px-4 py-3 md:px-8">
                {/* Desktop Navigation */}
                <div className="flex items-center gap-4 ml-auto">
                    {/* Tab Bar */}
                    <div className="flex items-center gap-6">
                        {tabBarItems.map((item) => {
                            const isSelected = pathname === item.href
                            return (
                                <Link
                                    key={item.key}
                                    href={item.href}
                                    className={cn(
                                        'tab-item',
                                        { 'selected': isSelected },
                                        'text-white' 
                                    )}
                                    onClick={closeMenu}
                                >
                                    {item.label}
                                </Link>
                            )
                        })}
                    </div>

                    {/* Log In Button */}
                    <Link href="/login">
                        <Button variant="contained" color="primary">
                            Log In
                        </Button>
                    </Link>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden flex items-center gap-4">
                    <button
                        onClick={toggleMenu}
                        className="focus:outline-none text-xl"
                    >
                        {isOpen ? '✖' : '☰'}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div
                        className={cn(
                            'absolute top-0 right-0 z-10 w-full bg-white shadow-md p-4 rounded-lg',
                            { 'block': isOpen }
                        )}
                    >
                        <div className="flex flex-col gap-4">
                            {tabBarItems.map((item) => {
                                const isSelected = pathname === item.href
                                return (
                                    <Link
                                        key={item.key}
                                        href={item.href}
                                        className={`tab-item ${isSelected ? 'selected' : ''}`}
                                        onClick={closeMenu}
                                    >
                                        {item.label}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Header
