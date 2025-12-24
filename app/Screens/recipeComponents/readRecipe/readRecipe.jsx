import React, { useState, useContext, useMemo } from 'react';
import { Text, TouchableOpacity, View, ScrollView, Image } from 'react-native';
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
import { BASE_URL } from '../../../config/config'; 
import styles from "./readRecipe.style";

const ReadRecipe = ({ onClose, data, isFavorite, onToggleFavorite }) => {
    const [activeTab, setActiveTab] = useState('ingredients');
    const { foodToShow } = useContext(FoodContext);

    const SERVER_URL = BASE_URL.slice(0, -3);

    const ingredientList = data?.ingredientamount_ingredientamount_recipeTorecipe || [];

    const percentage = useMemo(() => {
        if (ingredientList.length === 0) return 0;
        let validatedIngredients = 0;
        ingredientList.forEach(req => {
            const userItems = foodToShow.filter(fs => fs.idFood === req.food);
            const totalOwned = userItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
            if (totalOwned >= req.quantity) validatedIngredients++;
        });
        return Math.round((validatedIngredients / ingredientList.length) * 100);
    }, [ingredientList, foodToShow]);

    const formatUnit = (unit) => {
        switch (unit?.toLowerCase()) {
            case 'gram': return 'g';
            case 'centiliter': return 'cl';
            case 'unit': return '';
            default: return unit || '';
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#4379de', '#7199e8']} style={styles.backgroundImage}>
                <View style={styles.topContainer}>
                    <View style={styles.line}>
                        <TouchableOpacity onPress={onClose} style={styles.button}>
                            <FontAwesomeIcon icon={faAngleLeft} size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={onToggleFavorite}>
                            <FontAwesomeIcon 
                                icon={isFavorite ? faBookmarkSolid : faBookmarkRegular} 
                                size={24} 
                                color={isFavorite ? "#4379de" : "black"} 
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.scoreContainer}>
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
                            <FontAwesomeIcon icon={faUserGroup} size={20} color="#4379de" />
                            <Text style={styles.infoBlockText}>{data.nbeaters || "/"} pers.</Text>
                        </View>
                        <View style={styles.infoBlock}>
                            <FontAwesomeIcon icon={faClock} size={20} color="#4379de" />
                            <Text style={styles.infoBlockText}>{data.timetomake || "/"} min</Text>
                        </View>
                        <View style={styles.infoBlock}>
                            <FontAwesomeIcon icon={faFire} size={20} color="#4379de" />
                            <Text style={styles.infoBlockText}>{data.caloricintake || "0"} Kcal</Text>
                        </View>
                    </View>

                    <View style={styles.tabContainer}>
                        <TouchableOpacity onPress={() => setActiveTab('ingredients')} style={[styles.tab, activeTab === 'ingredients' && styles.activeTab]}>
                            <Text style={[styles.tabText, activeTab === 'ingredients' && styles.activeTabText]}>Ingrédients</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setActiveTab('preparation')} style={[styles.tab, activeTab === 'preparation' && styles.activeTab]}>
                            <Text style={[styles.tabText, activeTab === 'preparation' && styles.activeTabText]}>Préparation</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.tabContentArea}>
                        {activeTab === 'ingredients' ? (
                            <View style={styles.ingredientsList}>
                                {ingredientList.map((item, index) => {
                                    const foodInfo = item.food_ingredientamount_foodTofood;
                                    
                                    const userItems = foodToShow.filter(fs => fs.idFood === item.food);
                                    const totalOwned = userItems.reduce((sum, fs) => sum + (fs.quantity || 0), 0);

                                    let statusColor = '#bb413b'; 
                                    if (totalOwned >= item.quantity) statusColor = '#76cc77';
                                    else if (totalOwned > 0) statusColor = '#f3ce60';

                                    const imagePath = foodInfo?.imagepath || '/images/default.jpg';
                                    const fullImageUrl = `${SERVER_URL}${imagePath}`;

                                    return (
                                        <View key={index} style={styles.ingredientRow}>
                                            <View style={styles.ingredientMainInfo}>
                                                <View style={styles.imageBadgeContainer}>
                                                    {/* 3. Utilisation uniquement de l'URI distante (plus de require local) */}
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
                                                        En stock: {totalOwned}{formatUnit(foodInfo?.measuringunit)}
                                                    </Text>
                                                )}
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>
                        ) : (
                            <Text style={styles.descriptionText}>{data.description || "Aucune instruction."}</Text>
                        )}
                    </View>
                    <View style={{ height: 40 }} />
                </ScrollView>
            </View>
        </View>
    );
};

export default ReadRecipe;