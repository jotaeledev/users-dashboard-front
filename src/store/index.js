import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usersList:[],
    selectedUser:{},
    favoritesUsers: []
  },
  mutations: {
    setUsersList(state, user){
      state.usersList = user
    },
    setSelectedUser(state, user){
      state.selectedUser = user
    },
    addFavoritesUsers(state, user){
      if(state.favoritesUsers.some(e => e.username === user.username)){
        state.favoritesUsers = state.favoritesUsers.filter(e => e.username !== user.username)
      }else{
        state.favoritesUsers.push(user)
      }
    },
    clearFavoritesUsers(state){
      state.favoritesUsers = []
    }
  },
  actions: {
  },
  modules: {
  }
})
