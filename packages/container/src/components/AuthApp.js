import { mount } from 'auth/AuthApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default ({ onSignIns }) => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        const { onParentNavigate } = mount(ref?.current, {
            // onNavigate: (location) => {
            onNavigate: ({ pathname: nextPathname }) => {
                const { pathname } = history.location;
                if(pathname !== nextPathname){  //* putting this condition to avoid infinite loop passing prop from marketing to container 
                    history.push(nextPathname)
                }
            },

            initialPath: history.location.pathname ,

            onSignIn: () => {
                onSignIns();
            }
        })

        history.listen(onParentNavigate);

    }, []);

    return(
        <div ref={ref} />
    )
}