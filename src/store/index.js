import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      currencies: [],
  },
  getters:{
    getCurrencies (state) {
      return state.currencies;
    },
  },
  mutations: {
    setCurrencies(state, currencies) {
      state.currencies = currencies;
    },
  },
  actions: {
    async loadCurrencies(context) {

      const response = await fetch(
        'https://www.cbr-xml-daily.ru/daily_json.js'
      );
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || 'Произошла ошибка при загрузки валют.');
        throw error;
      }

      const currencies = [];

      currencies.push({
          id: 'RUB',
          name: 'Российский рубль',
          nominal: 1,
          value: 1,
          previousValue: 1,
      })

      for (const key in responseData['Valute']) {
        const currency = {
          id: key,
          name: responseData['Valute'][key]['Name'],
          nominal: responseData['Valute'][key]['Nominal'],
          value: responseData['Valute'][key]['Value'],
          previousValue: responseData['Valute'][key]['Previous'],
        };
        currencies.push(currency);
      }

      context.commit('setCurrencies', currencies);
  },

  },
})
