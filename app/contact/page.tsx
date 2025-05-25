import Image from "next/image";
import Link from "next/link";
import { Press_Start_2P } from 'next/font/google';

const arcadeFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function ContactPage() {
  return (
    <div className="relative min-h-screen">
      {/* Infos contact en haut à droite */}
      <div className="absolute top-8 right-[-0.3cm] z-20 text-center mt-[1cm]">
        <div className={`${arcadeFont.className} text-[#ffcdf0] space-y-6 text-[70%] px-6 py-4`}>
          <div className="mb-8">
            <span className="underline text-[90%]">weisscouture@gmail.com</span>
          </div>
          <div className="mb-8">
            tél : <span className="underline">+32489923085</span>
          </div>
          <div className="mb-8">
            insta : <span className="underline">weisscouture</span>
          </div>
          {/* Logo Edel */}
          <div className="relative w-[150px] h-[150px] mx-auto mt-8">
            <Image
              src="/logo_edel.png"
              alt="Logo Edel"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>

      {/* Image de fond fixe */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/img_14.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={75}
        />
      </div>

      {/* Contenu superposé */}
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            <span 
              className={`${arcadeFont.className} text-2xl`}
              style={{ 
                color: '#ffcdf0',
                textShadow: '2px 2px 0px #ff1493, -2px -2px 0px #ffcdf0, 4px 4px 0px rgba(0,0,0,0.2)',
                letterSpacing: '2px',
                transform: 'rotate(-2deg)'
              }}
            >
              CONTACT
            </span>
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
    </div>
  );
} 