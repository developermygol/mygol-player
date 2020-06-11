import { observable, flow } from 'mobx';
import { requestAsync } from '../components/Utils';
import { updateByIdInArray, normalize } from '../components/Data';
import axios from '../axios';

class TeamsStore {
    @observable current = null;
    @observable all = null;
    @observable loading = false;
    @observable error = null;
    @observable normal = null;

    rootStore = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    getAll = flow(function *(idTournament) {
        this.all = null;

        try {
            const result = yield requestAsync(this, axios.get, null, '/tournaments/' + idTournament + '/teams');
            this.all = result;
            this.normal = normalize(result);
            
            return result;
        }
        catch (ex) {

        }
    })

    get = flow(function *(idTeam, idTournament) {
        this.current = null;
        
        try {
            const result = yield requestAsync(this, axios.get, null, '/teams/' + idTeam + '/details/' + idTournament);
            this.current = result;
        }
        catch (ex) {

        }
    })
}


export default TeamsStore;