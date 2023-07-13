<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <div class="header__row">
          <div class="header__logos">
            <div class="header__logo">
              <img src="@/assets/images/logo.svg" class="logo" alt="logo" />
            </div>
            <div class="header__logo">
              <img src="@/assets/images/logo-text.svg" class="logo-text" alt="logo" />
            </div>
          </div>
        </div>
        <div class="header__menu">
          <ul class="menu" v-if="this.Lang == 'ru'">
            <li class="menu__item menu__item-hover"><a href="#about">О ПРОЕКТЕ</a>
              <div class="menu_hover_blick">
                <ul>
                  <li class="menu__item"><a href="#about">О ПРОЕКТЕ</a></li>
                  <li class="menu__item"><a href="#history">ИСТОРИЯ ПРОЕКТА</a></li>
                </ul>
              </div>
            </li>
            <li class="menu__item"><a href="#competition">КОНКУРС</a></li>
            <li class="menu__item"><a href="#products">ПРОДУКТЫ</a></li>
            <li class="menu__item"><a href="#painters">ХУДОЖНИКИ</a></li>
            <!-- <li class="menu__item">ХУДОЖНИКИ 2022</li> -->
            <li class="menu__item"><a href="#footer">КОНТАКТЫ</a></li>
          </ul>
          <ul class="menu" v-if="this.Lang == 'kz'">
            <li class="menu__item menu__item-hover"><a href="#about">ЖОБА ТУРАЛЫ</a>
              <div class="menu_hover_blick">
                <ul>
                  <li class="menu__item"><a href="#about">ЖОБА ТУРАЛЫ</a></li>
                  <li class="menu__item"><a href="#history">ЖОБАНЫҢ ТАРИХЫ</a></li>
                </ul>
              </div>
            </li>
            <li class="menu__item"><a href="#competition">КОНКУРС</a></li>
            <li class="menu__item"><a href="#products">ӨНІМДЕР</a></li>
            <li class="menu__item"><a href="#painters">СУРЕТШІЛЕР QO</a></li>
            <!-- <li class="menu__item">ХУДОЖНИКИ 2022</li> -->
            <li class="menu__item"><a href="#footer">БАЙЛАНЫС</a></li>
          </ul>
          <ul class="menu" v-if="this.Lang == 'en'">
            <li class="menu__item menu__item-hover"><a href="#about">ABOUT THE PROJECT</a>
              <div class="menu_hover_blick">
                <ul>
                  <li class="menu__item"><a href="#about">ABOUT THE PROJECT</a></li>
                  <li class="menu__item"><a href="#history">PROJECT HISTORY</a></li>
                </ul>
              </div>
            </li>
            <li class="menu__item"><a href="#competition">COMPETITION</a></li>
            <li class="menu__item"><a href="#products">PRODUCTS</a></li>
            <li class="menu__item"><a href="#painters">ARTISTS QO</a></li>
            <!-- <li class="menu__item">ХУДОЖНИКИ 2022</li> -->
            <li class="menu__item"><a href="#footer">CONTACTS</a></li>
          </ul>
        </div>
        
        <div class="header__logo">
              <span class="language__selected">
                <span @click="this.LangBlock =  !this.LangBlock" v-if="this.Lang == 'ru'">Рус</span> 
                <span @click="this.LangBlock =  !this.LangBlock" v-if="this.Lang == 'kz'">Қаз</span> 
                <span @click="this.LangBlock =  !this.LangBlock" v-if="this.Lang == 'en'">Eng</span> 
                <div class="language__dropdown" :class="{ 'is-active': this.LangBlock}">
                  <div class="language__select" @click="SetLangKz()" :class="{ 'is-active': this.Lang == 'kz' }">Қаз</div>
                  <div class="language__select" @click="SetLangRu()" :class="{ 'is-active': this.Lang == 'ru' }">Рус</div>
                  <div class="language__select" @click="SetLangEn()" :class="{ 'is-active': this.Lang == 'en' }">Eng</div>
                </div>
              </span>
            </div>
      </div> 
    </div>
  </header>
</template>

<script>
// import { defineAsyncComponent } from 'vue'

export default {
  name: "AppHeader",
  data() {
    return {
      LangBlock: false,
      Lang: '',
    }
  },
  components: {
    // LogoMain: defineAsyncComponent(() =>
    //   import("@/components/ui/LogoMain.vue"),
    // ),
  },
  mounted() { 
  this.Lang = this.$store.state.lang
  },

  methods: {
    OpenLang() {
      this.LangBlock = !this.LangBlock
      console.log('включить')
    },
    SetLangRu() {
      localStorage.setItem('lang', 'ru')
      this.Lang = 'ru'
      console.log('выключить ru')
      this.LangBlock =  !this.LangBlock
      this.$router.go()
    },
    SetLangKz() {
      localStorage.setItem('lang', 'kz')
      this.Lang = 'kz'
      console.log('выключить kz')
      this.LangBlock =  !this.LangBlock
      this.$router.go()
    },
    SetLangEn() {
      localStorage.setItem('lang', 'en')
      this.Lang = 'eng'
      console.log('выключить en')
      this.LangBlock =  !this.LangBlock
      this.$router.go()
    },
  },

};
</script>
