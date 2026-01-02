import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerScreen: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#f7f9fd",
        paddingTop: 50
    },
    logo: {
        width: 180,
        height: 45,
        marginBottom: 150
    },
    containerUser: {
        backgroundColor: "white",
        borderRadius: 15,
        width: "80%",
        height: "55%",
        flexDirection: "column",
        padding: 10,
    },
    section: {
        flex: 1,
        justifyContent: "center",
    },
    title: {
        fontWeight: "bold",
        fontSize: 25,
        marginLeft: 10
    },
    error: {
        color: "red",
        textAlign: "center",
    },
    button: {
        backgroundColor: "#4379de",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "85%"
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20
    },
    link: {
        textAlign: "center",
        color: "#5DA9FF",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 15,
        paddingHorizontal: 15,
        height: "85%",
        borderWidth: 1,
        borderColor: "#E0E0E0",
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#000",
    },
})

export default styles;