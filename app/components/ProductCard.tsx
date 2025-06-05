import Image from "next/image"
import Link from "next/link"
import { Press_Start_2P } from 'next/font/google'
import { useState } from 'react'

const arcadeFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

type Product = {
  id: number
  title: string
  description: string
  price: number
  category: string
  quantity: number
  images: { url: string; order: number }[]
}

type ProductCardProps = {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const isOutOfStock = product.quantity === 0
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Trier les images par ordre et s'assurer qu'elles existent
  const sortedImages = product.images && Array.isArray(product.images) 
    ? [...product.images]
        .filter(img => img && typeof img.url === 'string')
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    : []
  
  // Réinitialiser l'index si nécessaire
  const safeCurrentIndex = Math.min(currentImageIndex, Math.max(0, sortedImages.length - 1))
  
  const nextImage = () => {
    if (sortedImages.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % sortedImages.length)
    }
  }
  
  const prevImage = () => {
    if (sortedImages.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + sortedImages.length) % sortedImages.length)
    }
  }

  // Fonction pour obtenir l'image courante de manière sécurisée
  const getCurrentImage = () => {
    if (sortedImages.length === 0) return null
    return sortedImages[safeCurrentIndex] || sortedImages[0]
  }

  const currentImage = getCurrentImage()

  return (
    <div
      key={product.id}
      className="group relative flex flex-col h-full border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      {/* Badge Rupture */}
      {isOutOfStock && (
        <span className="absolute z-10 top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          Rupture de stock
        </span>
      )}

      {/* Slider d'images avec flèches */}
      <div className="w-full aspect-[3/4] relative bg-gray-100">
        {currentImage ? (
          <>
            {/* Image courante */}
            <div className="w-full h-full relative overflow-hidden">
              <Image
                src={currentImage.url}
                alt={`${product.title} - Image ${safeCurrentIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                priority={product.id <= 3 && safeCurrentIndex === 0}
                loading={product.id <= 3 && safeCurrentIndex === 0 ? "eager" : "lazy"}
                quality={75}
                onError={(e) => {
                  console.error(`Erreur de chargement d'image pour le produit ${product.id}:`, currentImage.url)
                  // Optionnel : remplacer par une image par défaut
                  e.currentTarget.src = "/placeholder.jpg"
                }}
              />
            </div>
            
            {/* Flèches de navigation (uniquement si plusieurs images) */}
            {sortedImages.length > 1 && (
              <>
                {/* Flèche gauche */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 z-10"
                  aria-label="Image précédente"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                {/* Flèche droite */}
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 z-10"
                  aria-label="Image suivante"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {/* Indicateurs de points (optionnel) */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {sortedImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === safeCurrentIndex 
                          ? 'bg-white' 
                          : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                      }`}
                      aria-label={`Aller à l'image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
            Pas d'image disponible
          </div>
        )}
      </div>

      {/* Infos produit */}
      <div className={`flex flex-col gap-2 p-4 flex-grow ${arcadeFont.className}`}>
        <h3 
          className="text-sm"
          style={{ 
            color: '#ffcdf0',
            textShadow: '1px 1px 0px #ff1493, -1px -1px 0px #ffcdf0, 2px 2px 0px rgba(0,0,0,0.2)',
            letterSpacing: '1px',
            transform: 'rotate(-1deg)'
          }}
        >
          {product.title || 'Produit sans nom'}
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
          {typeof product.price === 'number' ? `${product.price}€` : 'Prix non disponible'}
        </p>
        {product.description && (
          <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
        )}
        {typeof product.quantity === "number" && !isOutOfStock && (
          <p className="text-xs text-gray-400">{product.quantity} en stock</p>
        )}

        {/* Actions */}
        <div className="mt-auto flex gap-2">
          <Link
            href={`/product/${product.id}`}
            className="w-full bg-[#ffcdf0] text-black text-xs px-3 py-2 rounded hover:scale-105 hover:brightness-105 transition-transform text-center"
          >
            VOIR
          </Link>
          {/* Future intégration panier ici */}
          {/* <button className="w-full bg-black text-white text-xs px-3 py-2 rounded">AJOUTER</button> */}
        </div>
      </div>
    </div>
  )
} 