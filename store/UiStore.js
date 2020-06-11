import { observable } from "mobx";

import AuthStore from "./AuthStore";


class UiStore {
    @observable auth = new AuthStore();
}

export default new UiStore();