export const mealsAPI = ({ $axios }) =>
({
  get: () => $axios.$get('/meals'),
  add: (meals) =>
  {
    if(meals.some(({ foodID, date, mealTimeID }) => !foodID || !date || !mealTimeID))
      throw new Error('Invalid meals data');

    return $axios.$post('/meals', meals);
  },
});
