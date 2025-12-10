import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AddFood = ({ onClose }) => {

  return (
    <View style={styles.container}>
      <Text>Ceci est la future page d&apos;ajout d&apos;un aliment</Text>
      <TouchableOpacity onPress={onClose} style={styles.returnButton}>
        <Text>Retour sur la home page</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  returnButton: {
    backgroundColor: "grey",
    marginTop: 50,
    padding: 10,
    borderRadius: 10
  }
})

export default AddFood;