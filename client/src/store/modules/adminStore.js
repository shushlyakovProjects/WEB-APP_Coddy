// Основное хранилище
import axios from 'axios';

export default {
    actions: {
        // Проверка на существование учетных записей
        async adminTest(context) {
            await axios.post('/server/testAdmin')
                .then((result) => {
                    console.log(result);
                })
                .catch((error) => {
                    if (error.status == 302) {
                        context.commit('updatePathToRegAdmin', error.response.data)
                    }
                })
        }
    },
    mutations: {
        updatePathToRegAdmin(state, path){
            state.pathToRegAdmin = path
        }
    },
    state: {
        pathToRegAdmin: ''
    },
    getters: {
        getPathToRegAdmin(state){
            return state.pathToRegAdmin
        }
    }
}