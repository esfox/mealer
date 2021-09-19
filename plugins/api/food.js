export const foodAPI = ({ $axios }) =>
({
  async get()
  {
    try
    {
      const data = await $axios.$get('/food');
      return { data };
    }
    catch(error)
    {
      return { error };
    }
  },

  async add(food)
  {
    try
    {
      const data = await $axios.$post('/food', food);
      return { data };
    }
    catch(error)
    {
      return { error };
    }
  },

  async edit(id, food)
  {
    if(!id)
      throw new Error('No ID provided');

    try
    {
      const data = await $axios.$patch(`/food/${id}`, food);
      return { data };
    }
    catch(error)
    {
      return { error };
    }
  },

  async del(id)
  {
    if(!id)
      throw new Error('No ID provided');

    try
    {
      const data = await $axios.$delete(`/food/${id}`);
      return { data };
    }
    catch(error)
    {
      return { error };
    }
  }
});
