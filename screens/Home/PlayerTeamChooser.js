import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, StatusBar } from 'react-native';
import { inject } from '../../node_modules/mobx-react/native';
import { observer } from '../../node_modules/mobx-react';
import { observable, flow, action } from '../../node_modules/mobx';
import ErrorBox from '../../components/common/ErrorBox';
import { gColors, gMetrics, GS } from '../../GlobalStyles';
import { Localize } from '../../components/locale/Loc';
import { getUploadsIcon } from '../../components/Utils';
import FsSpinner from '../../components/common/FsSpinner';
import Button from '../../components/common/Button';
import { findByIdInArray } from '../../components/Data';


@inject('store')
class TeamListItem extends Component {
    render() {
        const { item, onPressItem } = this.props;
        const { tournament } = item;

        const seasons = this.props.store.organization.seasons.all;
        const season = tournament && seasons ? findByIdInArray(seasons, tournament.idSeason) : null;

        return (
            <View style={[GS.box.card, style.TeamItem]}>
                <TouchableOpacity onPress={() => onPressItem(item.id)}>
                    <View style={style.Item}>
                        <Image source={{uri: getUploadsIcon(item.logoImgUrl, item.id, 'team')}} style={style.ItemIcon} />
                        <View style={style.Column}>
                            <Text style={style.TeamName}>{item.name}</Text>
                            <Text style={style.TournamentName}>{item.tournament && item.tournament.name}</Text>
                            {season ? <Text style={style.SeasonName}>{season.name}</Text> : null }
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}



@inject('store', 'ui') @observer
class PlayerTeamChooser extends Component {

    static navigationOptions = {
        title: Localize('Choose team'),
    }

    @observable error = null;
    @observable teams = null;

    componentDidMount = flow(function *() {
        const p = this.props;
        const { idUser } = p.ui.auth;

        // Load organizacion
        const org = yield p.store.organization.fetch();

        // Load player
        const player = yield p.store.players.getUser(idUser);

        if (!player) {
            this.error = 'Error.NoPlayerData';
            return;
        }

        p.store.players.setOwner(player);

        if (!player.teams || player.teams.length === 0) {
            this.error = 'Error.PlayerWithoutTeams';
            return;
        }

        if (player.teams.length === 1) {
            this.navigateToTeamNextScreen(player.teams[0])
            return;
        }
        
        this.teams = player.teams.filter(team => team); // Filter null teams
    })

    isPlayerInEnrollment = (teamData) => {
        return (teamData.enrollmentStep < 100);
    }

    navigateToTeamNextScreen = (team) => {
        if (!team || !team.teamData) {
            this.error = 'Error.NoTeamData';
            return;
        }

        this.props.store.players.setOwnerTeam(team);

        // Navigate to welcome or to home
        const n = this.props.navigation;
        n.navigate( this.isPlayerInEnrollment(team.teamData) ? 'Welcome' : 'Home' );
        
        // DEBUG: move to specific screen
        //n.navigate('SanctionDetails', { idSanction: 18 });
    }

    handlePress = (team) => {
        this.navigateToTeamNextScreen(team);
    }

    goToLoginHandler = () => {
        this.props.navigation.navigate('Login');
    }


    render() {
        const p = this.props;
        if (this.error) return (
            <View style={style.View}>
                <ErrorBox lMsg={this.error} />
                <Button title='GoToLogin' onPress={this.goToLoginHandler} />
            </View>
        )
        
        if (!this.teams || p.store.organization.loading) return <FsSpinner lMsg='Loading player data' />

        return (
            <View style={style.View}>
                <StatusBar barStyle='dark-content' />
                <Text style={style.IntroText}>{Localize('MoreThanOneTeam.Choose')}</Text>
                <FlatList
                    data={this.teams}
                    renderItem={({item}) => <TeamListItem item={item} onPressItem={() => this.handlePress(item)} />}
                    keyExtractor={(item, i) => item.id.toString() + '-' + i}
                />
            </View>
        )
    }
}

const style = StyleSheet.create({
    View: {
        backgroundColor: gColors.background,
        padding: gMetrics.screenPadding,
        flex: 1
    },
    IntroText: {
        marginTop: 30,

        marginBottom: 10
    },
    Item: {
        marginHorizontal: 10,
        flexDirection: 'row',
        paddingVertical: 5, 
        alignItems: 'center'
    },
    TeamItem: {
        marginVertical: 5,
        borderRadius: 3,
        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.20,
        shadowRadius: 4.41,
        elevation: 5,
    },
    ItemIcon: {
        height: 60, 
        width: 60, 
        resizeMode: 'contain',
        marginRight: 15
    },
    TeamName: {
        color: gColors.text1, 
        marginBottom: 8
    },
    TournamentName: {
        color: gColors.text2,
        fontSize: 12,
        marginBottom: 3
    },
    SeasonName: {
        color: gColors.text2,
        fontSize: 12,
    },
    Column: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

});

export default PlayerTeamChooser;