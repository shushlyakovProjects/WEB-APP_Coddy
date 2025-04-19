<template>
  <div id="main-wrapper">

    <Header v-if="getCurrentUser.user_id"></Header>

    <router-view id="router-view"></router-view>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from './components/UI/Header.vue';

export default {
  components: { Header },
  mounted() { this.$store.dispatch('checkAuthorization', this.$router) },
  computed: { ...mapGetters(['getCurrentUser']) },
}
</script>

<style>
#main-wrapper {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

#router-view {
  flex: 1 0 100%;
}

main {
  padding: 30px 60px;
}

.icon {
  width: 30px;
  height: 30px;
  object-fit: contain;
  transition-duration: 0.2s;
}

.icon:hover {
  transform: rotate(90deg) scale(1.1);
}
</style>