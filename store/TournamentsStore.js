import axios from '../axios'
import { observable, flow, action } from 'mobx';
import { createCrudActions } from './CrudActions';
import { getOpErrorText } from '../components/Utils';
import { normalize } from '../components/Data';
import { silentRequestAsync } from '../components/Utils';

export default class TournamentStore {
    @observable current = null;
    @observable all = null;
    @observable loading = false;
    @observable error = null;
    @observable calendar = null;

    rootStore = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.actions = createCrudActions(this, '/tournaments');
    }

    @action reset = () => {
        this.current = null;
        this.error = null;

        const rs = this.rootStore;
        rs.teams.all = null;
        rs.teams.normal = null;
        rs.stages.all = null;
        rs.groups.all = null;
        rs.teamGroups.all= null;
    }

    setCurrent = flow( function *(id) {
        try {
            const rs = this.rootStore;
            
            this.reset();
            const result = yield this.getSingle(id);
            this.current = result;
            if (!result) return;
            
            // set tournament related stores to new
            
            rs.teams.all = result.teams;
            rs.teams.normal = normalize(result.teams);
            rs.stages.all = result.stages;
            rs.groups.all = result.groups;
            rs.teamGroups.all= result.teamGroups;

            // Clear the rest
            rs.players.all = null;
            rs.matches.all = null;
        
        } catch (err) {
            
        }
    })

    getSingle = flow( function *(id) {
        return yield silentRequestAsync(this, axios.get, null, '/tournaments/' + id);
    })

    getCalendar = flow( function *(id) {
        try 
        {
            this.loading = true;
            const result = yield axios.get('/matches/fortournament/' + id);
            this.loading = false;
            return result;
        } catch (err) {
            toast.error(getOpErrorText(err));
            this.loading = false;
            return null;
        }
    })
}
