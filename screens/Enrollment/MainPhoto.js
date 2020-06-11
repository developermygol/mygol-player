import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import Loc, { Localize } from '../../components/locale/Loc';
import gStyles, { gColors } from '../../GlobalStyles';
import Button from '../../components/common/Button';
import AttachImage from '../../components/common/AttachImage';
import { toast } from '../../components/Utils';
import SpinnerButton from '../../components/common/SpinnerButton';
import { observable } from 'mobx';

@inject('store') @observer
class MainPhoto extends Component {

    @observable loading = false;

    static navigationOptions = {
        title: Localize('MainPhotoScreenTitle'),
    }

    handleNextButton = async () => {
        this.loading = true;

        try {
            const image = this.capture.getImage();
            if (!image) {
                toast.error(Localize('Error.NoImageCaptured'));
                return;
            }

            const { idUser } = this.props.store.players.owner;
            const isEditing = this.props.navigation.getParam('edit');
            const res = await this.props.store.players.saveEnrollmentStep3(image, idUser, isEditing);
            if (!res) return;

            if (isEditing)
                this.props.navigation.goBack();
            else
                this.props.navigation.navigate('IdScan');
        }
        finally {
            this.loading = false;
        }
    }

    render() {
        const p = this.props;
        const isEditing = this.props.navigation.getParam('edit');

        return (

            <View style={gStyles.MainView}>
                <View style={gStyles.vcenter1}><Text style={style.Intro}><Loc>{isEditing ? 'MainPhoto.Edit' : 'MainPhoto.Intro'}</Loc></Text></View>
                <View style={gStyles.vcenter1}><Text style={style.Details}><Loc>MainPhoto.Details</Loc></Text></View>
                <AttachImage cameraOnly aspect={[1, 1]} imageSize={{ width: 200, height: 200 }} ref={c => this.capture = c} />
                <View style={gStyles.vcenter1}><Text style={style.AdditionalText}><Loc>MainPhoto.AdditionalText</Loc></Text></View>
                <SpinnerButton title={isEditing ? 'Save' : 'Next'} onPress={this.handleNextButton} style={gStyles.NextButton} loading={this.loading} />
            </View>
        )
    }
}

const style = StyleSheet.create({
    Intro: {
        fontSize: 20,
        textAlign: 'center',
        color: gColors.text1
    },
    Details: {
        textAlign: 'center',
        color: gColors.text1
    },
    AdditionalText: {
        textAlign: 'center',
        color: gColors.text1
    }
});

export default MainPhoto;