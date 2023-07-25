// Function to set up the bill tracker and handle user interactions
function setupBillTracker () {
  const billForm = document.getElementById('bill-form')
  const billTable = document.getElementById('bill-table')
  const billList = document.getElementById('bill-list')
  const billNameInput = document.getElementById('bill-name')
  const billAmountInput = document.getElementById('bill-amount')
  const billDateInput = document.getElementById('bill-date')
  const billTotalDiv = document.getElementById('bill-total')
  const filterInput = document.getElementById('filter-input')

  // Function to format the date in a user-friendly way (e.g., "August 1, 2023")
  function formatDate (dateString) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Event listener for form submission (when user adds a new bill)
  billForm.addEventListener('submit', function (event) {
    event.preventDefault() // Prevent the default form submission behavior

    // Get input values from the form
    const billName = billNameInput.value
    const billAmount = billAmountInput.value
    const billDate = formatDate(billDateInput.value)

    // Create a new row in the bill list table
    const newRow = document.createElement('tr')
    newRow.classList.add('bill-item')
    newRow.innerHTML = `
      <td>${billName}</td>
      <td>$${billAmount}</td>
      <td>${billDate}</td>
      <td>
        <button class="delete-btn">Delete</button>
      </td>
    `

    // Append the new row to the bill list table
    billList.appendChild(newRow)

    // Clear input fields after adding the bill
    billNameInput.value = ''
    billAmountInput.value = ''
    billDateInput.value = ''

    // Update the total bill amount
    updateTotal()
  })

  // Event listener for delete button clicks (when user deletes a bill)
  billTable.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-btn')) {
      // Find the parent row of the delete button and remove it
      const row = event.target.parentElement.parentElement
      row.remove()

      // Update the total bill amount after removing the bill
      updateTotal()
    }
  })

  // Function to update the total bill amount
  function updateTotal () {
    // Get the amounts of all bills from the table and calculate the total amount
    const billAmounts = Array.from(
      document.querySelectorAll('.bill-item td:nth-child(2)')
    ).map(item => parseFloat(item.innerText.replace('$', '')))

    const totalAmount = billAmounts.reduce((acc, curr) => acc + curr, 0)

    // Display the total amount in the total bill div
    billTotalDiv.innerText = `Total: $${totalAmount.toFixed(2)}`
  }

  // Event listener for filter input changes (when user types in the filter)
  filterInput.addEventListener('input', function () {
    const filterValue = filterInput.value.toLowerCase()

    // Loop through each bill row and check if it matches the filter value
    const billRows = document.querySelectorAll('.bill-item')
    billRows.forEach(row => {
      const billName = row
        .querySelector('td:nth-child(1)')
        .innerText.toLowerCase()
      const billAmount = row
        .querySelector('td:nth-child(2)')
        .innerText.toLowerCase()
      const billDate = row
        .querySelector('td:nth-child(3)')
        .innerText.toLowerCase()

      // Show or hide the row based on whether it matches the filter value
      if (
        billName.includes(filterValue) ||
        billAmount.includes(filterValue) ||
        billDate.includes(filterValue)
      ) {
        row.style.display = 'table-row'
      } else {
        row.style.display = 'none'
      }
    })
  })

  // Call the function to update the total bill amount when the page loads
  updateTotal()
}

// Call the function to set up the bill tracker once the document has loaded
document.addEventListener('DOMContentLoaded', setupBillTracker)
