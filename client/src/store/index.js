import { createStore } from "vuex";

import mainStore from "./modules/mainStore";
import adminStore from "./modules/adminStore";
import menteeStore from "./modules/menteeStore";
import summaryStore from "./modules/summaryStore";

export default createStore({
    modules: { mainStore, adminStore, menteeStore, summaryStore }
})