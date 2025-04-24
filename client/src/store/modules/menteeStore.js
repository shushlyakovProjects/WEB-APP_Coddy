// Хранилище данных о преподавателях на испытательном сроке
import axios from 'axios';

export default {
    actions: {
        async downloadMentees(context) {
            await axios.post('/server/from-mentor/downloadMentees')
                .then((result) => {
                    const teacherId_list = []
                    result.data.forEach(element => {
                        teacherId_list.push(element.Id)
                    });
                    let mentees_info_primary = result.data
                    context.dispatch('downloadEdUnits', { teacherId_list, mentees_info_primary })
                    // context.commit('updateMenteeList', result.data)
                })
                .catch((error) => {
                    console.error(error);
                })
        },
        async downloadEdUnits(context, { teacherId_list, mentees_info_primary }) {
            await axios.post('/server/from-mentor/downloadEdUnits', { teacherId_list })
                .then((result) => {
                    const MENTEES_INFO = []
                    const menteeEdUnits_list = result.data.menteeEdUnits_list
                    menteeEdUnits_list.forEach(EdUnit => {
                        let mentee = mentees_info_primary.find((elem) => elem.Id == EdUnit.teacherId)
                        mentee.InfoEdUnits = EdUnit
                        MENTEES_INFO.push(mentee)
                    })
                    context.commit('updateMenteeList', MENTEES_INFO)
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

            if (sortOfEdUnits == 'asc') {
                filtredList.sort((a, b) => a.InfoEdUnits.countAllEdUnits - b.InfoEdUnits.countAllEdUnits)
            }
            if (sortOfEdUnits == 'desc') {
                filtredList.sort((a, b) => b.InfoEdUnits.countAllEdUnits - a.InfoEdUnits.countAllEdUnits)
            }

            // console.log(filtredList);

            return filtredList

        },
    }
}