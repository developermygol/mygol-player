import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { inject } from '../../node_modules/mobx-react';
import { observer } from '../../node_modules/mobx-react/native';
import { getUploadsIcon } from '../../components/Utils';
import { gColors } from '../../GlobalStyles';

@inject('store') @observer
class TournamentHead extends Component {

    componentDidMount = () => {
        const p = this.props;
        const { current } = p.store.tournaments;
        const idTournament = p.navigation.getParam('idTournament');
        if (current && current.id === idTournament) return;

        p.store.tournaments.setCurrent(idTournament);
    }

    render() {

        const tnmt = this.props.store.tournaments.current;
        if(!tnmt) return null;

        return (
            <View style={style.View}>
                {/*  Have the tnmt.logoImgUrl here as well*/}
                <Image source={{uri: getUploadsIcon(tnmt.logoImgUrl, tnmt.id, 'tournament')}} style={style.Logo} />
                <Text style={style.Title}>{tnmt.name}</Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
    View: {
        paddingTop: 10,
        backgroundColor: gColors.headerBack,
        paddingBottom: 10
    },
    Logo: {
        width: 60,
        height: 60,
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    Title: {
        fontSize: 20,
        fontWeight: '600',
        paddingTop: 10,
        textAlign: 'center',
        color: gColors.headText1
    }
});

export default TournamentHead;