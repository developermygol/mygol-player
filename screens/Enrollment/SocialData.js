import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import Loc, { Localize } from '../../components/locale/Loc';
import gStyles from '../../GlobalStyles';
import Button from '../../components/common/Button';
import t from 'tcomb-form-native';
import SpinnerButton from '../../components/common/SpinnerButton';
import ErrorMsg from '../../components/common/ErrorMsg';
import { toast, getUploadsIcon } from '../../components/Utils';
import GlobalStyles from '../../GlobalStyles';
import SectionHead from '../../components/common/SectionHead';
import { observable } from '../../node_modules/mobx';
import { observer, inject } from '../../node_modules/mobx-react/native';
import AttachImage from '../../components/common/AttachImage';

var { Form } = t.form;

@inject('store')
@observer
class SocialData extends Component {
  static navigationOptions = {
    title: Localize('SocialDataScreenTitle'),
  };

  @observable data = this.adaptStoreToForm();

  componentDidMount = () => {
    const input = this.form.getComponent('facebookKey').refs.input;
    input.focus();
  };

  handleNextButton = async () => {
    const formData = this.form.getValue();
    if (!formData) {
      toast.error(Localize('Error.ValidationFailed'));
      return;
    }

    const image1 = this.capture.getImage();
    const st = this.props.store.players;
    const isEditing = this.props.navigation.getParam('edit');
    const result = await this.props.store.players.saveEnrollmentStep101(formData, image1, isEditing);

    if (result) {
      if (isEditing) this.props.navigation.goBack();
      else this.props.navigation.navigate('Home');
    } else {
      toast.error(st.error);
    }
  };

  SocialForm = t.struct({
    facebookKey: t.maybe(t.String),
    instagramKey: t.maybe(t.String),
    twitterKey: t.maybe(t.String),
    motto: t.maybe(t.String),
    height: t.maybe(t.Integer),
    weight: t.maybe(t.Integer),
  });

  FormOptions = {
    fields: {
      facebookKey: { label: Localize('SoFacebook'), placeholder: Localize('SoFacebook.PH') },
      instagramKey: { label: Localize('SoInstagram'), placeholder: Localize('SoInstagram.PH') },
      twitterKey: { label: Localize('SoTwitter'), placeholder: Localize('SoTwitter.PH') },
      motto: { label: Localize('SoMotto'), placeholder: Localize('SoMotto.PH') },
      height: { label: Localize('SoHeight'), placeholder: Localize('SoHeight.PH') },
      weight: { label: Localize('SoWeight'), placeholder: Localize('SoWeight.PH') },
    },
  };

  adaptStoreToForm = () => {
    const pl = this.props.store.players.owner;

    return { ...pl };
  };

  render() {
    const p = this.props;
    const store = p.store.players;
    const buttonCaption = p.navigation.getParam('edit') ? 'Save' : 'Next';

    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={style.ContainerView}>
          <View style={GlobalStyles.MainView}>
            <Text style={style.Intro}>
              <Loc>SocialData.Intro</Loc>
            </Text>
            <AttachImage
              style={style.ProfilePicture}
              image={
                this.data
                  ? getUploadsIcon(this.data.userData.avatarImgUrl, this.data.userData.id, 'user')
                  : null
              }
              label="SoProfilePicture"
              aspect={[1, 1]}
              imageSize={{ width: 160, height: 160 }}
              ref={c => (this.capture = c)}
            />
            <Form
              ref={c => (this.form = c)}
              type={this.SocialForm}
              options={this.FormOptions}
              value={this.data}
              onChange={raw => {
                this.data = raw;
              }}
            />
            <SpinnerButton
              title={buttonCaption}
              onPress={this.handleNextButton}
              style={gStyles.NextButton}
              loading={store.loading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const style = StyleSheet.create({
  ContainerView: {
    paddingBottom: 60,
  },
  View: {},
  Intro: {
    marginBottom: 20,
    textAlign: 'center',
  },
  ProfilePicture: {
    marginBottom: 20,
  },
});

export default SocialData;
