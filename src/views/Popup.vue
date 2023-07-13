<template>
  
  <div class="popup">
    <div class="popup-block" id="home">
      <div class="container">
          <div class="popup-row" id="home">
            <div class="popup-img">
              <img :src="info.image" alt="" v-if="info.image">
              <!-- <img src="@/assets/images/slide.png" alt="" > -->
            </div>
            <div class="popup-info">
              <!-- <div class="popup-info-title">{{info.titleImage}}</div> -->
              <div class="popup-info-title">{{info.painter}}</div>
              <!-- <div class="popup-info-text">{{info.painter}}</div>
              <div class="popup-info-insta">{{info.tag}}</div> -->
              <!-- <form class="popup-form" v-if="this.form !== 0">
                  <div class="popup-form-phone" v-if="this.form == (1 || 2)">
                    <input type="number" placeholder="Введите ваш номер телефона" v-model="phone" @click="errPhone = ''">
                  </div>
                  <div class="popup-form-code" v-if="this.form ==  2">
                    <input type="number" placeholder="Код" v-model="code"  @click="errP = ''">
                    <div>Введите последние 6 цифры номера который вам позвонит </div> 
                  </div>
                  <div class="popup-form-finesh" v-if="this.form ==  3">
                    <div>Ваш голос зачислен  </div> 
                  </div>
                  <div class="popup-form-btn popup-info-btn">
                    <button type="button" @click="SendCode()" v-if="this.form == 1">Отправить код</button>
                    <button type="button" @click="Send()"  v-if="this.form ==  2">Проголосовать</button>
                    <div style="color:red" v-if="err">{{errPhone.response.data.message}}</div>
                    <div style="color:red" v-if="errPhone">{{errPhone.response.data.message}}</div>
                  </div>
              </form> -->
              <!-- <div class="popup-info-btn">
                <button @click="this.form = 1" v-if="this.form == 0">Проголосовать</button>
              </div> -->
            </div>
          </div>
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
      info: '1',
      phone: '',
      code: '',
      form: 0,
      errPhone: '',
      err: '',
    }
  },

  mounted() {    
    this.GetLang()
    this.aboutApi()
  },

  methods: {
    SendCode() {
      axios({
        method: 'POST',
        url: 'https://back.rakhat.a-lux.dev/api/voteSms ',
        data: {
          phone: this.phone,
          productID: this.info.sort,
        }
        
      }).then(res => {
        console.log(res)
        this.form =2
      }).catch(err => {
        console.log(err)
        this.errPhone = err
      })

    },
    Send() {
      axios({
        method: 'POST',
        url: 'https://back.rakhat.a-lux.dev/api/vote',
          headers: { 
            'Authorization': ('Token ' + localStorage.getItem('token'))
          },
        data: {
          phone: this.phone,
          code: this.code,
        }
        
      }).then(res => {
        console.log(res)
        this.form = 3
      }).catch(err => {
        console.log(err)
        this.err = err
      })
    },
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
.popup .container {
  background: #fff;
  border-radius: 10px;
  padding: 32px;
}
.popup-info-insta {
  margin-bottom: 10px;
}
.popup-form-finesh {
  color: #693222;
  font-weight: 800;
  font-size: 24px;
}
.popup-form {
  padding: 25px;
  background: #F6F4F2;
  border-radius: 10px;
  text-align: center;
}
.popup-form input {
  margin: 10px 0;
  padding: 5px 20px;
  border-radius: 5px;
  width: 80%;
}
.popup-form input::-webkit-inner-spin-button, .popup-form input::-webkit-outer-spin-button {
    margin: 0;
    -webkit-appearance: none;
}
.popup-form button {
  margin: 10px 0;
}
.popup-row {
  display: flex;
  gap: 40px;
  align-items: center;
}
.popup-img {
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.popup-info {
  width: 50%;
  padding: 10px;
}
.popup-info-title {
  color: #693222;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 10px;
}
.popup-info-text {
  margin-bottom: 10px;
}
.popup-info-btn button {
  background: #693222;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  border-radius: 5px;
  padding: 7px 25px;
}
@media (max-width: 768px) {
  .popup-row {
    display: block;
  }
  .popup-img {
    width: 100%;
  }
  .popup-info {
    width: 100%;
  }
}
</style>