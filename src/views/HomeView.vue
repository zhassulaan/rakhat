<template>
  <div class="popup-form-hello" v-if="this.formHello">
          <div class="popup-form-block">
            <div class="popup_close" @click="this.formHello = false">х</div>
            <div class="popup-form-hello-title" v-if="language == 'ru'">Проголосовать за участников можно в блоке Конкурс</div>
            <div class="popup-form-hello-title" v-if="language == 'kz'">Қатысушыларға "Конкурс" блогында дауыс беруге болады</div>
            <div class="popup-form-hello-title" v-if="language == 'en'">You can vote for the participants in the Contest section</div>
            <div class="popup-form-hello-btn">
              <a href="#competition" @click="this.formHello = false">
                <span v-if="language == 'ru'">Перейти</span>
                <span v-if="language == 'kz'">Өту</span>
                <span v-if="language == 'en'">Go vote</span>
              </a> 
            </div>
          </div>
  </div>



  <div class="home">
    <div class="about_heder" id="home">
      <!-- <div class="container">
        <img src="@/assets/images/slide.png" alt="" v-if="language == 'ru'">
        <img src="@/assets/images/slideKZ.png" alt="" v-if="language == 'kz'">
        <img src="@/assets/images/slideEN.png" alt="" v-if="language == 'en'">
      </div> -->
      <iframe src="https://vr.mir3d.kz/ExpositionVR/" width="100%" height="550px" scrolling="no" allowfullscreen="allowfullscreen"></iframe>
    </div>
    


    <div v-if="info.about" class="about about__before" id="about" >
      <div class="container">
        <h2 class="title" >{{info.about.title}}</h2>
        <div class="about__images">
          <div class="about__image"    v-if="info">
            <h3 class="about__title">{{info.about.subTitle}}</h3>
            <p class="about__text" v-html="info.about.content"></p>
          </div>
          <div class="about__image"   v-if="info" >
            <img :src="info.about.image" alt="image" />
          </div>
        </div>
      </div>
    </div>
    <div class="purposes  " :class="{ before__block: AnimCon }" id="competition">
      <div class="container">
        <h2 class="title" v-if="language == 'ru'">КОНКУРС</h2>
        <h2 class="title" v-if="language == 'kz'">КОНКУРС</h2>
        <h2 class="title" v-if="language == 'en'">COMPETITION</h2>
        <swiper
          :slidesPerView="1"
          :spaceBetween="50"
          :autoHeight="true"
          :mousewheel="true"
          :keyboard="true"
          :loop="true"
          :breakpoints="{
            320: {
            navigation: false
          },
            1023: {
              navigation: false
            },
          }" 
          :pagination="{
            dynamicBullets: true,
          }"
          :navigation="{
            prevEl: prevabout,
            nextEl: nextabout,
          }"
          :modules="modules"
          class="mySwiper"
        >
        <swiper-slide v-if="!info.contest || !info.contestRules"></swiper-slide>
        <swiper-slide v-for=" (competition, i) in info.contest" :key="competition.id">
            <div class="slider_row">
              <div class="slider_col">
                <h3 class="slider_title">№{{i +1}} {{competition.title}}</h3>
                <!-- <p class="insta-link"><a :href="'https://www.instagram.com/'+competition.tag.slice(1)" target="_blank">{{competition.tag}}</a></p> -->
                <!-- <p class="about__text" v-html="competition.titleImage"></p> -->
                <div class="popup-info-btn" v-if="blockShow">
                  <button @click="(this.formID = competition.id)" >
                    <span v-if="language == 'ru'">Проголосовать </span>
                    <span v-if="language == 'kz'">Дауыс беру </span>
                    <span v-if="language == 'en'">Vote </span>
                  </button>
                </div>

              </div>
              <div class="slider_col">
                <img :src="competition.image" alt="image">
                <!-- <img :src="competition.image_en" alt="image" v-if="language == 'en'">
                <img :src="competition.image_kz" alt="image" v-if="language == 'kz'"> -->
              </div>
            </div>
          </swiper-slide>
        <swiper-slide >
            <div class="slider_row">
              <div class="diagram-row">
                <div class="diagram-block" v-for="competition in diagram.slice(0, 10)" :key="competition.id" >
                  <!-- <div class="diagram-block-procent" v-if="competition.vote">{{Math.round( competition.vote/ this.sum * 100 )}} %</div> -->
                  <div class="diagram-block-procent" v-if="competition.vote">{{Math.floor( competition.vote/ this.sum * 1000 ) / 10}} %</div>
                  <div class="diagram-block-line" v-if="competition.vote">
                    <div class="diagram-block-line-title">{{competition.title}}</div>
                    <div class="line-bg">
                      <div class="line" :style="{width: competition.vote / this.max * 100 + '%'}"></div>
                    </div>
                  </div>
                </div>
                <div class="diagram-sum" v-if="language == 'ru'">Всего проголосовало {{sum}} человек</div>
                <div class="diagram-sum" v-if="language == 'kz'">Барлығы дауыс {{sum}} берді</div>
                <div class="diagram-sum" v-if="language == 'en'">Total vote {{sum}} count:</div>
              </div>
            </div>
          </swiper-slide>
        <!--  -->
        <!-- <swiper-slide v-for=" contest in info.contest" :key="contest.id">
            <div class="slider_row">
              <div class="slider_col">
                <p class="about__text" v-html="contest.content"></p>
              </div>
              <div class="slider_col">
                <img :src="contest.image" alt="image">
                <img :src="contest.image_kz" alt="image" v-if="language == 'kz'"/>
                <img :src="contest.image_en" alt="image" v-if="language == 'en'"/>
              </div>
            </div>
          </swiper-slide> -->
        <swiper-slide v-for=" contest in info.contestRules" :key="contest.id">
            <div class="slider_row">
              <div class="slider_col">
                <p class="about__text" v-html="contest.title"></p>
              </div>
              <div class="slider_col">
                <img :src="contest.file_ru" alt="image" v-if="language == 'ru'">
                <img :src="contest.file_kz" alt="image" v-if="language == 'kz'"/>
                <img :src="contest.file_en" alt="image" v-if="language == 'en'"/>
              </div>
            </div>
          </swiper-slide>
        </swiper>
        
        <!--  -->
        <form class="popup-form" v-if="this.formID !== 0">
          <div class="popup-form-block">
            <div class="popup_close" @click="(this.formID = 0)">х</div>
            <div class="popup-form-phone"  v-if="this.form == 0">
              <input type="email" placeholder="Введите ваш Email" v-model="email" @click="errPhone = ''" v-if="language == 'ru'" required>
              <input type="email" placeholder="Email теріңіз" v-model="email" @click="errPhone = ''" v-if="language == 'kz'" required>
              <input type="email" placeholder="Enter your email" v-model="email" @click="errPhone = ''" v-if="language == 'en'" required>
            </div>
            <div class="popup-form-code" v-if="this.form == 1">
              <input type="text" placeholder="Введите код " v-model="code"  @click="errP = ''" v-if="language == 'ru'" required>
              <input type="text" placeholder="Код теріңіз" v-model="code"  @click="errP = ''" v-if="language == 'kz'" required>
              <input type="text" placeholder="Enter your verification code" v-model="code"  v-if="language == 'en'" @click="errP = ''" required>
              <div>Введите код </div> 
            </div>
            <div class="popup-form-finesh" v-if="this.form ==  2">
              <div v-if="language == 'ru'">Ваш голос зачислен  </div> 
              <div v-if="language == 'kz'">Сіздің дауысыңыз тіркелді  </div> 
              <div v-if="language == 'en'">Your vote has been counted  </div> 
            </div>
            <div class="popup-form-btn popup-info-btn">
              <button type="button" @click="SendCode()" v-if="this.form == 0">
                <span v-if="language == 'ru'">Отправить код </span>
                <span v-if="language == 'kz'">Код жіберу </span>
                <span v-if="language == 'en'">Send a verification code </span>
              </button>
              <button type="button" @click="Send()" v-if="this.form == 1">
                <span v-if="language == 'ru'">Проголосовать </span>
                <span v-if="language == 'kz'">Дауыс беру </span>
                <span v-if="language == 'en'">Vote </span>
              </button>
              <div style="color:red" v-if="err">{{err.response.data.message}}</div>
              <div style="color:red" v-if="errPhone">{{errPhone.response.data.message}}</div>
            </div>
          </div>
        </form>
                <!--  -->
      <div ref="prevabout" class="swiper-button-prev">prev</div>
      <div ref="nextabout" class="swiper-button-next">next</div>
      </div>
    </div>
    <div class="topics  product__home " :class="{ before__block: AnimPro }" id="products">
      <div class="container">
        <h2 class="title" v-if="language == 'ru'">ПРОДУКТЫ</h2>
        <h2 class="title" v-if="language == 'kz'">ӨНІМДЕР</h2>
        <h2 class="title" v-if="language == 'en'">PRODUCTS</h2>
        <swiper
          :slidesPerView="1"
          :spaceBetween="50"
          :autoHeight="true"
          :mousewheel="true"
          :keyboard="true"
          :loop="true"
          :breakpoints="{
            320: {
            navigation: false
          },
            1023: {
              navigation: false
            },
          }" 
          :pagination="{
            clickable: true,
          }"
          :navigation="{
            prevEl: prevproduct,
            nextEl: nextproduct,
          }"
          :modules="modules"
          class="mySwiper"
        >
        <swiper-slide v-if="!info.product"></swiper-slide>
        <swiper-slide v-for="poduct in info.product" :key="poduct.id">
            <div class="slider_row">
              <div class="slider_col">
                <div class="slider_title-row">
                  <div class="slider_afer">{{poduct.unit}}</div>
                  <h3 class="slider_title" @click="this.popupProduct=poduct.id">{{poduct.title}} </h3>
                </div>
                <p class="about__text" v-html="poduct.content"></p>
              </div>
              <div class="slider_col">
                <img :src="poduct.image" alt="image" @click="this.popupProduct=poduct.id"/>
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <div v-for="poduct in info.product" :key="poduct.id">
          <div class="popup_bg"  v-if="poduct.id == this.popupProduct">
            <div class="popup_block">
              <div class="popup_close" @click="popupProduct=0">х</div>
              <div class="popup_title">{{poduct.title}}</div>
              <div class="popup_row">
                <div class="popup_img">
                  <img :src="poduct.popupImage" alt="">
                </div>
                <p class="popup_text" v-html="poduct.popupContent"></p>
              </div>
              
            </div>
          </div>
        </div>
      <div ref="prevproduct" class="swiper-button-prev">prev</div>
      <div ref="nextproduct" class="swiper-button-next">next</div>
      </div>
    </div>
    <!-- <div class="purposes" :class="{ before__block: AnimQoNew }" id="paintersnew" v-if="qonew">
      <div class="container">
        <h2 class="title" v-if="language == 'ru'">ХУДОЖНИКИ QO 2022</h2>
        <h2 class="title" v-if="language == 'kz'">СУРЕТШІЛЕР QO 2022</h2>
        <h2 class="title" v-if="language == 'en'">ARTISTS QO 2022</h2>
        <swiper
          :slidesPerView="1"
          :spaceBetween="50"
          :autoHeight="true"
          :mousewheel="true"
          :keyboard="true"
          :loop="true"
          :breakpoints="{
            320: {
          },
            1023: {
            },
          }" 
          :pagination="{
            clickable: true,
          }"
          :navigation="{
            prevEl: prevhud,
            nextEl: nexthud,
          }"
          :modules="modules"
          class="mySwiper"
        >
        <swiper-slide>
            <div class="slider_row">
              <div class="slider_col">
                <div class="slider_title-row">
                  <h3 class="slider_title">Оразбек Есенбаев</h3>
                </div>
                <p class="insta-link">@esdaulet_art</p>
                <p class="about__text">Автор знаменитых стрит-арт портретов Абая Кунанбаева на фасадах зданий в г. Павлодар и Костанай, подарит Рахатовским изделиям обложки со своими цифровыми картинами «Праздник» и «Мозаика».</p>
                <p class="about__text">Созданные в 2019 году, эти картины были перенесены на монументальные муралы в различных городах Казахстана.</p>
              </div>
              <div class="slider_col">
                <img src="@/assets/images/erjan_tanai.png" alt="image" />
              </div>
            </div>
          </swiper-slide>
        <swiper-slide>
            <div class="slider_row">
              <div class="slider_col">
                <div class="slider_title-row">
                  <h3 class="slider_title">Оразбек Есенбаев</h3>
                </div>
                <p class="insta-link">@esdaulet_art</p>
                <p class="about__text">Автор знаменитых стрит-арт портретов Абая Кунанбаева на фасадах зданий в г. Павлодар и Костанай, подарит Рахатовским изделиям обложки со своими цифровыми картинами «Праздник» и «Мозаика».</p>
                <p class="about__text">Созданные в 2019 году, эти картины были перенесены на монументальные муралы в различных городах Казахстана.</p>
              </div>
              <div class="slider_col">
                <img src="@/assets/images/askar-esdaulet.png" alt="image" />
              </div>
            </div>
          </swiper-slide>
        <swiper-slide>
            <div class="slider_row">
              <div class="slider_col">
                <div class="slider_title-row">
                  <h3 class="slider_title">Оразбек Есенбаев</h3>
                </div>
                <p class="insta-link">@esdaulet_art</p>
                <p class="about__text">Автор знаменитых стрит-арт портретов Абая Кунанбаева на фасадах зданий в г. Павлодар и Костанай, подарит Рахатовским изделиям обложки со своими цифровыми картинами «Праздник» и «Мозаика».</p>
                <p class="about__text">Созданные в 2019 году, эти картины были перенесены на монументальные муралы в различных городах Казахстана.</p>
              </div>
              <div class="slider_col">
                <img src="@/assets/images/project.jpg" alt="image" />
              </div>
            </div>
          </swiper-slide>
        </swiper>
      <div ref="prevhud" class="swiper-button-prev">prev</div>
      <div ref="nexthud" class="swiper-button-next">next</div>
      </div>
    </div> -->
    <div class="topics " :class="{ before__block: AnimQo }" id="painters">
      <div class="container">
        <h2 class="title" v-if="language == 'ru'">ХУДОЖНИКИ QO 2020</h2>
        <h2 class="title" v-if="language == 'kz'">СУРЕТШІЛЕР QO 2020</h2>
        <h2 class="title" v-if="language == 'en'">ARTISTS QO 2020</h2>
        <swiper
          :slidesPerView="1"
          :spaceBetween="50"
          :autoHeight="true"
          :mousewheel="true"
          :keyboard="true"
          :loop="true"
          :breakpoints="{
            320: {
          },
            1023: {
            },
          }" 
          :pagination="{
            clickable: true,
          }"
          :navigation="{
            prevEl: prevhudo,
            nextEl: nexthudo,
          }"
          :modules="modules"
          class="mySwiper"
        >
        <swiper-slide v-if="!qo"></swiper-slide>
        <swiper-slide v-for="painter in qo" :key="painter.id">
        <!-- <swiper-slide> -->
            <div class="slider_row" v-if="painter">
              <div class="slider_col">
                <div class="slider_title-row">
                  <h3 class="slider_title">{{painter.fio}}</h3>
                </div>
                <p class="insta-link" v-if="painter.tag"><a :href="'https://www.instagram.com/'+painter.tag.slice(1)" target="_blank">{{painter.tag}}</a></p>
                <p class="about__text" v-html="painter.content"></p>
              </div>
              <div class="slider_col">
                <img :src="painter.image" alt="image"/>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      <div ref="prevhudo" class="swiper-button-prev">prev</div>
      <div ref="nexthudo" class="swiper-button-next">next</div>
      </div>
    </div>
    <div class="purposes   historu" :class="{ before__block: AnimHis }" id="history">
      <div class="container">
        <h2 class="title" v-if="language == 'ru'">ИСТОРИЯ ПРОЕКТА</h2>
        <h2 class="title" v-if="language == 'kz'">ЖОБАНЫҢ ТАРИХЫ</h2>
        <h2 class="title" v-if="language == 'en'">PROJECT HISTORY</h2>
        <swiper
          :slidesPerView="2"
          :spaceBetween="50"
          :autoHeight="true"
          :mousewheel="true"
          :keyboard="true"
          :loop="true"
          :breakpoints="{
            320: {
            slidesPerView: 1,
            spaceBetween: 0,
            navigation: false
          },
            1023: {
              slidesPerView: 2,
              spaceBetween: 30,
              navigation: false
            },
          }" 
          :pagination="{
            clickable: true,
          }"
          :navigation="{
            prevEl: prevhis,
            nextEl: nexthis,
          }"
          :modules="modules"
          class="mySwiper"
        >
        <swiper-slide v-if="!info.pr"></swiper-slide>
        <swiper-slide v-for="history in info.pr" :key="history.id">
            <div class="slider_rp">
              <div class="slider_rp-title" @click="this.popupHistory=history.id">{{history.title}}</div>
              <p class="slider_rp-text" v-html="history.content"></p>
            </div>
          </swiper-slide>
        </swiper>
        <div v-for="history in info.pr" :key="history.id">
          <div class="popup_bg"  v-if="history.id == this.popupHistory">
            <div class="popup_block">
              <div class="popup_close" @click="popupHistory=0">х</div>
              <div class="popup_title">{{history.titlepopup}}</div>
              <p class="popup_text" v-html="history.contentPopup"></p>
            </div>
          </div>
        </div>
      <div ref="prevhis" class="swiper-button-prev">prev</div>
      <div ref="nexthis" class="swiper-button-next">next</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios'
import { Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

  export default {
  name: "HomeView",
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    const prevabout = ref(null);
    const nextabout = ref(null);
    const prevproduct = ref(null);
    const nextproduct = ref(null);
    const prevhud = ref(null);
    const nexthud = ref(null);
    const prevhudo = ref(null);
    const nexthudo = ref(null);
    const prevhis = ref(null);
    const nexthis = ref(null);
      return {
        modules: [Pagination, Navigation],
        prevabout,
        nextabout,
        prevproduct,
        nextproduct,
        prevhud,
        nexthud,
        prevhudo,
        nexthudo,
        prevhis,
        nexthis,
      }
    },
  data() {
    return {
      baseURL: 'https://back.rakhat.a-lux.dev/api/',
      language: '1',
      info: '1',
      popupHistory: 0,
      popupProduct: 0,
      qo: '1',
      qonew: '1',
      competitions: [],
      AnimCon: false,
      AnimPro: false,
      AnimQoNew: false,
      AnimQo: false,
      AnimHis: false,
      phone: '',
      code: '',
      form: 0,
      errPhone: '',
      err: '',
      formID: 0,
      max: 0,
      diagram: [],
      sum: 0,
      formHello: false,
      blockShow: false
    }
  },

  mounted() {    
    this.GetLang()
    this.aboutApi()
    this.dataNone()
    window.onscroll = () => { 
        // console.log(window.pageYOffset) 
        if(window.pageYOffset > 500) {  this.AnimCon = true } 
        if(window.pageYOffset > 1600) {  this.AnimPro = true } 
        if(window.pageYOffset > 2150) {  this.AnimQoNew = true } 
        // if(window.pageYOffset > 2750) {  this.AnimQo = true } 
        if(window.pageYOffset > 2300) {  this.AnimQo = true } 
        // if(window.pageYOffset > 3550) {  this.AnimHis = true } 
        if(window.pageYOffset > 3100) {  this.AnimHis = true } 
        if(window.pageYOffset < 500) {  this.AnimCon = false } 
        if(window.pageYOffset < 1600) {  this.AnimPro = false } 
        // if(window.pageYOffset < 2150) {  this.AnimQoNew = false } 
        // if(window.pageYOffset < 2750) {  this.AnimQo = false } 
        // if(window.pageYOffset < 3550) {  this.AnimHis = false }
        if(window.pageYOffset < 2300) {  this.AnimQo = false } 
        if(window.pageYOffset < 3100) {  this.AnimHis = false } 
    }
  },

  methods: {
    dataNone() {
      var today = new Date();
      if ( today.getDate() >= 15 ) {
        this.blockShow = false
        this.formHello = false
      } else {
        this.blockShow = true
        this.formHello = true
      }
    },
    SendCode() {
      console.log(this.email)
      axios({
        method: 'POST',
        url: 'https://back.rakhat.a-lux.dev/api/voteSms ',
        headers: { 
          'accept-language': localStorage.getItem('lang')
        },
        data: {
          email: this.email,
          productID: this.formID,
        }
        
      }).then(res => {
        console.log(res)
        this.form =1
      }).catch(err => {
        // console.log(err)
        this.errPhone = err
      })

    },
    Send() {
      axios({
        method: 'POST',
        url: 'https://back.rakhat.a-lux.dev/api/vote',
          headers: { 
            'accept-language': localStorage.getItem('lang')
          },
        data: {
          email: this.email,
          code: this.code,
        }
        
      }).then(res => {
        console.log(res)
        this.form = 2
      }).catch(err => {
        console.log(err)
        this.err = err
      })
    },
    GetLang() {
    const lang = localStorage.getItem('lang')
    this.language = lang
    if (lang == null) {
      this.language = 'kz'
      this.lang = lang
      localStorage.setItem('lang', 'kz')
      this.$router.go(0);
    }
    this.$store.state.lang = this.language
    // console.log(this.language)
    },
    aboutApi() {
      axios({
          method: 'GET',
          url: 'https://back.rakhat.a-lux.dev/api/index',
          headers: {
            'accept-language': localStorage.getItem('lang')
          },
        }).then(res => {
          this.info = res.data
          this.qo = res.data.painters.qo
          // this.diagram = res.data.contest
          res.data.contest.forEach(e => {
            this.sum = this.sum + e.vote
            if (e.vote !== null) {
              // let d = []
              this.diagram.push(e)
              // console.log(this.diagram)
              // this.diagram = d
            }
            if (e.vote > this.max) {
              this.max = e.vote
            }
          });
          this.diagram.sort((a, b) => a.vote < b.vote ? 1 : -1);
        })
        axios({
          method: 'GET',
          url: 'https://back.rakhat.a-lux.dev/api/gallery',
          headers: {
            'accept-language': localStorage.getItem('lang')
          },
        }).then(res => {
          this.competitions = res.data
        })
        axios({
          method: 'GET',
          url: 'https://back.rakhat.a-lux.dev/api/gallery',
          headers: {
            'accept-language': localStorage.getItem('lang')
          },
        }).then(res => {
          this.competitions = res.data
        })
    },
  },
};

</script>
<style lang="scss" scoped>

</style>