'use client'

import Image from "next/image";
import Link from "next/link";
import { Press_Start_2P } from 'next/font/google';

const arcadeFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function ShopIRLClient() {
  return (
    <div className="relative min-h-screen">
      {/* Image de fond fixe */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/img_16.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>

      {/* Contenu superposé */}
      <div className="relative z-10 min-h-screen bg-black/20">
        <div className="container mx-auto px-4 py-16">
          <h1 
            className={`${arcadeFont.className} text-center text-4xl mb-12`}
            style={{ 
              color: '#ffcdf0',
              textShadow: '2px 2px 0px #ff1493, -2px -2px 0px #ffcdf0, 4px 4px 0px rgba(0,0,0,0.2)',
              letterSpacing: '2px',
              transform: 'rotate(-2deg)'
            }}
          >
            SHOP IRL
          </h1>

          <div className="text-center mb-12">
            <div className="relative inline-block group">
              <a 
                href="https://www.instagram.com/drm.unit/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className={`${arcadeFont.className} text-xl cursor-pointer transition-all duration-300 inline-block relative hover-scale-130`}
                style={{ 
                  color: '#ffcdf0',
                  textShadow: '1px 1px 0px #ff1493, -1px -1px 0px #ffcdf0, 2px 2px 0px rgba(0,0,0,0.2)',
                  letterSpacing: '1px'
                }}>
                Dream unit - Amsterdam
              </a>
              
              {/* Flèche gauche - se déplace vers l'extérieur */}
              <span 
                className={`${arcadeFont.className} absolute top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-x-2 text-lg`}
                style={{ 
                  left: '-2rem',
                  color: '#ffcdf0',
                  textShadow: '1px 1px 0px #ff1493, -1px -1px 0px #ffcdf0, 2px 2px 0px rgba(0,0,0,0.2)'
                }}
              >
                ←
              </span>
              
              {/* Flèche droite - se déplace vers l'extérieur */}
              <span 
                className={`${arcadeFont.className} absolute top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-2 text-lg`}
                style={{ 
                  right: '-2rem',
                  color: '#ffcdf0',
                  textShadow: '1px 1px 0px #ff1493, -1px -1px 0px #ffcdf0, 2px 2px 0px rgba(0,0,0,0.2)'
                }}
              >
                →
              </span>
            </div>
          </div>

          {/* Contenu à venir - Espace pour les photos et informations */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Espace réservé pour les photos de la boutique et les informations */}
          </div>
        </div>

        {/* Bouton Retour */}
        <div className="fixed bottom-8 right-8">
          <Link 
            href="/"
            className={`${arcadeFont.className} text-[#ffcdf0] text-sm hover:text-[#ffcdf0]/80 transition-colors`}
          >
            RETOUR
          </Link>
        </div>
      </div>

      {/* CSS personnalisé pour l'animation hover */}
      <style jsx>{`
        .hover-scale-130:hover {
          transform: scale(1.3);
        }
      `}</style>
    </div>
  );
} 