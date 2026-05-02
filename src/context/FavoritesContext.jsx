import { createContext, useState, useContext, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    // Try to get saved favorites from localStorage on initial load
    const saved = localStorage.getItem('travel_favorites');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('travel_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (destination) => {
    setFavorites((prev) => {
      const isFavorite = prev.some((fav) => fav.id === destination.id);
      if (isFavorite) {
        return prev.filter((fav) => fav.id !== destination.id);
      } else {
        return [...prev, destination];
      }
    });
  };

  const isFavorite = (id) => favorites.some((fav) => fav.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
