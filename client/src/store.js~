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
    requests: {},
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
    },
    setRequest: (state, { url, ...rest }) => {
      state.requests[url] = {...rest}
    }
  },
  actions: {
    applyDonation: async (ctx) => {
      const payload = {
        amount: ctx.state.donation,
        currency: ctx.state.currency.code,
      };

      ctx.commit("setRequest", {url: DONATION_COMMAND_URI, loading: true});

      const response = await donationCommand(payload);

      ctx.commit("setRequest", {url: DONATION_COMMAND_URI, loading: false, response});

      return response
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
    donation: state => state.donation,
    currency: state => state.currency,
    presets: state => state.presets,
    requests: state => state.requests,
  },
});

export const DONATION_COMMAND_URI = "http://localhost:4000/donate/";

async function donationCommand(body) {
  const request = await fetch(DONATION_COMMAND_URI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  return await request.json();
}
