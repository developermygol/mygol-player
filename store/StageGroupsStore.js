import { observable } from "mobx";
import { createCrudActions } from "./CrudActions";


export default class StageGroupsStore {
    
    @observable loading = false;
    @observable error = null;
    @observable all = null;

    rootStore = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.actions = createCrudActions(this, '/groups');
    }

    forStage = (idStage) => {
        return this.all.filter(g => g.idStage === idStage);
    }
}