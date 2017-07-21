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
</style>

<style lang="scss" src="./sass/app.scss">
</style>
