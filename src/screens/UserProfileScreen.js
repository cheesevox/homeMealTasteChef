import { FlatList, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { images, item } from '../Constant'
import * as Icon from "react-native-feather";
import UserCard from '../components/UserCard'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons/build/Icons';
import { useSelector, useDispatch } from 'react-redux';
import { getAllArea, getUserByID } from '../Api';
import TabViewSession from '../components/TabViewSession';
import Toast from "react-native-toast-message";
import { logoutUser } from "../../slices/userSlice";

const UserProfileScreen = ({ navigation, route }) => {
  const user = useSelector(state => state.user.user)
  const [allArea, setAllArea] = useState([])
  // console.log("USERRRRRRRRRRRRRR", user)
  console.log("uwaseeeeeeeeeeeeeeeeee", user)
  const [profile, setProfile] = useState()
  console.log("PROFFFFFFFFFFILE", profile)
  const dispatch = useDispatch();
  const fecthAllAreaId = () => {
    getAllArea().then((res) => {
      setAllArea(res)
    })
  }
  const fectProfileByCustomerId = () => {
    getUserByID(user?.userId).then((res) => {
      setProfile(res)
    })
  }
  useEffect(() => {
    fectProfileByCustomerId()
    fecthAllAreaId()
  }, [])

  // console.log("areeeeeeeeeeeeeeeee", allArea)
  const area = allArea.find(item => item?.areaId === profile?.areaId);
  console.log("areaaaaaaaaaaaaaaaaaaaaaaaa", area)
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fectProfileByCustomerId();
      console.log("Data refreshed!");
    });

    // Clean up the listener when the component is unmounted
    return unsubscribe;
  }, [navigation]);

  const handleLogout = () => {
    navigation.navigate("Login", { logout: true })
    dispatch(logoutUser());
    Toast.show({
      type: "success",
      text1: "Logout",
      text2: "Logout Successfully.",
    });
    setTimeout(() => {
      Toast.hide();
    }, 5000);

    // Navigate back after hiding the toast
    setTimeout(() => {
      navigation.goBack();
    }, 5100);
  }

  const clearUser = () => ({
    type: 'CLEAR_USER',
  });

  return (
    <SafeAreaView style={{
      flexDirection: "column",
      gap: 20,
      backgroundColor: "#FFF",
      height: "100%",
      flex: 1,

    }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        {/* <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ justifyContent: "center", alignItems: "center", width: 40, height: 40, backgroundColor: 'orange', borderRadius: 28, marginVertical:30 }}
        >
          <Icon.ArrowLeft style={{ color: 'white' }} strokeWidth={3} />
        </TouchableOpacity> */}
        <Text style={{
          fontWeight: '600',
          fontSize: 24,
          textAlign: 'center',
          color: '#e65332',
          borderColor: 'white',
          backgroundColor: '#fab3a2',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          marginVertical: 20,
          width: '40%',
          borderRadius: 20,
          borderWidth: 2
        }}>
          User Profile
        </Text>
        {/* <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center", width: 40, height: 40, borderRadius: 28, marginTop: 42 }}
        >
          <Icon.CreditCard style={{}} strokeWidth={3} />
        </TouchableOpacity> */}
      </View>
      <View style={{ marginHorizontal: 20, borderRadius: 10, backgroundColor: 'orange', marginVertical: 20, padding: 20, flexDirection: 'row' }}>
        <Image
          source={require('../../assets/images/avatar.jpg')}
          style={{ borderRadius: 50, width: 50, height: 50, resizeMode: "cover" }}
        />
        <View style={{ paddingHorizontal: 25 }}>
          <Text
            style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}
          >{profile?.name} #{profile?.userId}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'white' }}>Phone : {profile?.phone}</Text>
        </View>
      </View>
      {/* <TabViewSession/> */}
      <ScrollView>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.cartcard}>
            <View style={{
              paddingVertical: 25,
            }}>
              <TouchableOpacity onPress={() => navigation.navigate("EditProfile", { profile })}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20 }}>
                  <Ionicons name='person-circle-outline' size={20}> My Account </Ionicons>
                  <Ionicons name='chevron-forward-outline' size={20} />
                </View>
              </TouchableOpacity>
              <Ionicons name='call-outline' size={20} paddingVertical={20}> Phone : {profile?.phone} </Ionicons>
              <TouchableOpacity onPress={() => navigation.navigate("UpdateArea", { profile })}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:'center'}}>
                <Ionicons name='beaker-outline' size={22} paddingVertical={20}>
                <Text> Area : {area?.areaName} </Text>
                  </Ionicons>
                <Ionicons name='chevron-forward-outline' size={20} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Wallet", { user })}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}
                  >
                    <Ionicons
                      name='wallet-outline' size={20} paddingVertical={20}> Wallet :
                    </Ionicons>
                    <Text style={{ fontSize: 20 }}> {profile?.walletDto?.balance} vnd</Text>
                  </View>
                  <Ionicons name='chevron-forward-outline' size={20} paddingVertical={20} />
                </View>

              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Privacy")}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons
                      name="shield-outline"
                      size={20}
                      paddingVertical={20}
                    >
                      {" "}
                      Privacy
                    </Ionicons>
                  </View>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={20}
                    paddingVertical={20}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleLogout()}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <Ionicons
                    name='log-out-outline' size={20} paddingVertical={20}> Logout
                  </Ionicons>
                  <Ionicons name='chevron-forward-outline' size={20} paddingVertical={20} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={{
        justifyContent: 'center',
        alignItems: "center",
      }}>

      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  Text: {
    fontWeight: '600',
    fontSize: 24,
    textAlign: 'center',
    color: '#e65332',
    borderColor: 'white',
    backgroundColor: '#fab3a2',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    marginTop: 40,
    width: '40%',
    borderRadius: 20,
    borderWidth: 2
  },
  cartcard: {
    height: '99%',
    elevation: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    width: '90%'
  },
})
export default UserProfileScreen
