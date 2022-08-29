/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';

import '../../setupTests';
import { render, screen, waitFor, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from './Home';
import {BrowserRouter as Router} from 'react-router-dom';
import { act } from "react-dom/test-utils";


describe('<Home />', () => {
    const user = userEvent;
    const onSubmit = jest.fn();

    test('Test champ liste ', async() => {
        await act(async () => {
            onSubmit.mockClear();
            render(
                <Router>
                    <Home onSubmit={onSubmit}/>
                </Router>
            );
        });

        waitFor(()=>{
            expect(screen.getByTestId("liste")).toBeInTheDocument();
        });
    });

    test('Test bouton delete ', () => {
        const inputEl = waitFor(()=>screen.getByTestId("delete-post"));
        waitFor(()=>expect(inputEl).toBeInTheDocument());
    });

    test('Test bouton like ', () => {
        const inputEl = waitFor(()=>screen.getByTestId("like-button"));
        waitFor(()=>expect(inputEl).toBeInTheDocument());
    });

    test('Test ffichage posted ', () => {
        const inputEl = waitFor(()=>screen.getByTestId("posted"));
        waitFor(()=>expect(inputEl).toBeInTheDocument());
    });

});
