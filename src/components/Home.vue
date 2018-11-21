<template>
  <div class="wrapper">
    <h1 class="text-center p-3">Home </h1>

    <div class="row">
      <div class="col-6">
        <div class="mb-3">
          <input
            v-model="taskTitle"
            type="text"
            class="form-control"
            placeholder="What we will watch?"
            @keyup.enter="newTask">
        </div>
        <div class="mb-3">
          <textarea
            id=""
            v-model="taskDescription"
            class="form-control"
            name=""
            cols="30"
            rows="3"
            @keyup.enter="newTask"/>
        </div>
      </div>
    </div>

    <div class="shadow-lg p-3 mb-5 bg-white rounded">
      <div class="d-flex col-12 ">
        <div class="custom-control custom-radio mb-3">
          <input
            id="radioFilm"
            v-model="whatWatch"
            type="radio"
            class="custom-control-input"
            name="customRadio"
            placeholder="What we will watch?"
            value="Film"
            @keyup.enter="newTask">
          <label
            for="radioFilm"
            class="custom-control-label">Film</label>
        </div>
        <div class="custom-control custom-radio mb-3 ml-5">
          <input
            id="radioSerial"
            v-model="whatWatch"
            type="radio"
            class="custom-control-input"
            name="customRadio"
            placeholder="What we will watch?"
            value="Serial"
            @keyup.enter="newTask">
          <label
            for="radioSerial"
            class="custom-control-label">Serial</label>
        </div>
      </div>

      <div v-if="whatWatch === 'Film'">
        <div class="d-flex">
          <div class="form-checks mb-3 col-2">
            <label for="hours">Hours:</label>
            <input
              id="hours"
              v-model="filmHours"
              type="text"
              class="form-control"
              placeholder=""
              @keyup.enter="newTask">
          </div>
          <div class="form-checks mb-3 col-2">
            <label for="mins">Mins:</label>
            <input
              id="mins"
              v-model="filmMinutes"
              type="text"
              class="form-control"
              placeholder=""
              @keyup.enter="newTask">
          </div>
          <p class="pt-4 pl-5">Total Film time: {{ filmTime }}</p>
        </div>
      </div>

      <div v-if="whatWatch === 'Serial'">
        <div class="d-flex row">
          <div class="form-checks mb-3 col-3">
            <label for="sessons">How many sessons?</label>
            <input
              id="sessons"
              v-model="serialSessons"
              type="text"
              class="form-control"
              placeholder=""
              @keyup.enter="newTask">
          </div>
          <div class="form-checks mb-3 col-3">
            <label for="serials">How many series?</label>
            <input
              id="serials"
              v-model="serialSeries"
              type="text"
              class="form-control"
              placeholder=""
              @keyup.enter="newTask">
          </div>
          <div class="form-checks mb-3 col-4">
            <label for="sermin">How long i one series (min)?</label>
            <input
              id="sermin"
              v-model="serialSeriesMinutes"
              type="text"
              class="form-control"
              placeholder=""
              @keyup.enter="newTask">
          </div>
          <p class="pl-3">Total Serial time: {{ serialTime }}</p>
        </div>
      </div>
    </div>

    <div class="shadow-lg p-3 mb-5 bg-white rounded">
      <div class="tags mb-3">
        <span
          v-for="tag in tags"
          :key="tag.title"
          :class="{active: tag.use}"
          class="badge badge-pill badge-info"
          @click="addUseTag(tag)">
          {{ tag.title }}
        </span>
      </div>

      <div class="mb-4">
        <div
          :class="{active: !tagShowMenu}"
          class="btn btn-primary mb-2"
          @click="tagShowMenu = !tagShowMenu">Add New Tag
        </div>
        <div
          v-if="tagShowMenu"
          class="tag-form d-flex">
          <input
            v-model="tagTitle"
            type="text"
            class="form-control mr-3"
            placeholder="New tag"
            @keyup.enter="newTag">
          <div
            class="btn btn-primary"
            @click="newTag">Send</div>
        </div>
      </div>

      <div class="mb-3">
        {{ tagsUsed }}
      </div>
    </div>

    <div class="float-right mb-4">
      <div
        class="btn btn-primary"
        @click="newTask">Send form</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      taskTitle: '',
      taskDescription: '',
      whatWatch: 'Film',

      filmHours: 1,
      filmMinutes: 30,

      serialSessons: 11,
      serialSeries: 2,
      serialSeriesMinutes: 120,

      tagTitle: '',
      tagShowMenu: false,
      tagsUsed: []
    }
  },
  computed: {
    tags () {
      return this.$store.getters.tags
    },
    filmTime () {
      let min = (this.filmHours * 60) + (this.filmMinutes * 1)
      return this.getHoursAndMins(min)
    },
    serialTime () {
      let min = this.serialSessons * this.serialSeries * this.serialSeriesMinutes
      return this.getHoursAndMins(min)
    }
  },
  methods: {
    newTag () {
      if (this.tagTitle === '') {
        return
      }
      const tag = {
        title: this.tagTitle,
        use: false
      }
      this.$store.dispatch('newTag', tag)
    },
    newTask () {
      if (this.taskTitle === '') {
        return
      }
      let time
      if (this.whatWatch === 'Film') {
        time = this.filmTime
      } else {
        time = this.serialTime
      }
      const task = {
        title: this.taskTitle,
        description: this.taskDescription,
        whatWatch: this.whatWatch,
        time,
        tags: this.tagsUsed,
        completed: false,
        editing: false
      }

      this.$store.dispatch('newTask', task)

      console.log(task)

      // Reset
      this.taskTitle = ''
      this.taskDescription = ''
      this.tagsUsed = []

      for (let i = 0; i < this.tags.length; i++) {
        this.tags[i].use = false
      }
    },
    addUseTag (tag) {
      tag.use = !tag.use

      if (tag.use) {
        this.tagsUsed.push({
            title: tag.title
          }
        )
      } else {
        this.tagsUsed.splice(tag.title, 1)
      }
    },
    getHoursAndMins (minutes) {
      let hours = Math.trunc(minutes / 60)
      let min = minutes % 60
      return `${hours} Hours ${min} Minutes`
    }
  },
}
</script>

<style lang="scss" scoped>
  .tags {
    .badge {
      padding: 10px 5px;
      margin: 5px;
      min-width: 80px;
      cursor: pointer;
    }
    .active {
      box-shadow: 0 0 10px 3px rgba(0,0,0,.3);
      background: darken(#17a2b8, 10%);
    }
  }
  .btn-primary {
    &.active {
      background: #cce5ff;
    }
  }
</style>
