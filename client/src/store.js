import { createStore } from "vuex";

const PRESETS = [40, 100, 200, 1000, 2500, 5000];

export const CURRENCIES = [
  { name: "US Dollar", code: "USD", symbol: "$", rate: 1 },
  { name: "Euro", code: "EUR", symbol: "€", rate: 0.897597 },
  { name: "British Pound", code: "GBP", symbol: "£", rate: 0.81755 },
  { name: "Russian Ruble", code: "RUB", symbol: "₽", rate: 63.461993 }
];

export default createStore({
  state: {
    donation: PRESETS[0],
    currency: CURRENCIES[0],
    presets: PRESETS,
  },
  mutations: {
    setCurrency: (state, currency) => {
      state.currency = currency;
    },
    setDonation: (state, donation) => {
      state.donation = donation;
    },
    setPresets: (state, presets) => {
      state.presets = presets;
    }
  },
  actions: {
    donate: (ctx) => {
      console.log(ctx.state.donation);
    },
    updateCurrency: (ctx, currency) => {
      const prev_currency = {...ctx.state.currency};

      const next_currency = CURRENCIES.find(({code}) => code === currency);
      const ratio = next_currency.rate / prev_currency.rate;

      const next_donation_value = Math.round(ctx.state.donation * ratio);
      const next_presets_value = ctx.state.presets.map(preset => Math.round((preset * ratio)));

      ctx.commit("setCurrency", next_currency);
      ctx.commit("setDonation", next_donation_value);
      ctx.commit("setPresets", next_presets_value);
    },
  },
  getters: {
    currency: state => state.currency,
    presets: state => state.presets,
    donation: state => state.donation,
  },
});
