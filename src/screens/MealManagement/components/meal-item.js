import React from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { RouteName } from "../../../Constant";
import { deleteMealByMealId } from "../../../Api";

const MealItem = (props) => {
  const { data, navigation } = props;
  const handleDelete = (id) => {
    deleteMealByMealId(id)
      .then((res) => console.log("Delete meal successfully."))
      .catch((error) => console.log(error));
  };
  console.log("MEALLLLLLLLLLLLLL " ,data)
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
        style={{ flex: 1, paddingLeft: 10, gap: 4, justifyContent: "center", width:'90%' }}
      >
        <Text style={styles.nameText}>{data?.name}</Text>
        {/* <Text style={{ ...styles.nameText, fontSize: 12 }}>
          {`Type: ${data?.type}`}
        </Text> */}
        <Text style={{ ...styles.nameText, fontSize: 12 }}>
          {`Description: ${data?.description}`}
        </Text>
      </View>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          gap: 4,
          width:'80%',
          marginVertical:10,
        }}
      >
        <Pressable
          onPress={() => {
            navigation.navigate(RouteName.FORM_MEAL, {
              id: data?.mealId,
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
          onPress={() => handleDelete(data?.mealId)}
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
    marginVertical: 10,
    borderRadius: 20,
    padding: 12,
    marginHorizontal:5,
    width:'48%',
    alignItems:"center"
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

export default React.memo(MealItem);
