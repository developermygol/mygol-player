import { observable, flow } from 'mobx';
import { createCrudActions } from './CrudActions';
import { requestAsync, toast } from '../components/Utils';
import axios from '../axios';

export default class SanctionsStore {
  @observable loading = false;
  @observable error = null;
  @observable all = null;
  @observable current = null;

  rootStore = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.actions = createCrudActions(this, '/sanctions');
  }

  getSanctionsForTeamAndTournament = flow(function* (teamId, tournamentId) {
    // this.userNotifications = null;
    const TEAMSANCTIONTYPE = 2;
    const teamAllSanctions = yield requestAsync(
      this,
      axios.get,
      null,
      `/sanctions/forteam/${teamId}/${tournamentId}`
    );

    if (teamAllSanctions && teamAllSanctions.length > 0) {
      const teamOnlySanctions = teamAllSanctions.filter(sanction => sanction.type === TEAMSANCTIONTYPE);
      return teamOnlySanctions;
    }
    return null;
  });
}
