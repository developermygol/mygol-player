import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { getUploadsIcon } from '../../components/Utils';

class TeamLogo extends Component {
    render() {
        const p = this.props;

        const imgSrc = getUploadsIcon(p.logoImgUrl, p.id, 'team');
        
        return (
            <View style={style.View}>
                <Image source={{uri: imgSrc}} style={p.large ? style.LargeLogo : style.Logo} imageResizeMode={'contain'} />
            </View>
        )
    }
}

const style = StyleSheet.create({
    View: {
        paddingBottom: 10,
    },
    Logo: {
        width: 90,
        height: 90,
        alignSelf: 'center',
        resizeMode: 'contain'
    }, 
    LargeLogo: {
        width: 150, 
        height: 150, 
        alignSelf: 'center',
        resizeMode: 'contain'
    }
});

export default TeamLogo;