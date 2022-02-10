<template lang="pug">
  v-row.mt-1
    v-col(cols="12" sm="5")
      v-card.pa-2
        v-card-subtitle.pa-1 {{ getBasicCurrencyName }}
          v-row
            v-col.d-flex.justify-center(
              cols="6"
            )
              v-select.pa-0(
                v-model="selectedBasicCurrency"
                hide-details
                :items="getCurrencies"
                item-text="id"
                item-value="id"
                label=""
                class="converter-select"
                placeholder="USD"
                return-object
              )
            v-col.d-flex.justify-center(
              cols="6"
            )
              v-text-field.pa-0(
                v-model="enteredAmount"
                hide-details
                class="converter-input"
                label=""
                placeholder="0"
              )
    v-col.d-flex.justify-center(cols="12" sm="2")
      v-btn.align-self-center(
        color="white"
        class="rounded-button"
        @click="changeCurrenciesOrder"
      )
        v-icon mdi-arrow-left-right
    v-col(cols="12" sm="5")
      v-card.pa-2
        v-card-subtitle.pa-1 {{ getSecondaryCurrencyName }}
          v-row
            v-col.d-flex.justify-center(
              cols="6"
            )
              v-select.pa-0(
                v-model="selectedSecondaryCurrency"
                hide-details
                :items="getCurrencies"
                item-text="id"
                item-value="id"
                label=""
                class="converter-select"
                placeholder="RUB"
                return-object
              )
            v-col.d-flex.justify-center(
              cols="6"
            )
              v-text-field.pa-0(
                v-model="convertedAmount"
                hide-details
                class="converter-input"
                label=""
                placeholder="0"
                readonly
              )
</template>

<script>
import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        selectedBasicCurrency: null,
        selectedSecondaryCurrency: null,
        enteredAmount: null,
        convertedAmount: null,
      }
    },
    computed: {
      ...mapGetters([
        'getCurrencies',
      ]),

      getBasicCurrencyName(){
        return this.selectedBasicCurrency?.name || 'Выберите валюту';
      },

      getSecondaryCurrencyName(){
        return this.selectedSecondaryCurrency?.name || 'Выберите валюту';
      },

      changedData(){
        const { selectedBasicCurrency, enteredAmount, selectedSecondaryCurrency } = this;
        return {selectedBasicCurrency, enteredAmount, selectedSecondaryCurrency};
      },
    },
    watch: {
      changedData: {
        handler: function() {
          if (this.selectedBasicCurrency && this.enteredAmount && this.selectedSecondaryCurrency)
            this.convertCurrency();
          else if(!this.enteredAmount)
            this.convertedAmount = '';
        },
        deep: true
      }
    },
    methods: {
      convertCurrency(){
        this.convertedAmount = Number((
          (this.selectedBasicCurrency.value / this.selectedBasicCurrency.nominal / this.selectedSecondaryCurrency.value * this.selectedSecondaryCurrency.nominal)
          * this.enteredAmount)
          .toFixed(2));
      },
      
      changeCurrenciesOrder(){
        const temp = this.selectedBasicCurrency;
        this.selectedBasicCurrency = this.selectedSecondaryCurrency;
        this.selectedSecondaryCurrency = temp;
      },
    },
  }
</script>

<style lang="scss" scoped>
.rounded-button{
  height: 56px!important;
  width: 56px!important;
  border-radius: 50%;
  min-height: 0;
  min-width: 0!important;
  padding: 0!important;
}
</style>