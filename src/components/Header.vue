<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div 
        v-for="nav in navigations"
        :key="nav.name"
        class="nav-item">
        <RouterLink 
          :to="nav.href"
          active-class="active"
          :class="{ active: isMatch(nav.path) }"
          class="nav-link">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script>

export default {
 
    data() {
        return {
            navigations: [
                {
                    name: 'Home',
                    href: '/'
                },
                {
                    name: 'Movie',
                    href: '/movie/tt4007502',
                    path: /^\/movie/
                },
                {
                    name: 'About',
                    href: '/about'
                }
            ]
        };
    },
   methods :{
    isMatch(path) {
      if (!path) return false
      return path.test(this.$route.fullPath)
   }
  }
}


</script>

<style lang="scss" scoped>
header {
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  .logo{
    margin-right: 40px;
  }
}
</style>