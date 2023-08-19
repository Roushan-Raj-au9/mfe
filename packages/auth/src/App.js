import React from 'react';
// import { Switch, Route, BrowserRouter } from 'react-router-dom'; 
import { Switch, Route, Router, Link } from 'react-router-dom';  // TODO: here using "Router" instead of "BrowserRouter" bcz in micro-frontend we to set up in such a way that there should be only 1 BrowserRouter(internally work as Browser-History) and Router(internally works as Memory-History)
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Signin from './components/Signin';
import Signup from './components/Signup';

const generateClassName = createGenerateClassName({
    productionPrefix: 'au'
})

const App = ({ history, onSignIn }) => {
    return (
        <div>
            <StylesProvider generateClassName={generateClassName} >
                {/* <BrowserRouter> */}
                <Router history={history} >
                    <div><Link to='/auth/signup'>Go to auth</Link></div>
                    <Switch>
                        {/* <Route path="/auth/signin" component={Signin} />
                        <Route path="/auth/signup" component={Signup} /> */}
                        <Route path="/auth/signin" >
                            <Signin onSignIn={onSignIn} />
                        </Route>
                        <Route path="/auth/signup" >
                            <Signup onSignIn={onSignIn} />
                        </Route>
                    </Switch>
                </Router>
                {/* </BrowserRouter> */}
            </StylesProvider>
        </div>
    )
}

export default App;