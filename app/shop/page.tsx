'use client'

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Press_Start_2P } from 'next/font/google';
import Link from "next/link";
import Image from "next/image";
import ProductCard from '@/app/components/ProductCard';

const arcadeFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

// Type pour les produits
type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  images: { url: string; order: number }[];
};

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Requête sécurisée : suppression du tri sur "order" dans products
        const { data: products, error } = await supabase
          .from("products")
          .select(`
            *,
            product_images (
              url,
              order
            )
          `)
          .order('id', { ascending: true }); // Tri simple sur id uniquement
        
        if (error) {
          console.error("Erreur Supabase détaillée :", error);
          setError(`Erreur lors du chargement des produits : ${error.message}`);
          return;
        }

        if (!products || products.length === 0) {
          setProducts([]);
          return;
        }

        // Mapping sécurisé : on trie les images uniquement si elles existent
        const mappedProducts = products.map((p) => ({
          ...p,
          images: Array.isArray(p.product_images)
            ? p.product_images
                .filter((img: any) => img && typeof img.url === 'string')
                .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
            : [],
        }));
        
        setProducts(mappedProducts);
      } catch (err) {
        console.error("Erreur lors de la récupération des produits:", err);
        setError(`Erreur inattendue : ${err instanceof Error ? err.message : 'Erreur inconnue'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className={`${arcadeFont.className} text-pink-500`}>Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className={`${arcadeFont.className} text-red-500 text-center px-4`}>
          <div>Erreur:</div>
          <div className="text-sm mt-2">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className={`${arcadeFont.className} text-pink-500 text-center`}>
          <div>Aucun produit trouvé</div>
          <Link 
            href="/" 
            className="mt-4 inline-block px-4 py-2 bg-pink-500 text-black rounded hover:bg-pink-600"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

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

      {/* Grille de produits */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
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