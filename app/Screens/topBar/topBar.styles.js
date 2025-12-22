import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerTopBar: {
    width: "100%",
    height: 120,
    backgroundColor: "#2c7be5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
    paddingInline: 15
  },
  logo: {
    width: 180,
    height: 45,
    tintColor: "white"
  },
  containerIcon: {
    flexDirection: "row",
  },
  icon: {
    paddingVertical: 10,
    paddingInline: 15
  }
})

export default styles;