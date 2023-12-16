import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { RouteName } from "../../../Constant";

const Area = (props) => {
  const { data, navigation } = props;

  return (
    <View style={styles.container}>
      <Image source={require("../../../../assets/images/phuc-loc-tho.jpg")} 
      style={{ height: 120, width: 120, resizeMode: "cover", alignItems: "center", borderRadius: 20 }} />
      <View style={{ padding: 10 }}>
        <Pressable
          onPress={() => {
            navigation.navigate(RouteName.SESSION, { areaId: data?.areaId });
          }}
        >
          <Text
            style={{ ...styles.text, fontSize: 20, padding: 4, paddingTop: 20, width:'80%'}}
          >
            {data?.areaName}
          </Text>

          <View
            style={{
              // justifyContent: "center",
              flexDirection: "row",
              paddingTop: 20,
            }}
          >
            <Text
              style={{ ...styles.text, fontSize: 15, width:'80%' }}
            >{`Address: ${data?.address}`}</Text>
          </View>
          {/* <View style={{ alignItems: "center" }}> */}
            {/* <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1,
            },
            styles.buttonStyle,
          ]}
          onPress={() => {
            navigation.navigate(RouteName.SESSION);
          }}
        ></Pressable> */}
          {/* </View> */}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fcd27e",
    borderRadius: 20,
    elevation: 8,
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginBottom: 30,
    marginHorizontal: 10,
    minWidth: 300,
    maxWidth:410,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    width:'90%'
  },
  text: {
    color: "#FFF",
    // fontFamily: "Poppins",
    fontWeight: "700",
    // textAlign: "center",
  },
  buttonStyle: {
    borderRadius: 20,
    backgroundColor: "#FFAB01",
    elevation: 5,
    paddingHorizontal: 30,
    paddingVertical: 10,
    // alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 20,
    letterSpacing: 0.6,
    // fontFamily: "Poppins",
  },
});

export default React.memo(Area);
