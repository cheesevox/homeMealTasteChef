import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import PlusIcon from "../../../components/Icons/PlusIcon";
import { RouteName, item } from "../../../Constant";

const Item = (props) => {
  const { navigation, route } = props;
  const { item } = props;
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate(RouteName.FORM_MEAL)}
      >
        <View style={styles.imageContainerStyle}>
          {item.item.id !== "" ? (
            <View
              style={{
                elevation: 8,
                borderRadius: 25,
                backgroundColor: "white",
              }}
            >
                <Image
                source={
                  item.item.image
                    ? { uri: item.item.image }
                    : require("../../../../assets/images/tuna.png")
                }
                style={styles.imageStyle}
                resizeMode="cover"
              />
            </View>
          ) : (
            <View style={styles.plusIconStyle}>
              <PlusIcon />
            </View>
          )}
        </View>
        <Text style={styles.titleImageStyle}>{item.item.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    gap: 8,
    padding: 16,
    paddingLeft: 0,
    flex: 1,
  },
  imageContainerStyle: {
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "columnn",
  },
  imageStyle: {
    width: 120,
    height: 120,
    borderRadius: 25,
    justifyContent: "center",
    alignContent: "center",
  },
  titleImageStyle: {
    color: "#000",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "700",
  },
  plusIconStyle: {
    backgroundColor: "#D9D9D9",
    borderRadius: 25,
  },
});

export default React.memo(Item);
