export const state = () => ({
  authUser: null
})

export const mutations = {
  SET_USER(state, user) {
    state.authUser = user
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  // It will be called only in this index.js file
  async nuxtServerInit({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
    const { data } = await this.$axios.post('/api/news')
    commit('news/UPDATE_NEWS', data)
  },
  async login({ commit }, { username, password }) {
    try {
      const { data } = await this.$axios.post('/api/login', {
        username,
        password
      })
      commit('SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async logout({ commit }) {
    await this.$axios.post('/api/logout')
    commit('SET_USER', null)
  }
}
