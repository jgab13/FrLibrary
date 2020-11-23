// /* fr library js*/
// 'use strict';
// const log = console.log

// class financialReport {
// 	constructor(header){
// 		this.header = header
// 	}

// 	generateHeader(selector, report){
// 		const root = document.querySelector(selector)
// 		root.className = 'statement';
// 		const header = document.createElement('div')
// 		header.className = 'header';

// 		const header_row = document.createElement('div')
// 		const reportName = document.createTextNode(this.header.name)
// 		header_row.className = 'header-row';
// 		header_row.appendChild(reportName)

// 		const header_row2 = document.createElement('div')
// 		const reportTitle = document.createTextNode(report)
// 		header_row2.className = 'header-row';
// 		header_row2.appendChild(reportTitle)

// 		const header_row3 = document.createElement('div')
// 		const reportYear = document.createTextNode(this.header.year)
// 		header_row3.className = 'header-row';
// 		header_row3.appendChild(reportYear)

// 		header.appendChild(header_row)
// 		header.appendChild(header_row2)
// 		header.appendChild(header_row3)
// 		root.appendChild(header)
// 	}

// 	addDetailedData(selector, item, detailedData){

// 		//Grab the relevant div that matches item in the row-name half of table
// 		const rowNameNodes = document.querySelectorAll('.row-name')
// 		let rowNameToFind = null
// 		let locationIndex =null
// 		for (let i = 0; i < rowNameNodes.length; i++){
// 			if (rowNameNodes[i].innerText === item){
// 				rowNameToFind = rowNameNodes[i]
// 				locationIndex = i < rowNamesNodes.length - 1 ? i + 1 : i
// 			}
// 		}

// 		//Grab the relevant div value that matches item in the edit-value half of the table
// 		const rowValueToFind = document.getElementById(item)

// 		//Add collapsable button to the rowNameToFind

// 		//iterate through the data and insert values into the row just underneath the locationIdex

// 	}

// }

// class balanceSheet extends financialReport{
// 	constructor(header, data){
// 		super(header);
// 		this.data = data;
// 		this.assets = data["assets"];
// 		this.liabilities = data["liabilities"];
// 		this.equity = data["equity"];
// 		this.assetSize = Object.keys(data["assets"]).length;
// 		this.liabilitySize = Object.keys(data["liabilities"]).length;
// 		this.equitySize = Object.keys(data["equity"]).length;
// 	}

// 	generateFillableBody(selector, subtotal) {
// 		const root = document.querySelector(selector)
// 		root.className = 'statement'
// 		generateFillableSection(root, this.assetSize, this.assets, "Assets", subtotal)
// 		generateFillableSection(root, this.liabilitySize, this.liabilities, "Liabilities", subtotal)
// 		generateFillableSection(root, this.equitySize, this.equity, "Equity", subtotal)
// 	}

// 	generateFormBody(selector, subtotal, edit){
// 		const root = document.querySelector(selector)
// 		root.className = 'statement'
// 		generateStatementSection(root, this.assetSize, this.assets, "Assets", subtotal, edit)
// 		generateStatementSection(root, this.liabilitySize, this.liabilities, "Liabilities", subtotal, edit)
// 		generateStatementSection(root, this.equitySize, this.equity, "Equity", subtotal, edit)
// 	}
// }

// class incomeStatement extends financialReport{
// 	constructor(header, data){
// 		super(header);
// 		this.data = data;
// 		this.income = data["income"];
// 		this.expenses = data["expenses"];
// 		this.incomeSize = Object.keys(data["income"]).length;
// 		this.expenseSize = Object.keys(data["expenses"]).length;
// 	}

// 	generateFillableBody(selector, subtotal) {
// 		const root = document.querySelector(selector)
// 		root.className = 'statement'
// 		generateFillableSection(root, this.incomeSize, this.income, "Income", subtotal)
// 		generateFillableSection(root, this.expenseSize, this.expenses, "Expenses", subtotal)

// 	}

// 	generateFormBody(selector, subtotal, edit){
// 		const root = document.querySelector(selector)
// 		root.className = 'statement'
// 		generateStatementSection(root, this.incomeSize, this.income, "Income", subtotal, edit)
// 		generateStatementSection(root, this.expenseSize, this.expenses, "Expenses", subtotal, edit)
// 	}
// }

// class cashFlowStatement extends financialReport{
// 	constructor(header, data){
// 		super(header);
// 		this.data = data;
// 		this.operations = data["operations"];
// 		this.investing = data["investing"];
// 		this.financing = data["financing"];
// 		this.operationSize = Object.keys(data["operations"]).length;
// 		this.investSize = Object.keys(data["investing"]).length;
// 		this.financeSize = Object.keys(data["financing"]).length;
// 	}

