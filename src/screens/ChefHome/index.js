import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
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
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity>
          <BellIcon color={"white"} />
          </TouchableOpacity>
          <MessageIcon color={"white"} />
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: 500,
              color: "white",
              textAlign: "center",
            }}
          >
            Hi! Chef, Welcome back!
          </Text>
        </View>
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
    padding: 20,
    height: 200,
    backgroundColor: "#FFAB01",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
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
