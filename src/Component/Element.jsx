import React, { useEffect, useRef, useState } from 'react';

function Element({ value, id, handleSelect }) {
    const divRef = useRef();
    const handleChoose = () => {
        const i = Math.floor(Math.random() * 3)
        handleSelect(i, id);
    }
    useEffect(() => {
        divRef.current.addEventListener('click', handleChoose);
    }, [])

    return (
        <div ref={divRef} className="ele-children col-3 p-5 display-1 bg-dark text-white border rounded d-flex justify-content-center">
            {value}
        </div>
    )
}
export default Element;