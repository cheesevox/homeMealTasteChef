import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Linking } from 'react-native'
import * as Icon from "react-native-feather";
import { SafeAreaView } from 'react-native-safe-area-context';
import { createPayment, getMoneyExportFile } from '../Api';
import { userimage } from '../Constant';
import { CheckBox } from 'react-native-elements'
import DownloadFileExample from './DownloadFileExample ';

const WalletScreen = ({ navigation, route }) => {
  const { user } = route.params;
  console.log("itemmmmmmmmmmm", user)
  console.log("kitchne Idddddddddddddd", user?.kitchenId)
  const [link, setLink] = useState('')
  const [value, setValue] = useState('')
  const [isSelected, setSelection] = useState(false);
  // const [values, setValues] = useState({
  //   kitchenId: item?.kitchenId,
  //   balance: null,
  // })


  const createFile = () => {
    getMoneyExportFile(user?.kitchenId, value).then((res) => {
      console.log("link file export: ", res)
      setLink(res)
    })
  }

  const handleDownload = () => {
    if (link) {
      RNFetchBlob.config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: RNFetchBlob.fs.dirs.DownloadDir + '/myfile.pdf',
        },
      })
        .fetch('GET', link)
        .then((res) => {
          console.log('File downloaded successfully:', res.path());
        })
        .catch((error) => {
          console.error('Error downloading file:', error);
        });
    } else {
      console.warn('No link available to download');
    }
  };
  console.log("link", link)

  const openLink = async () => {
    const url = link;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
      console.log(" open succes : ", url);
    } else {
      console.error(`Cannot open URL: ${url}`);
    }
  };

  const handlePressWithrow = async () => {
    // Call createPaymentCustomer first
    await getMoneyExportFile(values);
    // Then open the link
    //  openLink();
    setSelection(!isSelected);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ justifyContent: "center", alignItems: "center", width: 40, height: 40, position: 'relative', backgroundColor: 'orange', borderRadius: 28, marginTop: 42 }}
          >
            <Icon.ArrowLeft style={{ color: 'white' }} strokeWidth={3} />
          </TouchableOpacity>
          <Text style={styles.walletText}>
            Wallet
          </Text>
          <TouchableOpacity
            // onPress={() => navigation.navigate("OrderCart")}
            style={{ justifyContent: "center", alignItems: "center", width: 40, height: 40, position: 'relative', borderRadius: 28, marginTop: 42 }}
          >
            <Icon.CreditCard style={{}} strokeWidth={3} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 3, alignItems: 'center' }}>
        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 20,
            width: '80%',
            justifyContent: 'center',
            height: '80%',
            backgroundColor: '#9d63db',
            borderRadius: 30,
            padding: 15,
          }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <MaterialCommunityIcons name='integrated-circuit-chip' color={'yellow'} size={50}></MaterialCommunityIcons>
            <Image source={require("../../assets/images/mastercard.png")} style={{ width: 50, height: 50 }}></Image>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 2, justifyContent: 'space-evenly' }}>
            <Text style={{ fontSize: 20, color: 'white' }}> XXXX</Text>
            <Text style={{ fontSize: 20, color: 'white' }}> XXXX</Text>
            <Text style={{ fontSize: 20, color: 'white' }}> XXXX</Text>
            <Text style={{ fontSize: 20, color: 'white' }}> XXXX</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>
                CARD HOLDER NAME
              </Text>
              <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>
                CHEESE VOX NEE
              </Text>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>12/25</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 4, marginHorizontal: 30 }}>
        {/* <Text style={{fontSize:20, fontWeight:'bold', color:'white'}}>Balance :</Text> */}
        <Text style={{ fontSize: 21, fontWeight: 'bold', color: 'orange' }}>
          Balance : {user?.walletDtoResponse?.balance} vnd</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Input For Reacharge</Text>
        <View style={{ borderWidth: 2, padding: 20, borderRadius: 30, width: '100%', marginTop: 10 }}>
          <TextInput placeholder='Input monney incomming'
            onChangeText={(text) => setValue(text)}
          ></TextInput>
        </View>

      </View>
      {/* <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <TouchableOpacity
          onPress={creteFile()}
          style={{
            backgroundColor: "#f96163",
            borderRadius: 29,
            paddingVertical: 18,
            width: "60%",
            marginBottom: 20
          }}
        >

          <Text style={{ textAlign: 'center', fontSize: 18, color: "#fff", fontWeight: "700", }}>
            Withdraw Money Export File
          </Text>
        </TouchableOpacity>

      </View> */}
      <View>
      <Text>Click the button to create a file and download:</Text>
      <TouchableOpacity onPress={createFile}>
        <Text>Create File</Text>
      </TouchableOpacity>

      <Text>Click the button to download the file:</Text>
      <TouchableOpacity onPress={handleDownload}>
        <Text>Download File</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wallet: {
    backgroundColor: 'rgba(98, 83, 196, 0.8)',
    borderRadius: 29,
    paddingVertical: 18,
    width: '80%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 30,
    marginHorizontal: 50,
    marginTop: 20,
  },
  walletText: {
    fontWeight: '600',
    justifyContent: 'center',
    fontSize: 26,
    alignContent: 'center',
    textAlign: 'center',
    color: '#e65332',
    borderColor: 'white',
    backgroundColor: '#fab3a2',
    fontWeight: 'bold',
    marginTop: 40,
    width: '40%',
    borderRadius: 20,
    borderWidth: 2
  }
})

export default WalletScreen