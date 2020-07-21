const initialState = {
    user: {
        name: "Helva",
        favourites: [161235, 357311],
        darkMode: true,
    },
    pizzas: [
        {
            id: 161235,
            name: "Pizza Margherita",
            description:
                "The typical Neapolitan pizza, made with San Marzano tomatoes, mozzarella cheese, fresh basil, salt and extra-virgin olive oil.",
            bought: 5,
            ingredients: ["tomatoes", "mozzarella", "basil", "oil"]
        },
        {
            id: 67283,
            name: "Pizza Napoletana",
            description:
                "Neapolitan pizza also known as Naples-style pizza, is a style of pizza made with tomatoes and mozzarella cheese.",
            bought: 2,
            ingredients: ["tomatoes", "mozzarella", "oil"]
        },
        {
            id: 357311,
            name: "Pizza Bianca",
            description:
                "White pizza, which omits tomato sauce from the equation, often substituting it with pesto or sour cream.",
            bought: 10,
            ingredients: ["ricotta", "mozzarella", "garlic"]
        }
    ]
};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_PIZZA": {
            // => Ask yourself: what is action.payload?
            return {
                ...state,
                pizzas: [
                    ...state.pizzas,
                    {
                        id: action.payload.id,
                        name: action.payload.name,
                        description: action.payload.description,
                        bought: 0
                    }
                ]
            };
        }
        case "REMOVE_PIZZA": {
            // data i need to do this:
            // probably a pizzaId => which pizza i want to remove. => action.payload
            // find it in the array.
            const pizzaToRemoveId = action.payload;
            const newPizzaArray = state.pizzas.filter(p => p.id !== pizzaToRemoveId);
            console.log("in the reducer!", pizzaToRemoveId, newPizzaArray);
            return {
                ...state,
                pizzas: newPizzaArray,
            };
        }
        case "NEW_PIZZA": {
            // the actual pizza object => payload === { ...newPizza }
            const newPizza = action.payload;
            return {
                ...state,
                pizzas: [...state.pizzas, newPizza],
            };
        }

        //Add or Remove a pizza from favourites:
        case "TOGGLE_FAVOURITE": {
            // pizzaId.
            const pizzaId = action.payload;
            // is it a favourite already?
            const isFavourite = state.user.favourites.includes(pizzaId);

            const newFavourite = isFavourite
                ? state.user.favourites.filter(id => id !== pizzaId)
                : [...state.user.favourites, pizzaId];

            return {
                ...state,
                user: {
                    ...state.user,
                    favourites: newFavourite,
                },
            };
        }
        case "TOGGLE_DARK_MODE": {
            return {
                ...state,
                user: { ...state.user, darkMode: !state.user.darkMode },
            };
        }
        default: {
            return state;
        }
    }
}
