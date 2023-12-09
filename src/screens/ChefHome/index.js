import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";
import BellIcon from "../../components/Icons/BellIcon";
import MessageIcon from "../../components/Icons/MessageIcon";
import Item from "./components/Item";
import { getAllDishByKitchenId, getAllMealByKitchen } from "../../Api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DishItem from "./components/DishItem";
import { Touchable } from "react-native";
import { RouteName, item } from "../../Constant";
const ChefHomeScreen = ({ navigation }) => {
  const [dish, setDish] = useState([]);
  const [meal, setMeal] = useState([]);
  const user = useSelector((state) => state.user.user);
  const renderItem = (item) => {
    return <Item navigation={navigation} item={item} />;
  };
  const renderDishItem = (item) => {
    return <DishItem navigation={navigation} item={item} />;
  };
  const fetchAllDishByKitchenId = () => {
    getAllDishByKitchenId(user?.kitchenId).then((res) => {
      setDish(res);
    });
  };
  const fetchAllMealByKitchenId = () => {
    getAllMealByKitchen(user?.kitchenId).then((res) => {
      setMeal(res);
    });
  };

  useEffect(() => {
    fetchAllDishByKitchenId();
    fetchAllMealByKitchenId();
  }, [user?.kitchenId]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      <View style={styles.header}>
        <ImageBackground
          source={require('../../../assets/images/background.jpg')}
          style={{
            flex: 1,
            resizeMode: 'cover'
          }}
          imageStyle={{ borderRadius: 40}}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 20, marginHorizontal:20
            }}
          >
            <TouchableOpacity>
              <BellIcon color={"orange"} />
            </TouchableOpacity>
            <MessageIcon color={"orange"} />
          </View>
          <View
            style={{
              alignItems: "center",
              bottom:40
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 500,
                  color: "#e06666",
                  textAlign: "center",
                  width: '60%',
                }}
              >
                Welcome! {user?.name}
              </Text>
            </View>
            <Image source={require("../../../assets/images/open.png")} style={{ height: 50, width: 50, 
              padding: 40, position: "absolute", top: 220, right: 50 }} />
          </View>
        </ImageBackground>
      </View>
      <View style={{ padding: 20 }}>
        <Text style={styles.titleStyle}>{"Dish of Kitchen"}</Text>
        <View style={styles.listDishStyle}>
          <FlatList
            data={dish}
            keyExtractor={(item) => item.dishId}
            renderItem={(item) => renderDishItem(item)}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <Text style={styles.titleStyle}>{"Meal of Kitchen"}</Text>
        <View style={styles.listDishStyle}>
          <FlatList
            data={meal}
            keyExtractor={(item) => item.mealId}
            renderItem={(item) => renderItem(item)}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 20,
    backgroundColor: "#FFF",
    position: "relative",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    height: 250,
    backgroundColor: "#ffe6bc",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 10,
  },
  headerText: {
    color: "#F95A0B",
    fontSize: 20,
    fontWeight: "700",
  },
  titleStyle: {
    color: "#FFAB01",
    fontSize: 25,
    fontWeight: "700",
    paddingLeft: 8,
    marginVertical: 10,
  },
  listDishStyle: {
    width: "100%",
    height: "auto",
  },
});

export default ChefHomeScreen;
