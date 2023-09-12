<template>
  <div>{{ movie.imdbID }}</div>
</template>

<script>

export default {
  components: {
  },
  props: {
    movie: {
      type: Object,
      default: () => ({})
    }
  },
//   data() {
//     return {
//       imageLoading: true
//     }
//   },
//   mounted() {
//     this.init()
//   },
//   methods: {
//     async init() {
//       const poster = this.movie.Poster
//       if (!poster || poster === 'N/A') {
//         this.imageLoading = false
//       } else {
//         await this.$loadImage(poster)
//         this.imageLoading = false
//       }
//     }
//   }
}
</script>


