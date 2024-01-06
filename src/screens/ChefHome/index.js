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
import { getAllDishByKitchenId, getAllMealByKitchen, getAllOrderByMealSessionId } from "../../Api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DishItem from "./components/DishItem";
import { Touchable } from "react-native";
import { RouteName, item } from "../../Constant";
const ChefHomeScreen = ({ navigation }) => {
  const [order, setOrder] = useState()
  const user = useSelector((state) => state.user.user) || {};
  const renderItem = (item) => {
    return <Item naviga123123tion={navigation} item={item} />;
  };
  const renderDishItem = (item) => {
    return <DishItem navigation={navigation} item={item} />;
  };
  // const fetchAllOrderByMealsession = () => {
  //   getAllOrderByMealSessionId(mealsessionId).then((res) => {
  //     setOrder(res);
  //   });
  // };

  // useEffect(() => {
  //   fetchAllOrderByMealsession()
  // }, [user?.kitchenId]);

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
            fontSize: 30,
            fontWeight: 500,
            textAlign: "center",
            padding: 20,
            top: 10
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
            bottom: 40
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 500,
                color: "#e06666",
                textAlign: "center",
                width: '60%',
                fontWeight: 'bold'
              }}
            >
              Home Welcome! {user?.name}
            </Text>
          </View>

        </View>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <View style={{ padding: 20, borderWidth: 0.5, paddingHorizontal: 30, borderBottomLeftRadius:30 }}>
            <Text style={{ textAlign: "center",color:'green', fontSize:20 }}>
              56
            </Text>
            <Text>
              New Order
            </Text>
          </View>
          <View style={{ padding: 20, borderWidth: 0.4, borderBlockColor:'grey' }}>
            <Text style={{ textAlign: "center", color:'orange', fontSize:20 }}>
              57
            </Text>
            <Text>
              Inprocess Order
            </Text>
          </View>
          <View style={{ padding: 20, borderWidth: 0.5,borderBottomRightRadius:30 }}>
            <Text style={{ textAlign: "center", color:'red', fontSize:20 ,}}>
              58
            </Text>
            <Text>
              Complete Order
            </Text>
          </View>
        </View>
        <View style={{ alignItems: "center", margin: 5, }}>
          <Text style={{ fontSize: 25 }} >
            $3000000
          </Text>
          <Text style={{ fontWeight: 100, color: 'grey' }}>
            Total Earning
          </Text>
        </View>
      </View>
      <View style={{ padding: 20 }}>
        <Text style={styles.titleStyle}>{"New Booking Order"}</Text>
        {/* <Text style={styles.titleStyle}>{"Booking"}</Text> */}
        <View style={styles.listDishStyle}>
          <FlatList
            data={order}
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
    height: 260,
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