// 	generateFillableBody(selector, subtotal) {
// 		const root = document.querySelector(selector)
// 		root.className = 'statement'
// 		generateFillableSection(root, this.operationSize, this.operations, "Expenses", subtotal)
// 		generateFillableSection(root, this.investingSize, this.investing, "Investing Cash flow", subtotal)
// 		generateFillableSection(root, this.financeSize, this.financing, "Financing Cash flow", subtotal)
// 	}

// 	generateFormBody(selector, subtotal, edit){
// 		const root = document.querySelector(selector)
// 		root.className = 'statement'
// 		generateStatementSection(root, this.operationSize, this.operations, "Expenses", subtotal, edit)
// 		generateStatementSection(root, this.investingSize, this.investing, "Investing Cash flow", subtotal, edit)
// 		generateStatementSection(root, this.financeSize, this.financing, "Financing Cash flow", subtotal, edit)
// 	}
// }

// class equityStatement extends financialReport{
// 	constructor(header, data){
// 		super(header);
// 		this.data = data;
// 		this.shares = data["shares"];
// 		this.earnings = data["earnings"];
// 		this.sharesSize = Object.keys(data["shares"]).length;
// 		this.earnSize = Object.keys(data["earnings"]).length;
// 	}

// 	generateFillableBody(selector, subtotal) {
// 		const root = document.querySelector(selector)
// 		generateFillableSection(root, this.sharesSize, this.shares, "Shareholdings", subtotal)
// 		generateFillableSection(root, this.earnSize, this.earnings, "Retained Earnings", subtotal)		
// 	}

// 	generateFormBody(selector, subtotal, edit){
// 		const root = document.querySelector(selector)
// 		generateStatementSection(root, this.sharesSize, this.shares, "Shareholdings", subtotal, edit)
// 		generateStatementSection(root, this.earnSize, this.earnings, "Retained Earnings", subtotal, edit)
// 	}
// }


// //Need to add editable button for fillable part.
// function generateFillableSection(root, size, type, label, subtotal){
// 	const tableBody = document.createElement('div')
// 	const rowHeader = document.createElement('div')
// 	const rowHeaderName = document.createTextNode(label)
// 	rowHeader.className = 'row-header'
// 	rowHeader.appendChild(rowHeaderName)
// 	tableBody.appendChild(rowHeader)

// 	const elementCol = document.createElement('div')
// 	elementCol.className = 'element-col'
// 	const valCol = document.createElement('div')
// 	valCol.className = 'val-cal'
// 	log(size)
// 	log(type)
// 	for (let i = 0; i < size; i++){
// 		log(i)
// 		let tableRowElement = document.createElement('div')
// 		let tableRowKey = Object.keys(type)[i];
// 		log(tableRowKey)
// 		let tableRowName = document.createTextNode(tableRowKey)
// 		tableRowElement.className = 'row-name'
// 		tableRowElement.appendChild(tableRowName)
// 		elementCol.appendChild(tableRowElement)

// 		let tableRowElementVal = document.createElement('div')
// 		let tableRowInput = document.createElement('input')
// 		tableRowInput.setAttribute("value", "")
// 		tableRowInput.setAttribute("placeholder", type[tableRowKey])
// 		tableRowInput.setAttribute("type", "text")
// 		tableRowInput.setAttribute("id", tableRowKey.replace(/ /g,''))
// 		let tableRowInputButton = document.createElement('button')
// 		tableRowInputButton.onclick = function() {saveInputValue(tableRowKey, size, type)}
// 		tableRowInputButton.innerText = 'Save'
// 		tableRowInputButton.className = 'input-button'
// 		tableRowElementVal.className = 'input-row'
// 		tableRowElementVal.appendChild(tableRowInput)
// 		tableRowElementVal.appendChild(tableRowInputButton)
// 		valCol.appendChild(tableRowElementVal)
// 	}
// 	if (subtotal){
// 		const tableRowSubtotal = document.createElement('div')
// 		let tableRowName = document.createTextNode('Total ' + label)
// 		tableRowSubtotal.className = 'row-name'
// 		tableRowSubtotal.appendChild(tableRowName)
// 		elementCol.appendChild(tableRowSubtotal)

// 		let tableRowSubtotalVal = document.createElement('div')
// 		let tableRowVal = document.createTextNode(subtotalCalculator(size, type))
// 		tableRowSubtotalVal.className = 'row-value'
// 		tableRowSubtotalVal.setAttribute("id", 'Total' + label)
// 		tableRowSubtotalVal.appendChild(tableRowVal)
// 		valCol.appendChild(tableRowSubtotalVal)	
// 		// let tableRowSubtotalVal = document.createElement('div')
// 		// let tableRowInput = document.createElement('input')
// 		// tableRowInput.setAttribute("value", "")
// 		// tableRowInput.setAttribute("type", "text")
		
