import React, { useState } from 'react';

const BillDetails = ({ onAddItem }) => {
    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    // Handle adding an item
    const handleAddItem = () => {
        if (!item.trim()) {
            setErrorMessage('Please input data in the Item section.');
            return;
        }

        // Check if the item contains only alphabetical characters
        if (!/^[a-zA-Z]+$/.test(item)) {
            setErrorMessage('Item should only contain alphabetical characters.');
            return;
        }

        const newItem = { item, quantity: Number(quantity), price: Number(price) };

        // Pass the new item to the parent component
        onAddItem(newItem);

        // Reset the input fields
        setItem('');
        setQuantity(1);
        setPrice(0);
        setErrorMessage('');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>INVOICE GENERATOR</h1>

            {/* Input Section */}
            <div style={{ marginBottom: '20px' }}>
                <label>Item:</label>
                <input
                    type="text"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                />
                <label>Quantity:</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <label>Price:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <button onClick={handleAddItem}>Add Item</button>
                <p style={{ color: 'red' }}>{errorMessage}</p>
            </div>

            {/* Invoice Section */}
            <div>
                <h2>Invoice</h2>
                {/* Only show the items if there are any */}
                {item && quantity && price ? (
                    <p>Your item will be added to the invoice!</p>
                ) : (
                    <p>No item added yet.</p>
                )}
            </div>
        </div>
    );
};

export default BillDetails;
