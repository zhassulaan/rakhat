<template>
  
  <div class="image">
    <div class="about_heder img_page" id="home">
      <div style="    
        width: 1800px;
        height: 1400px;
        display: flex;
        align-items: center;
        justify-content: center;">
        <img :src="info.image" alt="" v-if="info.image">
        <!-- <img src="@/assets/images/slide.png" alt="" v-if="language == 'ru'">
        <img src="@/assets/images/slideKZ.png" alt="" v-if="language == 'kz'">
        <img src="@/assets/images/slideEN.png" alt="" v-if="language == 'en'"> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

  export default {
  name: "HomeView",
  components: {
  },
  data() {
    return {
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
      console.log(this.$route.params.id)
      axios({
          method: 'GET',
          url: 'https://back.rakhat.a-lux.dev/api/gallery/'+this.$route.params.id,
          headers: {
            'accept-language': localStorage.getItem('lang')
          },
        }).then(res => {
          this.info = res.data
        })
    },
  },
};

</script>
<style >
.img_page img{
  width: 100%;
    height: 100%;
    object-fit: contain;
}
</style>