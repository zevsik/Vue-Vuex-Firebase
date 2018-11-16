<template>
  <div class="wrapper">
    <h1 class="text-center p-3">Home </h1>

    <div class="row">
      <div class="col-6">
        <div class="mb-3">
          <input type="text" class="form-control"
                 placeholder="What we will watch?"
                 v-model="taskTitle"
                 @keyup.enter="newTask">
        </div>
        <div class="mb-3">
      <textarea class="form-control" name="" id="" cols="30" rows="3"
                v-model="taskDescription"
                @keyup.enter="newTask">
      </textarea>
        </div>
      </div>
    </div>

    <div class="shadow-lg p-3 mb-5 bg-white rounded">
      <div class="d-flex col-12 ">
        <div class="custom-control custom-radio mb-3">
          <input type="radio" id="radioFilm" class="custom-control-input" name="customRadio"
                 placeholder="What we will watch?"
                 v-model="whatWatch"
                 @keyup.enter="newTask" value="Film">
          <label for="radioFilm" class="custom-control-label">Film</label>
        </div>
        <div class="custom-control custom-radio mb-3 ml-5">
          <input type="radio" id="radioSerial" class="custom-control-input" name="customRadio"
                 placeholder="What we will watch?"
                 v-model="whatWatch"
                 @keyup.enter="newTask" value="Serial">
          <label for="radioSerial" class="custom-control-label">Serial</label>
        </div>
      </div>

      <div  v-if="whatWatch === 'Film'">
        <div class="d-flex">
          <div class="form-checks mb-3 col-2">
            <label for="hours">Hours:</label>
            <input id="hours" type="text" class="form-control"
                   placeholder=""
                   v-model="filmHours"
                   @keyup.enter="newTask">
          </div>
          <div class="form-checks mb-3 col-2">
            <label for="mins">Mins:</label>
            <input id="mins" type="text" class="form-control"
                   placeholder=""
                   v-model="filmMinutes"
                   @keyup.enter="newTask">
          </div>
          <p class="pt-4 pl-5">Total Film time: {{ filmTime }}</p>
        </div>
      </div>

      <div v-if="whatWatch === 'Serial'">
        <div class="d-flex row">
          <div class="form-checks mb-3 col-3">
            <label for="sessons">How many sessons?</label>
            <input id="sessons" type="text" class="form-control"
                   placeholder=""
                   v-model="serialSessons"
                   @keyup.enter="newTask">
          </div>
          <div class="form-checks mb-3 col-3">
            <label for="serials">How many series?</label>
            <input id="serials" type="text" class="form-control"
                   placeholder=""
                   v-model="serialSeries"
                   @keyup.enter="newTask">
          </div>
          <div class="form-checks mb-3 col-4">
            <label for="sermin">How long i one series (min)?</label>
            <input id="sermin" type="text" class="form-control"
                   placeholder=""
                   v-model="serialSeriesMinutes"
                   @keyup.enter="newTask">
          </div>
          <p> Total Serial time: {{ serialTime }}</p>
        </div>
      </div>
    </div>

    <div class="shadow-lg p-3 mb-5 bg-white rounded">
      <div class="tags mb-3">
        <span class="badge badge-pill badge-info"
              v-for="tag in tags"
              :key="tag.title"
              @click="addUseTag(tag)"
              :class="{active: tag.use}">
          {{ tag.title }}
        </span>
      </div>
      <div class="mb-4">
        <div class="btn btn-primary mb-2"
             @click="tagShowMenu = !tagShowMenu"
             :class="{active: !tagShowMenu}">Add New Tag
        </div>
        <div class="tag-form d-flex" v-if="tagShowMenu">
          <input type="text" class="form-control mr-3"
                 placeholder="New tag"
                 v-model="tagTitle"
                 @keyup.enter="newTag">
          <div class="btn btn-primary" @click="newTag">Send</div>
        </div>
      </div>
      <div class="mb-3">
        {{ tagsUsed }}
      </div>
    </div>

    <div class="float-right mb-4">
      <div class="btn btn-primary" @click="newTask">Send form</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      taskTitle: '',
      taskID: 3,
      taskDescription: '',
      whatWatch: 'Film',

      filmHours: 1,
      filmMinutes: 30,

      serialSessons: 11,
      serialSeries: 2,
      serialSeriesMinutes: 120,

      tagTitle: '',
      tagShowMenu: false,
      tagsUsed: [],
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
    }
  },
  methods: {
    newTag () {
      if (this.tagTitle === '') {
        return
      }
      this.tags.push({
        title: this.tagTitle,
        used: false
      })
      const tag = {
        title: this.tagTitle
      }
      console.log(tag)
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
        id: this.taskID,
        title: this.taskTitle,
        description: this.taskDescription,
        whatWatch: this.whatWatch,
        time,
        tagsUsed: this.tagsUsed,
        completed: false,
        editing: false
      }

      console.log(task)

      // Reset
      this.taskID += 1
      this.taskTitle = ''
      this.taskDescription = ''
      this.tagsUsed = []
    },
    addUseTag (tag) {
      tag.use = !tag.use

      if (tag.use) {
        this.tagsUsed.push(
          tag.title
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
  computed: {
    filmTime () {
      let min = (this.filmHours * 60) + (this.filmMinutes * 1)
      return this.getHoursAndMins(min)
    },
    serialTime () {
      let min = this.serialSessons * this.serialSeries * this.serialSeriesMinutes
      return this.getHoursAndMins(min)
    }
  }
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
