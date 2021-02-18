import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
  getAwardUri,
  shareUri,
  shareUriDialog,
  getViewSnapshotAsBase64Async,
  getUploadsIcon,
} from '../../components/Utils';
import { Localize } from '../../components/locale/Loc';
import PlayerData from '../Home/PlayerData';
import { gColors, gMetrics } from '../../GlobalStyles';
import { getIconPrefix } from '../../components/Utils';
import Ionicons from '@expo/vector-icons/Ionicons';
import ViewShot from 'react-native-view-shot';
import config from '../../Config';

class AwardDetails extends Component {
  static instance = null;

  static navigationOptions = {
    headerRight: (
      <TouchableOpacity
        onPress={() => {
          const awardId = instance.props.navigation.getParam('award').id;
          instance && instance.handleShare(awardId);
        }}
      >
        <Ionicons
          name={getIconPrefix() + 'share'}
          size={25}
          color={gColors.headerTint}
          style={{ marginRight: 20 }}
        />
      </TouchableOpacity>
    ),
  };

  componentDidMount = () => {
    instance = this;
  };

  handleShare = async awardId => {
    // const result = await this.refs.viewShot.capture();
    // 🔎 Link to public player award
    shareUriDialog(
      `${config.reactAppDirectoryPublicWebUrl}/awards/${awardId}`,
      'Award.Share.Title',
      'Award.Share'
    );

    // this.refs.viewShot.capture().then(uri => {
    //   console.log('do something with ', uri);
    //   // shareUriDialog(uri, 'Award.Share.Title', 'Award.Share');
    // });

    // const uri = await getViewSnapshotAsBase64Async(this.snapshotView);
    // shareUriDialog(uri, 'Award.Share.Title', 'Award.Share');
  };

  getAwardName = awardType => {
    return Localize('AwardType' + awardType);
  };

  onCapture = uri => {
    console.log('do something with ', uri);
  };

  render() {
    const p = this.props;
    const player = p.navigation.getParam('player');
    const award = p.navigation.getParam('award');

    const awardImgSrc = getAwardUri(award.type, true);
    const imgPlayerSrc = getUploadsIcon(player.userData.avatarImgUrl, p.id, 'user');

    return (
      <View style={style.View}>
        <View style={style.ImageWrapper}>
          <Image source={{ uri: imgPlayerSrc }} style={style.Avatar} />
        </View>
        <ViewShot
          style={style.Wrapper}
          ref="viewShot"
          options={{ result: 'data-uri', quality: 1, format: 'png' }}
        >
          {/* <View style={style.Wrapper} ref={r => (this.snapshotView = r)}> */}
          <Image style={style.Award} source={{ uri: awardImgSrc }} />

          <View style={style.Overlap}>
            <Text>{award.tournament.name}</Text>
            <Text style={style.PlayerName}>{(player.name + ' ' + player.surname).toUpperCase()}</Text>
            <Text style={style.AwardType}>{this.getAwardName(award.type)}</Text>
            <Text style={style.Day}>{award.day.name}</Text>
          </View>
          {/* </View> */}
        </ViewShot>
        {/* <Button style={style.Button}  title='Award.Share' onPress={this.handlePress}/> */}
      </View>
    );
  }
}

const style = StyleSheet.create({
  View: {
    flex: 1,
    padding: gMetrics.screenPadding,
  },
  ImageWrapper: {
    alignSelf: 'center',
    borderRadius: 100,
    borderColor: gColors.logoBorder,
    backgroundColor: gColors.logoBackground,
    overflow: 'hidden',
    marginBottom: 5,
    borderWidth: 0,
  },
  Avatar: {
    resizeMode: 'contain',
    width: 150,
    height: 150,
  },
  PlayerName: {
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
    color: gColors.text1,
  },

  Wrapper: {
    alignItems: 'center',
    flex: 1,
  },
  Award: {
    marginTop: 20,
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  Overlap: {
    marginTop: -100,
    position: 'absolute',
    top: 170,
    alignItems: 'center',
  },
  AwardType: {
    fontWeight: '900',
    fontSize: 30,
    paddingVertical: 5,
  },
  Day: {
    paddingVertical: 5,
  },
});

export default AwardDetails;
