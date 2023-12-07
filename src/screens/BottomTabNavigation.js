import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import UserProfileScreen from "./UserProfileScreen";
import { useDispatch } from "react-redux";
import ChefHomeScreen from "./ChefHome";
import PostIcon from "../components/Icons/PostIcon";
import KitchenIcon from "../components/Icons/KitchenIcon";
import OrderIcon from "../components/Icons/OrderIcon";
import KitchenScreen from "./KitchenScreen";
import MarketScreen from "./MarketScreen";
import { getUserInfor } from "../../slices/userSlice";
import ChefOrderScreen from "./ChefScreen/ChefOrderScreen";
const Tab = createBottomTabNavigator();
const BottomTabNavigator = ({ route }) => {
  const dispatch = useDispatch();
  const { user } = route.params || {};
  console.log("user bottom navigator : ::::::::", user);
  useEffect(() => {
    dispatch(getUserInfor(user));
  }, [user?.userId]);
  // const role = 3;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "orange",
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          height: 50,
        },
        tabBarActiveTintColor: "#466fd4",
        tabBarInactiveTintColor: "white",
      }}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color}></Ionicons>
          ),
        }}
        name={"Home"}
        component={ChefHomeScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <PostIcon size={24} color={color} />,
        }}
        name="Market"
        component={MarketScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <KitchenIcon size={24} color={color} />,
        }}
        name={"Kitchen"}
        component={KitchenScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <OrderIcon size={24} color={color} />,
        }}
        name="Order"
        component={ChefOrderScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="person-circle-outline"
              size={24}
              color={color}
            ></Ionicons>
          ),
        }}
        name="UserProfile"
        component={UserProfileScreen}
      />
    </Tab.Navigator>
  ) 
};
  // : (
  //   <Tab.Navigator
  //     screenOptions={{
  //       tabBarStyle: {
  //         backgroundColor: "orange",
  //         borderTopRightRadius: 30,
  //         borderTopLeftRadius: 30,
  //         height: 50,
  //       },
  //       tabBarActiveTintColor: "#466fd4",
  //       tabBarInactiveTintColor: "white",
  //     }}
  //   >
  //     <Tab.Screen
  //       options={{
  //         headerShown: false,
  //         tabBarIcon: ({ color }) => (
  //           <Ionicons name="home-outline" size={24} color={color}></Ionicons>
  //         ),
  //       }}
  //       name="Home"
  //       // component={FoodListScreen}
  //     />
  //     <Tab.Screen
  //       options={{
  //         headerShown: false,
  //         tabBarIcon: ({ color }) => (
  //           <Ionicons name="cart-outline" size={24} color={color}></Ionicons>
  //         ),
  //       }}
  //       name="OrderCart"
  //       // component={OrderCartScreen}
  //     />
  //     <Tab.Screen
  //       options={{
  //         headerShown: false,
  //         tabBarIcon: ({ color }) => (
  //           <Ionicons name="wallet-outline" size={24} color={color}></Ionicons>
  //         ),
  //       }}
  //       name="Order"
  //       // component={OrderScreen}
  //     />
  //     <Tab.Screen
  //       options={{
  //         headerShown: false,
  //         tabBarIcon: ({ color }) => (
  //           <Ionicons
  //             name="person-circle-outline"
  //             size={24}
  //             color={color}
  //           ></Ionicons>
  //         ),
  //       }}
  //       name="UserProfile"
  //       component={UserProfileScreen}
  //     />
  //   </Tab.Navigator>
  // );


// const styles = StyleSheet.create({});
export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabbar: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "orange",
  },
});

// tri lua///////////////////////////////////////////////////
// return (
//   <Tab.Navigator
//   // screenOptions={({route})=>{
//   //   tabBarStyle: styles.tabbar
//   // }}
//   >
//     <Tab.Screen
//       options={{
//         headerShown: false,
//         tabBarIcon: ({ color }) => (
//           <Ionicons name="home-outline" size={24} color={color}></Ionicons>
//         ),
//       }}
//       name="FoodList"
//       component={FoodListScreen}
//     />
//     <Tab.Screen
//       options={{
//         headerShown: false,
//         tabBarIcon: ({ color }) => (
//           <Ionicons name="cart-outline" size={24} color={color}></Ionicons>
//         ),
//       }}
//       name="OrderCart"
//       component={OrderCartScreen}
//     />
//     <Tab.Screen
//       options={{
//         headerShown: false,
//         tabBarIcon: ({ color }) => (
//           <Ionicons name="newspaper" size={24} color={color}></Ionicons>
//         ),
//       }}
//       name="Order"
//       component={OrderScreen}
//     />
//     <Tab.Screen
//       options={{
//         headerShown: false,
//         tabBarIcon: ({ color }) => (
//           <Ionicons
//             name="person-circle-outline"
//             size={24}
//             color={color}
//           ></Ionicons>
//         ),
//       }}
//       name="UserProfile"
//       component={UserProfileScreen}
//     />
//   </Tab.Navigator>
// );
