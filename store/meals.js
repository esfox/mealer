export const state = () => ({
  fetched: false,
  list: [],
});

/**
 * @typedef Meal
 * @property {number} id
 * @property {{ id: number, name: string }} food
 * @property {{ id: number, name: string }} mealTime
 * @property {string} date
 */

export const mutations =
{
  setFetched: (state, fetched) => (state.fetched = fetched),
  set: (state, meals) => (state.list = meals),
  add: (state, meals) => state.list.push(...meals),

  del(state, id)
  {
    for(const i in state.list)
    {
      if(id === state.list[i]?.id)
      {
        state.list.splice(i, 1);
        break;
      }
    }
  }
};

export const getters =
{
  getMealTimeFood: (state) => (mealTimeID, date) =>
  {
    const food = [];
    for(const meal of state.list)
    {
      if(meal.mealTime.id === mealTimeID && meal.date === date)
        food.push(meal.food);
    }

    return food;
  }
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
      const data = await this.$api.meals.get();
      commit('set', data);
    }
    catch(error)
    {
      commit('setFetched', false);
      throw error;
    }
  },

  /** @param {Meal[]} meals */
  async add({ commit }, meals)
  {
    if(!Array.isArray(meals))
      meals = [meals];

    const mealsData = [];
    const foodMap = {};
    const mealTimeMap = {};
    for(const { food, mealTime, date } of meals)
    {
      const foodID = food.id;
      const mealTimeID = mealTime.id;
      mealsData.push({ foodID, mealTimeID, date });
      if(!foodMap[foodID]) foodMap[foodID] = food;
      if(!mealTimeMap[mealTimeID]) mealTimeMap[mealTimeID] = mealTime;
    }

    const addedMeals = await this.$api.meals.add(mealsData);
    const newMeals = [];
    for(const { id, foodID, mealTimeID, date } of addedMeals)
      newMeals.push({ id, food: foodMap[foodID], mealTime: mealTimeMap[mealTimeID], date });

    commit('add', newMeals);
  },

  async del({ commit }, { foodID, mealTimeID, date })
  {
    const [deleted] = await this.$api.meals.del(foodID, mealTimeID, date);
    commit('del', deleted.id);
  }
};
