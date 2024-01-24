import React, {useState} from 'react';
import styles from './CountForm.module.css';

interface CountFormProps {
    initialPrice: number;
}

const CountForm: React.FC<CountFormProps> = ({initialPrice}) => {
    const [inputCartValue, setInputCartValue] = useState<number>(0);
    const [difValue, setDifValue] = useState(0);
    const [inputDistance, setInputDistance] = useState<number>(0);
    const [distancePrice, setDistancePrice] = useState<number>(0)
    const [inputAmountItems, setInputAmountItems] = useState<number>(0);
    const [itemPrice, setItemPrice] = useState<number>(0)
    const [dateValue, setDateValue] = useState('');
    const [timeValue, setTimeValue] = useState('');
    const [price, setPrice] = useState(initialPrice);

    const handleInputCartValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        const newCartValue = parseFloat(event.target.value);
        setInputCartValue(newCartValue);
        if (newCartValue <= 10) {
            setDifValue(10 - newCartValue);
        } else {
            setDifValue(0);
        }
        console.log(difValue)
    };

    const handleInputDistance = (event: React.ChangeEvent<HTMLInputElement>) => {
        const distance = parseInt(event.target.value);
        setInputDistance(distance);
        if (distance <= 1000) {
            setDistancePrice(2);
        }
        if (distance > 1000) {
            setDistancePrice(Math.ceil(distance/500));
        }
    };

    const handleInputAmountItems = (event: React.ChangeEvent<HTMLInputElement>) => {
        const amountItems = parseInt(event.target.value);
        setInputAmountItems(amountItems);
        if (amountItems > 4) {
            setItemPrice((amountItems -4)*0.5);
        } else {
            setItemPrice(0);
        }
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDateValue(event.target.value);
    };

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTimeValue(event.target.value);
    };

    function rushHourMultiplier(currentDate: Date) {
        let rushHourMultiplier = 1.0;
        if (
            currentDate.getDay() === 5 &&
            currentDate.getHours() >= 15 &&
            currentDate.getHours() < 19
        ) {
            rushHourMultiplier = 1.2;
        }
        return rushHourMultiplier;
    }

    const handlePrice = () => {
        console.log("price")
        console.log(typeof inputCartValue)
        const currentDate = new Date(`${dateValue}T${timeValue}`);
        if (inputCartValue >= 200) {
            setPrice(0);
        } else {
            let maxPrice = 15;
            let count = (difValue + distancePrice + itemPrice) * rushHourMultiplier(currentDate);
            if (count < maxPrice) {
                setPrice(count);
            } else {
                setPrice(maxPrice);
            }
        }
    };

    return (
        <div className={styles.countFormContainer}>
            <div className={styles.countForm}>
                <h1>Delivery Fee Calculator</h1>
                <div className={styles.calcFields}>
                    <div className={styles.calcParam}>Cart Value</div>
                    <div className={styles.flexField}>
                        <input
                            type='number'
                            value={inputCartValue}
                            onChange={handleInputCartValue}
                            aria-label='Cart Value'
                            data-testid='cart-input'
                        />
                        <div className={styles.measure}>€</div>
                    </div>
                    <div className={styles.calcParam}>Delivery distance</div>
                    <div className={styles.flexField}>
                        <input
                            type='number'
                            value={inputDistance}
                            onChange={handleInputDistance}
                            aria-label='Delivery distance'
                            data-testid='distance-input'
                        />
                        <div className={styles.measure}>m</div>
                    </div>
                    <div className={styles.calcParam}>Amount of items</div>
                    <div>
                        <input
                            type='number'
                            value={inputAmountItems}
                            onChange={handleInputAmountItems}
                            aria-label='Amount of items'
                            data-testid='amount-input'
                        />
                    </div>
                    <div className={styles.calcParam}>Date</div>
                    <div>
                        <input
                            type="date"
                            value={dateValue}
                            onChange={handleDateChange}
                            aria-label='Date'
                            data-testid='date-input'
                        />
                    </div>
                    <div className={styles.calcParam}>Time</div>
                    <div>
                        <input
                            type="time"
                            value={timeValue}
                            onChange={handleTimeChange}
                            aria-label='Time'
                            data-testid='time-input'
                        />
                    </div>

                </div>
                <div className={styles.count}>
                    <button onClick={handlePrice}>Calculate delivery price</button>
                    <p>Delivery price: {price.toFixed(2)} €</p>
                </div>
            </div>
        </div>
    );
};

export default CountForm;