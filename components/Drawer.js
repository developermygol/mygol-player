import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import FontAwesome from '../node_modules/@expo/vector-icons/FontAwesome';
import { Localize, setLang } from './locale/Loc';
import { inject } from '../node_modules/mobx-react';
import { observer } from '../node_modules/mobx-react/native';
import { gColors } from '../GlobalStyles';
import { toast } from './Utils';
import { withNavigation } from 'react-navigation';
import { loadUserOrganitzations } from '../store-redux/actions/userOrganitzations';

class DrawerItem extends Component {
  handlePress = () => {
    const p = this.props;

    if (p.onPress) {
      p.onPress();
      return;
    }

    if (p.navigate && p.navigation) p.navigation.navigate(p.navigate, p.navigationParams);
  };

  render() {
    const p = this.props;

    return (
      <TouchableOpacity style={style.Item} onPress={this.handlePress} activeOpacity={0.2}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {p.icon ? (
            <FontAwesome name={p.icon} size={22} style={style.ItemIcon} color={gColors.text1} />
          ) : null}
          <Text style={style.ItemText}>{Localize(p.title)}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

@inject('store', 'ui')
@observer
class Drawer extends Component {
  state = {
    userOrganizations: null,
  };

  handleLogout = () => {
    toast.confirm(Localize('Confirm'), Localize('Logout?')).then(res => {
      if (res !== 'Yes') return;
      const p = this.props;
      p.ui.auth.logout().then(res => {
        p.navigation.navigate('First');
      });
    });
  };

  componentDidMount = async () => {
    const userOrganizations = await loadUserOrganitzations(this.props.store.players.current.userData.email);
    this.setState({ userOrganizations });
  };

  componentDidUpdate = async () => {
    if (!this.state.userOrganizations) {
      const userOrganizations = await loadUserOrganitzations(this.props.store.players.current.userData.email);
      this.setState({ userOrganizations });
    }
  };

  render() {
    const p = this.props;
    const pl = p.store.players.current;
    const showSelectTeam = pl && pl.teams && pl.teams.length > 1;
    const showSelectOrg = this.state.userOrganizations && this.state.userOrganizations.length > 1;

    return (
      <View style={style.View}>
        <View style={style.Top}></View>
        <DrawerItem title="Home" navigate="Home" icon="user-circle" navigation={p.navigation} />
        <DrawerItem title="Tournaments" navigate="TournamentsList" icon="trophy" navigation={p.navigation} />
        {/* <DrawerItem title='News' navigate='News' icon='newspaper-o' navigation={p.navigation} /> */}
        <DrawerItem title="Ficha" navigate="FichaRoot" icon="id-card" navigation={p.navigation} />
        <DrawerItem title="TermsAndConditions" navigate="Terms" icon="file" navigation={p.navigation} />
        <DrawerItem title="Configuration" navigate="Configuration" icon="gear" navigation={p.navigation} />
        {/* Show select org */}
        {showSelectOrg && (
          <DrawerItem
            title="Select organization"
            navigate="PlayerOrgChooser"
            icon="child"
            navigation={p.navigation}
            navigationParams={{
              data: { email: this.props.store.players.current.userData.email },
              organizations: this.state.userOrganizations,
            }}
          />
        )}

        {showSelectTeam ? (
          <DrawerItem
            title="Select my team"
            navigate="PlayerTeamChooser"
            icon="child"
            navigation={p.navigation}
          />
        ) : null}
        <DrawerItem title="Logout" onPress={this.handleLogout} icon="sign-out" />
      </View>
    );
  }
}

const style = StyleSheet.create({
  View: {
    flex: 1,
    backgroundColor: gColors.background,
  },
  Item: {
    padding: 15,
  },
  ItemText: {
    fontWeight: '600',
    color: gColors.text1,
  },
  ItemIcon: {
    marginLeft: 5,
    marginRight: 15,
    width: 30,
  },
  Top: {
    height: 80,
    backgroundColor: '#EEE',
    alignItems: 'center',
  },
});

export default withNavigation(Drawer);
