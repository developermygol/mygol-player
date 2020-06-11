import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import PlayerAvatar from './PlayerAvatar';
import { getAge } from '../../components/Utils';
import { Localize } from '../../components/locale/Loc';
import { gColors } from '../../GlobalStyles';

import Back from '../../assets/backgrounds/top1.jpg';
import BackBottom from '../../assets/backgrounds/top1b.jpg';

class PlayerData extends Component {
    
    componentDidMount = () => {
        // Load avatar img
    }

    render() {
        const p = this.props;
        const { data } = this.props;

        if (!data) return null;
        const age = getAge(data.birthDate);

        return (
            <View style={[{flex: 1, width: '100%'}, style.View]}>
                <ImageBackground source={Back} style={[p.style]}>
                    <PlayerAvatar avatarImgUrl={data.userData.avatarImgUrl} id={data.id} />
                    <Text style={style.PlayerName}>{(data.name + ' ' + data.surname).toUpperCase()}</Text>
                    {p.age ? <Text style={style.PlayerAge}>{age ? age + ' ' + Localize('Years') : null}</Text> : null}
                    {p.motto ? <Text style={style.PlayerMotto}>{(data.motto ? '"' + data.motto + '"': null)}</Text> : null}
                </ImageBackground>
                <Image source={BackBottom} style={{width: '100%'}} />
            </View>
        )
    }
}

const style = StyleSheet.create({
    View: {
        width: '100%'
    },
    PlayerName: {
        fontSize: 30,
        fontWeight: '800',
        textAlign: 'center',
        color: gColors.headText1
    },
    PlayerAge: {
        textAlign: 'center',
        paddingBottom: 10,
        color: gColors.headText1
    },
    PlayerMotto: {
        fontStyle: 'italic',
        textAlign: 'center',
        color: gColors.headText2
    }

});

export default PlayerData;