import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View, Text } from "react-native";
import MealItem from "./components/meal-item";
import HeaderComp from "../HeaderComp";
import AddIcon from "../../components/Icons/AddIcon";
import { RouteName } from "../../Constant";
import { getAllMealByKitchen } from "../../Api";

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
            height: "75%",
          }}
        >
          <FlatList
            data={meal}
            keyExtractor={(item) => item.mealId}
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

export default React.memo(MealManagement);
