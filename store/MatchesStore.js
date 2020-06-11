import { observable, action } from "mobx";
import { createCrudActions } from "./CrudActions";

export default class MatchesStore {
    @observable current = null;
    @observable all = null;
    @observable loading = false;
    @observable error = null;
    
    rootStore = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.actions = createCrudActions(this, '/matches');
    }

    @action setCurrent = (match) => {
        this.current = match;
    }
}