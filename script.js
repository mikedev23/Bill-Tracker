// Get form and table elements
const billForm = document.getElementById('bill-form')
const billTable = document.getElementById('bill-list')

// Event listener for form submission
billForm.addEventListener('submit', function (event) {
  event.preventDefault()

  // Get input values
  const billName = document.getElementById('bill-name').value
  const billAmount = document.getElementById('bill-amount').value

  // Create new row in the table
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
  document.getElementById('bill-name').value = ''
  document.getElementById('bill-amount').value = ''
})

// Event listener for delete button clicks
billTable.addEventListener('click', function (event) {
  if (event.target.classList.contains('delete-btn')) {
    const row = event.target.parentElement.parentElement
    billTable.removeChild(row)
  }
})
