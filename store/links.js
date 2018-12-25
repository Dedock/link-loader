import * as types from './mutation-types'

const state = () => ({
  linksData: {}
})

const getters = {}

const actions = {
  async fetchLinkData({ commit }, link) {
    try {
      const { data } = await this.$axios.get(
        `http://jsonplaceholder.typicode.com/${link}`
      )

      commit(types.SET_LINK_DATA, { linkName: link, linksData: data })
      return data
    } catch (err) {
      throw err
    }
  }
}

const mutations = {
  [types.SET_LINK_DATA](state, { linksData, linkName }) {
    state.linksData[linkName] = linksData
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
