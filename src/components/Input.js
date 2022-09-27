import React from "react";

export const Input = (props) => {
    return(
        <input 
            type={props.type} 
            onInput={props.onInput} 
            value={props.value} 
            onClick={props.onClick} 
        />
    )
}