// 		// let tableRowInputButton = document.createElement('button')
// 		// tableRowInputButton.onclick = function() {saveInputValue('Total' + label)}
// 		// tableRowInputButton.innerText = 'Save'
// 		// tableRowInputButton.className = 'input-button'
// 		// tableRowSubtotalVal.className = 'input-row'
// 		// tableRowSubtotalVal.appendChild(tableRowInput)
// 		// tableRowSubtotalVal.appendChild(tableRowInputButton)
// 		// valCol.appendChild(tableRowSubtotalVal)	
// 	}
// 	tableBody.appendChild(elementCol)
// 	tableBody.appendChild(valCol)
// 	root.appendChild(tableBody)
// }

// function editValue(key, size, type) {
// 	//need an input box, save button, placeholder should be the existing value
// 	log(key)
// 	log(size)
// 	log(type)
// 	const ele = document.querySelector('#' + key.replace(/ /g,''))
// 	log(ele)

// 	const child = ele.children[0] //edit button to be removed
// 	log(child)
	
// 	const value = parseInt(child.innerText.replace('Edit','')) //value to set as placeholder
// 	ele.removeChild(child)
// 	//change ele className to input-row and remove id
// 	ele.className = 'input-row'
// 	ele.removeAttribute('id')
// 	//append input placeholder = value, set id
// 	let tableRowInput = document.createElement('input')
// 	tableRowInput.setAttribute("value", "")
// 	tableRowInput.setAttribute("placeholder", value)
// 	tableRowInput.setAttribute("type", "text")
// 	tableRowInput.setAttribute("id", key.replace(/ /g,''))
// 	let tableRowInputButton = document.createElement('button')
// 	tableRowInputButton.onclick = function() {saveInputValue(key, size, type)}
// 	tableRowInputButton.innerText = 'Save'
// 	tableRowInputButton.className = 'input-button'
// 	ele.appendChild(tableRowInput)
// 	ele.appendChild(tableRowInputButton)
// 	//append button - class input-button, innerText = Save

// }

// function saveInputValue(key, size, type) {
// 	const ele = document.querySelector('#' + key.replace(/ /g,''))
// 	const value = ele.value
// 	const placeholder = ele.placeholder
// 	log(placeholder)
// 	log(ele)
// 	log(ele.parentElement)
// 	log(ele.parentElement.parentElement)
// 	log (value)
// 	log(value === '')
// 	log('this is the type')
// 	log(type)

// 	//first save the old value of the row
// 	const oldVal = type[key]
	
// 	//then modify type to the new value
// 	type[key] = parseInt(value === '' ? placeholder : value)
// 	//then recalculate the subtotal and display it
// 	const subtotal = subtotalCalculator(size, type)
// 	//Update subtotal
// 	ele.parentElement.parentElement.querySelectorAll("[id^='Total']")[0].innerText = subtotal
// 	//then calculate if this violates the assets + equity = liabilities
// 	//then display a warning in red if that's the case at the bottom of the total 
// 	const totals = document.querySelectorAll("[id^='Total']");
// 	//this is just for balance sheet - what about the income statement, cash flow statement or equity statement
// 	log('Assets are ' + parseInt(totals[0].innerText))
// 	log('Liabilities are ' + parseInt(totals[1].innerText))
// 	log('Equity is ' + parseInt(totals[2].innerText))
// 	const a = parseInt(totals[0].innerText)
// 	const b = parseInt(totals[2].innerText)
// 	const c = parseInt(totals[1].innerText)
// 	log(a)
// 	log(b)
// 	log(c)
// 	log(a - b !== c)
	

// 	//Update the row and make changes
// 	const rowToAdd = ele.parentElement
// 	const buttonToRemove = ele.parentElement.querySelector('button')
// 	const inputToRemove = ele.parentElement.querySelector('input')

// 	rowToAdd.removeChild(buttonToRemove)
// 	rowToAdd.removeChild(inputToRemove)
// 	rowToAdd.className = 'row-value'

// 	let tableRowElementVal = document.createElement('div')
// 	let tableRowVal = document.createTextNode(value === '' ? placeholder : value)
// 	//add an edit button
// 	let tableRowEditButton = document.createElement('button')
// 	// tableRowInputButton.onclick = function() {saveInputValue(tableRowKey, size, type)}
// 	tableRowEditButton.innerText = 'Edit'
// 	tableRowEditButton.onclick = function() {editValue(key, size, type)}
// 	// tableRowEditButton.className = 'edit-button'
// 	// tableRowElementVal.className = 'edit-value'
// 	rowToAdd.style.padding = '14.3px'
// 	rowToAdd.setAttribute('id', key.replace(/ /g, ''))
// 	tableRowElementVal.appendChild(tableRowEditButton)

