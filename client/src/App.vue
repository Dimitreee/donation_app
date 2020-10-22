<template>
  <div id="nav">
    <DonationForm/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DonationForm from "@/DonationForm.vue";

@Options({
  components: {
    DonationForm
  }
})
export default class App extends Vue {}
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
