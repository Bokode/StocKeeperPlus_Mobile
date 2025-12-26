import { useState, useContext, useRef } from 'react';
import { Text, TouchableOpacity, View, ScrollView, Image, Dimensions, Modal } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
    faAngleLeft, 
    faClock, 
    faUserGroup, 
    faFire, 
    faBookmark as faBookmarkSolid 
} from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { FoodContext } from '../../../context/foodContext';
import { RecipeContext } from '../../../context/recipeContext';
import { BASE_URL } from '../../../config/config'; 
import ReadFood from '../../home/readFood/readFood';
import styles from "./readRecipe.style";

const ReadRecipe = ({ onClose, data }) => {
    // --- ÉTATS LOCAUX ---
    const [activeTab, setActiveTab] = useState('ingredients');
    const [showFoodDetail, setShowFoodDetail] = useState(false);
    const [selectedFoodData, setSelectedFoodData] = useState(null);

    // --- CONTEXTES ---
    // 1. FoodContext pour le stock (setFoodToShow pour les mises à jour)
    const { foodToShow, setFoodToShow } = useContext(FoodContext);
    
    // 2. RecipeContext pour les favoris et le calcul
    const { favorites, toggleFavorite, calculateFeasibility } = useContext(RecipeContext);

    // --- REFS & DIMENSIONS (Swipe) ---
    const scrollViewRef = useRef(null);
    const screenWidth = Dimensions.get('window').width;
    const contentWidth = screenWidth - 40;

    // --- VARIABLES ---
    const SERVER_URL = BASE_URL.slice(0, -3);
    const ingredientList = data?.ingredientamount_ingredientamount_recipeTorecipe || [];
    const isFavorite = favorites.includes(data.id);
    
    // On utilise le calcul centralisé (plus de useMemo compliqué ici !)
    const percentage = calculateFeasibility(data);

    // --- FONCTIONS UTILITAIRES ---
    const formatUnit = (unit) => {
        switch (unit?.toLowerCase()) {
            case 'gram': return 'g';
            case 'centiliter': return 'cl';
            case 'unit': return '';
            default: return unit || '';
        }
    };

    // --- GESTION SWIPE & TABS ---
    const handleTabPress = (tabName) => {
        setActiveTab(tabName);
        if (scrollViewRef.current) {
            const xOffset = tabName === 'ingredients' ? 0 : contentWidth;
            scrollViewRef.current.scrollTo({ x: xOffset, animated: true });
        }
    };

    const handleScrollEnd = (event) => {
        const xOffset = event.nativeEvent.contentOffset.x;
        const pageIndex = Math.round(xOffset / contentWidth);
        const newTab = pageIndex === 0 ? 'ingredients' : 'preparation';
        if (newTab !== activeTab) setActiveTab(newTab);
    };

    // --- GESTION MODAL FOOD (Update/Add depuis la recette) ---
    // Fonction pour rafraîchir le contexte Food (récupérée de Home logique)
    const refreshFoodContext = async () => {
        try {
            const [allFoodData, foodUserData] = await Promise.all([
                fetch(`${BASE_URL}/food/all`).then(res => res.json()),
                fetch(`${BASE_URL}/foodUser/me`).then(res => res.json())
            ]);
            
            const mergedFood = foodUserData.map(userFood => {
                const food = allFoodData.find(f => f.id === userFood.food);
                if (!food) return null;
                return {
                    idFood: food.id,
                    labelFood: food.label,
                    dietFood: food.diet,
                    nutriscoreFood: food.nutriscore,
                    measuringunit: food.measuringunit,
                    barcode: food.barcode,
                    imagepath: food.imagepath,
                    userMail: userFood.user_mail,
                    quantity: userFood.quantity,
                    storagetype: userFood.storagetype,
                    expirationdate: userFood.expirationdate,
                };
            }).filter(Boolean);
            
            setFoodToShow(mergedFood);
            // NOTE : Le pourcentage de la recette se mettra à jour tout seul 
            // grâce au RecipeContext qui écoute FoodContext !
        } catch (error) {
            console.error("Erreur refresh context:", error);
        }
    };

    const addFoodFromDB = (content) => {
        fetch(`${BASE_URL}/foodUser/me`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(content)
        })
        .then(() => refreshFoodContext())
        .catch(error => console.error(error));
    };
    
    const updateFoodFromDB = (content) => {
        fetch(`${BASE_URL}/foodUser/me`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(content)
        })
        .then(() => refreshFoodContext())
        .catch(error => console.error(error));
    };

    const handleIngredientPress = (userItems) => {
        if (userItems && userItems.length > 0) {
            setSelectedFoodData(userItems[0]);
            setShowFoodDetail(true);
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#4379de', '#9bb1deff']} style={styles.gradientHeader}>
                <View style={styles.navContainer}>
                    <View style={styles.navBar}>
                        <TouchableOpacity onPress={onClose} style={styles.navButton}>
                            <FontAwesomeIcon icon={faAngleLeft} size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navButton} onPress={() => toggleFavorite(data.id)}>
                            <FontAwesomeIcon 
                                icon={isFavorite ? faBookmarkSolid : faBookmarkRegular} 
                                size={24} 
                                color={isFavorite ? "#4379de" : "black"} 
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.scoreWrapper}>
                    <View style={styles.scoreCircle}>
                        <Text style={styles.scoreNumber}>{percentage}%</Text>
                        <Text style={styles.scoreLabel}>Faisable</Text>
                    </View>
                </View>
            </LinearGradient>

            <View style={styles.containerContent}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>{data.label}</Text>

                    <View style={styles.infoBlocksContainer}>
                        <View style={styles.infoBlock}>
                            <FontAwesomeIcon icon={faUserGroup} size={18} color="#4379de" />
                            <Text style={styles.infoBlockText}>{data.nbeaters || "/"} pers.</Text>
                        </View>
                        <View style={styles.infoBlock}>
                            <FontAwesomeIcon icon={faClock} size={18} color="#4379de" />
                            <Text style={styles.infoBlockText}>{data.timetomake || "/"} min</Text>
                        </View>
                        <View style={styles.infoBlock}>
                            <FontAwesomeIcon icon={faFire} size={18} color="#4379de" />
                            <Text style={styles.infoBlockText}>{data.caloricintake || "/"} Kcal</Text>
                        </View>
                    </View>

                    <View style={styles.tabContainer}>
                        <TouchableOpacity onPress={() => handleTabPress('ingredients')} style={[styles.tab, activeTab === 'ingredients' && styles.activeTab]}>
                            <Text style={[styles.tabText, activeTab === 'ingredients' && styles.activeTabText]}>Ingrédients</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleTabPress('preparation')} style={[styles.tab, activeTab === 'preparation' && styles.activeTab]}>
                            <Text style={[styles.tabText, activeTab === 'preparation' && styles.activeTabText]}>Préparation</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        ref={scrollViewRef}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={handleScrollEnd}
                        scrollEventThrottle={16}
                    >
                        {/* --- PAGE 1 : INGRÉDIENTS --- */}
                        <View style={{ width: contentWidth }}>
                             <View style={styles.ingredientsList}>
                                {ingredientList.length > 0 ? (
                                    ingredientList.map((item, index) => {
                                        const foodInfo = item.food_ingredientamount_foodTofood;
                                        const userItems = foodToShow.filter(fs => fs.idFood === item.food);
                                        const totalOwned = userItems.reduce((sum, fs) => sum + (fs.quantity || 0), 0);

                                        let statusColor = '#bb413b'; 
                                        if (totalOwned >= item.quantity) statusColor = '#76cc77';
                                        else if (totalOwned > 0) statusColor = '#f3ce60';

                                        const imagePath = foodInfo?.imagepath || '/images/default.jpg';
                                        const fullImageUrl = `${SERVER_URL}${imagePath}`;

                                        return (
                                            <TouchableOpacity 
                                                key={index} 
                                                style={styles.ingredientRow}
                                                onPress={() => handleIngredientPress(userItems)}
                                                activeOpacity={userItems.length > 0 ? 0.7 : 1}
                                            >
                                                <View style={styles.ingredientMainInfo}>
                                                    <View style={styles.imageBadgeContainer}>
                                                        <Image 
                                                            source={{ uri: fullImageUrl }}
                                                            style={styles.ingredientImage}
                                                            resizeMode="cover"
                                                        />
                                                        <View style={[styles.stockBadge, { backgroundColor: statusColor }]} />
                                                    </View>
                                                    <Text style={styles.ingredientLabel}>{foodInfo?.label || "Inconnu"}</Text>
                                                </View>

                                                <View style={{ alignItems: 'flex-end' }}>
                                                    <Text style={styles.ingredientQuantity}>
                                                        {item.quantity}{formatUnit(foodInfo?.measuringunit)}
                                                    </Text>
                                                    {totalOwned < item.quantity && totalOwned > 0 && (
                                                        <Text style={{ fontSize: 10, color: '#f3ce60' }}>
                                                            Stock: {totalOwned}{formatUnit(foodInfo?.measuringunit)}
                                                        </Text>
                                                    )}
                                                </View>
                                            </TouchableOpacity>
                                        );
                                    })
                                ) : (
                                    <Text style={styles.placeholderText}>Aucun ingrédient répertorié.</Text>
                                )}
                            </View>
                        </View>

                        {/* --- PAGE 2 : PRÉPARATION --- */}
                        <View style={{ width: contentWidth }}>
                             <Text style={styles.descriptionText}>{data.description || "Aucune instruction."}</Text>
                        </View>
                    </ScrollView>
                    <View style={{ height: 40 }} />
                </ScrollView>
            </View>

            {/* --- MODAL ALIMENT --- */}
            {showFoodDetail && selectedFoodData && (
                <Modal 
                    animationType="slide" 
                    presentationStyle="pageSheet" 
                    onRequestClose={() => setShowFoodDetail(false)}
                >
                    <ReadFood 
                        onClose={() => setShowFoodDetail(false)}
                        data={selectedFoodData}
                        onRefresh={refreshFoodContext} 
                        updateFoodFromDB={updateFoodFromDB}
                        addFoodFromDB={addFoodFromDB}
                    />
                </Modal>
            )}
        </View>
    );
};

export default ReadRecipe;