// src/components/AddPizzaForm.js
import React, { useState } from "react";
import { useDispatch } from 'react-redux'

export default function AddPizzaForm() {
    const dispatch = useDispatch()
    const [name, set_name] = useState("");
    const [description, set_description] = useState("");

    const submit = event => {
        // to make sure that the form does not redirect (which is normal browser behavior)
        event.preventDefault();
        console.log("new pizza:", name, description);

        // TODO:
        // - dispatch the ADD_PIZZA action

        dispatch({
            type: "ADD_PIZZA",
            payload: {
                id: Math.random(),
                name,
                description
            }
        })
        // - to clear the input fields
        set_name("")
        set_description("")
    };

    return (
        <form onSubmit={submit}>
            <h2>Add a new pizza</h2>
            <p>
                <label>
                    Name:{" "}
                    <input
                        type="text"
                        value={name}
                        onChange={e => set_name(e.target.value)}
                    />
                </label>
            </p>
            <p>
                <label>
                    Description:{" "}
                    <input
                        type="text"
                        value={description}
                        onChange={e => set_description(e.target.value)}
                    />
                </label>
            </p>
            <p>
                <button type="submit">Add this pizza!</button>
            </p>
        </form>
    );
}