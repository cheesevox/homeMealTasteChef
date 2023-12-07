import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { RouteName } from "../../../Constant";
import { deleteDishByDishId } from "../../../Api";

const Dish = (props) => {
  const { data, navigation } = props;
  const handleDelete = (id) => {
    deleteDishByDishId(id)
      .then((res) => console.log("Delete dish successfully."))
      .catch((error) => console.log(error));
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          borderRadius: 12,
        }}
      >
        <Image
          source={{ uri: data?.image }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
          }}
          resizeMode="cover"
        />
      </View>
      <View
        style={{ flex: 1, paddingLeft: 10, gap: 4, justifyContent: "center" }}
      >
        <Text style={styles.nameText}>{data?.name}</Text>
        <Text
          style={{ ...styles.nameText, fontSize: 12 }}
        >{`Type: ${data?.dishTypeResponse.name}`}</Text>
      </View>
      <View
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          flexDirection: "row",
          gap: 4,
        }}
      >
        <Pressable
          onPress={() => {
            navigation.navigate(RouteName.FORM_DISH, {
              id: data.dishId,
            });
          }}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1,
              backgroundColor: "#FFF",
            },
            styles.buttonStyle,
          ]}
        >
          <Text
            style={
              ({
                color: "#FFF",
              },
              styles.buttonText)
            }
          >
            {"Edit"}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handleDelete(data?.dishId)}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1,
              backgroundColor: "#E64B17",
            },
            styles.buttonStyle,
          ]}
        >
          <Text
            style={{
              color: "white",
              ...styles.buttonText,
            }}
          >
            {"Remove"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffd580",
    flexDirection: "row",
    marginVertical: 10,
    borderRadius: 20,
    padding: 12,
  },
  nameText: {
    color: "#000",
    // fontFamily: "Poppins",
    fontSize: 14,
    fontWeight: "800",
  },
  buttonStyle: {
    borderRadius: 12,
  },
  buttonText: {
    textAlign: "center",
    // fontFamily: "Poppins",
    fontSize: 11,
    fontWeight: "400",
    padding: 10,
  },
});

export default React.memo(Dish);
