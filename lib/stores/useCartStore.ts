import { create } from "zustand"
import { persist } from "zustand/middleware"

type CartItem = {
  id: number
  title: string
  price: number
  quantity: number
  image: string
}

type CartState = {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item, quantity = 1) => {
        const existing = get().items.find(i => i.id === item.id)
        if (existing) {
          set({
            items: get().items.map(i =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          })
        } else {
          set({
            items: [...get().items, { ...item, quantity }],
          })
        }
      },

      removeFromCart: id => {
        set({
          items: get().items.filter(i => i.id !== id),
        })
      },

      clearCart: () => {
        set({ items: [] })
      },

      totalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce((total, item) => total + item.quantity * item.price, 0),
    }),
    {
      name: "cart-storage", // nom dans localStorage
    }
  )
) 