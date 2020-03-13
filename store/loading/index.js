export const state = () => ({
  overlay: null
})
  
export const mutations = {
  set(state, overlay) {
    state.overlay = overlay;
  }
}
  
export const actions = {
  create({commit}, data) {
    commit('set', data);
  },
}