<template lang="pug" src="@/templates/app.pug">

</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'

  Vue.use(VueAxios, axios)

  var nasaApiUrl = 'https://api.nasa.gov/planetary/apod?api_key='
  var nasaApiKey = 'uI5nmso1mWCHxbGyzVqecAYD07O8j5QGsE8tUgVw'
  var nasaApi = nasaApiUrl + nasaApiKey

  export default {
    data () {
      return {
        navItems: [
          {
            icon: 'star',
            title: 'Yeah',
            url: 'http://nasa.gov'
          },
          {
            icon: 'dashboard',
            title: 'Okay',
            url: 'http://google.com'
          }
        ],
        sideNav: false,
        apod: [],
        fab: {
          show: false,
          transition: 'slide-x-reverse-transition',
          direction: 'top'
        }
      }
    },
    created () {
      this.$http.get(nasaApi).then((response) => {
        console.log(response.data)
        this.apod = response.data
      })
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'

  #app .speed-dial {
    position: absolute;
  }

  #app .btn--floating {
    position: relative;
  }
</style>
