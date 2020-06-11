import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import Loc, { Localize } from '../../components/locale/Loc';
import gStyles from '../../GlobalStyles';
import Button from '../../components/common/Button';
import AttachImage from '../../components/common/AttachImage';
import { toast } from '../../components/Utils';
import SpinnerButton from '../../components/common/SpinnerButton';
import { observable } from 'mobx';

@inject('store') @observer
class IdScan extends Component {

    @observable loading = false;

    static navigationOptions = {
        title: Localize('IdScanScreenTitle'),
    }
    
    handleNextButton = async () => {

        this.loading = true;

        try
        {
            const image1 = this.capture1.getImage();
            const image2 = this.capture2.getImage();
            if (!image1 || !image2)
            {
                toast.error(Localize('Error.NoImageCaptured'));
                return;
            }

            const { owner } = this.props.store.players;
            const isEditing = this.props.navigation.getParam('edit');
            const res = await this.props.store.players.saveEnrollmentStep4(image1, image2, owner, isEditing);
            if (!res) return;

            if (isEditing)
                this.props.navigation.goBack();
            else
                this.props.navigation.navigate('PaidOptionStep');
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
                <View style={gStyles.vcenter1}><Text style={style.details}><Loc>IdScan.Details</Loc></Text></View>
                <AttachImage cameraOnly label='IdScan.Front' aspect={[86, 54]} imageSize={{width: 230, height: 160}} ref={c => this.capture1 = c} />
                <AttachImage cameraOnly label='IdScan.Back' aspect={[86, 54]} imageSize={{width: 230, height: 160}} ref={c => this.capture2 = c} />
                <SpinnerButton loading={this.loading} title={isEditing ? 'Save' : 'Next'} onPress={this.handleNextButton} style={gStyles.NextButton} />
            </View>
        )
    }
}

const style = StyleSheet.create({
    view: {
        flex: 1,
        padding: 20
    },
    details: {
        textAlign: 'center',
        marginBottom: 20
    },
});

export default IdScan;