<template>
  <div 
    id="app" 
    class="wrapper">

    <div class="container">
      <div class="page-wrap">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <router-link 
            class="navbar-brand" 
            to="/">
            Film library
          </router-link>
          <button 
            class="navbar-toggler" 
            type="button" 
            @click="menuShow = !menuShow">
            <span class="navbar-toggler-icon"/>
          </button>
          <div 
            id="navbarNav" 
            :class="{show: menuShow }" 
            class="collapse navbar-collapse">
            <ul class="navbar-nav">
              <li 
                v-for="link in linkMenu" 
                :key="link.title" 
                class="nav-item active" 
                @click="menuShow = false">
                <router-link 
                  :to="`${link.url}`" 
                  class="nav-link" >
                  {{ link.title }}
                </router-link>
              </li>
            </ul>
          </div>
        </nav>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menuShow: false,
      linkMenu: [
        {title: 'Home', url: '/'},
        {title: 'Task', url: '/task'},
        {title: 'Login', url: '/login'},
        {title: 'Registration', url: '/registration'}
      ]
    }
  }
}
</script>

<style lang="scss">
  @import '~bootstrap/scss/bootstrap.scss';

  body {
      h1 {
        color: Black;
      }

    .navbar-nav {
      li {
        padding: 0 15px;
      }
    }
  }

  .card {
    position: relative;
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }

    &-title {
      span {
        padding: 5px;
        background: #ccc;
      }
    }
    .btn {
      margin-bottom: 20px;
    }

    &.completed {
      background: green;
    }

    .close-btn {
      position: absolute;
      right: 10px;
      top: 0;
      padding: 5px;
      font-family: monospace;
      font-size: 20px;
    }
  }
</style>
