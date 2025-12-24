import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    backgroundImage: {
        height: 220,
        paddingTop: 10,
    },
    topContainer: {
        paddingHorizontal: 15,
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    button: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerContent: {
        flex: 1,
        marginTop: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 25,
    },
    
    // --- Score ---
    scoreContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    scoreCircle: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 6,
    },
    scoreNumber: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#4379de',
    },
    scoreLabel: {
        fontSize: 12,
        color: 'grey',
        fontWeight: '600',
    },

    // --- Infos ---
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#1c1b1f',
        marginBottom: 20,
        textAlign: 'center'
    },
    infoBlocksContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    infoBlock: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f6f9ff',
        paddingVertical: 12,
        marginHorizontal: 5,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#eef2fa'
    },
    infoBlockText: {
        marginLeft: 8,
        fontSize: 14,
        fontWeight: '600',
        color: '#1c1b1f',
    },

    // --- Onglets ---
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
    },
    activeTab: {
        borderBottomWidth: 3,
        borderBottomColor: '#4379de',
    },
    tabText: {
        fontSize: 16,
        color: 'grey',
        fontWeight: '600',
    },
    activeTabText: {
        color: '#4379de',
    },
    tabContentArea: {
        paddingHorizontal: 5,
    },

    // --- Liste Ingrédients ---
    ingredientsList: {
        marginBottom: 10,
    },
    ingredientRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    ingredientMainInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    
    // --- Image et Badge ---
    imageBadgeContainer: {
        position: 'relative', // IMPORTANT pour le badge absolu
        marginRight: 15,
    },
    ingredientImage: {
        width: 50,
        height: 50,
        borderRadius: 12,
        backgroundColor: '#f0f0f0',
    },
    stockBadge: {
        position: 'absolute',
        top: -4,    // Dépasse légèrement en haut
        right: -4,  // Dépasse légèrement à droite
        width: 14,
        height: 14,
        borderRadius: 7,
        borderWidth: 2, // Petite bordure blanche pour détacher de l'image
        borderColor: 'white',
        zIndex: 1,
    },

    ingredientLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1c1b1f',
        flexShrink: 1,
    },
    ingredientQuantity: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4379de',
    },

    descriptionText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#4e4e4e',
        paddingHorizontal: 10,
        textAlign: 'justify'
    },
});

export default styles;