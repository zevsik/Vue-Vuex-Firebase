export default {
  state: {
    tags: [
      {
        title: 'JS',
        use: false
      },
      {
        title: 'RequireJS',
        use: false
      },
      {
        title: 'CommonJS',
        use: false
      }
    ]
  },
  mutations: {
    newTag (state, payload) {
      state.tags.push(payload)
    }
  },
  actions: {
    newTag ({commit}, payload) {
      commit('newTag', payload)
    }
  },
  getters: {
    tags (state) {
      return state.tags
    }
  }
}
