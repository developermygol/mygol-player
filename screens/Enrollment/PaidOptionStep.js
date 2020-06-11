import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { observer, inject } from '../../node_modules/mobx-react';
import { observable, flow, action } from '../../node_modules/mobx';
import FsSpinner from '../../components/common/FsSpinner';
import { findByIdInArray } from '../../components/Data';
import ErrorBox from '../../components/common/ErrorBox';
import GlobalStyles, { gColors } from '../../GlobalStyles';
import SpinnerButton from '../../components/common/SpinnerButton';
import { Localize } from '../../components/locale/Loc';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getIconPrefix } from '../../components/Utils';

class PaidOptionItem extends Component {
    render() {
        const p = this.props;
        const { option, selected } = p;

        const icon = selected ? 'radio-button-on' : 'radio-button-off';

        return (
            <View style={style.Option}>
                <TouchableOpacity onPress={() => p.onPress(option)} style={style.OptionTouch}>
                    <Ionicons style={style.Radio} name={getIconPrefix() + icon} size={30} />
                    <View style={style.RadioText}>
                        <Text style={style.RadioTitle}>
                            {option.title}: <Text style={style.Price}>{option.price} {Localize('CurrencySymbol')}</Text>
                        </Text>
                        <View>
                            <Text style={style.RadioDesc}>{option.description}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}


@inject('store') @observer
class PaidOptionStep extends Component {

    @observable currentStepId = 0;
    @observable worflow = null;
    @observable currentWorkflowStep = null;
    @observable selectedOption = null;
    @observable error = null;

    componentDidMount = flow(function *() {
        const p = this.props;
        const pls = p.store.players;

        const wkfl = yield pls.getPaymentWorkflow(pls.owner.teamData.idTeam, pls.ownerTournamentId, pls.owner.idUser);
        if (!wkfl || !wkfl.steps || wkfl.steps.length === 0) {
            p.navigation.navigate('SocialData');
            return;
        }

        this.workflow = wkfl;
        this.setWorkflowStep(wkfl, pls.owner.teamData.enrollmentStep);
    })

    @action setWorkflowStep = (workflow, stepId) => {
        if (!workflow || !workflow.steps) return;

        this.currentStepId = stepId;

        let workflowStep = findByIdInArray(workflow.steps, stepId);
                
        if (!workflowStep) {
            workflowStep = workflow.steps[0];

            if (!workflowStep) {
                this.error = 'Error.Workflow.StepIdNotFoundInWorkflow';
                return;
            }

            stepId = 10;
        }

        this.currentStepId = stepId;
        this.currentWorkflowStep = workflowStep;
        const pls = this.props.store.players;
        const existingOption = pls.getSelectedPaymentOption(stepId);
        this.selectedOption = existingOption || workflowStep.options[0];

        this.props.navigation.setParams({title: workflowStep.title});
    }

    handleNext = async () => {
        const pls = this.props.store.players;
        const n = this.props.navigation;

        const stepData = {
            id: this.currentWorkflowStep.id, 
            title: this.currentWorkflowStep.title, 
            selectedOption: this.selectedOption
        };
        const res = await pls.saveEnrollmentStep10(stepData);
        if (!res) return;

        if (this.isLastStep(this.currentStepId))
            n.navigate('PaidOptionsSummary');
        else
            n.push('PaidOptionStep');
    }

    isLastStep = (stepId) => {
        // Get  last item of the workflow
        if (!this.workflow) return false;

        const last = this.workflow.steps[this.workflow.steps.length - 1];
        return (stepId === last.id);
    }

    render() {
        const { error, workflow, currentWorkflowStep, selectedOption } = this;  // Make sure we access the observables before any return so any change in them will trigger render again.

        if (error) return <ErrorBox lMsg={error} />
        if (!workflow || !workflow.steps) return <FsSpinner lMsg='WaitingPaymentConfig' />
        if (!currentWorkflowStep) return <ErrorBox lMsg='Error.UnknownStepInPaymentWorkflow' />

        const st = currentWorkflowStep;
        
        return (
            // DAVE: make this an scrollview
            <View style={GlobalStyles.MainView}>
                <Text style={style.StepDesc}>{st.description}</Text>
                <View style={style.OptionsWrapper}>
                    {st.options ? 
                        st.options.map(option => <PaidOptionItem key={option.id} option={option} selected={option.id === selectedOption.id} onPress={(opt) => this.selectedOption = opt} />)
                        : 
                        <Text>{Localize('Payment.NoOptions')}</Text>}
                </View>
                <SpinnerButton loading={this.props.store.players.loading} onPress={this.handleNext} style={style.Button} title={'Next'} />
            </View>
        )
    }
}

const style = StyleSheet.create({
    StepDesc: {
        marginVertical: 20,
        marginHorizontal: 10,
        textAlign: 'center',
        color: gColors.text1
    },
    OptionsWrapper: {
        marginVertical: 20
    },
    Option: {
        marginVertical: 20
    },
    OptionTouch: {
        flexDirection: 'row'
    },
    Radio: {
        flex: 1,
        marginRight: 10,
        color: gColors.buttonBorder,
        textAlign: 'center'
        
    },
    RadioText: {
        flex: 10
    },
    RadioTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: gColors.text1
    },
    RadioDesc: {
        color: gColors.text2
    },
    Price: {
        
    },
    Button: {
        position: 'absolute',
        bottom: 40,
        left: 20, 
        right: 20
    }
});

export default PaidOptionStep;