import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Progress from "./components/Progress";
import Header from "./components/Header";
// import MarketingApp from "./components/MarketingApp";
// import AuthApp from "./components/AuthApp";

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})

const App = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName} >
                <div>
                    <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
                    {/* <MarketingApp /> */}
                    <Suspense fallback={<Progress />} >
                        <Switch>
                            {/* <Route path="/auth" component={AuthApp} />
                            <Route path="/" component={MarketingApp} /> */}

                            {/* <Route path="/auth" component={AuthLazy} />
                            <Route path="/" component={MarketingLazy} /> */}

                            <Route path="/auth" >
                                <AuthLazy onSignIns={() => setIsSignedIn(true)} />
                            </Route>
                            <Route path="/" >
                                <MarketingLazy />
                            </Route>

                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </BrowserRouter>
    )
}

export default App;