<template>
    <div class="wrapper">
        <main>
            <header>
                <h2>Обратная связь ментору</h2>
                <p>Привет! ✌️</p>
                <p>Если Вы здесь, значит пора актуализировать информацию!</p>
                <p>Пройдите, пожалуйста, небольшой опрос, заполнив поля ниже</p>
            </header>

            <form class="fields" @submit.prevent="sendFeedback()">
                <div class="fields__item">
                    <p class="fields__item-question">Преподаватель</p>
                    <p class="input_wrapper">
                        <input type="text" v-model="fields.FIO" placeholder="Укажите вашу фамилию и имя">
                    </p>
                </div>

                <div class="fields__item">
                    <p class="fields__item-question">Номер телефона</p>
                    <p class="input_wrapper">
                        <input type="text" v-model="fields.Phone" maxlength="20"
                            placeholder="Укажите ваш контактный телефон">
                    </p>
                </div>

                <div class="fields__item">
                    <p class="fields__item-question">Есть постоянный ученик?</p>
                    <div class="fields__item-column">
                        <label for="HasConstantUnit_0">Пока нет<input type="radio" id="HasConstantUnit_0"
                                v-model="fields.HasConstantUnit" value="нет"></label>
                        <label for="HasConstantUnit_1">Да!<input type="radio" id="HasConstantUnit_1"
                                v-model="fields.HasConstantUnit" value="да"></label>
                        <label for="HasConstantUnit_2">Был ПУ, жду результат<input type="radio" id="HasConstantUnit_2"
                                v-model="fields.HasConstantUnit" value="жду результат"></label>
                    </div>
                </div>

                <div class="fields__item"
                    v-if="fields.HasConstantUnit == 'нет' || fields.HasConstantUnit == 'жду результат'">
                    <p class="fields__item-question">Сколько проведено пробных уроков?</p>
                    <div class="fields__item-row">
                        <label for="CountTrialUnits_0">0<input id="CountTrialUnits_0" type="radio"
                                v-model="fields.CountTrialUnits" value="0"></label>
                        <label for="CountTrialUnits_1">1<input id="CountTrialUnits_1" type="radio"
                                v-model="fields.CountTrialUnits" value="1"></label>
                        <label for="CountTrialUnits_2">2<input id="CountTrialUnits_2" type="radio"
                                v-model="fields.CountTrialUnits" value="2"></label>
                        <label for="CountTrialUnits_3">3<input id="CountTrialUnits_3" type="radio"
                                v-model="fields.CountTrialUnits" value="3"></label>
                        <label for="CountTrialUnits_4">4<input id="CountTrialUnits_4" type="radio"
                                v-model="fields.CountTrialUnits" value="4"></label>
                        <label for="CountTrialUnits_5">5<input id="CountTrialUnits_5" type="radio"
                                v-model="fields.CountTrialUnits" value="5"></label>
                        <label for="CountTrialUnits_6">6<input id="CountTrialUnits_6" type="radio"
                                v-model="fields.CountTrialUnits" value="6"></label>
                        <label for="CountTrialUnits_7">7<input id="CountTrialUnits_7" type="radio"
                                v-model="fields.CountTrialUnits" value="7"></label>
                        <label for="CountTrialUnits_8">8<input id="CountTrialUnits_8" type="radio"
                                v-model="fields.CountTrialUnits" value="8"></label>
                    </div>
                </div>

                <div class="fields__item" v-if="fields.HasConstantUnit == 'да'">
                    <p class="fields__item-question">Сколько постоянных учеников на данный момент?</p>
                    <div class="fields__item-row">
                        <label for="CountConstantUnits_1">1<input id="CountConstantUnits_1" type="radio"
                                v-model="fields.CountConstantUnits" value="1"></label>
                        <label for="CountConstantUnits_2">2<input id="CountConstantUnits_2" type="radio"
                                v-model="fields.CountConstantUnits" value="2"></label>
                        <label for="CountConstantUnits_3">3<input id="CountConstantUnits_3" type="radio"
                                v-model="fields.CountConstantUnits" value="3"></label>
                        <label for="CountConstantUnits_4">4<input id="CountConstantUnits_4" type="radio"
                                v-model="fields.CountConstantUnits" value="4"></label>
                        <label for="CountConstantUnits_5">5<input id="CountConstantUnits_5" type="radio"
                                v-model="fields.CountConstantUnits" value="5"></label>
                        <label for="CountConstantUnits_6">6<input id="CountConstantUnits_6" type="radio"
                                v-model="fields.CountConstantUnits" value="6"></label>
                        <label for="CountConstantUnits_7">7<input id="CountConstantUnits_7" type="radio"
                                v-model="fields.CountConstantUnits" value="7"></label>
                        <label for="CountConstantUnits_8">8<input id="CountConstantUnits_8" type="radio"
                                v-model="fields.CountConstantUnits" value="8"></label>
                    </div>
                </div>

                <div class="fields__item" v-if="fields.HasConstantUnit == 'да'">
                    <p class="fields__item-question">Сколько модулей отправлено на проверку?</p>
                    <div class="fields__item-row">
                        <label for="CountPaidModules_0">0<input id="CountPaidModules_0" type="radio"
                                v-model="fields.CountPaidModules" value="0"></label>
                        <label for="CountPaidModules_1">1<input id="CountPaidModules_1" type="radio"
                                v-model="fields.CountPaidModules" value="1"></label>
                        <label for="CountPaidModules_2">2<input id="CountPaidModules_2" type="radio"
                                v-model="fields.CountPaidModules" value="2"></label>
                        <label for="CountPaidModules_3">3<input id="CountPaidModules_3" type="radio"
                                v-model="fields.CountPaidModules" value="3"></label>
                        <label for="CountPaidModules_4">4<input id="CountPaidModules_4" type="radio"
                                v-model="fields.CountPaidModules" value="4"></label>
                        <label for="CountPaidModules_5">5<input id="CountPaidModules_5" type="radio"
                                v-model="fields.CountPaidModules" value="5"></label>
                        <label for="CountPaidModules_6">6<input id="CountPaidModules_6" type="radio"
                                v-model="fields.CountPaidModules" value="6"></label>
                        <label for="CountPaidModules_7">7<input id="CountPaidModules_7" type="radio"
                                v-model="fields.CountPaidModules" value="7"></label>
                        <label for="CountPaidModules_8">8<input id="CountPaidModules_8" type="radio"
                                v-model="fields.CountPaidModules" value="8"></label>
                    </div>
                </div>

                <div class="fields__item">
                    <p class="fields__item-question">Всё верно?</p>
                    <ul>
                        <li class="small mark">С Дарьей (Куратор ПУ +375 29 386-23-91) связывались, слоты
                            актуальны!</li>
                        <li class="small mark">В СРМ дисциплины актуальны!</li>
                        <li class="small mark">В чате "ПОИСК ПЕДАГОГОВ" в WhatsApp нахожусь</li>
                        <li class="small mark">В чате "Новички CODDY" в Telegram нахожусь</li>
                        <li class="small mark">С регламентом ПУ ознакомлен</li>
                    </ul>
                    <div class="fields__item-column">
                        <label for="CheckInfo_0">Да, всё верно!<input type="radio" id="CheckInfo_0"
                                v-model="fields.CheckInfo" value="Всё верно"></label>
                        <label for="CheckInfo_1">Нет, нужна помощь<input type="radio" id="CheckInfo_1"
                                v-model="fields.CheckInfo" value="Нужна помощь"></label>
                    </div>
                </div>

                <div class="fields__item">
                    <p class="fields__item-question">Нагрузку?</p>
                    <div class="fields__item-column">
                        <label for="NewLoad_0">Набираю!<input type="radio" id="NewLoad_0" v-model="fields.NewLoad"
                                value="Набираю"></label>
                        <p class="input_wrapper">
                            <input @click="fields.NewLoad = ''" type="text" id="NewLoad_1" v-model="fields.NewLoad"
                                placeholder="Пока нет, причина:">
                        </p>
                    </div>
                </div>

                <div class="fields__item">
                    <p class="fields__item-question">Комментарии, вопросы, проблемы</p>
                    <p class="input_wrapper">
                        <input type="text" v-model="fields.Comments" placeholder="Расскажи, как твои дела?"></input>
                    </p>
                </div>

                <p class="small error_message">{{ message.error }}</p>

                <nav>
                    <input type="submit" value="Отправить обратную связь" />
                    <input type="reset" value="Очистить">
                </nav>
            </form>




        </main>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            fields: {
                FIO: '',
                Phone: '',
                HasConstantUnit: '', // нет - да - жду результат
                CheckInfo: '',
                Comments: '',
                CountTrialUnits: '',
                CountConstantUnits: '',
                CountPaidModules: '',
                NewLoad: ''
            },
            message: { error: '', success: '' }
        }
    },
    watch: {
        'fields.Phone'() {
            let str = this.fields.Phone
            this.fields.Phone = str.replace(/[^\d ]/, '')
        }
    },
    methods: {
        async sendFeedback() {
            const { FIO, Phone, HasConstantUnit, CheckInfo, Comments, CountTrialUnits, CountConstantUnits, CountPaidModules, NewLoad } = this.fields
            let FeedBack = {}
            if (FIO && Phone && CheckInfo && Comments && NewLoad && HasConstantUnit) {
                if (HasConstantUnit == 'да') {
                    if (CountConstantUnits != '' && CountPaidModules != '') {
                        FeedBack = { FIO, Phone, CheckInfo, Comments, NewLoad, HasConstantUnit, CountConstantUnits, CountPaidModules }
                    } else { this.message.error = 'Заполните все поля'; }
                }
                if (HasConstantUnit == 'нет' || HasConstantUnit == 'жду результат') {
                    if (CountTrialUnits) {
                        FeedBack = { FIO, Phone, CheckInfo, Comments, NewLoad, HasConstantUnit, CountTrialUnits }
                    } else { this.message.error = 'Заполните все поля'; }
                }
            } else { this.message.error = 'Заполните все поля'; }

            if (FeedBack.FIO) {
                this.message.error = ''
                await axios.post('/server/from-mentee/newFeedback', FeedBack)
                    .then((result) => {
                        console.log(result);
                    })
                    .catch((error) => {
                        console.log(error);
                    })

                console.log('Данные отправлены, спасибо!');

            }

        }
    },
}
</script>

