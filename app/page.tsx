'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'
import Link from 'next/link'
import { Press_Start_2P } from 'next/font/google';

const arcadeFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function Home() {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')

      if (error) {
        console.error('Erreur Supabase:', error)
      } else {
        setProducts(data)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center mt-[1cm]">
        <div className="flex gap-12">
          <Link 
            href="/shop" 
            className="relative w-[200px] h-[60px] hover:opacity-80 transition-transform duration-200 hover:scale-105 flex items-center justify-center"
          >
            <div 
              className={`${arcadeFont.className} text-2xl`} 
              style={{ 
                color: '#ffcdf0',
                textShadow: '2px 2px 0px #ff1493, -2px -2px 0px #ffcdf0, 4px 4px 0px rgba(0,0,0,0.2)',
                letterSpacing: '2px',
                transform: 'rotate(-2deg)'
              }}
            >
              SHOP
            </div>
          </Link>
          <Link 
            href="/shop-irl" 
            className="relative w-[200px] h-[60px] hover:opacity-80 transition-transform duration-200 hover:scale-105 flex items-center justify-center"
          >
            <div 
              className={`${arcadeFont.className} text-2xl`} 
              style={{ 
                color: '#ffcdf0',
                textShadow: '2px 2px 0px #ff1493, -2px -2px 0px #ffcdf0, 4px 4px 0px rgba(0,0,0,0.2)',
                letterSpacing: '2px',
                transform: 'rotate(-2deg)'
              }}
            >
              SHOP IRL
            </div>
          </Link>
          <Link 
            href="/contact" 
            className="relative w-[200px] h-[60px] hover:opacity-80 transition-transform duration-200 hover:scale-105 flex items-center justify-center"
          >
            <div 
              className={`${arcadeFont.className} text-2xl`} 
              style={{ 
                color: '#ffcdf0',
                textShadow: '2px 2px 0px #ff1493, -2px -2px 0px #ffcdf0, 4px 4px 0px rgba(0,0,0,0.2)',
                letterSpacing: '2px',
                transform: 'rotate(-2deg)'
              }}
            >
              CONTACT
            </div>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative">
        {/* Image Grid */}
        <div className="grid grid-cols-12 gap-0">
          {/* Première section - Grande image */}
          <div className="col-span-12 relative h-[100vh]">
            <Image
              src="/img_17.jpg"
              alt="Image 17"
              fill
              className="object-cover"
              priority
              loading="eager"
              sizes="100vw"
              quality={100}
            />
            {/* Logo Edel centré sur le rideau */}
            <div className="fixed top-1/2 left-[15%] -translate-x-1/2 -translate-y-1/2 -mt-[3cm] z-20 flex justify-center items-center w-[220px] h-[220px]">
              <Image
                src="/logo_edel.png"
                alt="Logo Edel"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* Deuxième section - Deux images */}
          <div className="col-span-6 relative h-[100vh]">
            <Image
              src="/img_13.jpg"
              alt="Image 13"
              fill
              className="object-cover"
              priority
              loading="eager"
              sizes="50vw"
              quality={100}
            />
          </div>
          <div className="col-span-6 relative h-[100vh]">
            <Image
              src="/img_14.jpg"
              alt="Image 14"
              fill
              className="object-cover"
              priority
              loading="eager"
              sizes="50vw"
              quality={100}
            />
          </div>

          {/* Troisième section - Grande image */}
          <div className="col-span-12 relative h-[100vh]">
            <Image
              src="/img_15.jpg"
              alt="Image 15"
              fill
              className="object-cover"
              sizes="100vw"
              quality={95}
            />
          </div>

          {/* Quatrième section - Grande image */}
          <div className="col-span-12 relative h-[100vh]">
            <Image
              src="/img_18.jpg"
              alt="Image 18"
              fill
              className="object-cover"
              sizes="100vw"
              quality={95}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
