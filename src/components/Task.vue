<template>
  <div class="wrapper">
    <div class="filter d-flex justify-content-between">
      <h1>Tasks</h1>
      <div
        class="btn-group"
        role="group"
        aria-label="Basic example">

        <button
          type="button"
          class="btn btn-primary"
          @click="filter = 'active'"
        >Active</button>

        <button
          type="button"
          class="btn btn-primary"
          @click="filter = 'completed'"
        >Completed</button>

        <button
          type="button"
          class="btn btn-primary"
          @click="filter = 'all'"
        >All</button>
      </div>
    </div>

    <div class="task-list">

      <div
        v-for="task in tasksFilter"
        :key="task.id"
        :class="{ completed: task.completed }"
        class="card">
        <div class="card-body">
          <button
            type="button"
            class="close-btn close"
            aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h5 class="card-title"><span>{{ task.whatWatch }}</span> | Total time: {{ task.time }}</h5>
          <p class="card-text">{{ task.description }}</p>
          <a
            href="#"
            class="btn btn-primary"
            @click="task.completed = !task.completed">Go somewhere</a>

          <div class="form-check">
            <input
              id="exampleCheck1"
              v-model="task.completed"
              type="checkbox"
              class="form-check-input">
            <label
              class="form-check-label"
              for="exampleCheck1">{{ task.title }}</label>
          </div>
          <div class="tags mb-3">
            <span
              v-for="tag in task.tags"
              :key="tag.title"
              :class="{active: tag.use}"
              class="badge badge-pill badge-info"
              @click="addUseTag(tag)">
              {{ tag.title }}
            </span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        filter: 'active'
      }
    },
    computed: {
      tasksFilter() {
        if (this.filter === 'active') {
          return this.$store.getters.taskNotCompleted
        } else if (this.filter === 'completed') {
          return this.$store.getters.taskCompleted
        } else if (this.filter === 'all') {
          return this.$store.getters.tasks
        }
        return this.filter === 'active'
      },
    }
  }
</script>

<style lang="scss" scoped>
  .filter {
    margin: 20px;
  }

  .btn-group {
    .btn {
      &:first-child {
        border-right: 2px solid #fff;
      }

      &:last-child {
        border-left: 1px solid #fff;
      }
    }
  }
</style>
