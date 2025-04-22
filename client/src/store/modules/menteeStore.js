// Хранилище данных о преподавателях на испытательном сроке
import axios from 'axios';

export default {
    actions: {
        async downloadMentees(context) {
            await axios.post('/server/from-mentor/downloadMentees')
                .then((result) => {
                    // result.data.forEach(element => {
                    //     console.log(element.LastName);

                    // });

                    context.commit('updateMenteeList', result.data)
                })
                .catch((error) => {
                    console.error(error);
                })
        }
    },
    mutations: {
        updateMenteeList(state, newData) {
            state.MENTEE_LIST = newData
        }
    },
    state: {
        MENTEE_LIST: [],
        // Временная модель (для фильтра)
        menteesIsNotOfShushlyakov: ['Мосеечева', 'Селезнев', 'Зимарев', 'Халлыев', 'Куликов', 'Каллио', 'Николаева', 'Дудкин',
            'Юдин', 'Петрова', 'Тихонова', 'Валиуллин', 'Бочкарев', 'Рест', 'Саковых', 'Носков', 'Сарычева', 'Почестнев', 'Проданов']


    },
    getters: {
        getMenteeList(state) {
            return state.MENTEE_LIST
        },
        getMenteeListWithFiltres: (state) => (filtres) => {
            const { menteesOfShushlyakov, fioInclude, workDays } = filtres
            let filtredList = []

            filtredList = state.MENTEE_LIST.filter((elem) => {
                let check1 = menteesOfShushlyakov ? !state.menteesIsNotOfShushlyakov.includes(elem.LastName) : state.menteesIsNotOfShushlyakov.includes(elem.LastName)
                let check2 = `${elem.LastName} ${elem.FirstName}`.includes(fioInclude)

                let workDaysValue = Math.round((new Date() - new Date(elem.Created)) / 1000 / 60 / 60 / 24)
                let check3 = workDaysValue >= workDays.min && workDaysValue <= workDays.max
                
                return check1 && check2 && check3
            })

            // console.log(filtredList);

            return filtredList

        },
    }
}