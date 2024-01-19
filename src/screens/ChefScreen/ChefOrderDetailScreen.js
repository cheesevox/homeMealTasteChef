import {
    FlatList,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { ArrowDownLeft } from "react-native-feather";
import { faArrowLeft, faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import { postStatusPaidToCompleted } from "../../Api";
import { RouteName } from "../../Constant";
import HeaderComp from "../HeaderComp";

const ChefOrderDetailScreen = ({ navigation, route }) => {

    // const plus = ({ item }) => { };
    
    // const {order} = route.params
    const { item } = route.params || {};
    console.log("order detailllllllllllllllllll", item)
    const onHandleCompletedOrder = (orderId) => {
        postStatusPaidToCompleted(orderId).then(() => {
            navigation.goBack()
        })
    }
    const CartCard = ({ item }) => {
        return (
            <View style={styles.cartcard}>
                <View
                    style={{
                        height: 100,
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
                            source={item.image}
                            style={{ width: 50, height: 50, resizeMode: "cover" }}
                        />
                        <View
                            style={{
                                justifyContent: "center",
                                flexDirection: "column",
                                marginLeft: 20,
                            }}
                        >
                            <Text style={styles.textItem}>{item.name}</Text>
                            <Text style={styles.textItem}>Quantity: {item.quantity}</Text>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                                    Total: {item.price}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                padding: 1,
                                marginVertical: 2,
                                borderRadius: 5,
                                width: "20%",
                                display: "flex",
                                backgroundColor: "#FFD580",
                                justifyContent: "center",
                                alignItems: "center",
                                elevation: 5,
                            }}
                        >
                            <Text>Post</Text>
                        </TouchableOpacity>
                        <View
                        //   style={{
                        //     padding: 3,
                        //     backgroundColor: "#FFD580",
                        //     borderRadius: 10,
                        //   }}
                        >
                            <Text>Status:PROCESSING</Text>
                        </View>
                    </View>
                </View>
                {/* <View style={{ alignItems: "center" }}>
            <View style={styles.actionButton}>
              <Ionicons
                name="add-circle-outline"
                size={25}
                color={Colors.black}
              ></Ionicons>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                1
              </Text>
              <Ionicons
                name="remove-circle-outline"
                size={25}
                color={Colors.black}
              ></Ionicons>
            </View>
          </View> */}
            </View>
        );
    };
    return (
        <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1}}>
            <View>
            <HeaderComp label="Order Detail" onBack={() => navigation.goBack()} />
            </View>
            {/* <FlatList
          showsVerticalScrollIndicator={false}
          data={foods}
          contentContainerStyle={{
            margin: 10,
            borderRadius: 20,
            paddingTop: 50,
            paddingBottom: 80,
            backgroundColor: "#FFD580",
            elevation: 5,
          }}
          renderItem={({ item }) => <CartCard item={item} />}
        /> */}
            <View
                style={{
                    margin: 10,
                    borderRadius: 20,
                    padding: 10,
                    backgroundColor: "#FFD580",
                    elevation: 5,
                    flexDirection: "column",
                }}
            >
                <View style={{ alignItems: "center" }}>
                    <Image
                        source={{ uri: item?.mealSession?.mealDtoOrderResponse?.image }}
                        style={{ width: 200, height: 200, resizeMode: "cover", borderRadius: 20 }}
                    />
                </View>
                <View style={{}}>
                    <View style={styles.card}>
                        <Text>Order ID : {item?.orderId}</Text>
                    </View>
                    <View style={styles.card}>
                        <Text>Customer' Name : {item?.customer?.name}</Text>
                    </View>
                    <View style={styles.card}>
                        <Text>Customer' Phone : {item?.customer?.phone}</Text>
                    </View>
                    <View style={styles.card}>
                        <Text>Meal : {item?.mealSession?.mealDtoOrderResponse?.name}</Text>
                    </View>
                    <View style={styles.card}>
                        <Text>Create Date : {item?.time}</Text>
                    </View>
                    <View style={styles.card}>
                        <Text>Status : {item?.status}</Text>
                    </View>
                </View>
            </View>
            <View>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center", }}>
                {
                    item?.status?.includes("PAID") ?
                        (
                            <TouchableOpacity style={{ elevation: 5, width: '60%', padding: 10, borderRadius: 30, backgroundColor: '#FFD580' }}
                                onPress={() => onHandleCompletedOrder(item?.orderId)}
                            >
                            </TouchableOpacity>
                        )
                        : ""
                }

            </View>
        </SafeAreaView>
    );
};

{/* <TouchableOpacity
style={{
  padding: 1,
  marginVertical: 2,
  borderRadius: 5,
  width: "20%",
  display: "flex",
  backgroundColor: "#FFD580",
  justifyContent: "center",
  alignItems: "center",
  elevation: 5,
}}
//   onPress={() => onHandleCompletedOrder(item?.orderId)}
>
<Text>Post</Text>
</TouchableOpacity> */}
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
        height: 100,
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    card: {
        padding: 20,
        marginTop: 20,
        borderRadius: 30,
        backgroundColor: 'white',
        elevation: 5
    }
});
export default ChefOrderDetailScreen;
