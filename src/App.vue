<template lang="pug" src="@/templates/app.pug">
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import moment from 'moment'

  Vue.use(VueAxios, axios, moment)

  var nasaApiBaseUrl = 'https://api.nasa.gov/planetary/apod?'
  var nasaApiDateQuery = 'date='
  var nasaApiKey = 'api_key=uI5nmso1mWCHxbGyzVqecAYD07O8j5QGsE8tUgVw'
  var nasaApi = 'https://api.nasa.gov/planetary/apod?api_key=uI5nmso1mWCHxbGyzVqecAYD07O8j5QGsE8tUgVw'

  const minDate = '1997-01-01'
  const maxDate = new Date()

  export default {
    data () {
      return {
        navItems: [
          {
            icon: 'star',
            title: 'NASA',
            url: 'http://nasa.gov'
          },
          {
            icon: 'photo_library',
            title: 'Astronomy Picture of the Day',
            url: 'http://apod.nasa.gov'
          },
          {
            icon: 'build',
            title: 'NASA Open APIs',
            url: 'https://api.nasa.gov'
          }
        ],
        sideNav: false,
        apod: [],
        fab: {
          show: false,
          botPad: false,
          bottom: '10px'
        },
        infoModal: false,
        datePicker: {
          modal: false,
          menu: false,
          e3: null,
          allowed: {
            min: minDate,
            max: maxDate
          }
        },
        dateBrowse: {
          show: false,
          active: 1
        },
        theNextDate: ''
      }
    },
    created () {
      this.$http.get(nasaApi).then((response) => {
        console.log(response.data)
        this.apod = response.data
      })
    },
    methods: {
      setDate: function () {
        this.$http.get(nasaApiBaseUrl + nasaApiDateQuery + this.datePicker.e3 + '&' + nasaApiKey).then((response) => {
          console.log(response.data)
          this.apod = response.data
        })
      },
      fabPadBot: function () {
        if (this.fab.botPad === true) {
          return '66px'
        } else if (this.fab.botPad === false) {
          return '10px'
        }
      },
      nextDay: function () {
        var date = this.apod.date
        console.log(date)
        var changedDate = date.setDate(date.getDate() + 1)
        console.log(changedDate)
        this.theNextDate = changedDate
      },
      prevDay: function () {
        var date = this.apod.date
        var changedDate = date.setDate(date.getDate() - 1)
        this.theNextDate = changedDate
      }
    },
    computed: {
      postDate: function () {
        return moment(this.apod.date).format('dddd, MMMM Do YYYY')
      },
      fabBotPad: function () {
        if (this.fab.botPad === true) {
          return '66px'
        } else if (this.fab.botPad === false) {
          return '10px'
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'

  .application--light {
    background: #303030 !important;
    position: relative;
    z-index: 0;
  }

  #bg-img {
    position: relative;
    height: 100vh;
    width: 100vw;
    z-index: 0;
    background-position: center center;
  }

  #bg-img > iframe {
    width: 100vw;
    height: 100vh;
  }

  .tall-tile {
    height: 65px;
  }

  #app .speed-dial {
    position: absolute;
    right: 10px !important;
    z-index: 2;
    transition: bottom 0.4s cubic-bezier(0.25, 0.8, 0.5, 1);
  }

  .bot-nav-open {
    bottom: 66px !important;
  }

  .bot-nav-closed {
    bottom: 10px !important;
  }

  #bottom-nav-wrap {
    height: 56px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

  #app .btn--floating {
    position: relative;
  }

  #progress-wrapper {
    position: absolute;
    z-index: -1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
  }

  #progress-wrapper > div {
    max-width: 50%;
  }

  .modal-image {
    display: block;
    width: 95%;
    max-width: 450px;
    height: auto;
    margin: 0 auto;
    border-radius: 3px;
  }

  .modal-video {
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 30px;
    height: 0;
    overflow: hidden;
  }

  .modal-video iframe,
  .modal-video object,
  .modal-video embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .lead {
    font-weight: 300;
    font-size: 1.2rem;
    letter-spacing: 0.7px;
    line-height: 1.5;
  }
</style>
