<template>
  <div class="root">
    <div class="left">
      <ul>
        <li v-for="i in sortedArticles" :key="i.feedItemId">
          <nuxt-link :to="'/articles/' + i.feedItemId">
            Article {{ i.title }}
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="right">
      There
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      sortedArticles: 'news/SORTED_ARTICLES'
    })
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  line-height: 1.8;
}
.root {
  display: flex;
  flex-direction: row;
  height: 100vh;
}
.left {
  flex: 1;
  overflow-y: auto;
}
.left ul {
  list-style-type: none;
}
.left li a {
  display: block;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #eee;
  color: black;
}
.left li a:hover {
  color: darkorange;
}
.left li a:visited {
  opacity: 0.6;
}
.right {
  flex: 1;
}
</style>
