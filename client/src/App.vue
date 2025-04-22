<template>
  <div id="main-wrapper">

    <Header v-if="getCurrentUser.user_id" :currentUser="getCurrentUser"></Header>

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
  cursor: pointer;
  border-radius: 50%;
  transform: scale(1.1);
  image-rendering: crisp-edges;
}

.icon:hover {
  transform: scale(1.3);
  box-shadow: 0 0 2px var(--color_accent_darkBlue);
}

.loading{
  width: 20px;
  height: 20px;
  border-radius: 30%;
  animation: loading 1.3s infinite ease-in-out;
  border: 1px solid var(--color_accent_darkBlue);
}

@keyframes loading {
  0%{transform: translateX(0px) rotate(0deg);border-radius: 50%; opacity: 0;}
  50%{transform: translateX(50px) rotate(135deg); border-radius: 0; opacity: 1;}
  100%{transform: translateX(100px) rotate(300deg);border-radius: 50%; opacity: 0;}
}

</style>