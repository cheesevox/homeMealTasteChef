import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { RouteName } from "../../../Constant";

const Area = (props) => {
  const { data, navigation } = props;

  return (
    <View style={styles.container}>
      <Text
        style={{ ...styles.text, fontSize: 20, padding: 4, paddingTop: 20 }}
      >
        {data?.areaName}
      </Text>
      <Pressable
        onPress={() => {
          navigation.navigate(RouteName.SESSION, { areaId: data?.areaId });
        }}
      >
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            paddingTop: 20,
            padding: 20,
          }}
        >
          <Text
            style={{ ...styles.text, fontSize: 15 }}
          >{`Address: ${data?.address}`}</Text>
        </View>
      </Pressable>
      <View style={{ alignItems: "center" }}>
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
    minWidth:400
  },
  text: {
    color: "#FFF",
    // fontFamily: "Poppins",
    fontWeight: "700",
    textAlign: "center",
  },
  buttonStyle: {
    borderRadius: 20,
    backgroundColor: "#FFAB01",
    elevation: 5,
    paddingHorizontal: 30,
    paddingVertical: 10,
    alignItems: "center",
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
