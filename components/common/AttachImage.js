import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Localize } from '../locale/Loc';
// import { Constants, ImagePicker, Permissions } from 'expo'; // SDK 34
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { observer } from '../../node_modules/mobx-react/native';
import { observable } from '../../node_modules/mobx';
import Button from './Button';
import IconButton from './IconButton';
import { gColors } from '../../GlobalStyles';
// import Expo from 'expo';
import * as FileSystem from 'expo-file-system'; // SDK 34
import * as ImageManipulator from 'expo-image-manipulator'; // SDK37

@observer
class AttachImage extends Component {
  @observable image = null;
  @observable size = 0;

  componentDidMount = () => {
    this.image = this.props.image;
  };

  getImage = () => {
    return this.image;
  };

  cameraPressed = async () => {
    const { status: cameraPerm } = await Permissions.askAsync(Permissions.CAMERA);
    const { status: cameraRollPerm } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.5,
        aspect: this.props.aspect,
      });

      this.handleImagePicked(pickerResult);
    }
  };

  galleryPressed = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
        quality: 0.5,
        allowsEditing: true,
        aspect: this.props.aspect,
      });

      this.handleImagePicked(pickerResult);
    }
  };

  handleImagePicked = async result => {
    if (result.cancelled) return;
    const oneMBtoBytes = 1000000;

    const fileInfo = await FileSystem.getInfoAsync(result.uri, (options = { size: false }));

    if (fileInfo.size > oneMBtoBytes) {
      const compressedImage = await ImageManipulator.manipulateAsync(fileInfo.localUri || fileInfo.uri, [], {
        compress: Math.round((oneMBtoBytes / fileInfo.size) * 100) / 100,
      });

      this.size = false;
      this.image = compressedImage.uri;
      return compressedImage;
    }

    this.size = fileInfo.size;
    this.image = result.uri;
    return fileInfo;
  };

  render() {
    const p = this.props;
    return (
      <View style={[style.View, p.style]}>
        {p.label ? <Text style={style.Label}>{Localize(p.label)}</Text> : null}
        <View style={style.Horizontal}>
          {this.image ? <Image source={{ uri: this.image }} style={[style.Image, p.imageSize]} /> : null}
          <View
            style={
              this.image
                ? style.CameraButtons
                : [style.CameraButtonsHorizontal, { height: p.imageSize && p.imageSize.height }]
            }
          >
            <IconButton icon="camera" size={30} color={gColors.text1} onPress={this.cameraPressed} />
            {p.cameraOnly ? null : (
              <IconButton icon="photos" size={30} color={gColors.text1} onPress={this.galleryPressed} />
            )}
          </View>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  View: {},
  Image: {
    height: 200,
    width: 300,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: gColors.text1,
    backgroundColor: 'white',
  },
  Horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Label: {
    fontSize: 16,
    marginBottom: 5,
  },
  CameraButtons: {
    width: 120,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  CameraButtonsHorizontal: {
    borderWidth: 1,
    borderColor: gColors.text2,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 200,
    flex: 1,
  },
});

export default AttachImage;
