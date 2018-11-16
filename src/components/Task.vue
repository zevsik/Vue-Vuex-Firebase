<template>
  <div class="wrapper">
    <h1>Tasks</h1>

    <div class="task-list">

      <div class="card" v-for="task in tasks" :key="task.id" :class="{ completed: task.completed }">
        <div class="card-body">
          <button type="button" class="close-btn close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h5 class="card-title"><span>{{ task.whatWatch }}</span> | Total time: </h5>
          <p class="card-text">{{ task.description }}</p>
          <a href="#" class="btn btn-primary" @click="task.completed = !task.completed">Go somewhere</a>

          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="task.completed">
            <label class="form-check-label" for="exampleCheck1">{{ task.title }}</label>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
          completed: false,
          editing: false
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
