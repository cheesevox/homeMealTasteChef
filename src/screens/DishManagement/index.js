import React, { useState, useEffect } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Dish from "./components/dish";
import AddIcon from "../../components/Icons/AddIcon";
import HeaderComp from "../HeaderComp";
import { RouteName } from "../../Constant";
import { getAllDishByKitchenId } from "../../Api";
import { useFocusEffect } from "@react-navigation/core";
import { Bold } from "react-native-feather";
import { Ionicons } from "@expo/vector-icons";
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
            height: "70%",
          }}
        >
          <FlatList
            data={dish}
            keyExtractor={(item) => item.dishId}
            renderItem={(item) => renderItem(item)}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <Pressable
            onPress={handleClickAdd}>
            <View style={{
              backgroundColor: 'orange',
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 15,
              width: '50%',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30
            }}>
              <Ionicons name="checkmark-circle-outline" size={20} />
              <Text style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}> ADD MORE DISH</Text>
              <Ionicons name="add-circle-outline" size={20} />
            </View>
          </Pressable>
        </View>
      </View>
      {/* <View
        style={{
          bottom: 90,
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
      </View> */}
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 15,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    height: "98%",
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
    fontSize: 20,
    fontWeight: "700",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
});
export default React.memo(DishManagement);