<style scoped>
input[type="radio"] {
    display: none;
}

.wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

header {
    margin-bottom: 10px;
    padding: 10px 15px;
    background-color: var(--color_accent_lightBlue);
    color: var(--color_background-2_white);
    border-radius: 10px;
}

header h2 {
    margin-bottom: 6px;
}

.fields {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.fields nav {
    display: flex;
    justify-content: space-between;
}

.fields__item {
    background-color: var(--color_background-1_white);
    padding: 10px 15px;
    border-radius: 10px;
}

.fields__item-question {
    margin-bottom: 5px;
    font-weight: bold;
}

.fields__item input[type="text"],
.fields__item textarea {
    padding: 10px 5px;
    background-color: transparent;
    width: 100%;
}

.fields__item ul {
    margin: 10px 0;
}

.input_wrapper {
    position: relative;
}

.input_wrapper::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: var(--color_accent_lightBlue);
}


.fields__item-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.fields__item label {
    transition-duration: 0.1s;
    padding: 5px;
    border-radius: 10px;
}

.fields__item-row label {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px 15px;
    cursor: pointer;
    user-select: none;
}

.fields__item-column {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.fields__item label:hover,
.fields__item textarea:hover {
    background: var(--color_background-2_white);
}

.fields__item label:has(input:checked) {
    background: var(--color_accent_pink);
    color: var(--color_background-1_white);
}

.mark {
    padding-left: 20px;
    position: relative;
}

.mark::before {
    content: '✔';
    position: absolute;
    left: 0;
    color: var(--color_accent_lightBlue);
}
</style>