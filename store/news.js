import Vue from 'vue'

export const state = () => {
  return {
    articles: {}
  }
}

export const getters = {
  SORTED_ARTICLES(state) {
    return Object.values(state.articles).sort((a, b) => b.pubdate - a.pubdate)
  }
}

export const mutations = {
  UPDATE_NEWS(state, articles) {
    Vue.set(state, 'articles', articles)
  }
}

export const actions = {
  async FETCH_NEWS({ commit }) {
    const { data } = await this.$axios('/api/news')
    commit('UPDATE_NEWS', data)
  }
}
