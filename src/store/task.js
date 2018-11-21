export default {
  state: {
    tasks: [
      {
        id: 1,
        title: 'Card 1',
        description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
        whatWatch: 'Film',
        completed: false,
        editing: false
      },
      {
        id: 2,
        title: 'Card 2',
        description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
        whatWatch: 'Serial',
        completed: true,
        editing: false
      }
    ]
  },
  mutations: {
    newTask (state, payload) {
      payload.id = Math.random()
      state.tasks.push(payload)
    }
  },
  actions: {
    newTask({commit}, payload) {
      commit('newTask', payload)
    }
  },
  getters: {
    tasks (state) {
      return state.tasks
    },
    taskCompleted (state) {
      return state.tasks.filter(task => {
        return task.completed
      })
    },
    taskNotCompleted (state) {
      return state.tasks.filter(task => {
        return task.completed === false
      })
    },
  }
}
