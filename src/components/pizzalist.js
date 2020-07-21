import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../store/reducer" //??
import { selectPizzasWithFavourites } from "../store/selectors"
import { useDispatch } from 'react-redux'

export default function PizzaList() {

    const selectUser = reduxState => {
        return reduxState.user;
    };
    const user = useSelector(selectUser);
    const pizzas = useSelector(selectPizzasWithFavourites);
    const dispatch = useDispatch()
    const [filters, setFilter] = useState({});

    const pizzasIngredients = pizzas.map(p => p.ingredients);
    const uniqueIngredients = pizzasIngredients.reduce((acc, ings) => {
        // ing => ["", ""]
        ings.forEach(ing => !acc.includes(ing) && acc.push(ing));
        return acc;
    }, []);
    console.log(uniqueIngredients)


    //Return the most pupular pizza:
    //That is the largest value in an array from StackOverflow:
    //https://stackoverflow.com/questions/4020796/finding-the-max-value-of-an-attribute-in-an-array-of-objects

    const mostPopularPizza = Math.max.apply(Math, pizzas.map(function (pizza) { return pizza.bought; }))
    console.log(mostPopularPizza)

    //Add or Remove favourites: 
    //Turn the heart into a button that dispatches a new action when clicked
    //VERIFY that the right pizza ID displays in the Redux dev tools: 
    const onFavouriteClick = id => {
        console.log("adding favourite");
        const action = {
            type: "TOGGLE_FAVOURITE",
            payload: id,
        };
        dispatch(action);

    };

    const onRemoveClick = id => {
        console.log("remove pizza!");
        const action = {
            type: "REMOVE_PIZZA",
            payload: id,
        };
        dispatch(action);
    };
    const onFilterClick = name => {
        // update filter object
        const newFilter = {
            ...filters,
            [name]: !filters[name],
        };
        setFilter(newFilter);
    };
    // transform filter object to array of active filter names
    const activeFilters = Object.keys(filters).filter(name => filters[name]);
    console.log(filters);
    console.log(activeFilters);
    // keep pizzas that at least one of the ingredients is set on the filter.
    const filteredPizzas = !activeFilters.length
        ? pizzas
        : pizzas.filter(p =>
            p.ingredients.some(ingredient => activeFilters.includes(ingredient))
        );


    return (
        <div>
            <h1>Pizza Explorer</h1>
            <p>
                Welcome back, <strong>{user.name}</strong>
                ! Your favorite pizzas:
             </p>
            <div>
                {uniqueIngredients.map(ing => (
                    <button onClick={() => onFilterClick(ing)}>{ing}</button>
                ))}
            </div>

            <ul>
                {filteredPizzas.map(p => (
                    <li key={p.id}>
                        <h3>{p.name}</h3>
                        <p>{p.description}</p>
                        <p>{p.bought}</p>
                        <h2 onClick={() => onFavouriteClick(p.id)}>
                            {p.isFavourite ? "♥" : "♡"}
                        </h2>
                        <button onClick={() => onRemoveClick(p.id)}>{"[-]"}</button>

                    </li>
                ))}
            </ul>
            <p> Total number of pizzas: {pizzas.length}</p>
            <p> Most popular bought pizza: {mostPopularPizza}</p>
        </div>
    )
}

