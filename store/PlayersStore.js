import { observable, flow, action, toJS } from 'mobx';
import { requestAsync, toast } from '../components/Utils';
import { updateByIdInArray, updateOrInsertInArray, findByIdInArray } from '../components/Data';
import axios from '../axios';
import { Localize } from '../components/locale/Loc';
import { getStripeCardToken } from './StripePaymentGateway';

const playerAvatar = 200;
const playerIdCard1UploadType = 203;
const playerIdCard2UploadType = 204;
const playerIdPhotoUploadType = 205;

class PlayersStore {
  @observable current = null;
  @observable all = null;
  @observable loading = false;
  @observable error = null;

  @observable owner = null;
  @observable ownerTournamentId = -1;
  @observable selectedPaymentOptions = [];

  workflow = null;

  rootStore = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action setOwner = player => {
    this.owner = player;
  };

  setOwnerTeam = flow(function* (team) {
    // Disconnect the teamData inside the team to assign to player.teamData with .team inside
    // They are the same data structure, but the order is reversed. Make a copy so object can still be
    // used after coming here.

    const clonedTeam = { ...team };

    const td = clonedTeam.teamData;
    clonedTeam.teamData = null;
    td.team = clonedTeam;
    this.owner.teamData = td;

    if (team.teamData && team.teamData.enrollmentData)
      this.selectedPaymentOptions = JSON.parse(team.teamData.enrollmentData);

    this.ownerTournamentId = team.tournament && team.tournament.id;
    yield this.rootStore.tournaments.setCurrent(this.ownerTournamentId);
  });

  getUser = flow(function* (idUser, idTeam = -2, idTournament = -2) {
    this.current = null;

    const result = yield requestAsync(
      this,
      axios.get,
      null,
      '/players/user/' + idUser + '/' + idTeam + '/' + idTournament
    );

    if (result && result.teams) result.teams = result.teams.filter(team => team); // Filter null teams

    this.current = result;

    if (this.all) updateByIdInArray(this.all, result.id, result);
    else this.all = [result];

    return result;
  });

  // __ Enrollment __________________________________________________________

  @action saveEnrollmentStep1 = () => {};

  saveEnrollmentStep2 = flow(function* (data, player, isEditing) {
    // send the owner data to the backend.
    this.owner = player;
    this.owner.enrollmentStep = 3;

    enrollData = { ...data, idStep: 2, idPlayer: player.id, idTeam: player.teamData.idTeam, isEditing };
    const result = yield this.updateEnrollmentStep(enrollData);
    return result;
  });

  saveEnrollmentStep3 = flow(function* (uri, idUser, isEditing) {
    const res = yield this.uploadImage(uri, idUser, playerIdPhotoUploadType, true);
    if (!res) return null;

    this.owner.enrollmentStep = 4;

    enrollData = { idStep: 3, isEditing };
    const result = yield this.updateEnrollmentStep(enrollData);

    return result;
  });

  saveEnrollmentStep4 = flow(function* (uri1, uri2, owner, isEditing) {
    const player = this.owner;
    const { idUser } = player;

    let res1 = yield this.uploadImage(uri1, idUser, playerIdCard1UploadType, true);
    if (!res1) return null;

    const res2 = yield this.uploadImage(uri2, idUser, playerIdCard2UploadType, true);
    if (!res2) return null;

    this.owner.enrollmentStep = 10;
    this.owner.teamData.enrollmentStep = 10;

    enrollData = {
      idStep: 4,
      idPlayer: player.id,
      idTeam: player.teamData.idTeam,
      idTournament: this.ownerTournamentId,
      isEditing,
    };
    const result = yield this.updateEnrollmentStep(enrollData);

    return result;
  });

  saveEnrollmentStep10 = flow(function* (stepData) {
    updateOrInsertInArray(this.selectedPaymentOptions, stepData.id, stepData);

    this.owner.teamData.enrollmentStep = stepData.id + 1;

    return true;
  });

  saveEnrollmentStep20 = flow(function* () {
    this.owner.teamData.enrollmentStep = 21;

    // Save payment options
    const player = this.owner;
    const paymentOptions = toJS(this.selectedPaymentOptions);
    enrollData = {
      idStep: 20,
      idPlayer: player.id,
      idTeam: player.teamData.idTeam,
      idTournament: this.ownerTournamentId,
      SelectedOptionsJson: JSON.stringify(paymentOptions),
    };
    const result = yield this.updateEnrollmentStep(enrollData);

    return result;
  });

  saveEnrollmentStep21 = flow(function* (paymentForm) {
    // Call the payment gateway, get card token. Send that to the server so it can process the payment.

    const player = this.owner;

    let res = { id: -1 };

    if (paymentForm) {
      const org = this.rootStore.organization.current;
      if (!org || !org.paymentKeyPublic) {
        this.error = 'Error.OrgPaymentNotConfigured';
        return false;
      }

      res = yield getStripeCardToken(this, paymentForm, org.paymentKeyPublic);
      if (!res) {
        this.error = Localize('Error.PaymentGateway');
        return false;
      }
      if (res.error) {
        this.error = res.error.message;
        return false;
      }
    }

    enrollData = {
      idStep: 21,
      idPlayer: player.id,
      idTeam: player.teamData.idTeam,
      idTournament: this.ownerTournamentId,
      paymentGatewayResult: res.id,
    };
    const result = yield this.updateEnrollmentStep(enrollData);
    if (result == null) {
      this.error = 'Error.PaymentBackend';
      return false;
    }

    this.owner.teamData.enrollmentStep = 100;
    return true;
  });

