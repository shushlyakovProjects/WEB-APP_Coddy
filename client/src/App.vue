<template>
  <div id="main-wrapper">

    <Header v-if="getCurrentUser"></Header>

    <router-view id="router-view"></router-view>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from './components/UI/Header.vue';

export default {
  components: {
    Header
  },
  async mounted() {
    await this.$store.dispatch('checkAuthorization', this.$router)
    await this.$store.dispatch('adminTest', this.$router)
  },
  computed: {
    ...mapGetters(['getPathToRegAdmin', 'getCurrentUser'])
  },
  watch: {
    getPathToRegAdmin(path) {   
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
#main-wrapper {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

#router-view {
  flex: 1 0 100%;
}
</style>