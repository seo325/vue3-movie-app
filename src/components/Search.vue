<template>
  <div class="continaer">
    <input 
      v-model="title"
      class="form-control"
      type="text"
      placeholder="search for movives, Series & more" />
  </div>
  <div class="selects">
    <select
      v-for="filter in filters"
      :key="filters.name"
      v-model="$data[filter.name]"
      class="form-select">
      <option
        v-if="filter.name === 'year'"
        value="">
        All Years
      </option>
      <option
        v-for="item in filter.items"
        :key="item">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
    data() {
        return{
            title :'',
            type: 'movie',
            number : 10,
            year : '',
            
            filters: [
        {
          name: 'type',
          items: ['movie', 'series', 'episode']
        },
        {
          name: 'number',
          items: [10, 20, 30]
        },
        {
          name: 'year',
          items: (() => {
            const years = []
            const thisYear = new Date().getFullYear()
            for (let i = thisYear; i >= 1985; i -= 1) {
              years.push(i)
            }
            return years
          })()
        }
      ]
        }
    },
}
</script>