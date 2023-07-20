// Cache frequently used DOM elements
const billForm = document.getElementById('bill-form')
const billTable = document.getElementById('bill-list')
const billNameInput = document.getElementById('bill-name')
const billAmountInput = document.getElementById('bill-amount')

// Event listener for form submission
billForm.addEventListener('submit', function (event) {
  event.preventDefault()

  // Get input values
  const billName = billNameInput.value
  const billAmount = billAmountInput.value

  // Create new row in the table using template literals
  const newRow = document.createElement('tr')
  newRow.classList.add('bill-item')
  newRow.innerHTML = `
    <td>${billName}</td>
    <td>$${billAmount}</td>
    <td>
      <button class="delete-btn">Delete</button>
    </td>
  `

  // Append new row to the table
  billTable.appendChild(newRow)

  // Clear input fields
  billNameInput.value = ''
  billAmountInput.value = ''
})

// Event listener for delete button clicks using event delegation
billTable.addEventListener('click', function (event) {
  if (event.target.classList.contains('delete-btn')) {
    const row = event.target.parentElement.parentElement
    row.remove()
  }
})

const billTotalDiv = document.getElementById('bill-total')

function updateTotal () {
  const billAmounts = Array.from(
    document.querySelectorAll('.bill-item td:nth-child(2)')
  ).map(item => parseFloat(item.innerText.replace('$', '')))

  const totalAmount = billAmounts.reduce((acc, curr) => acc + curr, 0)
  billTotalDiv.innerText = `Total: $${totalAmount.toFixed(2)}`
}

// Call updateTotal whenever a bill is added or removed
billForm.addEventListener('submit', function (event) {
  updateTotal()
})

billTable.addEventListener('click', function (event) {
  if (event.target.classList.contains('delete-btn')) {
    updateTotal()
  }
})
