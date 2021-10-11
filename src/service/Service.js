const getData = async (request, RejectedWithValue) => {
  try {
    const response = await fetch(request);

    if (!response.ok) {
      throw new Error('Server Error');
    }
    const data = await response.json();

    return data.drinks;

  } catch (error) {
    return RejectedWithValue(error.message);
  }
}


export const getDrinks = async (request, RejectedWithValue) => {
  const res = await getData(request, RejectedWithValue);
  return res.map(drink => {
    return {
      id: drink.idDrink,
      title: drink.strDrink,
      image: drink.strDrinkThumb,
      isLiked: false
    };
  }
  ).slice(0, 20);
};