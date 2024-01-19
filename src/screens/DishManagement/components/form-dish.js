import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Permission,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import {
  launchCameraAsync,
  launchImageLibraryAsync,
  useMediaLibraryPermissions,
} from "expo-image-picker";
import HeaderComp from "../../HeaderComp";
import { Dropdown } from "react-native-element-dropdown";
import React, { useEffect, useState } from "react";
import { RouteName, colors, item } from "../../../Constant";
// import { launchImageLibraryAsync } from "expo-image-picker";
import CameraIcon from "../../../components/Icons/CameraIcon";
import { createNewDish, getAllDishType, updateDish } from "../../../Api";
import { useSelector } from "react-redux";
import { placeholder, value } from "deprecated-react-native-prop-types/DeprecatedTextInputPropTypes";
import Toast from "react-native-toast-message";

const FormDish = (props) => {
  let options = {
    saveToPhotos: true,
    mediaType: "photo",
  };
  const user = useSelector(state => state.user.user)
  console.log("IDDDDDDDD", user.kitchenId)
  console.log("mewwwwwwwwwwwwwwwwwww", item?.image)
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [cameraPhoto, setCameraPhoto] = useState();
  const { navigation, route } = props;
  const item = route.params
  console.log("ITEMMMMMMMMMMMm", item)
  const id = item?.id?.dishId || {}
  const [gallery, setGallery] = useState(item?.id?.image);
  console.log("FormDish id", id);
  const [typeOfDish, setTypeOfDish] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [typeOfDishes, setTypeOfDishes] = useState([]);
  const [status, setStatus] = useState(false)
  const [values, setValues] = useState({
    name: item?.id?.name,
    dishTypeId: item?.id?.dishTypeResponse?.dishTypeId,
    kitchenId: user?.kitchenId,
  });
  const [imageToApi, setImageToApi] = useState();
  console.log("IAMGEMMMMMMMMMMM", item?.id?.image)
 useEffect(()=>{
  getAllDishType()
  .then((res) => {
    console.log("ALLLL TYYYYYYYYYYPEEEEEEEE", res)
    setTypeOfDishes(res);
  })
  .catch((error) => console.log(error));
 },[]);

  useEffect(() => {
     async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    };
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      allowEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result.assets[0].uri);
    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      try {
        setImageToApi(imageUri);
      } catch (error) {
        console.error("Error reading image file:", error);
      }
      setGallery(imageUri);
      if (hasGalleryPermission === false) {
        return <Text>No access to may'</Text>;
      }
    }
  };
  const fetchAllTypeOfDish = () => {
    getAllDishType()
      .then((res) => {
        console.log("ALLLL TYYYYYYYYYYPEEEEEEEE", res)
        setTypeOfDishes(res);
      })
      .catch((error) => console.log(error));
  };
  const initData = () => { };
  // const handleCreateNewDish = () => {

  //   createNewDish(imageToApi, values);

  // };
  console.log("LOGGGGGGGGGGGGGGGG", item?.id?.dishTypeResponse?.dishTypeId)
  const handleCreateNewDish = () => {
    if (item?.id?.dishId) {
      console.log("values in handde update", values)
      if (typeOfDish !== item?.id?.dishTypeResponse?.dishTypeId) {
        setStatus(true)

      } else {
        setStatus(false)
      }
      updateDish(item?.id?.dishId, imageToApi, values).then((res) => {
        navigation.navigate(RouteName.DISH_MANAGEMENT);
        Toast.show({
          type: "success",
          text1: "Update",
          text2: "Update Dish Successfully.",
        });
      }).catch(err => {
        console.log("ERRRRRRRRRRRRRRRRrr", err)
      })
    }

    else {
      createNewDish(imageToApi, values).then((res) => {
        navigation.navigate(RouteName.DISH_MANAGEMENT);
        Toast.show({
          type: "success",
          text1: "Home Meal Taste",
          text2: "Create Dish Successfully.",
        });
      }).catch(error => {
        Toast.show({
          type: "error",
          text1: "Home Meal Taste",
          text2: "Create Dish Fail.",
        });
      })
    }
  };

  const onSelectAvatar = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: "photo",
        quality: 1,
        includeBase64: true,
      },
      async (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorCode) {
          console.log("ImagePicker Error: ", response.errorCode);
        } else {
          let source = response.assets[0];
          if (source.fileSize >= 5242880) {
            toastMessage(t(MessageI18n.errorImageSizeIsTooBig), true);
          } else {
            let buildFileName = new Date().toISOString();
            let formData = new FormData();
            formData.append("file", {
              uri:
                Platform.OS === "ios"
                  ? source?.uri.replace("file://", "")
                  : source?.uri,
              name: source?.fileName,
              type: source?.type,
            });
            formData.append("fileName", fileNameNormalize(buildFileName));
            // const accountUploadResult =
            //   await accountApiService.uploadAccountAvatarAsync(formData);
            // if (accountUploadResult.isSuccess === true) {
            //   let customerInformation = {
            //     ...customerInfo,
            //     thumbnail: accountUploadResult?.avatarUrl,
            //   };
            //   await updateSessionJsonStringValue(customerInformation);
            //   dispatch(updateCustomerAvatar(accountUploadResult?.avatarUrl));
            //   toastMessage(t(accountUploadResult?.message), false);
            // } else {
            //   toastMessage(t(accountUploadResult?.message), true);
            // }
          }
        }
      }
    );
  };

  return (
    <View style={{ backgroundColor: colors.COLOR_LIGHT, height: "100%" }}>
      <HeaderComp
        onBack={() => {
          navigation.goBack();
        }}
        label={item?.id ? "Edit dish" : "Create dish"}
      />
      {/* <TouchableOpacity title="lay hinh" onPress={openGallery}>
        <Text>Lay hinh</Text>
      </TouchableOpacity>
      <TouchableOpacity title="lay hinh" onPress={openCamera}>
        <Text>camera</Text>
      </TouchableOpacity> */}
      {/* <Image
        source={{ uri: gallery }}
        style={{
          width: 50,
          height: 50,
        }}
      ></Image> */}
      <Image
        source={{ uri: cameraPhoto }}
        style={{
          width: 50,
          height: 50,
        }}
      ></Image>
      <View
        style={{
          padding: 28,
          gap: 20,
        }}
      >
        <Dropdown
          data={typeOfDishes}
          placeholder={id ? item?.id?.dishTypeResponse?.name : 'Select Type of dish'}
          placeholderStyle={{
            color: "#C1C1C1",
            fontSize: 18,
          }}
          labelField="name"
          valueField="dishTypeId"
          value={typeOfDish}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(value) => {
            console.log("value cua dropdown", value.dishTypeId)
            setTypeOfDish(value);
            setValues({ ...values, dishTypeId: value.dishTypeId });
            setIsFocus(false);
          }}
          style={{ ...styles.textInput, paddingRight: 12, paddingVertical: 12 }}
          isFocus={isFocus}
          containerStyle={{
            borderRadius: 12,
          }}
        />
        <TextInput
          style={styles.textInput}
          placeholder={id ? item?.id?.name : 'Name of dish'}
          placeholderTextColor="#C1C1C1"
          onChangeText={(text) => setValues({ ...values, name: text })}
        />

        <TouchableOpacity
          style={styles.uploadImages}
          onPress={() => pickImage()}
        >
          {gallery ? (
            <Image
              source={{ uri: gallery }}
              // source={{uri:item?.id?.image}}
              // source={item?.id?.image ? {uri : item?.id?.image} :  {uri:gallery}  }
              // resizeMode="cover"
              style={{ width: '100%', height: 150, zIndex: 10000, borderRadius: 20 }}
            />
          ) :
            // item?.id?.image ? (
            //   <Image
            //     source={{ uri: item?.id?.image }}
            //     // source={{uri:item?.id?.image}}
            //     // source={item?.id?.image ? {uri : item?.id?.image} :  {uri:gallery}  }
            //     // resizeMode="cover"
            //     style={{ width: '80%', height: '70%', zIndex: 10000 }}
            //   />
            // ) :s
            (
              <>
                <CameraIcon />
                <Text>{"Post picture of dish"}</Text>
              </>
            )}
        </TouchableOpacity>
      </View>
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
            handleCreateNewDish();
            // navigation.navigate(RouteName.DISH_MANAGEMENT);
          }}
        >
          <Text style={styles.buttonTextStyle}>{"Save"}</Text>
        </TouchableOpacity>
        {id && (
          <TouchableOpacity
            style={{
              paddingHorizontal: 40,
              paddingVertical: 10,
              backgroundColor: "#E64B17",
              borderRadius: 20,
            }}
            onPress={() => {
              //call api
              navigation.goBack()
            }}
          >
            <Text style={styles.buttonTextStyle}>{"Cancel"}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 0.5,
    fontSize: 18,
    borderColor: "#B2B2B2",
    paddingVertical: 16,
    paddingLeft: 20,
    borderRadius: 12,
    backgroundColor: "#F8F8FC",
  },
  labelText: {
    fontSize: 16,
    // fontFamily: "Poppins",
    fontWeight: "500",
  },
  uploadImages: {
    padding: 20,
    backgroundColor: "#F8F8FC",
    gap: 5,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 0.2,
  },
  buttonTextStyle: {
    color: "#FFF",
    textAlign: "center",
    // fontFamily: "Inter",
    fontSize: 20,
    fontWeight: "500",
    letterSpacing: 0.6,
  },
});

export default React.memo(FormDish);
