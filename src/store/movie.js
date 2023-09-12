

const _defaultMessage = 'Search for the movie title!'
import axios from 'axios'

export default {
    namespaced : true,
    state: () => ({
        movies: [],
        message: _defaultMessage,
        loading: false,
        theMovie: {}
      }),
    getters :{},

    //methods
    mutations: {
        updateState(state, payload) {
            Object.keys(payload).forEach(key => {
              state[key] = payload[key]
            })
          },
        resetMovies(state) {
            state.movies = []
            state.message = _defaultMessage
            state.loading = false
          }
    },
    //비동기
    actions : {
        async searchMovies(state, context , payload){
        const {title, type , number, year} =payload
        const OMDB_API_KEY = '7035c60c'
        const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)
        const {Search ,totalResults} =res.data
        context.commit('updateState', {
            movies :Search,
            // message :'helloworld',
            // loading :true
        })
        console.log(totalResults); 
        console.log(typeof totalResults)

        const total = parseInt(totalResults,10)
        const pageLength =Math.ceil(total/10)

        if(pageLength >1) {
            for(let page =2 ; page <=pageLength; page +=1){
                for (let page = 2; page <= pageLength; page += 1) {
                    if (page > (payload.number / 10)) break
                }
                const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)
                const {Search}=res.data
                context.commit('updateState', {
                    movies :[...state.movies, ...Search],
                    // message :'helloworld',
                    // loading :true
                })
            }
        }
        }
    }
}