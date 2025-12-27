import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config/config';
import { FoodContext } from './foodContext'; 

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    const { foodToShow } = useContext(FoodContext);

    useEffect(() => {
        refreshRecipes();
        loadFavorites();
    }, []);

    const refreshRecipes = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${BASE_URL}/recipe/all`);
            const data = await response.json();
            setRecipes(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des recettes:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadFavorites = async () => {
        try {
            const saved = await AsyncStorage.getItem('recipe_favorites');
            if (saved) setFavorites(JSON.parse(saved));
        } catch (e) {
            console.error("Erreur chargement favoris:", e);
        }
    };

    const toggleFavorite = async (recipeId) => {
        let newFavorites;
        if (favorites.includes(recipeId)) {
            newFavorites = favorites.filter(id => id !== recipeId);
        } else {
            newFavorites = [...favorites, recipeId];
        }
        
        setFavorites(newFavorites);
        await AsyncStorage.setItem('recipe_favorites', JSON.stringify(newFavorites));
    };

    const calculateFeasibility = useCallback((recipe) => {
        const ingredientsReq = recipe.ingredientamount_ingredientamount_recipeTorecipe || [];
        if (ingredientsReq.length === 0) return 0;
    
        let ownedCount = 0;
    
        ingredientsReq.forEach(req => {
            const userStock = foodToShow.filter(fs => fs.idFood === req.food);
            const totalQuantityOwned = userStock.reduce((sum, item) => sum + (item.quantity || 0), 0);
            if (totalQuantityOwned >= req.quantity) {
                ownedCount++;
            }
        });
    
        return Math.round((ownedCount / ingredientsReq.length) * 100);
    }, [foodToShow]);

    return (
        <RecipeContext.Provider value={{ 
            recipes, 
            favorites, 
            loading, 
            refreshRecipes, 
            toggleFavorite,
            calculateFeasibility 
        }}>
            {children}
        </RecipeContext.Provider>
    );
};

export default RecipeProvider;