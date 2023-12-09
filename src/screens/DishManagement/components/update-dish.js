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
  import { RouteName, colors } from "../../../Constant";
  // import { launchImageLibraryAsync } from "expo-image-picker";
  import CameraIcon from "../../../components/Icons/CameraIcon";
  import { createNewDish, getAllDishType } from "../../../Api";
  
  const UpdateDish = (props) => {



    let options = {
      saveToPhotos: true,
      mediaType: "photo",
    };
  
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [gallery, setGallery] = useState();
    const [cameraPhoto, setCameraPhoto] = useState();
    const { navigation, route } = props;
    const id = route.params;
    console.log("FormDish", id);
    const [typeOfDish, setTypeOfDish] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [typeOfDishes, setTypeOfDishes] = useState([]);
    const [values, setValues] = useState({
      name: "",
      dishTypeId: "null",
      kitchenId: 1,
    });
    const [imageToApi, setImageToApi] = useState();
  
    useEffect(() => {
      async () => {
        const galleryStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
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
          setTypeOfDishes(res);
        })
        .catch((error) => console.log(error));
    };
  
    const initData = () => {};
    
    const handleCreateNewDish = () => {
      createNewDish(imageToApi, values);
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
    useEffect(() => {
      fetchAllTypeOfDish();
    }, []);
  
    return (
      <View style={{ backgroundColor: colors.COLOR_LIGHT, height: "100%" }}>
        <HeaderComp
          onBack={() => {
            navigation.goBack();
          }}
          label={id ? "Edit dish" : "Create dish"}
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
            placeholder={"Select type of dish"}
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
            placeholder="Name of dish"
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
                // resizeMode="cover"
                style={{ width: 100, height: 100, zIndex: 10000 }}
              />
            ) : (
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
              navigation.navigate(RouteName.DISH_MANAGEMENT);
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
              }}
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
      padding: 50,
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
  
  export default React.memo(UpdateDish);
  