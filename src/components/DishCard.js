import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const DishCard = ({ item }) => {
  return (
    <View style={styles.cartcard}>
      <Image
        style={{
          width: 100,
          height: 100,
          marginLeft: 20,
          borderRadius: 20,
        
        }}
			source={{ uri: item?.image }}
      />
      <View
        style={{
          width: "50%",
          height: "100%",
          display: "flex",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Dish Name: {item.name}</Text>

        <Text style={{ fontSize: 17, fontWeight: "bold" }}>Dish Type :{item.dishType.name}</Text>
      </View>
    </View>
  );
};

export default DishCard;

const styles = StyleSheet.create({
  cartcard: {
    width: "100%",
    minHeight: 100,
    display: "flex",
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
    marginVertical:10,
    elevation:4,
  },
});
