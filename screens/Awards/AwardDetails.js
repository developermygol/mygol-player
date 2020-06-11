import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getAwardUri, shareUri, shareUriDialog, getViewSnapshotAsBase64Async } from '../../components/Utils';
import { Localize } from '../../components/locale/Loc';
import PlayerData from '../Home/PlayerData';
import { gColors, gMetrics } from '../../GlobalStyles';
import Button from '../../components/common/Button';
import { getIconPrefix } from '../../components/Utils';
import Ionicons from '@expo/vector-icons/Ionicons';

class AwardDetails extends Component {
  static instance = null;

  static navigationOptions = {
    headerRight: (
      <TouchableOpacity
        onPress={() => {
          instance && instance.handleShare();
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

  handleShare = async () => {
    const uri = await getViewSnapshotAsBase64Async(this.snapshotView);
    shareUriDialog(uri, 'Award.Share.Title', 'Award.Share');
  };

  getAwardName = awardType => {
    return Localize('AwardType' + awardType);
  };

  render() {
    const p = this.props;
    const player = p.navigation.getParam('player');
    const award = p.navigation.getParam('award');

    const awardImgSrc = getAwardUri(award.type);

    return (
      <View style={style.View}>
        <View style={style.Wrapper} ref={r => (this.snapshotView = r)}>
          <Image style={style.Award} source={{ uri: awardImgSrc }} />

          <View style={style.Overlap}>
            <PlayerData style={style.Avatar} data={player} />

            <Text style={style.AwardType}>{this.getAwardName(award.type)}</Text>
            <Text style={style.Day}>{award.day.name}</Text>
          </View>
        </View>
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
  Wrapper: {
    alignItems: 'center',
    flex: 1,
  },
  Award: {
    marginTop: 20,
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  Overlap: {
    //marginTop: -50
    position: 'absolute',
    top: 170,
    alignItems: 'center',
  },
  AwardType: {
    fontWeight: '900',
    fontSize: 30,
    paddingVertical: 5,
    color: gColors.text2,
  },
  Day: {
    paddingVertical: 5,
  },
  Button: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 50,
  },
});

export default AwardDetails;
