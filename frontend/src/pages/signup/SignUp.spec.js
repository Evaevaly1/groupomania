/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';

import '../../setupTests';
import { render, screen, waitFor, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUp from './SignUp';
import {BrowserRouter as Router} from 'react-router-dom';



describe('<SignUp />', () => {
    const handleSubmit = jest.fn();
    const user = userEvent;

    beforeEach(() => {
        handleSubmit.mockClear();
        render(
            <Router>
                <SignUp onSubmit={handleSubmit} />,
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

    test('test button', () => {
        const buttonValide = screen.getByTestId("Button-valid");
        expect(buttonValide).toBeInTheDocument();
    });

    test('Test validité inscription', async() => {
        const inputName = screen.getByTestId("email-input");
        userEvent.type(inputName, "TestName");

        const inputEmail = screen.getByTestId("email-input");
        userEvent.type(inputEmail, "testJest@gmail.com");

        const inputPassword = screen.getByTestId("password-input");
        userEvent.type(inputPassword, "testjest");


        const buttonValide = screen.getByTestId("Button-valid");
        await waitFor (() => user.click(buttonValide));
        expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
    });


});
