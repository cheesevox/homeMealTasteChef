import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import ToastMessage from "../components/ToastMessage";
import { useRef } from "react";
import { login } from "../Api";
import { useDispatch } from "react-redux";
import { getUserInfor } from "../../slices/userSlice";
import { RouteName } from "../Constant";

const LoginScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  // collect data
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [values, setValues] = useState({
    phone: null,
    password: null,
  });
  const Login = () => {
    login(values, navigation)
      .then((res) => {
        dispatch(getUserInfor(res));
      })
      .catch((res) => console.log("that bai get api", res));
  };

  //create toast message ref
  const [toastType, setToastType] = useState("success");
  const toastRef = useRef(null);

  const handleShowToast = () => {
    if (toastRef.current) {
      toastRef.current.show();
    }
  };

  // get set
  const onChagePhone = (value) => {
    setPhone(value);
  };
  const onChagePassword = (value) => {
    setPassword(value);
  };
  const { loginFailure } = route.params || {};
  //button login
  const onClickLogin = () => {
    if (phone.length == 0 || password.length == 0) {
      navigation.navigate("CustomerHome");
      return console.log("Please enter login infomation");
    } else {
      setToastType("success");
      handleShowToast();
      navigation.navigate("CustomerHome");
    }
    console.log("Click login", {
      phone,
      password,
    });
  };

  return (
    <View style={{}}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ToastMessage
          type={toastType}
          text="Login successfuly"
          description="Login succes"
          ref={toastRef}
        />
        {loginFailure && (
          <Text style={{ textAlign: 'left' }}>Login failed. Please try again.</Text>
        )}
      </View>
      <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: '#5caee6', padding: 30, }}>
        <Image
          source={require("../../assets/images/chef.png")}
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 170, width: 170
          }}
        />
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            justifyContent: "center",
            alignItems: "center",
            color: "#3c444c",
          }}
        >
          Home Meal Taste
        </Text>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: "red",
            padding: 5
          }}
        >
          Welcome Back Chef !
        </Text>
      </View>
      <View style={{
        paddingTop: 50,
        bottom: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: 'white'
      }}>
        <View
          style={{
            paddingLeft: 10,
            marginHorizontal: 40,
            flexDirection: "row",
            borderColor: "grey",
            borderWidth: 1,
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Ionicons name="call-outline" size={20}></Ionicons>
          </View>

          <View>
            <View style={{ padding: 20 }}>
              <TextInput
                placeholder="Your Phone Numbers"
                // value={phone}
                width={280}
                onChangeText={(text) =>
                  setValues({
                    ...values,
                    phone: text,
                  })
                }
              ></TextInput>
            </View>
          </View>
        </View>

        <View
          style={{
            paddingLeft: 10,
            marginHorizontal: 40,
            flexDirection: "row",
            borderColor: "grey",
            borderWidth: 1,
            borderRadius: 10,
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Ionicons name="lock-closed-outline" size={20}></Ionicons>
          </View>
          <View style={{ padding: 20 }}>
            <TextInput
              placeholder="Your Password"
              secureTextEntry={true}
              width={280}
              onChangeText={(text) =>
                setValues({
                  ...values,
                  password: text,
                })
              }
            // value={password}
            // secureTextEntry={true}
            // width={280}
            // onChangeText={onChagePassword}
            ></TextInput>
          </View>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            // onPress={() => navigation.navigate("FoodList")}
            onPress={Login}
            // onPress={onClickLogin}
            type=""
            style={{
              backgroundColor: "#f96163",
              borderRadius: 18,
              marginTop: 60,
              justifyContent: "center",
              paddingVertical: 18,
              width: "60%",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, color: "#fff", fontWeight: "700" }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ marginTop: 50 }}>If You Don't Have An Account ?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Regiter")}
            style={{
              marginTop: 20,
              color: "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "black", fontWeight: "500", height:'100%' }}>
              Regiter Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default LoginScreen;

{
  /* import { RouteName } from "../Constant";

const LoginScreen = ({ navigation }) => {
  // collect data
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  //create toast message ref
  const [toastType, setToastType] = useState("success");
  const toastRef = useRef(null);

  const handleShowToast = () => {
    if (toastRef.current) {
      toastRef.current.show();
    }
  };

  // get set
  const onChagePhone = (value) => {
    setPhone(value);
  };
  const onChagePassword = (value) => {
    setPassword(value);
  };

  //button login
  const onClickLogin = () => {
  navigation.navigate(RouteName.CHEF_HOME);
    // if (phone.length == 0 || password.length == 0) {
    //   navigation.navigate("CustomerHome");
    //   return console.log("Please enter login infomation");
    // } else {
    //   setToastType("success");
    //   handleShowToast();
    //     navigation.navigate("CustomerHome");
    //   navigation.navigate("ChefHome");
    // }
    // console.log("Click login", {
    //   phone,
    //   password,
    // });
  };

  return (
    <View style={{}}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ToastMessage
          type={toastType}
          text="Login successfuly"
          description="Login succes"
          ref={toastRef}
        />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../../assets/images/loginimage.png")}
          style={{
            marginTop: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <Text
          style={{
            marginTop: 20,
            fontSize: 30,
            fontWeight: "bold",
            justifyContent: "center",
            alignItems: "center",
            color: "#3c444c",
          }}
        >
          Home Meal Taste
        </Text>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: "red",
          }}
        >
          Welcome Back!
        </Text>
      </View>
      <View style={{ paddingTop: 30 }}>
        <View
          style={{
            paddingLeft: 10,
            marginHorizontal: 40,
            flexDirection: "row",
            borderColor: "grey",
            borderWidth: 1,
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Ionicons name="call-outline" size={20}></Ionicons>
          </View>

          <View>
            <View style={{ padding: 20 }}>
              <TextInput
                placeholder="Your Phone Numbers"
                value={phone}
                width={280}
                onChangeText={onChagePhone}
              ></TextInput>
            </View>
          </View>
        </View>

        <View
          style={{
            paddingLeft: 10,
            marginHorizontal: 40,
            flexDirection: "row",
            borderColor: "grey",
            borderWidth: 1,
            borderRadius: 10,
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Ionicons name="lock-closed-outline" size={20}></Ionicons>
          </View>
          <View style={{ padding: 20 }}>
            <TextInput
              placeholder="Your Password"

              secureTextEntry={true}
              width={280}
              onChangeText={(text) =>
                setValues({
                  ...values,
                  password: text,
                })
              }
              value={password}
              secureTextEntry={true}
              width={280}
              onChangeText={onChagePassword}
            ></TextInput>
          </View>
        </View>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          // onPress={() => navigation.navigate("FoodList")}
          onPress={Login}

          onPress={onClickLogin}
          type=""
          style={{
            backgroundColor: "#f96163",
            borderRadius: 18,
            marginTop: 60,
            justifyContent: "center",
            paddingVertical: 18,
            width: "60%",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, color: "#fff", fontWeight: "700" }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ marginTop: 50 }}>If You Don't Have An Account ?</Text>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Regiter")}
            style={{
              marginTop: 20,
              color: "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "black", fontWeight: "500" }}>
              Regiter Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    </View>
  );
}; */
}
