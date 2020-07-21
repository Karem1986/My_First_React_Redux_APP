export const selectPizzas = state => state.pizzas;


//Select favourite pizza 
export const selectPizzasWithFavourites = state => {
    // id, name, description, bought, isFavourite
    const pizzasWithFavourites = state.pizzas.map(pizza => ({
        ...pizza,
        isFavourite: state.user.favourites.includes(pizza.id), // user.favourites is list of ids, we check if this pizza is included.
    }));
    return pizzasWithFavourites;
};

//Use useDarkMode
//https://reader.codaisseur.com/courses/redux/10-redux-1/03-react-redux/06-extra-functionality

export const useDarkMode = state => state.user.darkMode;