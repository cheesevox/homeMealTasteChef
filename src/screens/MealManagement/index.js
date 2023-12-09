import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View, Text } from "react-native";
import MealItem from "./components/meal-item";
import HeaderComp from "../HeaderComp";
import AddIcon from "../../components/Icons/AddIcon";
import { RouteName } from "../../Constant";
import { getAllMealByKitchen } from "../../Api";
import { Ionicons } from "@expo/vector-icons";

const MealManagement = ({ navigation }) => {
  const [meal, setMeal] = useState([]);

  useEffect(() => {
    console.log("RUN fetchAllMealByKitchenId");
    fetchAllMealByKitchenId();
  }, []);

  const fetchAllMealByKitchenId = () => {
    getAllMealByKitchen(1)
      .then((res) => {
        setMeal(res);
      })
      .catch((error) => console.log(error));
  };

  const renderItem = (item) => {
    return <MealItem data={item.item} navigation={navigation} />;
  };

  const handleClickAdd = () => {
    navigation.navigate(RouteName.FORM_MEAL);
  };

  return (
    <View>
      <HeaderComp
        label={"Manage Meal"}
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
            data={meal}
            keyExtractor={(item) => item.mealId}
            renderItem={(item) => renderItem(item)}
            showsHorizontalScrollIndicator={false}
            numColumns={2}
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
              <Text style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}> ADD MORE MEAL</Text>
              <Ionicons name="add-circle-outline" size={20} />
            </View>
          </Pressable>
        </View>
      </View>
      {/* <View
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
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 20,
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
    // fontFamily: "Poppins",
    fontSize: 20,
    fontWeight: "700",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
});

export default React.memo(MealManagement);
