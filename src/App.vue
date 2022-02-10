<template lang="pug">
  v-app
    v-app-bar(
      app
      color="primary"
      dark
    )
      div.d-flex.align-center
        v-img.mr-2(
          alt="Vuetify Logo"
          class="shrink"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        )
        h3.text-sm-h4 Currency Converter
    v-main
      v-container 
        v-row(
          justify="center"
          no-gutters
        )
          v-col(v-if="isLoading" class="text-center" cols="12")
            v-progress-circular(
              :size="100"
              :width="5"
              color="purple"
              class="spinner"
              indeterminate
          )
          v-col(v-else-if="error" class="text-center" cols="12")
            v-card
              v-card-text {{ error }}
          v-col(
            v-else
            md="8"
            xl="4"
          )
            v-card
              v-tabs(
                v-model="tab"
                background-color="deep-purple accent-4"
                centered
                dark
                icons-and-text
              )
                v-tabs-slider
                v-tab(
                  href="#tab-1"
                ) Список валют
                  v-icon mdi-format-list-bulleted
                v-tab(
                  href="#tab-2"
                ) Конвертер
                  v-icon mdi-swap-horizontal
            v-tabs-items(
              v-model="tab"
            )
              v-tab-item(
                value="tab-1"
              )
                currencies-list

              v-tab-item(
                value="tab-2"
              )
                currencies-converter
                  
</template>

<script>
import CurrenciesList from './components/CurrenciesList';
import CurrenciesConverter from './components/CurrenciesConverter';

export default {
  name: 'App',

  components: {
    CurrenciesList,
    CurrenciesConverter,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      tab: null,
    }
  },
  methods: {
    async loadCurrencies() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('loadCurrencies');
      } catch (error) {
        this.error = error.message || 'Произошла ошибка при загрузки валют';
      }
      this.isLoading = false;
    },
  },
  created(){
    this.loadCurrencies();
  },
};
</script>

<style lang="scss">
main, .v-tabs-items {
  background-color: #2697ff !important;
}

.spinner{
  margin-top: 40vh;
}
</style>
