// Get HTML elements
const productBody = document.getElementById("productBody");
const addProductBtn = document.getElementById("addProductBtn");

const subtotalElement = document.getElementById("subtotal");
const grandTotalElement = document.getElementById("grandTotal");

const discountInput = document.getElementById("discount");
const taxInput = document.getElementById("tax");

const calculateBtn = document.getElementById("calculateBtn");
const printBtn = document.getElementById("printBtn");


// Add new product
addProductBtn.addEventListener("click", function () {

    const row = document.createElement("tr");

    row.innerHTML = `
        <td></td>

        <td>
            <input type="text" placeholder="Product name">
        </td>

        <td>
            <input type="number" class="quantity" value="1" min="1">
        </td>

        <td>
            <input type="number" class="price" value="0" min="0">
        </td>

        <td class="itemTotal">0</td>

        <td>
            <button class="deleteBtn">Delete</button>
        </td>
    `;

    productBody.appendChild(row);

    updateRowNumbers();
});


// Update row numbers
function updateRowNumbers() {

    const rows = productBody.querySelectorAll("tr");

    rows.forEach(function (row, index) {
        row.cells[0].textContent = index + 1;
    });
}


// Calculate invoice
function calculateInvoice() {

    const rows = productBody.querySelectorAll("tr");

    let subtotal = 0;

    rows.forEach(function (row) {

        const quantity =
            Number(row.querySelector(".quantity").value) || 0;

        const price =
            Number(row.querySelector(".price").value) || 0;

        const total = quantity * price;

        row.querySelector(".itemTotal").textContent =
            "Rs. " + total.toFixed(2);

        subtotal += total;
    });


    // Get discount
    const discount =
        Number(discountInput.value) || 0;


    // Get tax
    const tax =
        Number(taxInput.value) || 0;


    // Calculate final amount
    const grandTotal =
        subtotal - discount + tax;


    // Display results
    subtotalElement.textContent =
        "Rs. " + subtotal.toFixed(2);

    grandTotalElement.textContent =
        "Rs. " + grandTotal.toFixed(2);
}


// Delete product
productBody.addEventListener("click", function (event) {

    if (event.target.classList.contains("deleteBtn")) {

        event.target.closest("tr").remove();

        updateRowNumbers();

        calculateInvoice();
    }

});


// Automatically calculate when quantity or price changes
productBody.addEventListener("input", function (event) {

    if (
        event.target.classList.contains("quantity") ||
        event.target.classList.contains("price")
    ) {
        calculateInvoice();
    }

});


// Calculate button
calculateBtn.addEventListener("click", function () {

    calculateInvoice();

});


// Print invoice
printBtn.addEventListener("click", function () {

    calculateInvoice();

    window.print();

});


// Set today's date automatically
const invoiceDate = document.getElementById("invoiceDate");

const today = new Date();

const formattedDate =
    today.toISOString().split("T")[0];

invoiceDate.value = formattedDate;


// Initial setup
updateRowNumbers();
calculateInvoice();
