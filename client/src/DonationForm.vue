<template>
  <form @submit="onSubmit">
    <div>
      <label v-for="(preset_option, index) in presets" :key="index">
        {{ preset_option }}
        <input
          type="radio"
          name="preset"
          v-model="this.suggestion"
          :value="preset_option"
          :checked="Number(donation) === preset_option"
          @change="updateDonationFromPreset"
        />
      </label>
    </div>
    <div>
      <label>
        <select :value="currency.code" @change="updateCurrency">
          <option
            v-bind:key="index"
            v-bind:value="currency.code"
            v-for="(currency, index) in currencies"
          >
            {{ currency.code }}
          </option>
        </select>
      </label>
    </div>
    <div>
      <label>
        <input type="number" :value="donation" @input="updateDonation" min="0"/>
      </label>
    </div>
    <div>
      <input type="submit" placeholder="Donate" />
    </div>
  </form>
</template>

<script lang="ts">
import { mapState } from "vuex";
import { CURRENCIES } from "./store";

export default {
  name: "DonationForm",
  data: () => {
    return {
      currencies: CURRENCIES
    };
  },
  computed: {
    ...mapState(["donation", "currency", "presets"])
  },
  methods: {
    updateDonation(e) {
      this.$store.commit("setDonation", e.target.value);
    },
    updateDonationFromPreset(e) {
      this.$store.commit("setDonation", e.target.value);
    },
    updateCurrency(e) {
      this.$store.dispatch("updateCurrency", e.target.value);
    }
  }
};
</script>
