export const mealsAPI = ({ $axios }) =>
({
  async get()
  {
    try
    {
      const data = await $axios.$get('/meals');
      return { data };
    }
    catch(error)
    {
      return { error };
    }
  },

  async add(meals)
  {
    if(meals.some(({ foodID, date, mealTimeID }) => !foodID || !date || !mealTimeID))
      throw new Error('Invalid meals data');

    try
    {
      const data = await $axios.$post('/meals', meals);
      return { data };
    }
    catch(error)
    {
      return { error };
    }
  },
});
