import React from 'react';
import BillDetails from './assets/Component/BillDetails'; // Assuming BillDetails is correct
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin
import './App.css';

function App() {
    const [items, setItems] = React.useState([]);

    // Function to add item to the items state
    const handleAddItem = (item) => {
        setItems((prevItems) => [...prevItems, item]);
    };

    // Function to delete item from the items state
    const handleDeleteItem = (index) => {
        setItems((prevItems) => prevItems.filter((_, i) => i !== index));
    };

    // Function to download PDF
    const handleDownloadPDF = () => {
        if (items.length === 0) {
            alert("No items to generate invoice.");
            return;
        }

        const pdf = new jsPDF();
        pdf.text('Invoice', 20, 20);

        // Add a table for the items
        pdf.autoTable({
            head: [['Item', 'Quantity', 'Price', 'Total']],
            body: items.map((item) => [
                item.item,
                item.quantity,
                `$${item.price.toFixed(2)}`,
                `$${(item.quantity * item.price).toFixed(2)}`,
            ]),
            startY: 30, // Position the table below the title
        });

        // Add total amount at the bottom of the table
        const totalAmount = items.reduce(
            (total, item) => total + item.quantity * item.price, 0
        );
        pdf.text(
            `Total Amount: $${totalAmount.toFixed(2)}`,
            20,
            pdf.previousAutoTable.finalY + 10 // Position the total amount after the table
        );

        // Save the PDF
        pdf.save('invoice.pdf');
    };

    return (
        <div className="App">
            <BillDetails onAddItem={handleAddItem} />
            <button onClick={handleDownloadPDF}>Download PDF</button>

            {/* Display the table of items */}
            <h2>Invoice Preview</h2>
            {items.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Item</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Quantity</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Price</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Total</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{item.item}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{item.quantity}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>${item.price.toFixed(2)}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>${(item.quantity * item.price).toFixed(2)}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>
                                    <button onClick={() => handleDeleteItem(index)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No items added yet.</p>
            )}
        </div>
    );
}

export default App;
