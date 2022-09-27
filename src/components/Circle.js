import React from "react";

export const Circle = (props) => {
    return (
        <div 
            className='circle' 
            style={{background: props?.bubble?.color}} 
            key={props?.bubble?.id} 
            onClick={() => props.onClick && props.onClick(props.bubble.id)} 
        />
    )
}