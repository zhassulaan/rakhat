<template>
  <footer class="footer" id="footer">
      <div class="container">
        <div class="footer__row">
          <div class="footer__col">
            <div class="footer__socials" v-if="info">
              <div class="footer__social-icon social_instagram"><a :href="info.title.instagram" target="_blank"><IconInstagram /></a></div>
              <div class="footer__social-icon social_facebook"><a :href="info.title.facebook" target="_blank"><IconFacebook /></a></div>
              <div class="footer__social-icon social_vk"><a :href="info.title.vk" target="_blank"><IconVK /></a></div>
              <div class="footer__social-icon social_tiktok"><a :href="info.title.tiktok" target="_blank"><IconTikToke /></a></div>
            </div>
            <div class="footer__social-text" v-if="info">
              <a href="https://www.rakhat.kz/"  target="_blank"><p v-html="info.title.url"></p></a>
            </div>
          </div>
          <div class="footer__col">
            <div class="footer__titel">
            </div>
            <div class="footer__text" v-if="info">
              <div v-html="info.title.ofice"></div>
            </div>
          </div>
          <div class="footer__col">
            <div class="footer__titel">
            </div>
            <div class="footer__text"  v-if="info">
              <div v-html="info.title.sale"></div>
            </div>
          </div>
        </div>
          <div class="footer__slog">
            © 2022 АО «Рахат»
          </div>
    </div>
    
  </footer>
</template>
<script>
import axios from 'axios'
import IconFacebook from '@/components/ui/IconFacebook.vue'
import IconInstagram from '@/components/ui/IconInstagram.vue'
import IconTikToke from '@/components/ui/IconTikToke.vue'
import IconVK from '@/components/ui/IconVK.vue'
// import { ArrowRight } from 'vue-icon-packs/oc';

export default {
  name: "AppFooter",
  components: {
    IconFacebook,
    IconInstagram,
    IconTikToke,
    IconVK,
  },
  data() {
    return {
      baseURL: 'https://back.rakhat.a-lux.dev/api/',
      language: '',
      info: '',
    }
  },
  mounted() {    
    this.GetLang()
    this.aboutApi()
  },
  methods: {
    GetLang() {
    const lang = localStorage.getItem('lang')
    this.language = lang
    if (lang == null) {
      this.language = 'ru'
      this.lang = lang
      localStorage.setItem('lang', 'ru')
      this.$router.go(0);
    }
    this.$store.state.lang = this.language
    console.log(this.language)
    },
    aboutApi() {
      axios({
          method: 'GET',
          url: 'https://back.rakhat.a-lux.dev/api/index',
          headers: {
            'accept-language': localStorage.getItem('lang')
          },
        }).then(res => (this.info = res.data))
    },
  },
};
</script>
