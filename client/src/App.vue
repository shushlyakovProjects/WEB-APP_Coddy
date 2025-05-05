<template>
  <div id="main-wrapper">

    <Header v-if="getCurrentUser.UserId" :currentUser="getCurrentUser"></Header>

    <transition name="notification">
      <article class="notification" v-if="messages.error || messages.success">
        <p>🔔 Уведомление</p>
        <p class="small error_message">{{ messages.error }}</p>
        <p class="small success_message">{{ messages.success }}</p>
      </article>
    </transition>

    <router-view id="router-view"></router-view>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from './components/UI/Header.vue';

export default {
  data() {
    return {
      messages: {
        error: '',
        success: ''
      }
    }
  },
  components: { Header },
  mounted() {
    const url = `/${document.URL.split('/').at(-2)}/${document.URL.split('/').at(-1)}`
    if (url != '/mentee/feedback') {
      this.$store.dispatch('checkAuthorization', this.$router)
    }
  },
  computed: { ...mapGetters(['getCurrentUser', 'getMessages']) },
  watch: {
    getMessages: { handler() { this.messages = this.getMessages }, deep: true }
  }
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

.loading {
  width: 20px;
  height: 20px;
  border-radius: 30%;
  animation: loading 1.3s infinite ease-in-out;
  border: 1px solid var(--color_accent_darkBlue);
}

@keyframes loading {
  0% {
    transform: translateX(0px) rotate(0deg);
    border-radius: 50%;
    opacity: 0;
  }

  50% {
    transform: translateX(50px) rotate(135deg);
    border-radius: 0;
    opacity: 1;
  }

  100% {
    transform: translateX(100px) rotate(300deg);
    border-radius: 50%;
    opacity: 0;
  }
}

.notification {
  position: fixed;
  left: 0;
  top: 12vh;
  background-color: var(--color_background-1_white);
  border-top: 2px solid var(--color_accent_darkBlue);
  border-bottom: 2px solid var(--color_accent_darkBlue);
  border-right: 2px solid var(--color_accent_darkBlue);
  border-radius: 0 10px 10px 0;
  width: 20vw;
  padding: 10px;
  z-index: 100;
}

.notification p:first-child {
  color: var(--color_accent_darkBlue);
}

.notification-enter-active,
.notification-leave-active {
  transition-duration: 0.3s;
}

.notification-enter-from,
.notification-leave-to {
  transform: translateX(-100%);
}
</style>