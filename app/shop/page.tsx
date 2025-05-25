import Image from "next/image";
import Link from "next/link";
import { Press_Start_2P } from 'next/font/google';

const arcadeFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

// Exemple de données de vêtements avec les images 1 à 11
const clothes = [
  {
    id: 1,
    name: "Robe Noire Satinée",
    price: "89.99€",
    image: "/img_1.jpg"
  },
  {
    id: 2,
    name: "Ensemble Hiver",
    price: "129.99€",
    image: "/img_2.jpg"
  },
  {
    id: 3,
    name: "Robe Courte Volants",
    price: "79.99€",
    image: "/img_3.jpg"
  },
  {
    id: 4,
    name: "Robe Longue Fluide",
    price: "99.99€",
    image: "/img_4.jpg"
  },
  {
    id: 5,
    name: "Ensemble Casual Chic",
    price: "149.99€",
    image: "/img_5.jpg"
  },
  {
    id: 6,
    name: "Robe de Soirée",
    price: "159.99€",
    image: "/img_6.jpg"
  },
  {
    id: 7,
    name: "Ensemble Rock",
    price: "119.99€",
    image: "/img_7.jpg"
  }
];

export default function ShopPage() {
  return (
    <div className="min-h-screen relative bg-white">
      {/* Image de fond */}
      <div className="fixed inset-0 z-0 opacity-80">
        <Image
          src="/logo_edel.png"
          alt="Logo Edel"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* En-tête */}
      <header className="py-8 relative z-10">
        <h1 
          className={`${arcadeFont.className} text-center text-2xl`}
          style={{ 
            color: '#ffcdf0',
            textShadow: '2px 2px 0px #ff1493, -2px -2px 0px #ffcdf0, 4px 4px 0px rgba(0,0,0,0.2)',
            letterSpacing: '2px',
            transform: 'rotate(-2deg)'
          }}
        >
          BOUTIQUE
        </h1>
      </header>

      {/* Grille de vêtements */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clothes.map((item) => (
            <div key={item.id} className="group relative flex flex-col h-full">
              {/* Image du vêtement */}
              <div className="w-full aspect-[3/4] relative overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  priority={item.id <= 3}
                  loading={item.id <= 3 ? "eager" : "lazy"}
                  quality={75}
                />
              </div>
              
              {/* Informations du vêtement */}
              <div className={`${arcadeFont.className} mt-4 space-y-4 flex-grow`}>
                <h3 
                  className="text-sm"
                  style={{ 
                    color: '#ffcdf0',
                    textShadow: '1px 1px 0px #ff1493, -1px -1px 0px #ffcdf0, 2px 2px 0px rgba(0,0,0,0.2)',
                    letterSpacing: '1px',
                    transform: 'rotate(-1deg)'
                  }}
                >
                  {item.name}
                </h3>
                <p 
                  className="text-sm"
                  style={{ 
                    color: '#ffcdf0',
                    textShadow: '1px 1px 0px #ff1493, -1px -1px 0px #ffcdf0, 2px 2px 0px rgba(0,0,0,0.2)',
                    letterSpacing: '1px',
                    transform: 'rotate(-1deg)'
                  }}
                >
                  {item.price}
                </p>
                
                {/* Bouton Ajouter au panier */}
                <button 
                  className={`${arcadeFont.className} w-full bg-[#ffcdf0] hover:bg-[#ffcdf0]/80 text-white text-base py-4 px-6 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-[#ffcdf0]/50`}
                  style={{
                    textShadow: '1px 1px 0px rgba(0,0,0,0.2)',
                    letterSpacing: '1px',
                    transform: 'rotate(-1deg)'
                  }}
                >
                  AJOUTER AU PANIER
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Retour à l'accueil */}
      <div className="fixed bottom-8 right-8">
        <Link 
          href="/"
          className={`${arcadeFont.className} text-sm`}
          style={{ 
            color: '#ffcdf0',
            textShadow: '2px 2px 0px #ff1493, -2px -2px 0px #ffcdf0, 4px 4px 0px rgba(0,0,0,0.2)',
            letterSpacing: '2px',
            transform: 'rotate(-2deg)'
          }}
        >
          RETOUR
        </Link>
      </div>
    </div>
  );
} 