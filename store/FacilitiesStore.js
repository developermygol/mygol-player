import { observable } from "mobx";
import { createCrudActions } from "./CrudActions";


export default class FacilitiesStore {
    
    @observable loading = false;
    @observable error = null;
    @observable all = null;
    @observable current = null;

    rootStore = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.actions = createCrudActions(this, '/fields');
    }
}