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
import { getAllDishByKitchenId, getAllMealByKitchen, getAllMealSessionByKitchen, getAllNewOrderHomePage, getAllOrderByMealSessionId, getAllOrderCompleteHomePage, getAllOrderProcessingHomePage, getAllPriceMealSessionByKitchenId, getTransactionByUserID } from "../../Api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DishItem from "./components/DishItem";
import { Touchable } from "react-native";
import { RouteName, item } from "../../Constant";
import dayjs from "dayjs";

const ChefHomeScreen = ({ navigation }) => {
  const [order, setOrder] = useState()
  const [meal, setMeal] = useState()
  const [priceMeal, setPriceMeal] = useState()
  const user = useSelector((state) => state.user.user) || {};
  const id = user?.kitchenId
  const [orderComplete, setOrderComplete] = useState()
  const [orderProcessing, setOrderProcessing] = useState()
  //   });
  // };user
  // useEffect(() => {
  //   fetchAllOrderByMealsession()
  // }, [user?.kitchenId]);
  const formatter = new Intl.DateTimeFormat('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const [transaction, setTransaction] = useState([]);

  const fetchAllTransactionByUserId = () => {
    getTransactionByUserID(user?.userId)
      .then((res) => {
        console.log("OOOOOOOOOORDER TRANNNNNNNFERRRR", res)
        setTransaction(res);
      })
  };

  const totalTransferAmount = transaction
    .filter((transaction) => transaction.transactionType === 'TRANSFER')
    .reduce((total, transaction) => total + transaction.amount, 0);

  const fectchAllOrderComplete = (id) => {
    getAllMealSessionByKitchen(id).then((res) => {
      // console.log("RESSSSS Complete", res)/
      setMeal(res)
    })
  }

  const fectchAllNewOrder = () => {
    getAllNewOrderHomePage().then((res) => {
      setOrder(res)
    })
  }
  useEffect(() => {
    const fetchData = () => {
      fectchAllOrderComplete(id);
      fectchAllNewOrder();
      fetchAllTransactionByUserId()
    };
    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, [id, user?.userId]);

  const countComplete = meal ? meal.filter(item => item.status === 'COMPLETED').length : 0;
  const countProcessing = meal ? meal.filter(item => item.status === 'PROCESSING').length : 0;
  const count = order ? order.filter(item => item.status === 'PAID').length : 0;

  const CartCard = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.cartcard}
        onPress={() => navigation.navigate("ChefOrderDetail", { item })}
      >
        <View
          style={{
            paddingVertical: 10,
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              padding: 5,
            }}
          >
            <Image
              source={require('../../../assets/images/avatar.jpg')}
              style={{ width: 100, height: 100, resizeMode: "cover" }}
            />
            <View
              style={{
                justifyContent: "center",
                marginLeft: 20,
              }}
            >
              <Text style={styles.textItem}>Order ID : {item.orderId}</Text>
              <Text style={styles.textItem}>Quantity: {item?.quantity}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                Total: {item.totalPrice}
              </Text>
              <Text>Area : {item?.mealSession?.sessionDto?.areaDtoOrderResponse?.areaName}</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text>Customer: {item?.customer?.name}</Text>
              </View>
              <Text>Time: {item.time}</Text>
            </View>
          </View>
          <Text style={{ color: 'orange' }}>Status: {item.status}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
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
            <View style={{ margin: 20 }}></View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: "center",
            bottom: 40,
            flexDirection: "column"
          }}
        >
          <View style={{ justifyContent: "center" }}>
          <View style={{}}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 500,
                color: "#e06666",
                textAlign: "center",
                width: '100%',
                fontWeight: 'bold'
              }}
            >
              Home Welcome !
            </Text>
            </View>
            <View style={{}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 500,
                  color: "#e06666",
                  textAlign: "center",
                  width: '100%',
                  fontWeight: 'bold',
                  textAlign: "center",
                }}
              >
                {user?.name}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <View style={{ padding: 20, borderWidth: 0.5, paddingHorizontal: 30, borderBottomLeftRadius: 30 }}>
            <Text style={{ textAlign: "center", color: 'green', fontSize: 20 }}>
              <Text>
                {count}
              </Text>
            </Text>
            <Text>
              New Order
            </Text>
          </View>
          <View style={{ padding: 20, borderWidth: 0.4, borderBlockColor: 'grey' }}>
            <Text style={{ textAlign: "center", color: 'orange', fontSize: 20 }}>
              <Text>{countProcessing}</Text>
            </Text>
            <Text>
              Inprocess Meal
            </Text>
          </View>
          <View style={{ padding: 20, borderWidth: 0.5, borderBottomRightRadius: 30 }}>
            <Text style={{ textAlign: "center", color: 'red', fontSize: 20, }}>
              <Text>{countComplete}</Text>
            </Text>
            <Text>
              Complete Meal
            </Text>
          </View>
        </View>
        <View style={{ alignItems: "center", margin: 5, }}>
          <Text style={{ fontSize: 25 }} >
            {/* {priceMeal} */}
            {totalTransferAmount}
          </Text>
          <Text style={{ fontWeight: 200, color: 'black' }}>
            Total Earning
          </Text>
        </View>
      </View>
      <View style={{ padding: 20 }}>
        <Text style={styles.titleStyle}>{"New Booking Order"}</Text>
        {/* <Text style={styles.titleStyle}>{"Booking"}</Text> */}
        <View style={styles.listDishStyle}>
          <FlatList
            data={order?.reverse().slice() && order.filter(item => item.status === 'PAID')}
            keyExtractor={(item) => item?.orderId.toString()} // Corrected keyExtractor typo
            renderItem={({ item }) => (
              <CartCard item={item} />
            )}
          // showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </View>

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
    height: 300,
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
    height: '70%'
  },
});

export default ChefHomeScreen;