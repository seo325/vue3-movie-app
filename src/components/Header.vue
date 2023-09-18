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
          class="nav-link">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script>
import Logo from './Logo.vue';

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
                    href: '/movie/tt13138624',
                    path: /^\/movie/
                },
                {
                    name: 'About',
                    href: '/about'
                }
            ]
        };
    },
    components: { Logo }
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