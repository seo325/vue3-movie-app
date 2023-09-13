

const _defaultMessage = 'Search for the movie title!'
import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'


export default {
    namespaced: true,
    state: () => ({
        movies: [],
        message: _defaultMessage,
        loading: false,
        theMovie: {}
    }),
    getters: {},

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
    actions: {
        async searchMovies({ state, commit }, payload) {
            if (state.loading) return

            commit('updateState', {
                theMovie: {},
                loading: true,
            })

            commit('updateState', {
                message: '',
                loading: true
            })

            try {
                const res = await _fethMovie({
                    ...payload,
                    page: 1
                })

                const { Search, totalResults } = res.data
                commit('updateState', {
                    movies: _uniqBy(Search, 'imdbID')
                })
                console.log(totalResults);
                console.log(typeof totalResults)

                const total = parseInt(totalResults, 10)
                const pageLength = Math.ceil(total / 10)
                console.log(total);
                console.log(pageLength)
                //추가요청
                if (pageLength > 1) {
                    for (let page = 2; page <= pageLength; page += 1) {
                        if (page > (payload.number / 10)) break

                        const res = await _fethMovie({
                            ...payload,
                            page
                        })
                        const { Search } = res.data
                        commit('updateState', {
                            movies: [
                                ...state.movies,
                                ..._uniqBy(Search, 'imdbID')
                            ],
                            // message :'helloworld',
                            // loading :true
                        })
                    }
                }
            } catch (message) {
                commit('updateState', {
                    message: '',
                    loading: true
                })
            } finally {
                commit('updateState', {

                    loading: false
                })
            }
        }, 
      async searchMovieWithId(context, payload) {
        try {
            const res = await _fethMovie({
                payload 
            })
            console.log(res)
        } catch (error) {

        }
      }

    }
}

function _fethMovie(payload) {
    const { title, type, year, page ,id} = payload
    const OMDB_API_KEY = '7035c60c'

    const url = id ?
     `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
     : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

    return new Promise((resovle, reject) => {
        axios.get(url)
            .then((res) => {
                if (res.data.Error) {
                    reject(res.data.Error)
                }
                console.log(res)
                resovle(res)
            })
            .catch((err => {
                reject(err.message)
            }))
    })

}