// 	tableRowElementVal.appendChild(tableRowVal)
// 	rowToAdd.appendChild(tableRowElementVal)
// 	if ((a - b) !== c) {
// 		alert('Assets must equal Equity + liabilities')
// 	}
// }

// function generateStatementSection(root, size, type, label, subtotal, edit){
// 	const tableBody = document.createElement('div')
// 	const rowHeader = document.createElement('div')
// 	const rowHeaderName = document.createTextNode(label)
// 	rowHeader.className = 'row-header'
// 	rowHeader.appendChild(rowHeaderName)
// 	tableBody.appendChild(rowHeader)

// 	const elementCol = document.createElement('div')
// 	elementCol.className = 'element-col'
// 	const valCol = document.createElement('div')
// 	valCol.className = 'val-cal'

// 	for (let i = 0; i < size; i++){
// 		let tableRowElement = document.createElement('div')
// 		let tableRowKey = Object.keys(type)[i];
// 		let tableRowName = document.createTextNode(tableRowKey)
// 		tableRowElement.className = 'row-name'
// 		tableRowElement.appendChild(tableRowName)
// 		elementCol.appendChild(tableRowElement)

// 		//add edit button with a function
// 		let tableRowElementVal = document.createElement('div')
// 		let tableRowVal = document.createTextNode(type[tableRowKey])
// 		tableRowElementVal.className = 'row-value'
// 		tableRowElementVal.setAttribute("id", tableRowKey.replace(/ /g,''))
// 		tableRowElementVal.appendChild(tableRowVal)
// 		if (edit){
// 			let tableRowEditButton = document.createElement('button')
// 			// tableRowInputButton.onclick = function() {saveInputValue(tableRowKey, size, type)}
// 			tableRowEditButton.innerText = 'Edit'
// 			tableRowEditButton.className = 'edit-button'
// 			tableRowEditButton.onclick = function() {editValue(tableRowKey, size, type)}
// 			tableRowElementVal.className = 'edit-value'
// 			tableRowElementVal.appendChild(tableRowEditButton)				
// 		}
// 		valCol.appendChild(tableRowElementVal)
// 	}
// 	if (subtotal){
// 		const tableRowSubtotal = document.createElement('div')
// 		let tableRowName = document.createTextNode('Total ' + label)
// 		tableRowSubtotal.className = 'row-name'
// 		tableRowSubtotal.appendChild(tableRowName)
// 		elementCol.appendChild(tableRowSubtotal)

// 		let tableRowSubtotalVal = document.createElement('div')
// 		let tableRowVal = document.createTextNode(subtotalCalculator(size, type))
// 		tableRowSubtotalVal.className = 'row-value'
// 		tableRowSubtotalVal.appendChild(tableRowVal)
// 		valCol.appendChild(tableRowSubtotalVal)	
// 	}
// 	tableBody.appendChild(elementCol)
// 	tableBody.appendChild(valCol)
// 	root.appendChild(tableBody)
// }

// function subtotalCalculator(size, type){
// 	let sub = 0
// 	for (let i = 0; i < size; i++){
// 		let key = Object.keys(type)[i]
// 		sub += type[key]
// 	}
// 	return sub
// }


// //Use this function to validate subtotal - if the subtotal is violated - do not change 
// //to fillable
// function validateSubtotal(size, type, subtotalValue){
// 	let total = 0
// 	for (let i = 0; i < size; i++){
// 		let key = Object.keys(type)[i]
// 		total += type[key]
// 	}
// 	return subtotalValue === total
// }





const header1 = {
	name: "Fraud Co",
	year: "2020"
}

const data = {
	assets: {
		"Cash": 100,
		"Accounts Receivable": 200,
		"PPE": 300,
		"Other Assets": 200
	},
	liabilities: {
		"Accounts Payable": 200,
		"Long term Debt": 400
	},
	equity: {
		"Retained Earnings": 100,
		"Outstanding Shares": 100
	}

}

const data2 = {
	income: {
		"Income 1": 100,
		"Income 2": 200,
		"Income 3": 300,
		"Income 4": 200
	},
	expenses: {
		"Expense 1": 100,
		"Expense 2": 100
	}

}

const fraudBS = new balanceSheet(header1, data);
const fraudIS = new incomeStatement(header1, data2);
