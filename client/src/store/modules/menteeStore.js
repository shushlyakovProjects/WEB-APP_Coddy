// Хранилище данных о преподавателях на испытательном сроке
import axios from 'axios';

export default {
    actions: {
        async downloadMentees(context) {
            await axios.post('/server/from-mentor/downloadMentees')
                .then((result) => { context.commit('updateMenteeList', result.data.MENTEES_LIST) })
                .catch((error) => { console.error(error); })
        },
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
            const { menteesOfShushlyakov, disciplines, fioInclude, workDays, sortOfEdUnits } = filtres
            let filtredList = []

            filtredList = state.MENTEE_LIST.filter((elem) => {
                let check1 = menteesOfShushlyakov ? !state.menteesIsNotOfShushlyakov.includes(elem.LastName) : state.menteesIsNotOfShushlyakov.includes(elem.LastName)
                let check2 = `${elem.LastName} ${elem.FirstName}`.includes(fioInclude)

                let workDaysValue = Math.round((new Date() - new Date(elem.Created)) / 1000 / 60 / 60 / 24)
                let check3 = workDaysValue >= workDays.min && workDaysValue <= workDays.max

                let check4 = elem.Disciplines.join(', ').includes(disciplines)

                return check1 && check2 && check3 && check4
            })

            if (sortOfEdUnits == 'asc') { filtredList.sort((a, b) => a.InfoEdUnits.CountAllEdUnits - b.InfoEdUnits.CountAllEdUnits) }
            if (sortOfEdUnits == 'desc') { filtredList.sort((a, b) => b.InfoEdUnits.CountAllEdUnits - a.InfoEdUnits.CountAllEdUnits) }

            // console.log(filtredList);

            return filtredList
        },
    }
}