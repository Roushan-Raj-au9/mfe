import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

//* Mount function to start the app

const mount = (el) => {
    ReactDOM.render(
        <App />,
        el
    )
};


//* If we are in development mode and in isolation, call the Mount function immediately

if(process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector("#_marketing-dev-root")

    if(devRoot){
        mount(devRoot)
    }
}


//* Otherwise we are running through Container and we should EXPORT the Mount function

export { mount }

