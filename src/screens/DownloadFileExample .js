import React from 'react';
import { View, Text, TouchableOpacity, PermissionsAndroid } from 'react-native';

const DownloadFileExample = ({ route }) => {
  const { link } = route.params;

  const handleDownload = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage to download the file.',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Use the link to initiate the file download
        console.log('File link:', link);

        // Download the file using react-native-fetch-blob
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
        console.warn('Storage permission denied.');
      }
    } catch (error) {
      console.error('Error during permission request:', error);
    }
  };

  return (
    <View>
      <Text>Click the button to download the file:</Text>
      <TouchableOpacity onPress={handleDownload}>
        <Text>Download File</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DownloadFileExample;
