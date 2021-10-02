export const mealTimesAPI = ({ $axios }) =>
({
  get: () => $axios.$get('/meal-times'),
});