  saveEnrollmentStep100 = flow(function* () {
    const player = this.owner;
    enrollData = {
      idStep: 100,
      idPlayer: player.id,
      idTeam: player.teamData.idTeam,
      idTournament: this.ownerTournamentId,
    };
    const result = yield this.updateEnrollmentStep(enrollData);

    this.owner.teamData.enrollmentStep = 101;

    return true;
  });

  saveEnrollmentStep101 = flow(function* (data, image, isEditing) {
    const player = this.owner;
    const { idUser } = player;

    let res1 = null;

    if (image) {
      res1 = yield this.uploadImage(image, idUser, playerAvatar, false);
      if (!res1) return null;

      this.owner.userData.avatarImgUrl = res1;
    }

    enrollData = {
      ...data,
      avatarImgUrl: res1,
      idStep: 101,
      idPlayer: player.id,
      idTeam: player.teamData.idTeam,
      idTournament: this.ownerTournamentId,
      isEditing,
    };
    const result = yield this.updateEnrollmentStep(enrollData);

    this.owner.teamData.enrollmentStep = 102;

    return true;
  });

  getSelectedOptionsTotal = () => {
    const selOpts = this.selectedPaymentOptions;
    if (!selOpts) return 0;

    return selOpts.reduce((previous, current) => {
      return previous + parseFloat(current.selectedOption.price);
    }, 0);
  };

  getFees = optionsTotal => {
    if (!this.workflow) return 0;

    let partialTotal = optionsTotal;
    let result = 0;

    const platFees = this.workflow.platformFees;
    if (platFees) {
      const platformFixedFee = platFees.fixedFee;
      partialTotal += platformFixedFee;

      const platformVariableFee = (platFees.variableFee / 100) * partialTotal;
      partialTotal += platformVariableFee;

      result += platformFixedFee + platformVariableFee;
    }

    const orgFees = this.workflow.organizationFees;
    if (orgFees) {
      const orgFixedFee = orgFees.fixedFee;
      partialTotal += orgFixedFee;

      const orgVariableFee = (orgFees.variableFee / 100) * partialTotal;
      partialTotal += orgVariableFee;

      result += orgFixedFee + orgVariableFee;
    }

    return result;
  };

  getGrandTotal = () => {
    const optionsTotal = this.getSelectedOptionsTotal();
    const fees = this.getFees(optionsTotal);

    return optionsTotal + fees;
  };

  getPaymentWorkflow = flow(function* (idTeam, idTournament, idUser) {
    if (this.workflow && this.player && this.player.teamData && this.player.teamData.idTeam === idTeam) {
      return this.workflow;
    }

    if (!idTeam) idTeam = -1;
    if (!idTournament) idTournament = -1;

    // Load the workflow from backend
    //const result = sampleWorkflowConfig;
    const paymentConfig = yield requestAsync(
      this,
      axios.get,
      null,
      '/paymentconfigs/forany/' + idTeam + '/' + idTournament + '/' + idUser
    );
    if (!paymentConfig) return null;

    const result = this.parseJson(paymentConfig.enrollmentWorkflow);
    if (!result) return null;

    this.workflow = result;
    return this.workflow;
  });

  getSelectedPaymentOption = stepId => {
    const selectedStep = findByIdInArray(this.selectedPaymentOptions, stepId);
    if (!selectedStep || !selectedStep.selectedOption) return null;

    // find that option in the current workflow and return that instead (may need updated prices or title or something)
    if (!this.workflow) return null;

    const wfStep = findByIdInArray(this.workflow.steps, stepId);
    if (!wfStep || !wfStep.options) return null;

    const option = findByIdInArray(wfStep.options, selectedStep.selectedOption.id);
    return option;
  };

  // __ Helpers _____________________________________________________________

  parseJson = json => {
    try {
      return JSON.parse(json);
    } catch (ex) {
      this.error = ex.message;
      return null;
    }
  };

  updateEnrollmentStep = async enrollData => {
    return await requestAsync(this, axios.post, null, '/enrollment/step', enrollData);
  };

  uploadImage = async (uri, idUser, uploadType, secure = false) => {
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    const f = new FormData();
    //f.append("file", uri);
    f.append('type', uploadType); // `image/${fileType}`
    f.append('idobject', idUser);
    f.append('createThumbnails', '1');

    f.append('photo', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    this.loading = true;
    try {
      const url = secure ? '/upload/secure' : '/upload';

      const res = await axios.post(url, f, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      });

      if (secure) return res.data;

      if (res.data && res.data.repositoryPath) return res.data.repositoryPath;

      return null;
    } catch (err) {
      if (err.response && err.response.status === 413) toast.error(Localize('Error.Upload.413'));
      else toast.error(Localize('Error.UploadingImage') + ' ' + err);

      return null;
    } finally {
      this.loading = false;
    }
  };
}

export default PlayersStore;
