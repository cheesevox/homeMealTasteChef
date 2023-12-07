import {
	FlatList,
	StyleSheet,
	Text,
	View,
	Image,
	StepperInput,
	Pressable,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import React from "react";
import { colors, recipeList } from "../Constant";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FoodCard = ({ item }) => {
	const navigation = useNavigation();
	console.log("ITEM FOOOODDDD", item);
	return (
		<View style={{ justifyContent: "center",padding:30 }}>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				<Pressable
					onPress={() => navigation.navigate("MealDetail", {item})}
					style={{
						backgroundColor: colors.COLOR_LIGHT,
						shadowColor: "#000",
						shadowOffset: { width: 0, height: 4 },
						shadowOpacity: 0.1,
						shadowRadius: 7,
						elevation: 5,
						borderRadius:20, 
						padding:10,
						// backgroundColor:'#f5984c'
					}}
				>
					{/* //uri // */}
					<View style={{ alignItems: "center" ,borderRadius: 10, flexDirection: 'row'}}>
						<Image source={{ uri: item?.mealDtoForMealSession?.image }} style={{ height:100, width:250,borderTopLeftRadius:20, borderTopRightRadius:20}}></Image>
					</View>
					{/* <Text>{item.name}</Text> */}
					<View style={{ flexDirection: "row", marginTop: 8 }}>
						<Text style={{ fontWeight: "bold", fontSize:20}}>{item?.mealDtoForMealSession?.name}</Text>
					</View>
					<View>
						<Text >Price: {item?.price} vnd </Text>
						<Text>{item?.mealDtoForMealSession?.description}</Text>
						<Text>Quantity : {item?.remainQuantity}</Text>
					</View>
				</Pressable>
			</ScrollView>
		</View>
	);
};

export default FoodCard;

const styles = StyleSheet.create({});
