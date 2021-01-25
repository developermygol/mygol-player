import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, StatusBar } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { observable, flow } from 'mobx';
import { observer } from 'mobx-react';
import QRCode from 'react-native-qrcode';

import FsSpinner from '../../components/common/FsSpinner';
import { gColors, gMetrics } from '../../GlobalStyles';
import { Localize } from '../../components/locale/Loc';
import {
  getIconPrefix,
  getViewSnapshotAsBase64Async,
  shareUriDialog,
  getUploadsIcon,
  getFormattedDate,
} from '../../components/Utils';
import { requestAsync } from '../../components/Utils';
import axios from '../../axios';
import InfoBox from '../../components/common/InfoBox';
import ErrorBox from '../../components/common/ErrorBox';
import { inject } from '../../node_modules/mobx-react/native';
import { headerNavigationOptions } from '../Home/Home';

class FichaField extends Component {
  render() {
    const p = this.props;
    return (
      <View style={[style.Field, p.style]}>
        <Text style={style.FieldTitle}>{Localize(p.title)}</Text>
        <Text style={style.FieldValue}>{p.value}</Text>
      </View>
    );
  }
}

@inject('store')
@observer
class Ficha extends Component {
  static instance = null;

  static navigationOptions = p => {
    //const headerOpts = headerNavigationOptions(p);
    return {
      //...headerOpts,
      title: Localize('Ficha'),
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
  };

  @observable data = null;
  @observable loading = false;
  @observable error = null;

  componentDidMount = () => {
    instance = this;
    this.loadData();
  };

  componentDidUpdate = () => {
    if (this.data) return;
    // this.loadData();
  };

  handleShare = async () => {
    const uri = await getViewSnapshotAsBase64Async(this.fichaView);
    shareUriDialog(uri, 'Ficha.Share.Title', 'Ficha.Share');
  };

  getQrPayload = (idPlayer, idUser, idTeam) => {
    return 'ID' + idPlayer + '|UID' + idUser + '|TID' + idTeam + '|';
  };

  loadData = flow(function* () {
    const p = this.props;
    const store = p.store.players;

    const idTournament = store.ownerTournamentId;
    const idTeam = store.owner.teamData.idTeam;
    this.data = yield requestAsync(this, axios.get, null, '/players/ficha/' + idTournament + '/' + idTeam);
  });

  render() {
    if (this.error) return <ErrorBox msg={this.error} />;
    if (!this.data) return <FsSpinner lMsg="Loading ficha details" />;

    const pl = this.data;
    if (!pl.teams || pl.teams.length === 0) return <InfoBox lMsg="Error.NoTeamsInFicha" />;

    const t = pl.teams[0];
    if (!t.tournaments || t.tournaments.length === 0) return <InfoBox lMsg="Error.NoTournamentsInFicha" />;

    const tnmt = t.tournaments[0];

    const org = this.props.store.organization.current;

    // console.log('pl', pl);
    // console.log('UserImage:', getUploadsIcon(pl.fichaPictureImgUrl, pl.id, 'user'));
    // console.log('TeamImage:', getUploadsIcon(t.logoImgUrl, t.id, 'team'));

    return (
      <View style={style.View}>
        <StatusBar barStyle="light-content" />
        {/* <View style={style.imageContainer}>
          <Image
            source={{
              uri: 'http://52.157.151.14:3006/static/team/default3.png',
            }}
            style={style.image}
          />
          <Image
            source={{
              uri: getUploadsIcon(pl.fichaPictureImgUrl, pl.id, 'user'),
            }}
            style={style.image}
          />
        </View> */}
        <ScrollView contentContainerStyle={style.ContainerView} ref={c => (this.fichaView = c)}>
          <View style={style.Head}>
            <Text style={style.Org}>{org ? org.name : ''}</Text>
          </View>
          <Text style={style.Tournament}>
            {tnmt.name} ({tnmt.mode && tnmt.mode.name})
          </Text>
          <View style={[style.Horizontal, { marginBottom: 20 }]}>
            <View
              // style={style.imageContainer}
              style={[style.Half, style.PictureWrapper]}
            >
              <Image
                // style={style.image}
                style={style.Picture}
                source={{ uri: getUploadsIcon(pl.fichaPictureImgUrl, pl.id, 'user') }}
              />
            </View>
            {/* <View style={[style.Half, { alignItems: 'center' }]}>
              <QRCode
                value={this.getQrPayload(pl.id, pl.idUser, t.id)}
                bgColor={gColors.background}
                fgColor={gColors.intense}
                size={150}
              />
            </View> */}
          </View>

          <View style={style.Horizontal}>
            <FichaField style={{ flex: 1 }} title="Ficha.Number" value={pl.idUser} />
            <FichaField style={{ flex: 1 }} title="Ficha.Season" value={tnmt.season && tnmt.season.name} />
          </View>
          <View style={style.Horizontal}>
            <FichaField style={{ flex: 1 }} title="Ficha.Name" value={pl.name} />
            <FichaField style={{ flex: 1 }} title="Ficha.Surname" value={pl.surname} />
          </View>
          <View style={style.Horizontal}>
            <FichaField style={{ flex: 1 }} title="Ficha.IdCard" value={pl.idCardNumber} />
            <FichaField style={{ flex: 1 }} title="Ficha.BirthDate" value={getFormattedDate(pl.birthDate)} />
          </View>
          <View style={style.Horizontal}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Image style={style.TeamLogo} source={{ uri: getUploadsIcon(t.logoImgUrl, t.id, 'team') }} />
            </View>
            <View style={{ flex: 3 }}>
              <FichaField title="Ficha.Team" value={t.name} />
              <FichaField title="Ficha.Apparel" value={t.teamData.apparelNumber} />
            </View>
          </View>
        </ScrollView>
        {/* <Button title='Share' onPress={this.handleShare} /> */}
      </View>
    );
  }
}

const style = StyleSheet.create({
  View: {
    backgroundColor: gColors.background,
    flex: 1,
    justifyContent: 'center',
  },
  ContainerView: {
    padding: gMetrics.screenPadding,
  },
  Head: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  Org: {
    alignSelf: 'stretch',
  },
  Tournament: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 25,
    fontWeight: '600',
  },
  PictureWrapper: {},
  Picture: {
    resizeMode: 'contain',
    aspectRatio: 1,
    height: 150,
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
  },
  Horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  Half: {
    flex: 1,
  },
  Field: {
    marginBottom: 10,
  },
  FieldTitle: {
    color: gColors.text2,
  },
  FieldValue: {
    fontSize: 26,
    color: gColors.intense,
  },
  TeamLogo: {
    flex: 1,
    height: 100,
    resizeMode: 'contain',
  },
  imageContainer: {
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Ficha;
