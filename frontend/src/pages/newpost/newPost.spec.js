/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';

import '../../setupTests';
import { render, screen, waitFor, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewPost from './NewPost';
import {BrowserRouter as Router} from 'react-router-dom';



describe('<NewPost />', () => {
    const handleSubmit = jest.fn();
    const user = userEvent;

    beforeEach(() => {
        handleSubmit.mockClear();
        render(
            <Router>
                <NewPost onSubmit={handleSubmit} />,
            </Router>,
        );
    });

    test('Test champ titre', () => {
        const inputEl = screen.getByTestId("titre-input");
        expect(inputEl).toBeInTheDocument();
        expect(inputEl).toHaveAttribute("type", "text");

        userEvent.type(inputEl, "Titre");
        expect(inputEl).toHaveValue("Titre");
    });

    test('Test champ description', () => {
        const inputEl = screen.getByTestId("description-input");
        expect(inputEl).toBeInTheDocument();
        userEvent.type(inputEl, "Description");
        expect(inputEl).toHaveValue("Description");
    });

    test('Test champ image', () => {
        const inputEl = screen.getByTestId("image-input");
        expect(inputEl).toBeInTheDocument();
        expect(inputEl).toHaveAttribute("type", "file");
    });

    test('test button', () => {
        const buttonValide = screen.getByTestId("Button-valid");
        expect(buttonValide).toBeInTheDocument();
    });

    test('test ajout nouveau post', async () => {
        const inputTitre = screen.getByTestId("titre-input");
        const inputDescription = screen.getByTestId("description-input");
        const inputImage = screen.getByTestId("image-input");
        const buttonValide = screen.getByTestId("Button-valid");

        userEvent.type(inputTitre, "TestTitre");
        userEvent.type(inputDescription, "TestDescription");
        userEvent.type(inputImage, "TestImageFile");
        user.click(buttonValide);

        expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
    });

});
