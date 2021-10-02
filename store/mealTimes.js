export const state = () => ({
  list: undefined,
});

export const mutations =
{
  set: (state, mealTimes) => (state.list = mealTimes),
};

export const actions =
{
  async load({ state, commit })
  {
    if(state.list)
      return;

    const data = await this.$api.mealTimes.get();
    commit('set', data);
  },
};
