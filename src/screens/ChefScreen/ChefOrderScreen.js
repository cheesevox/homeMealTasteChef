import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Ionicons } from "@expo/vector-icons";
import { getOrderByKitchenId, postStatusPaidToCompleted } from "../../Api";
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from "dayjs";
import { order } from "../../Constant";

const ChefOrderScreen = ({ navigation }) => {
  const formatter = new Intl.DateTimeFormat('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [newData, setNewData] = useState([])
  const [formattedDate, setFormattedDate] = useState('');
  const [selectedDate, setSelectedDate] = useState(dayjs().toDate())
  // const onChange = async (event, selectedDate) => {
  //   const dateTimeString = '01-12-2023 14:27'; // Replace this with your actual date-time string

  //   // Parse the date-time string into a JavaScript Date object
  //   const dateTimeObject = new Date(dateTimeString);

  //   // Create a new Date object with the same date but set the time to midnight
  //   const dateOnlyObject = new Date(dateTimeObject.getFullYear(), dateTimeObject.getMonth(), dateTimeObject.getDate());

  //   // Format the date without the time
  //   const formattedDate = dateOnlyObject.toLocaleDateString('en-US', {
  //     day: '2-digit',
  //     month: '2-digit',
  //     year: 'numeric',
  //   });
  //   console.log("FORMATTTTTTTTTTTT",formattedDate)
  // };
  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      // Convert dayjs to Date
      const jsDate = selectedDate instanceof Date ? selectedDate : selectedDate.toDate();
      setSelectedDate(selectedDate);
      console.log(formatter.format(selectedDate));
    }
    setDate(formatter.format(jsDate))
  };


  const showDatePicker = () => {
    setShow(true);
  };

  const user = useSelector((state) => state.user.user)
  const [orders, setOrders] = useState([])
  const fetchAllOrder = () => {
    getOrderByKitchenId(user.kitchenId).then((res) => {
      // console.log("ORDEEEEEEEEEEr", res)
      setOrders(res)
    })
  }
  const filteredData = orders.filter(item => {
    // return item.time === formattedDate;
  });
  // console.log("ORRRRRRRRRRRRRRRRRRRRRRR", order)
  const CartCard = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.cartcard}
        onPress={() => navigation.navigate("ChefOrderDetail", {item})}
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
              source={{ uri: item?.mealSession?.mealDtoOrderResponse?.image }}
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
          <Text style={{color:'orange'}}>Status: {item.status}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    const fetchData = () =>{
      fetchAllOrder()
    }
    fetchData()
    const intervalId = setInterval(fetchData, 5000)
    return() =>clearInterval(intervalId) 
  }, [])
  
  useEffect(() => {
    if (selectedDate) {
      setNewData(
        orders.filter((item) => {
          // const orderFind = formatter.format(item.time).includes(formatter.format(selectedDate))
          const formattedTime = dayjs(item.time).format("DD-MM-YYYY")
          // console.log("formated time",[item.time.includes(formatter.format(selectedDate))])
          return item.time.includes(formatter.format(selectedDate))

        }
        ))
    }
  }, [formatter.format(selectedDate), orders])

  return (
    <SafeAreaView style={{
      backgroundColor: Colors.white, flex: 1, flexDirection: "column",
      gap: 20,
      backgroundColor: "#FFF",
      height: "100%"
    }}>
      {/* <View style={{
        gap: 20,
        backgroundColor: "#FFF",
        flex: 1
      }}> */}

      <View style={{
        flexDirection: 'row', justifyContent: 'space-around',
      }}>
        {/* <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ justifyContent: "center", alignItems: "center", width: 40, height: 40, backgroundColor: 'orange', borderRadius: 28, marginVertical: 20 }}
          >
            <Icon.ArrowLeft style={{ color: 'white' }} strokeWidth={3} />
          </TouchableOpacity> */}
        <Text style={{
          fontWeight: '600',
          fontSize: 24,
          textAlign: 'center',
          color: '#e65332',
          borderColor: 'white',
          backgroundColor: '#fab3a2',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          marginVertical: 20,
          width: '40%',
          borderRadius: 20,
          borderWidth: 2
        }}>
          Order
        </Text>
        {/* <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center", width: 40, height: 40, borderRadius: 28, marginTop: 42 }}
          >
            <Icon.CreditCard style={{}} strokeWidth={3} />
          </TouchableOpacity> */}
      </View>
      {/* </View> */}
      <View style={{
        flexDirection: "row", alignItems: "center",
        marginHorizontal: 40, marginVertical: 10, justifyContent: "center",
        borderRadius: 30, elevation: 5, backgroundColor: '#00000000'
      }}>
        <TouchableOpacity onPress={showDatePicker}>
          <Ionicons name="calendar-outline" size={22} />
        </TouchableOpacity>

        {show &&
          <DateTimePicker
            value={selectedDate}
            // Change to "time" for time picker
            display="default"
            onChange={onChange}
            style={{
              minWidth: 50,
              backgroundColor: 'black'
            }}
          />
        }
        {/* <Text style={{ marginTop: 20 }}>Selected Date and Time: {date.toString()}</Text> */}
        <View
          style={{
            alignItems: "center", justifyContent: "center",
            width: '50%', height: 60, borderRadius: 20
          }}>
          {formatter.format(selectedDate) && <Text style={{ fontSize: 22 }}>{formatter.format(selectedDate)}</Text>}
        </View>
      </View>
      <View style={{
        backgroundColor: "blue", flex: 9,
        margin: 15,
        borderRadius: 20,
        backgroundColor: "#FFD580",
        elevation: 5,
      }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={newData ? newData.slice().reverse() : []}
          // keyExtractor={(item) => item?.time || item?.time.toString()}
          // renderItem={({ item }) => <CartCard item={item} />}
          renderItem={({ item }) => <CartCard item={item} />}
        // data={orders}
        // contentContainerStyle={{
        // }}
        // renderItem={({ item }) => <CartCard item={item} />}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  textItem: {
    fontWeight: "bold",
    fontSize: 12,
  },
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  cartcard: {
    height: 150,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontWeight: "600",
    justifyContent: "center",
    fontSize: 26,
    alignContent: "center",
    textAlign: "center",
    color: "#e65332",
    borderColor: "white",
    backgroundColor: "#fab3a2",
    fontWeight: "bold",
    marginTop: 40,
    width: "40%",
    borderRadius: 20,
    borderWidth: 2,
  },
  actionButton: {
    width: 80,
    height: 30,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
  },
  topNavigate: {
    height: 50,
    backgroundColor: "#FFAB01",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
export default ChefOrderScreen;
