import React from 'react';

//Not sure where this is going to be placed yet. We'll discuss this thursday
const Instructions = () => {
    return (
        <div style={{padding: '1.5rem'}}>
        <h1> Features </h1> 
        <div>
            <h4> Colors </h4>
            <p>Press the cylcle through out color palette of diamonds and choose your favorite!</p>

            <h4> Increasing Speed </h4>
            <p>Press the A key to increase the speed of the diamonds!</p>

            <h4> Decreasing Speed </h4>
            <p>Press the S key to decrease the speed of the diamonds!</p>

            <h4> Reverse Rotation! </h4>
            <p>Pressing the W key will cause the diamonds to rotate the opposite direction its going!</p>

        </div>
        </div>
    )
}

export default Instructions