import React from 'react';
import {render, screen, fireEvent } from '@testing-library/react';
import CountForm from "./components/CountForm";
import App from './App';

test('renders learn react link', () => {
    render(<App/>);
    const linkElement = screen.getByText(/Delivery Fee Calculator/i);
    expect(linkElement).toBeInTheDocument();
});

describe('CountForm Component', () => {
    test('renders the component', () => {
        render(<CountForm initialPrice={10}/>);
        const headerElement = screen.getByText(/Delivery Fee Calclator/i);
        expect(headerElement).toBeInTheDocument();
    });

    test('updates cart value and calculates difference value', () => {
        render(<CountForm initialPrice={10}/>);
        const cartInput = screen.getByTestId('cart-input');
        fireEvent.change(cartInput, {target: {value: '50'}});
        expect(cartInput).toHaveValue('50');
    });

    test('updates delivery distance and calculates distance price', () => {
        render(<CountForm initialPrice={10}/>);
        const distanceInput = screen.getByTestId('distance-input');
        fireEvent.change(distanceInput, {target: {value: '1500'}});
        expect(distanceInput).toHaveValue(1500);
    });

    test('calculates delivery fee based on cart value, distance, and number of items', () => {
        render(<CountForm initialPrice={10}/>);
        fireEvent.change(screen.getByTestId('cart-input'), {target: {value: '8.90'}});
        fireEvent.change(screen.getByTestId('distance-input'), {target: {value: '1499'}});
        fireEvent.change(screen.getByTestId('amount-input'), {target: {value: '5'}});
        fireEvent.change(screen.getByTestId('date-input'), {target: {value: '2022-01-20'}});
        fireEvent.change(screen.getByTestId('time-input'), {target: {value: '16:00'}});

        fireEvent.click(screen.getByText(/Calculate delivery price/i));

        expect(screen.getByText(/Delivery price: 3\.50 €/i)).toBeInTheDocument();
    });


});
