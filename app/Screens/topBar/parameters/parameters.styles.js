import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.75; 

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end', 
    },
    overlayBackground: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)', 
    },


    containerParams: {
        width: DRAWER_WIDTH,
        height: '30%',
        backgroundColor: 'white',
        paddingTop: '3%', 
        paddingHorizontal: 20,
        borderRadius:16,
        marginTop:'20%',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#4379de',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4379de',
    },

    content: {
        flex: 1,
    },

    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    menuText: {
        fontSize: 16,
        color: '#4379de',
    },
    fullScreenContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5', 
        marginTop: 30
    },
    fullScreenHeader: {
        height: 60, // Hauteur standard
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 60, // Largeur fixe pour aider au centrage du titre
    },
    backText: {
        color: '#4379de',
        fontSize: 16,
        marginLeft: 5,
    },
    fullScreenTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    }
});

export default styles;