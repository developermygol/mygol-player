import { observable } from 'mobx';
import OrganizationStore from './OrganizationStore';
import PlayersStore from './PlayersStore';
import TeamsStore from './TeamsStore';
import StagesStore from './StagesStore';
import StageGroupsStore from './StageGroupsStore';
import TeamGroupsStore from './TeamGroupsStore';
import MatchesStore from './MatchesStore';
import TournamentStore from './TournamentsStore';
import FacilitiesStore from './FacilitiesStore';
import SanctionsStore from './SanctionsStore';
import NotificationsStore from './NotificationsStore';

class Store {
  @observable organization = new OrganizationStore(this);
  @observable players = new PlayersStore(this);
  @observable tournaments = new TournamentStore(this);
  @observable facilities = new FacilitiesStore(this);
  @observable sanctions = new SanctionsStore(this);
  @observable notifications = new NotificationsStore(this);

  // Tournament stores
  @observable teams = new TeamsStore(this);
  @observable stages = new StagesStore(this);
  @observable groups = new StageGroupsStore(this);
  @observable teamGroups = new TeamGroupsStore(this);
  @observable players = new PlayersStore(this);
  @observable matches = new MatchesStore(this);
}

export default new Store();
