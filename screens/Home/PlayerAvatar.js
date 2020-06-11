import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { getUploadsIcon } from '../../components/Utils';
import { gColors } from '../../GlobalStyles';


class PlayerAvatar extends Component {
    render() {
        const p = this.props;

        const imgSrc = getUploadsIcon(p.avatarImgUrl, p.id, 'user');
        return (
            <View style={style.View}>
                 <View style={style.ImageWrapper}>
                    <Image source={{uri: imgSrc}} style={style.Avatar} />
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    View: {
        paddingBottom: 10,

    },
    ImageWrapper: {
        alignSelf: 'center',
        borderRadius: 50,
        borderColor: gColors.logoBorder,
        backgroundColor: gColors.logoBackground,
        overflow: 'hidden',
        marginBottom: 5,
        borderWidth: 0,
    },
    Avatar: {
        resizeMode: 'contain',
        width: 100,
        height: 100,

    }
});

export default PlayerAvatar;