/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';

import '../../setupTests';
import { render, screen, waitFor, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignIn from './SignIn';
import {BrowserRouter as Router} from 'react-router-dom';



describe('<SignIn />', () => {
    const handleSubmit = jest.fn();
    const user = userEvent;

    beforeEach(() => {
        handleSubmit.mockClear();
        render(
            <Router>
                <SignIn onSubmit={handleSubmit} />,
            </Router>,
        );
    });

    test('Test champ email', () => {
        const inputEl = screen.getByTestId("email-input");
        expect(inputEl).toBeInTheDocument();
        expect(inputEl).toHaveAttribute("type", "email");
    });

    test('Test validité enail', () => {
        const inputEl = screen.getByTestId("email-input");
        userEvent.type(inputEl, "test@mail.com");
        expect(screen.getByTestId("email-input")).toHaveValue("test@mail.com");
    });

    test('test champ mot de pass', () => {
        const inputEl = screen.getByTestId("password-input");
        userEvent.type(inputEl, "Pwd123");
        expect(screen.getByTestId("password-input")).toHaveValue("Pwd123");
    });

    test('render button', () => {
        const buttonValide = screen.getByTestId("Button-valid");
        expect(buttonValide).toBeInTheDocument();
    });

    test('Test validité login', async() => {
        const inputEmail = screen.getByTestId("email-input");
        userEvent.type(inputEmail, "mandaaroniaina2001@gmail.com");

        const inputPassword = screen.getByTestId("password-input");
        userEvent.type(inputPassword, "Aroniaina2001!!");

        const buttonValide = screen.getByTestId("Button-valid");
        await waitFor (() => user.click(buttonValide));

        expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
    });


});
