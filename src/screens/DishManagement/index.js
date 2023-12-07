import React, { useState, useEffect } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Dish from "./components/dish";
import AddIcon from "../../components/Icons/AddIcon";
import HeaderComp from "../HeaderComp";
import { RouteName } from "../../Constant";
import { getAllDishByKitchenId } from "../../Api";
import { useFocusEffect } from "@react-navigation/core";
const DishManagement = ({ navigation }) => {
  const [dish, setDish] = useState([]);

  useEffect(() => {
    getAllDishByKitchenId(1)
      .then((result) => {
        setDish(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderItem = (item, index) => {
    return <Dish data={item.item} key={index} navigation={navigation} />;
  };

  const handleClickAdd = () => {
    navigation.navigate(RouteName.FORM_DISH);
  };
  
  return (
    <View>
      <HeaderComp
        label={"Manage Dish"}
        onBack={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
            height: "75%",
          }}
        >
          <FlatList
            data={dish}
            keyExtractor={(item) => item.dishId}
            renderItem={(item) => renderItem(item)}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
        }}
      >
        <Pressable
          onPress={handleClickAdd}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1,
              backgroundColor: "#FFAB01",
              flexDirection: "row",
              paddingHorizontal: 24,
              paddingVertical: 8,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
            },
          ]}
        >
          <Text
            style={{
              color: "#FFF",
              textAlign: "center",
            }}
          >
            {"Add more"}
          </Text>
          <AddIcon />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 20,
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    height: "100%",
  },
  titleHeaderContainer: {
    backgroundColor: "#EFE6DA",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
  titleText: {
    color: "#E88C80",
    textAlign: "center",
    // fontFamily: "Poppins",
    fontSize: 20,
    fontWeight: "700",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
});
export default React.memo(DishManagement);
