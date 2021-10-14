export const state = () => ({
  fetched: false,
  list: [],
});

export const mutations =
{
  setFetched: (state, fetched) => (state.fetched = fetched),
  set: (state, mealTimes) => (state.list = mealTimes),
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
      const data = await this.$api.mealTimes.get();
      commit('set', data);
    }
    catch(error)
    {
      commit('setFetched', false);
      throw error;
    }
  },
};
