import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import HeaderComp from "../../HeaderComp";
import * as ImagePicker from "expo-image-picker";
import { MultiSelect } from "react-native-element-dropdown";
import React, { useEffect, useState } from "react";
import { colors } from "../../../Constant";
import CameraIcon from "../../../components/Icons/CameraIcon";
import MinusIcon from "../../../components/Icons/MinusIcon";
import AddIcon from "../../../components/Icons/AddIcon";
import {
  createNewMeal,
  getAllDishByKitchenId,
  getMealById,
  updateDish,
  updateMeal,
} from "../../../Api";
import { Image } from "react-native";
import dish from "../../DishManagement/components/dish";
import { useSelector } from "react-redux";

const FromMeal = (props) => {
  const { navigation, route } = props;
  const meal = route.params || {};
  const id = meal?.data?.mealId
  // console.log("mealmmmmmmmmmmmmmmmmmmmmmmm", meal?.data.dishModel)
  const user = useSelector((state) => state.user.user);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [selected, setSelected] = useState();
  const [mealObjectToAPI, setMealObjectToAPI] = useState({
    name: meal?.data?.name,
    kitchenId: user.kitchenId,
    description: meal?.data?.description,
    // DishIds: [],
  });
  const [imageToApi, setImageToApi] = useState();
  // const [meal, setMeal] = useState([]);
  const [dish, setDish] = useState([]);
  // const [dishInMeal, setDishInMeal] = useState([meal.meal?.dishModel]);
  const [dishInMeal, setDishInMeal] = useState(meal?.data?.dishModel || []);

  const [arrayDishToAPI, setArrayDishToAPI] = useState(
      meal?.data?.dishModel?.map((item) => item.dishId) || []
  );

  // const initData = () => {};
  const fetchAllDishByKitchenId = () => {
    getAllDishByKitchenId(user?.kitchenId).then((res) => {
      setDish(res);
    });
  };
  const getPermission = async () => {
    const galleryStatus =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    setHasGalleryPermission(galleryStatus.status === "granted");
  };
  const pickImage = async () => {
    await getPermission();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      allowEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result.assets[0].uri);
    if (!result.canceled) {
      try {
        const imageUri = result.assets[0].uri;
        setImageToApi(imageUri);
      } catch (error) {
        console.error("Error reading image file:", error);
      }
      // setGallery(imageUri);
    }
  };
  useEffect(() => {
    fetchAllDishByKitchenId();
  }, []);
  // useEffect(() => {
  //   const getPermission = async () => {
  //     const galleryStatus =
  //       await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     setHasGalleryPermission(galleryStatus.status === "granted");
  //   };
  //   getPermission();
  // }, []);
  const onHandleRemove = (id) => {
    setDishInMeal(dishInMeal.filter((item) => item.dishId !== id));
    setArrayDishToAPI(arrayDishToAPI.filter((item) => item !== id));

  };
  const onHandleSelectDishAddToMeal = (id) => {
    const selectedDish = dish.find((item) => {
      return item.dishId == id;
    });
    if (selectedDish) {
      const { _index, ...objectSelected } = selectedDish;
      setDishInMeal((prevDishInMeal) => {
        return [...prevDishInMeal, objectSelected];
      });
      setSelected([]);
    } else {
      console.error("Selected dish not found or undefined.");
    }
  };
  const onHandleCreateNewMeal = () => {
    if (meal?.data?.mealId) {
      // console.log("aray meal update la", meal?.data.dishModel);
      updateMeal(meal?.data?.mealId, imageToApi, mealObjectToAPI, arrayDishToAPI)
    } else {
      console.log("aray meal  create la", arrayDishToAPI);
      createNewMeal(imageToApi, mealObjectToAPI, arrayDishToAPI);
      navigation.navigate("MealManagement")
    }
  };
  const renderDishItem = (dish, unSelect = undefined) => {
    return (
      <View
        style={
          unSelect
            ? { ...styles.dishItem, backgroundColor: "#ffd580" }
            : styles.dishItem
        }
      >
        <View
          style={{
            borderRadius: 12,
          }}
        >
          <Image
            source={{ uri: dish?.image }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
            }}
            resizeMode="cover"
          />
        </View>
        <View
          style={{ flex: 1, paddingLeft: 10, gap: 4, justifyContent: "center" }}
        >
          <Text style={styles.nameText}>{dish?.name}</Text>
          <Text
            style={{ ...styles.nameText, fontSize: 12 }}
          >{`Type: ${dish?.dishTypeResponse?.name}`}</Text>
        </View>
        {unSelect && (
          <TouchableOpacity
            onPress={() => {
              unSelect && unSelect(dish);
              console.log("mi nút");
            }}
          >
            <MinusIcon />
          </TouchableOpacity>
        )}
      </View>
    );
  };
  const DishItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 5,
          marginVertical: 10,
          padding: 10,
          borderRadius: 10,
          backgroundColor: "white",
          elevation: 2,
        }}
      >
        <View
          style={{
            borderRadius: 12,
          }}
        >
          <Image
            source={{ uri: item?.image }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              marginBottom: 10,
            }}
            resizeMode="cover"
          />
        </View>
        <View
          style={{ flex: 1, paddingLeft: 10, gap: 4, justifyContent: "center" }}
        >
          <Text style={styles.nameText}>{item?.name}</Text>
          {/* <Text
            style={{ ...styles.nameText, fontSize: 12 }}
          >{`Type: ${item?.dishTypeDto?.name}`}</Text> */}
        </View>
        <TouchableOpacity
          style={{
            alignSelf: "center",
          }}
          onPress={() => onHandleRemove(item.dishId)}
        >
          <MinusIcon />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    console.log("array dish hien tai", arrayDishToAPI);
  }, [arrayDishToAPI]);
  return (
    <View style={{ backgroundColor: colors.COLOR_LIGHT, height: "100%" }}>
      <HeaderComp
        onBack={() => {
          navigation.goBack();
        }}
        label={meal?.data?.mealId ? "Edit meal" : "Create meal"}
      />
      <ScrollView
        style={{
          padding: 20,
          gap: 5,
          height: "100%",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderStyle: "dashed",
              width: 120,
              height: 120,
              borderRadius: 12,
            }}
            onPress={() => pickImage()}
          >
            {meal.data?.image ? (
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 10,
                  resizeMode: "cover",
                }}
                source={{ uri: meal.data?.image }}
              ></Image>
            ) : imageToApi ? (
              <Image
                style={{
                  width: 130,
                  height: '100%',
                  borderRadius: 10,
                }}
                source={{ uri: imageToApi }}
              ></Image>
            ) : (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100%",
                  alignItems: "center",
                }}
              >
                <CameraIcon />
                <Text>{"Post picture"}</Text>
              </View>
            )}
          </TouchableOpacity>
          <View style={{ width: "60%" }}>
            <TextInput
              style={styles.textInput}
              placeholder="Meal's Name"
              placeholderTextColor={"#C1C1C1"}
              // value={meal.meal?.name}
              defaultValue={meal.data?.name}
              onChangeText={(text) =>
                setMealObjectToAPI({ ...mealObjectToAPI, name: text })
              }
            />
            <TextInput
              multiline
              numberOfLines={3}
              style={styles.textInput}
              placeholder="Description"
              placeholderTextColor={"#C1C1C1"}
              defaultValue={meal.data?.description}
              onChangeText={(text) =>
                setMealObjectToAPI({ ...mealObjectToAPI, description: text })
              }
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#f2ebe1",
            borderRadius: 12,
            marginTop: 10,
          }}
        >
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#FFAB01",
                textAlign: "center",
                // fontFamily: "Poppins",
                fontSize: 19,
                fontWeight: "700",
                padding: 8,
              }}
            >
              {"Add dish"}
            </Text>
          </View>
          <ScrollView
            style={{
              backgroundColor: "#ffd580",
              borderRadius: 12,
              maxHeight: 400,
              paddingHorizontal: 20,
            }}
          >
            {dishInMeal.map((item, index) => {
              return <DishItem item={item} key={index} />;
            })}
            <MultiSelect
              style={styles.dropdown}
              placeholderStyle={{
                textAlign: "right",
                color: "#89703e",
                paddingHorizontal: 4,
                marginBottom: 10,
                alignSelf: "center",
              }}
              data={dish}
              containerStyle={{
                borderRadius: 10,
                width: "100%",
              }}
              labelField="name"
              valueField="dishId"
              key={(item) => item.dishId}
              placeholder="Add more"
              value={""}
              onChange={(item) => {
                setArrayDishToAPI((prevArray) => [...prevArray, ...item]);
                setSelected(item[0]);
                onHandleSelectDishAddToMeal(item[0]);
              }}
              renderRightIcon={() => (
                <AddIcon bgColor={"#ffd580"} color={"#89703e"} />
              )}
              renderItem={(item) => renderDishItem(item)}
              renderSelectedItem={(item, unSelect) => {
                return renderDishItem(item, unSelect);
              }}
              dropdownPosition="auto"
            />
          </ScrollView>
        </View>
      </ScrollView>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
          gap: 10,
        }}
      >
        <TouchableOpacity
          style={{
            paddingHorizontal: 50,
            paddingVertical: 10,
            backgroundColor: "#FFAB01",
            borderRadius: 20,
          }}
          onPress={() => {
            onHandleCreateNewMeal();
          }}
        >
          <Text style={styles.buttonTextStyle}>{"Save"}</Text>
        </TouchableOpacity>
        {meal.kitchenDtoReponseMeal?.mealId && (
          <TouchableOpacity
            style={{
              paddingHorizontal: 40,
              paddingVertical: 10,
              backgroundColor: "#E64B17",
              borderRadius: 20,
            }}
          // onPress={() => {
          //   //call api
          // }}
          >
            <Text style={styles.buttonTextStyle}>{"Remove"}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontSize: 15,
    borderColor: "#B2B2B2",
    borderRadius: 12,
    backgroundColor: "#F8F8FC",
    marginVertical: 10,
    minHeight: 40,
    padding: 10,
  },
  labelText: {
    fontSize: 16,
    // fontFamily: "Poppins",
    fontWeight: "500",
  },
  uploadImages: {
    padding: 50,
    height: 50,
    width: 200,
    backgroundColor: "black",
  },
  buttonTextStyle: {
    color: "#FFF",
    textAlign: "center",
    // fontFamily: "Inter",
    fontSize: 20,
    fontWeight: "500",
    letterSpacing: 0.6,
  },
  dropdown: {
    backgroundColor: "#ffd580",
  },
  dishItem: {
    flexDirection: "row",
    padding: 12,
    width: "100%",
  },
  nameText: {
    color: "#000",
    // fontFamily: "Poppins",
    fontSize: 14,
    fontWeight: "800",
  },
  uploadImages: {},
});

export default React.memo(FromMeal);
