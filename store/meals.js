export const state = () => ({
  mappedByDate: undefined,
});

export const mutations =
{
  set: (state, meals) => (state.mappedByDate = meals),
};

export const actions =
{
  async load({ state, commit })
  {
    if(state.mappedByDate)
      return;

    const data = await this.$api.meals.get();
    commit('set', data);
  },
};
