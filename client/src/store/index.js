import { createStore } from "vuex";

import mainStore from "./modules/mainStore";
import adminStore from "./modules/adminStore";

export default createStore({
    modules: { mainStore, adminStore }
})