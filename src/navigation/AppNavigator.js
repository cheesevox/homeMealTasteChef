import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import WalletScreen from "../screens/WalletScreen";
import PaymentScreen from "../screens/PaymentScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Ionicons from "@expo/vector-icons";
import BottomTabNavigator from "../screens/BottomTabNavigation";
import linking from "../linking";
import DishManagement from "../screens/DishManagement";
import { RouteName } from "../Constant";
import formDish from "../screens/DishManagement/components/form-dish";
import MealManagement from "../screens/MealManagement";
import formMeal from "../screens/MealManagement/components/form-meal";
import session from "../screens/MarketScreen/components/session";
import ChefOrderDetailScreen from "../screens/ChefScreen/ChefOrderDetailScreen";
import WebScreen from "../screens/WebScreen";
import AddNewMealSession from "../screens/SessionManagement/component/AddNewMealSession";
import EditUserProfileScreen from "../screens/EditUserProfileScreen";
import MealSessionScreen from "../screens/MealSessionMAnagement/MealSessionScreen";
import MealSessionDetailSceen from "../screens/MealSessionMAnagement/MealSessionDetailSceen";
import SessionManagement from "../screens/SessionManagement";

const Stack = createNativeStackNavigator();

// const Tab = createBottomTabNavigator();

const AppNavigator = () => {
	return (
		<NavigationContainer linking={linking} >
			<Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
				<Stack.Screen name="CustomerHome" component={BottomTabNavigator} />
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Wallet" component={WalletScreen} />
				<Stack.Screen name="Payment" component={PaymentScreen} />
				<Stack.Screen name="UserProfile" component={UserProfileScreen} />
				<Stack.Screen name="Regiter" component={RegisterScreen} />
				<Stack.Screen name="ChefOrderDetail" component={ChefOrderDetailScreen} />
				<Stack.Screen name="WebScreen" component={WebScreen} />
				<Stack.Screen name="AddMealSession" component={AddNewMealSession} />
				<Stack.Screen name="EditProfile" component={EditUserProfileScreen} />
				<Stack.Screen name="MealSessionScreen" component={MealSessionScreen} />
				<Stack.Screen name="SessionManagement" component={SessionManagement} />
                <Stack.Screen name="MealSessionDetail" component={MealSessionDetailSceen} />

        {/*Chef role*/}
        <Stack.Screen
          name={RouteName.CHEF_HOME}
          component={BottomTabNavigator}
        />
        <Stack.Screen name={RouteName.KITCHEN} component={BottomTabNavigator} />
        <Stack.Screen
          name={RouteName.MARKET_SCREEN}
          component={BottomTabNavigator}
        />
        <Stack.Screen
          name={RouteName.DISH_MANAGEMENT}
          component={DishManagement}
        />
        <Stack.Screen name={RouteName.FORM_DISH} component={formDish} />

        <Stack.Screen
          name={RouteName.MEAL_MANAGEMENT}
          component={MealManagement}
        />
        <Stack.Screen name={RouteName.FORM_MEAL} component={formMeal} />
        <Stack.Screen name={RouteName.SESSION} component={session} />

        </Stack.Navigator>

    </NavigationContainer>
  );
};
export default AppNavigator;

const styles = StyleSheet.create({});
			{/* <Tab.Navigator
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="CustomerHome" component={BottomTabNavigator} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="FoodList" component={FoodListScreen} />
        <Stack.Screen name="FoodDetail" component={FoodDetailsScreen} />
        <Stack.Screen name="OrderCart" component={OrderCartScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        <Stack.Screen name="Regiter" component={RegisterScreen} />
        {/* <Stack.Screen name="Order" component={OrderScreen} /> */}


                {/*Chef role*/}
      // </Stack.Navigator>
      {/* <Tab.Navigator
>>>>>>> CaoVanTruong/chef
				initialRouteName="FoodList"
				screenOptions={({ router }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;
						let rn = router.name == "FoodList";
						if (rn == "FoodList") {
							iconName = focused ? 'foodlist' : 'home-outline'
						} else if (rn == "Order") {
							iconName = focused ? 'order' : 'setting-outline'
						} else if (rn == "Wallet") {
							iconName = focused ? 'wallet' : 'wallet-outline'
						} else if (rn == "UserProfile") {
							iconName == focused ? 'userprofile' : 'person-outline'
						}
						return <Ionicons name={iconName} size={size} color={color} />
					},
				})}>
					<Tab.Screen name="FoodList" component={FoodListScreen} options={{ tabBarBadge: 3 }} />
					{/* <Tab.Screen name="FoodList" component={FoodListScreen}/> */}
      // <Tab.Screen name="Order" component={OrderCartScreen} />
      // <Tab.Screen name="Wallet" component={WalletScreen} />
      // <Tab.Screen name="UserProfile" component={UserProfileScreen} />
      {/* </Tab.Navigator> */}