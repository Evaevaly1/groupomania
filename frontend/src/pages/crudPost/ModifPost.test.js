/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */

import React from 'react';

import '../../setupTests';
import { render, screen, waitFor, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modif from './ModifPost';
import {BrowserRouter as Router} from 'react-router-dom';
import { act } from "react-dom/test-utils";
import Home from "../home/Home";


describe('<Modif />', () => {
    const handleSubmit = jest.fn();
    const user = fireEvent;

    test('Test champ titre', async() => {
        await act(async () => {
            handleSubmit.mockClear();
            render(
                <Router>
                    <Modif handleSubmit={handleSubmit}/>
                </Router>
            );
        });
        const inputEl = waitFor(()=> screen.getByTestId("titre-input")) ;
        waitFor(() => expect(inputEl).toBeInTheDocument());
        waitFor(()=>expect(inputEl).toHaveAttribute("type", "text"));
        waitFor(()=>userEvent.type(inputEl, "Titre"));
        waitFor(()=> expect(inputEl).toHaveValue("Titre"));
    });

    test('Test champ description', async() => {
        const inputEl = waitFor(()=>screen.getByTestId("description-input"));
        waitFor(()=>expect(inputEl).toBeInTheDocument());
        waitFor(()=>userEvent.type(inputEl, "Description"));
        waitFor(()=>expect(inputEl).toHaveValue("Description"));
    });

    test('Test champ image', async() => {
        const inputEl = waitFor(()=>screen.getByTestId("image-input"));
        waitFor(()=>expect(inputEl).toBeInTheDocument());
        waitFor(()=>expect(inputEl).toHaveAttribute("type", "file"));
    });

    test('test button', async() => {
        const buttonValide = waitFor(()=>screen.getByTestId("Button-valid"));
        waitFor(()=>expect(buttonValide).toBeInTheDocument());
    });

    test('test modif nouveau post', () => {
        const inputTitre = waitFor(()=>screen.getByTestId("titre-input"));
        const inputDescription = waitFor(()=>screen.getByTestId("description-input"));
        const inputImage = waitFor(()=>screen.getByTestId("image-input"));
        const buttonValide = waitFor(()=>screen.getByTestId("Button-valid"));

        userEvent.type(inputTitre, "TestTitre");
        userEvent.type(inputDescription, "TestDescription");
        userEvent.type(inputImage, "TestImageFile");
        waitFor(()=>fireEvent.click(buttonValide));

         waitFor(()=>expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument());
    });
})
