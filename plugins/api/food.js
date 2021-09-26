export const foodAPI = ({ $axios }) =>
({
  get: () => $axios.$get('/food'),
  add: (food) => $axios.$post('/food', food),
  edit: (id, food) =>
  {
    if(!id)
      throw new Error('No ID provided');

    return $axios.$patch(`/food/${id}`, food);
  },

  del(id)
  {
    if(!id)
      throw new Error('No ID provided');

    return $axios.$delete(`/food/${id}`);
  }
});
