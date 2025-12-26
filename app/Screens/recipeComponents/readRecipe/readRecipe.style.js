import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    gradientHeader: {
        height: 220,
        paddingTop: 10,
        paddingBottom: 20, 
        justifyContent: 'space-between', 
    },

    navContainer: {
        paddingHorizontal: 15,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navButton: { 
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },

    scoreWrapper: {
        alignItems: 'center',
        marginBottom: 50, 
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

    // --- CONTENU PRINCIPAL ---
    containerContent: {
        flex: 1,
        marginTop: -30, 
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 25,
    },

    title: {
        fontSize: 24,
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
        paddingVertical: 10,
        marginHorizontal: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#eef2fa'
    },
    infoBlockText: {
        marginLeft: 6,
        fontSize: 13,
        fontWeight: '600',
        color: '#1c1b1f',
    },

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

    imageBadgeContainer: {
        width: 50,
        height: 50,
        marginRight: 15,
        position: 'relative', 
        overflow: 'visible', 
    },
    ingredientImage: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
        backgroundColor: '#f0f0f0',
    },
    stockBadge: {
        position: 'absolute',
        top: -4,    
        right: -4,  
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 2, 
        borderColor: 'white',
        zIndex: 10, 
        elevation: 5, 
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