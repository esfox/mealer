export const state = () => ({
  fetched: false,
  list: [],
});

export const mutations =
{
  setFetched: (state, fetched) => (state.fetched = fetched),
  set: (state, food) => (state.list = food),
  add: (state, food) => state.list.push(food),
  edit: (state, food) => (state.list.find(({ id }) => id === food.id).name = food.name),
  del: (state, id) => (state.list = state.list.filter(food => food.id !== id)),
};

export const actions =
{
  async load({ state, commit })
  {
    if(state.fetched)
      return;

    commit('setFetched', true);
    try
    {
      const data = await this.$api.food.get();
      commit('set', data);
    }
    catch(error)
    {
      commit('setFetched', false);
      throw error;
    }
  },

  async add({ commit }, food)
  {
    const data = await this.$api.food.add(food);
    commit('add', data);
  },

  async edit({ commit }, food)
  {
    const data = await this.$api.food.edit(food.id, food);
    commit('edit', data);
  },

  async del({ commit }, id)
  {
    await this.$api.food.del(id);
    commit('del', id);
  }
};
