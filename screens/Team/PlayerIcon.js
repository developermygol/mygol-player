import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import GlobalStyles, { gColors } from '../../GlobalStyles';
import { getUploadsIcon } from '../../components/Utils';
import { withNavigation } from 'react-navigation';
import { inject, observer } from 'mobx-react/native';

@inject('store') @observer
class PlayerIcon extends Component {
    handlePress = () => {
        const player = this.props.data;
        const { team } = this.props;

        const idTeam = team && team.id;
        //const idTournament = team && team.tournament && team.tournament.id;
        const tournament = this.props.store.tournaments.current;
        const idTournament = tournament && tournament.id;

        this.props.navigation.push('PlayerDetails', { idPlayer: player.id, idUser: player.userData.id || player.idUser, idTeam, idTournament });
    }

    render() {
        const p = this.props;
        const player = p.data;

        const { large, noLink } = p;
        const imgSrc = player && player.userData && getUploadsIcon(player.userData.avatarImgUrl, player.userData.id, 'user');
        let name = player && (player.name + ' ' + player.surname);
        if (large) name = name && name.toUpperCase();

        const number = player.teamData && player.teamData.apparelNumber;

        return (
            <View style={[style.View, p.style]}>
                <TouchableOpacity onPress={this.handlePress}>
                    <View style={style.ImageWrapper}>
                        <Image source={{uri: imgSrc || null}} style={[style.Icon, p.large ? style.LargeLogo : style.Logo]} />
                    </View>
                    {number ? <View style={[GlobalStyles.ApparelNumberWrapper, style.PositionWrapper]}><Text style={GlobalStyles.ApparelNumber}>{number}</Text></View> : null}
                    <Text style={[(large ? style.NameLarge : style.Name), (!noLink ? style.Link : null) ]}>{name || '--'}</Text>
                    
                </TouchableOpacity>
            </View>
        )
    }
}

const style = StyleSheet.create({
    View: {
        paddingBottom: 20,
        width: 110, 
    },
    Name: {
        fontSize: 16,
        color: gColors.text1,
        textAlign: 'center',
        alignSelf: 'center',
    },
    NameLarge: {
        fontSize: 25, 
        fontWeight: '900',
        color: gColors.text1, 
        textAlign: 'center',
        alignSelf: 'center',
    },
    Icon: {
        resizeMode: 'contain',
    },
    ImageWrapper: {
        alignSelf: 'center',
        borderRadius: 40,
        borderColor: gColors.logoBorder,
        backgroundColor: gColors.logoBackground,
        overflow: 'hidden',
        marginBottom: 5,
        borderWidth: 2, 
    },
    Logo: {
        width: 80,
        height: 80,
    }, 
    LargeLogo: {
        width: 150, 
        height: 150
    },
    Link: {
        color: gColors.touchableText
    }, 
    PositionWrapper: {
        position: 'absolute',
        top: 50,
    }
});

export default withNavigation(PlayerIcon);