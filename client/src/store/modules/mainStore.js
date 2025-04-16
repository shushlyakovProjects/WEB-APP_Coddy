// Хранилище администратора
import axios from 'axios';

export default {
    actions: {
        async checkAuthorization(context, router) {
            await axios.post('/server/authorization')
                .then((result) => {
                    console.log(result);
                    router.push('/mentor/lk')
                    context.commit('updateCurrentUser', result)
                })
                .catch((error) => {
                    console.log(error);
                    
                    document.cookie = 'ACCESS_TOKEN='
                    router.push('/auth')
                })
        }
    },
    mutations: {
        updateCurrentUser(state, result) {
            state.CURRENT_USER = result
        }
    },
    state: {
        CURRENT_USER: {}
    },
    getters: {
        getCurrentUser(state) {
            return state.CURRENT_USER
        }
    }
}