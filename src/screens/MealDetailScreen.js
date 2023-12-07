import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Icon from "react-native-feather";
import { Ionicons } from "@expo/vector-icons";
import DishCard from "../components/DishCard";
import { getDishByMealId } from "../Api";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
const MealDetailScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { item } = route.params;
  const { qty, setQty } = React.useState(1);
  console.log("item meal", item);
  const [meal, setMeal] = useState();
  const [dish, setDish] = useState([]);
  const fetchAllDish = () => {
    getDishByMealId(item.mealSessionId).then((res) => {
      console.log("----------------", res);
      setMeal(res);
      setDish(res.dishDto);
    });
  };

  useEffect(() => {
    fetchAllDish();
  }, [item.mealSessionId]);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={
            {
              // position: "relative",
            }
          }
        >
          <Image
            source={{ uri: item?.mealDtoForMealSession?.image }}
            style={{
              width: 500,
              height: 200,
              resizeMode: "center",
            }}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 40,
              height: 40,
              position: "absolute",
              marginTop: 40,
              marginLeft: 24,
              backgroundColor: "orange",
              borderRadius: 28,
            }}
          >
            <Icon.ArrowLeft style={{ color: "#fff" }} strokeWidth={3} />
          </TouchableOpacity>
          <View
            style={{
              width: "100%",
              backgroundColor: "#fff",
              borderTopLeftRadius: 60,
              borderTopRightRadius: 50,
              justifyContent: "space-between",
              flexDirection: "row",
              padding: 20,
            }}
          >
            <View>
              <TouchableOpacity onPress={() => navigation.navigate("ChefHome")}>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: "bold",
                    padding: 5,
                  }}
                >
                  {item?.mealDtoForMealSession?.name}
                  {/* <Icon name="restaurantfast-food-outline-outline" size={25} > </Icon> */}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              // onPress={() => navigation.navigate("MealDetail", { item: item })}
              onPress={() => {
                dispatch(addToCart(item));
                navigation.navigate("OrderCart", { item });
              }}
              style={{
                width: 50,
                height: 50,
                backgroundColor: "orange",
                borderRadius: 28,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="cart-outline" size={25} />
              {/* <ion-icon name="cart-outline"></ion-icon> */}
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              backgroundColor: "black",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 40,
                height: 40,
                position: "absolute",
                marginTop: 24,
                marginLeft: 24,
                backgroundColor: "white",
                borderRadius: 28,
              }}
            >
              <Icon.ArrowLeft style={{ color: "orange" }} strokeWidth={3} />
            </TouchableOpacity>
          </View>
          {/* menu */}
          <View style={{ padding: 20, gap: 10, minHeight: 600 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 26,
                  paddingBottom: 36,
                  marginLeft: 30,
                }}
              >
                Dish List
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 26,
                  paddingBottom: 36,
                  marginLeft: 30,
                  color: "red",
                }}
              >
                {item?.price}vnd
              </Text>
            </View>
            <ScrollView style={{ display: "flex" }}>
              {dish?.map((dish, index) => (
                <DishCard item={{ ...dish }} key={index} />
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MealDetailScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
  },
});
