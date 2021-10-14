export const mealsAPI = ({ $axios }) =>
({
  get: () => $axios.$get('/meals'),

  /** @param {{ foodID: number, mealTimeID: number, date: string }[]} meals */
  add(meals)
  {
    if(meals.some(({ foodID, mealTimeID, date }) => !foodID || !date || !mealTimeID))
      throw new Error('Invalid meals data');

    return $axios.$post('/meals', meals);
  },

  del(foodID, mealTimeID, date)
  {
    if(!foodID)
      throw new Error('No Food ID provided');

    if(!mealTimeID)
      throw new Error('No Meal Time ID provided');

    if(!date)
      throw new Error('No date provided');

    return $axios.$request({ url: '/meals', data: { foodID, mealTimeID, date }, method: 'delete' });
  }
});
