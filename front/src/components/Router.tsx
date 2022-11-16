import React from 'react';
import {Route, Routes} from "react-router-dom";
import Container from "./UI/container/Container";
import Main from "./UI/main/Main";
import {routes} from "../router/router";

const Router = () => {
    return (
        <Main>
            <Container>
                <Routes>
                    {
                        routes.map(({path, element} )=> <Route key={path} path={path} element={element}></Route>)
                    }
                </Routes>
            </Container>
        </Main>

    );
};

export default Router;