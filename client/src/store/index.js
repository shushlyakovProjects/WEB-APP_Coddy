import { createStore } from "vuex";

import mainStore from "./modules/mainStore";
import adminStore from "./modules/adminStore";
import menteeStore from "./modules/menteeStore";

export default createStore({
    modules: { mainStore, adminStore, menteeStore }
})