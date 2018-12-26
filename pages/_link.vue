<template>
  <div class="container">
    <h2 class="heading">
      {{ $route.params.link }}
    </h2>
    <div>
      <ul>
        <li
          v-for="item in data"
          :key="item.id">
          {{ item.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Link',
  async asyncData({ params, $axios, store }) {
    if (store.state.links.linksData[params.link]) {
      return {
        data: store.state.links.linksData[params.link]
      }
    } else {
      const data = await store.dispatch('links/fetchLinkData', params.link)
      return {
        data
      }
    }
  },
  fetch() {}
}
</script>

<style>
.heading {
  margin: 0 auto;
}
</style>
