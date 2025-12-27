import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, loadFavorites, toggleFavorite } from '../store/slices/recipeSlice';

// Import temporaire du contexte Food (tant que Food n'est pas dans Redux)

export const useRecipes = () => {
  const dispatch = useDispatch();
  
  const { list: recipes, favorites, loading } = useSelector((state) => state.recipes);
  
  // 2. On récupère la nourriture (Soit via Contexte, soit via Redux plus tard)
  const foodToShow = useSelector((state) => state.food.foodToShow) || [];
  // SI TU PASSES FOOD EN REDUX, REMPLACE LA LIGNE CI-DESSUS PAR :
  // const { list: foodToShow } = useSelector((state) => state.food);

  useEffect(() => {
    if (recipes.length === 0) {
        dispatch(fetchRecipes());
    }
    dispatch(loadFavorites());
  }, [dispatch, recipes.length]);

  const handleToggleFavorite = (id) => dispatch(toggleFavorite(id));
  const refresh = () => dispatch(fetchRecipes());

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

  return {
    recipes,
    favorites,
    loading,
    refreshRecipes: refresh,
    toggleFavorite: handleToggleFavorite,
    calculateFeasibility
  };
};