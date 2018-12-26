<template>
  <section class="container">
    <div>
      <h1>Main page</h1>
      <div>
        <ul>
          <li
            v-for="(link, index) in linksList"
            :key="index"
          >
            <nuxt-link
              :to="`/${link}`"
              :event="''"
              @mouseover.native="prefetchData($event, link)"
              @mouseout.native="cancelPrefetchingData"
              @click.prevent.native="fetchData($event, link, true)"
            >
              {{ link }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      linksList: ['posts', 'albums', 'photos', 'todos'],
      timeoutId: '',
      loading: false,
      redirect: false
    }
  },
  computed: {
    ...mapState({
      linksData: state => state.links.linksData
    })
  },
  methods: {
    ...mapActions({
      fetchLinkData: 'links/fetchLinkData'
    }),
    async fetchData(e, link, redirect) {
      e.preventDefault()
      if (this.linksData[link]) {
        if (this.redirect || redirect) {
          this.$router.push({ path: `/${link}` })
          return
        } else {
          return
        }
      }

      if (!this.loading) {
        try {
          this.loading = true
          await this.fetchLinkData(link)
          this.loading = false
          if (this.redirect || redirect) {
            this.$router.push({ path: `/${link}` })
          }
        } catch (e) {
          this.loading = false
          console.log(e)
        }
      } else {
        this.redirect = redirect
      }
    },
    prefetchData(e, link) {
      this.timeoutId = setTimeout(() => {
        this.fetchData(e, link, false)
      }, 10)
    },
    cancelPrefetchingData() {
      clearTimeout(this.timeoutId)
    }
  }
}
</script>
