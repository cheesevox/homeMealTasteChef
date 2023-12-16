import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import HeaderComp from "./screens/HeaderComp";

export default function PrivacyScreen({ navigation }) {
  const business = [
    {
      title: "Chef cancel orders with blance 10% order on the wallet system.",
    },
    {
      title:
        "Chef must recharge money from VNpay after that it will update in the customer 's wallet.",
    },
    {
      title:
        "When the chef cancels the order, the admin will refund the customer's wallet and the chef will be fined money. ",
    },
    {
      title:
        "Chefs have been fined if a confirmed order by this Chef is not completed..",
    },
    {
      title:
        "When the chef cancels the order, the admin will refund the customer's wallet and the chef will be fined money.",
    },{
      title:
        "Chef will receive money with balance in the wallet system form Admin after 1 month.",
    },{
      title:
        "Chef will post the status of the meal on the day  when the customer orders (Processing, Done, Reject).",
    },{
      title:
        "The chef only can update and delete meals, dishes that do not exist in session.",
    },
    {
      title:
        "Chefs have been fined if a confirmed order by this Chef is not completed.",
    },
  ];
  return (
    <ScrollView>
      <HeaderComp label="Privacy" onBack={() => navigation.goBack()} />
      <View
        style={{
          height: "100%",
          padding: 10,
        }}
      >
        {business.map((item, index) => (
          <View
          key={index}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                // fontFamily: "Poppins",
                fontSize: 18,
                lineHeight: 40,
              }}
            >
              <Text style={{fontWeight:"bold"}}>
              {index + 1}.
              </Text>
              {item.title}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
