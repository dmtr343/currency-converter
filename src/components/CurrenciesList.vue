<template lang="pug">
  v-row.mt-1
    v-col(cols="12")
      v-text-field(
        v-model.trim="search"
        label="Поиск валюты"
        append-icon="mdi-magnify"
        placeholder="Евро"
        solo
        dense
        hide-details
      )
    v-col(cols="12")
      v-select(
        v-model="selectedCurrency"
        :items="getCurrencies"
        item-value="id"
        item-text="id"
        label="Выбор основной валюты"
        dense
        solo
        return-object
        hide-details
      )
    v-col(
      v-for="currency in filteredCurrencies"
      :key="currency.id"
      cols="12"
    )
      v-card
        v-card-subtitle.pb-0 {{ currency.nominal }} {{ currency.name }}
        v-card-title.pt-1.justify-space-between
          span 
            | {{ currency.nominal }} {{ currency.id }} 
            v-icon.mb-1 mdi-arrow-left-right
            |  {{ currency.convertedValue }} {{ selectedCurrency.id }}
          span(
            :class="getTextColorClass(currency.difference)"
          )
            | {{ getArrowDirection(currency.difference) }}
            span {{currency.difference}}
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      search: '',
      selectedCurrency: {},
    }
  },
  computed: {
    ...mapGetters([
      'getCurrencies',
    ]),

    convertedCurrencies(){
      const currencies = this.getCurrencies;
      const result = currencies.map((currency) => {
        const convertedCurrency = { ...currency }
        convertedCurrency.convertedValue = this.convertCurrency(currency.value);
        convertedCurrency.difference = this.calculateDifference(currency.value, currency.previousValue);
        return convertedCurrency;
      });

      return result;
    },

    filteredCurrencies() {
      const result = this.convertedCurrencies.filter(
        (currency) => {
          return (currency.id.includes(this.search.toUpperCase())
          || currency.name.toLowerCase().includes(this.search.toLowerCase()))
          && this.selectedCurrency.id !== currency.id;
        }
      );

      return result;
    },
  },
  methods: {
    convertCurrency(value){
      return Number(((value / this.selectedCurrency.value) * this.selectedCurrency.nominal).toFixed(4));
    },

    calculateDifference(value, previousValue){
       return Number((((value / this.selectedCurrency.value) * this.selectedCurrency.nominal) -
       ((previousValue / this.selectedCurrency.previousValue) * this.selectedCurrency.nominal)).toFixed(4));
    },

    getArrowDirection(value){
      if ( value > 0 )
        return '↑';
      else if ( value < 0 )
        return '↓';
      else
        return '';
    },

    getTextColorClass(value){
      if ( value > 0 )
        return 'green--text';
      else if ( value < 0 )
        return 'red--text';
      else
        return '';
    },
  },
  mounted(){
    this.selectedCurrency = this.getCurrencies[0];
  },
}
</script>