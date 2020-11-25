/* fr library js*/
'use strict';
const log = console.log

class financialReport {
	constructor(header){
		this.header = header
	}

	generateHeader(selector, report){
		//root selector
		//create a container
		//create 3 rows
		//add id for each row
		//height, color, font, etc.
		const root = document.querySelector(selector)
		//create container
		const header = document.createElement('div')
		header.className = 'container bckgrnd';
		// header.setAttribute('id', 'header')


		const header_row = document.createElement('div')
		const reportName = document.createTextNode(this.header.name)
		// header_row.className = 'header-row';
		header_row.className = 'row head'
		header_row.appendChild(reportName)

		const header_row2 = document.createElement('div')
		const reportTitle = document.createTextNode(report)
		// header_row2.className = 'header-row';
		header_row2.className = 'row head'
		header_row2.appendChild(reportTitle)

		const header_row3 = document.createElement('div')
		const reportYear = document.createTextNode(this.header.year)
		// header_row3.className = 'header-row';
		header_row3.className = 'row head'
		header_row3.appendChild(reportYear)

		header.appendChild(header_row)
		header.appendChild(header_row2)
		header.appendChild(header_row3)
		root.appendChild(header)
	}
}

class balanceSheet extends financialReport{
	constructor(header, data){
		super(header);
		this.data = data;
		this.assets = data["assets"];
		this.liabilities = data["liabilities"];
		this.equity = data["equity"];
		this.assetSize = Object.keys(data["assets"]).length;
		this.liabilitySize = Object.keys(data["liabilities"]).length;
		this.equitySize = Object.keys(data["equity"]).length;
	}

	generateFillableBody(selector, subtotal) {
		const root = document.querySelector(selector)
		root.className = 'statement'
		generateFillableSection(root, this.assetSize, this.assets, "Assets", subtotal)
		generateFillableSection(root, this.liabilitySize, this.liabilities, "Liabilities", subtotal)
		generateFillableSection(root, this.equitySize, this.equity, "Equity", subtotal)
	}

	generateFormBody(selector, subtotal, edit){
		const root = document.querySelector(selector)
		root.className = 'statement'
		generateStatementSection(root, this.assetSize, this.assets, "Assets", subtotal, edit)
		generateStatementSection(root, this.liabilitySize, this.liabilities, "Liabilities", subtotal, edit)
		generateStatementSection(root, this.equitySize, this.equity, "Equity", subtotal, edit)
	}

	lineItemDetail(data, label){
		const root = document.querySelector('#' + label.replace(/ /g, ''))
		addCollapsableDetails(root, data, label)
	}
}

class incomeStatement extends financialReport{
	constructor(header, data){
		super(header);
		this.data = data;
		this.income = data["income"];
		this.expenses = data["expenses"];
		this.incomeSize = Object.keys(data["income"]).length;
		this.expenseSize = Object.keys(data["expenses"]).length;
	}

	generateFillableBody(selector, subtotal) {
		const root = document.querySelector(selector)
		root.className = 'statement'
		generateFillableSection(root, this.incomeSize, this.income, "Income", subtotal)
		generateFillableSection(root, this.expenseSize, this.expenses, "Expenses", subtotal)

	}

	generateFormBody(selector, subtotal, edit){
		const root = document.querySelector(selector)
		root.className = 'statement'
		generateStatementSection(root, this.incomeSize, this.income, "Income", subtotal, edit)
		generateStatementSection(root, this.expenseSize, this.expenses, "Expenses", subtotal, edit)
	}
}

class cashFlowStatement extends financialReport{
	constructor(header, data){
		super(header);
		this.data = data;
		this.operations = data["operations"];
		this.investing = data["investing"];
		this.financing = data["financing"];
		this.operationSize = Object.keys(data["operations"]).length;
		this.investSize = Object.keys(data["investing"]).length;
		this.financeSize = Object.keys(data["financing"]).length;
	}

	generateFillableBody(selector, subtotal) {
		const root = document.querySelector(selector)
		root.className = 'statement'
		generateFillableSection(root, this.operationSize, this.operations, "Operating Cash flow", subtotal, true)
		generateFillableSection(root, this.investSize, this.investing, "Investing Cash flow", subtotal, true)
		generateFillableSection(root, this.financeSize, this.financing, "Financing Cash flow", subtotal, true)
	}

	generateFormBody(selector, subtotal, edit){
		const root = document.querySelector(selector)
		root.className = 'statement'
		generateStatementSection(root, this.operationSize, this.operations, "Operating Cash flow", subtotal, edit)
		generateStatementSection(root, this.investingSize, this.investing, "Investing Cash flow", subtotal, edit)
		generateStatementSection(root, this.financeSize, this.financing, "Financing Cash flow", subtotal, edit)
	}
}

class equityStatement extends financialReport{
	constructor(header, data){
		super(header);
		this.data = data;
		this.activity = data["activity"];
		this.beg = data["beg"];
		this.end = data["end"];
		this.activitySize = Object.keys(data["activity"]).length;
	}

	generateFillableBody(selector, subtotal) {
		const root = document.querySelector(selector)
		generateFillableSection(root, this.sharesSize, this.shares, "Shareholdings", subtotal)
		generateFillableSection(root, this.earnSize, this.earnings, "Retained Earnings", subtotal)		
	}

	generateFormBody(selector, subtotal, edit){
		const root = document.querySelector(selector)
		generateIndividualRow(root, this.beg, "Beginning Balance", subtotal, edit)
		generateStatementSection(root, this.activitySize, this.activity, "Current Year Activity", subtotal, edit)
		generateIndividualRow(root, this.end, "Ending Balance", subtotal, edit)
		// generateStatementSection(root, this.earnSize, this.earnings, "Retained Earnings", subtotal, edit)
	}

	addBudgetData(budgetData){
		updateFormStmtHeader()
		updateFormBody(this.beg, budgetData["beg"])
		updateFormBody(this.activity, budgetData["activity"])
		updateFormBody(this.end, budgetData["end"])
	}
}

function collapseRows(nodes, root){
	for (let i = 0; i < nodes.length; i++){
		if (nodes[i] !== root){
			if (nodes[i].className.includes('collapse')){
				nodes[i].className = nodes[i].className.replace('collapse ', '')
			} else {
				nodes[i].className = 'collapse ' + nodes[i].className
			}	
		}
		
	}
}

function addCollapsableDetails(root, data, label){
	log(data)
	log(label)
	log(root)
	const target = root.parentElement
	log(target)
	//Add toggle button
	const togDiv = document.createElement('div')
	togDiv.className = 'col-sm-1'
	const toggle = document.createElement('button')
	toggle.className = 'btn btn-success'
	toggle.innerText = 'Toggle'
	toggle.onclick = function() {collapseRows(target.parentElement.childNodes, target)}
	togDiv.appendChild(toggle)
	target.appendChild(togDiv)

	log(target.parentElement)
	const parentTarget = target.parentElement
	log(target.parentElement.childNodes)
	let node = null
	let location = -1
	for (let i = 1; i < target.parentElement.childNodes.length; i++){	
		if (target.parentElement.childNodes[i].querySelector('#' + label.replace(/ /g, '')) !== null){

			location = i - 1
		}
	}
	log(location)

	const newContainer = document.createElement('div')
	newContainer.className = 'container sub'
	parentTarget.removeChild(target)
	newContainer.appendChild(target)
	

	for (let j = 0; j < Object.keys(data[label]).length; j++){
		let tableRow = document.createElement('div')
		tableRow.className = 'row stmt'

		//create the label for the table row (ex. cash)
		let tableRowlabel = document.createElement('div')
		tableRowlabel.className = 'col-sm-10'
		let tableRowKey = Object.keys(data[label])[j];
		let tableRowName = document.createTextNode(tableRowKey)
		tableRowlabel.appendChild(tableRowName)
		//add col to the tableRow
		tableRow.appendChild(tableRowlabel)

		//create the value of the table row
		let tableRowElementVal = document.createElement('div')
		tableRowElementVal.className = 'col-sm-1'
		tableRowElementVal.setAttribute("id", tableRowKey.replace(/ /g,''))
		let tableRowVal = document.createTextNode(data[label][tableRowKey])
		tableRowElementVal.appendChild(tableRowVal)
		//add col to the tableRow
		tableRow.appendChild(tableRowElementVal)
		newContainer.appendChild(tableRow)
	}

	parentTarget.insertBefore(newContainer, parentTarget.childNodes[location + 1])


	//add data to container after the element
	//Need to find the position of the label to insert before or append to the end depending
	//on location


}

function updateFormStmtHeader(){
	const root = document.querySelectorAll('.container.stbck')[0]
	const row_header = document.createElement('div')
	row_header.className = 'row stmt'

	const div1 = document.createElement('div')
	div1.className = 'col-sm-9'
	
	const div2 = document.createElement('div')
	div2.className = 'col-sm-1'
	div2.appendChild(document.createTextNode('Actual'))

	const div3 = document.createElement('div')
	div3.className = 'col-sm-1'
	div3.appendChild(document.createTextNode('Budget'))

	const div4 = document.createElement('div')
	div4.className = 'col-sm-1'
	div4.appendChild(document.createTextNode('Diff'))

	row_header.appendChild(div1)
	row_header.appendChild(div2)
	row_header.appendChild(div3)
	row_header.appendChild(div4)

	root.insertBefore(row_header, root.childNodes[0])
}

function updateFormBody(data, budget){
	const len = Object.keys(budget).length
	for (let i = 0; i < len; i++){
		let tableRowKey = Object.keys(budget)[i].replace(/ /g,'')
		let selector = document.querySelector("#" + tableRowKey)
		let parent = selector.parentElement
		let value = parseInt(selector.innerText)
		let budgetValue = parseInt(budget[Object.keys(budget)[i]])
		let difference = value - budgetValue

		let budgetDiv = document.createElement('div')
		budgetDiv.className = 'col-sm-1'
		budgetDiv.appendChild(document.createTextNode(budgetValue))

		let diffDiv = document.createElement('div')
		diffDiv.className = 'col-sm-1'
		diffDiv.appendChild(document.createTextNode(difference))

		parent.childNodes[0].className = parent.childNodes[0].className.includes('individual') ? 'col-sm-9 individual' : 'col-sm-9'

		parent.appendChild(budgetDiv)
		parent.appendChild(diffDiv)

		log(selector.parentElement.childNodes)
		log(value)
		log(difference)
		log(selector)
		log(selector.parentElement)

	}

}

function generateStatementSection(root, size, type, label, subtotal, edit){
	//this creates the shell container and the label row
	const tableBody = document.createElement('div')
	const rowHeader = document.createElement('div')
	const rowHeaderName = document.createTextNode(label)
	tableBody.className = 'container stbck'
	// rowHeader.className = 'row-header'
	rowHeader.className = 'row stmt-header'
	rowHeader.appendChild(rowHeaderName)
	tableBody.appendChild(rowHeader)

	//Now create a row with two columns for each things - 3 in other cases of a button
	//and append to the tablebody.
	// const elementCol = document.createElement('div')
	// elementCol.className = 'element-col'
	// const valCol = document.createElement('div')
	// valCol.className = 'val-cal'

	for (let i = 0; i < size; i++){
		//this is the table row - populate everything in here
		let tableRow = document.createElement('div')
		tableRow.className = 'row stmt'

		//create the label for the table row (ex. cash)
		let tableRowlabel = document.createElement('div')
		tableRowlabel.className = 'col-sm-10'
		let tableRowKey = Object.keys(type)[i];
		let tableRowName = document.createTextNode(tableRowKey)
		tableRowlabel.appendChild(tableRowName)
		//add col to the tableRow
		tableRow.appendChild(tableRowlabel)

		
		// tableRow.appendChild(tableRowName)
		// elementCol.appendChild(tableRowElement)

		//add edit button with a function
		//create the value of the table row
		let tableRowElementVal = document.createElement('div')
		tableRowElementVal.className = 'col-sm-1'
		tableRowElementVal.setAttribute("id", tableRowKey.replace(/ /g,''))
		let tableRowVal = document.createTextNode(type[tableRowKey])
		tableRowElementVal.appendChild(tableRowVal)
		//add col to the tableRow
		tableRow.appendChild(tableRowElementVal)

		//Add an edit button
		if (edit){
			let tableRowButton = document.createElement('div')
			tableRowButton.className = 'col-sm-1'
			let tableRowEditButton = document.createElement('button')
			// tableRowInputButton.onclick = function() {saveInputValue(tableRowKey, size, type)}
			tableRowEditButton.innerText = 'Edit'
			// tableRowEditButton.className = 'edit-button'
			tableRowEditButton.className = 'btn btn-success'
			tableRowEditButton.onclick = function() {editValue(tableRowKey, size, type)}
			// tableRowElementVal.className = 'edit-value'
			tableRowButton.appendChild(tableRowEditButton)	
			tableRow.appendChild(tableRowButton)			
		}
		// valCol.appendChild(tableRowElementVal)
		tableBody.appendChild(tableRow)

	}
	if (subtotal){
		const tableRowSubtotal = document.createElement('div')
		tableRowSubtotal.className = 'row stmt'
		const tableRowSubCol = document.createElement('div')
		tableRowSubCol.className = 'col-sm-10'
		const tableRowName = document.createTextNode('Total ' + label)
		tableRowSubCol.appendChild(tableRowName)

		// tableRowSubtotal.className = 'row-name'
		
		tableRowSubtotal.appendChild(tableRowSubCol)
		

		const tableRowSubtotalVal = document.createElement('div')
		tableRowSubtotalVal.className = 'col-sm-1'
		tableRowSubtotalVal.setAttribute("id", 'Total' + label)
		const tableRowVal = document.createTextNode(subtotalCalculator(size, type))
		// tableRowSubtotalVal.className = 'row-value'
		tableRowSubtotalVal.appendChild(tableRowVal)
		tableRowSubtotal.appendChild(tableRowSubtotalVal)	

		tableBody.appendChild(tableRowSubtotal)
	}
	// tableBody.appendChild(elementCol)
	// tableBody.appendChild(valCol)
	root.appendChild(tableBody)
}

function generateFillableSection(root, size, type, label, subtotal, flag){
	console.log(size)
	console.log(type)
	const tableBody = document.createElement('div')
	const rowHeader = document.createElement('div')
	const rowHeaderName = document.createTextNode(label)
	tableBody.className = 'container stbck'
	// rowHeader.className = 'row-header'
	rowHeader.className = 'row stmt-header'
	rowHeader.appendChild(rowHeaderName)
	tableBody.appendChild(rowHeader)

	// const tableBody = document.createElement('div')
	// const rowHeader = document.createElement('div')
	// const rowHeaderName = document.createTextNode(label)
	// rowHeader.className = 'row-header'
	// tableBody.className = 'container'
	// rowHeader.appendChild(rowHeaderName)
	// tableBody.appendChild(rowHeader)

	// const elementCol = document.createElement('div')
	// elementCol.className = 'element-col'
	// const valCol = document.createElement('div')
	// valCol.className = 'val-cal'
	// log(size)
	// log(type)
	for (let i = 0; i < size; i++){
		//this is the table row - populate everything in here
		let tableRow = document.createElement('div')
		tableRow.className = 'row stmt'

		//create the label for the table row (ex. cash)
		let tableRowlabel = document.createElement('div')
		tableRowlabel.className = 'col-sm-10'
		let tableRowKey = Object.keys(type)[i];
		let tableRowName = document.createTextNode(tableRowKey)
		console.log(tableRowKey)
		tableRowlabel.appendChild(tableRowName)
		//add col to the tableRow
		tableRow.appendChild(tableRowlabel)

		// log(i)
		// let tableRowElement = document.createElement('div')
		// let tableRowKey = Object.keys(type)[i];
		// log(tableRowKey)
		// let tableRowName = document.createTextNode(tableRowKey)
		// tableRowElement.className = 'row-name'
		// tableRowElement.appendChild(tableRowName)
		// elementCol.appendChild(tableRowElement)

		let tableRowInputVal = document.createElement('div')
		tableRowInputVal.className = 'col-sm-1'
		let tableRowInput = document.createElement('input')
		tableRowInput.setAttribute("value", "")
		tableRowInput.setAttribute("placeholder", type[tableRowKey])
		tableRowInput.setAttribute("type", "text")
		tableRowInput.setAttribute("id", tableRowKey.replace(/ /g,''))
		tableRowInput.className = 'input'
		tableRowInputVal.appendChild(tableRowInput)
		tableRow.appendChild(tableRowInputVal)


		// let tableRowInput = document.createElement('input')
		// tableRowInput.setAttribute("value", "")
		// tableRowInput.setAttribute("placeholder", type[tableRowKey])
		// tableRowInput.setAttribute("type", "text")
		// tableRowInput.setAttribute("id", tableRowKey.replace(/ /g,''))
		let tableRowButtonVal = document.createElement('div')
		tableRowButtonVal.className = 'col-sm-1'
		let tableRowInputButton = document.createElement('button')
		tableRowInputButton.onclick = function() {saveInputValue(tableRowKey, size, type, flag)}
		tableRowInputButton.innerText = 'Save'
		tableRowInputButton.className = 'btn btn-success'
		// tableRowElementVal.className = 'input-row'
		// tableRowElementVal.appendChild(tableRowInput)
		// tableRowElementVal.appendChild(tableRowInputButton)
		// valCol.appendChild(tableRowElementVal)
		tableRowButtonVal.appendChild(tableRowInputButton)
		tableRow.appendChild(tableRowButtonVal)
		tableBody.appendChild(tableRow)
	}
	if (subtotal){
		// const tableRowSubtotal = document.createElement('div')
		// let tableRowName = document.createTextNode('Total ' + label)
		// tableRowSubtotal.className = 'row-name'
		// tableRowSubtotal.appendChild(tableRowName)
		// elementCol.appendChild(tableRowSubtotal)

		// let tableRowSubtotalVal = document.createElement('div')
		// let tableRowVal = document.createTextNode(subtotalCalculator(size, type))
		// tableRowSubtotalVal.className = 'row-value'
		// tableRowSubtotalVal.setAttribute("id", 'Total' + label)
		// tableRowSubtotalVal.appendChild(tableRowVal)
		// valCol.appendChild(tableRowSubtotalVal)	
		const tableRowSubtotal = document.createElement('div')
		tableRowSubtotal.className = 'row stmt'
		const tableRowSubCol = document.createElement('div')
		tableRowSubCol.className = 'col-sm-10'
		const tableRowName = document.createTextNode('Total ' + label)
		tableRowSubCol.appendChild(tableRowName)

		// tableRowSubtotal.className = 'row-name'
		
		tableRowSubtotal.appendChild(tableRowSubCol)
		

		const tableRowSubtotalVal = document.createElement('div')
		tableRowSubtotalVal.className = 'col-sm-1'
		tableRowSubtotalVal.setAttribute("id", 'Total' + label)
		const tableRowVal = document.createTextNode(subtotalCalculator(size, type))
		// tableRowSubtotalVal.className = 'row-value'
		tableRowSubtotalVal.appendChild(tableRowVal)
		tableRowSubtotal.appendChild(tableRowSubtotalVal)	

		tableBody.appendChild(tableRowSubtotal)
		// let tableRowSubtotalVal = document.createElement('div')
		// let tableRowInput = document.createElement('input')
		// tableRowInput.setAttribute("value", "")
		// tableRowInput.setAttribute("type", "text")
		
		// let tableRowInputButton = document.createElement('button')
		// tableRowInputButton.onclick = function() {saveInputValue('Total' + label)}
		// tableRowInputButton.innerText = 'Save'
		// tableRowInputButton.className = 'input-button'
		// tableRowSubtotalVal.className = 'input-row'
		// tableRowSubtotalVal.appendChild(tableRowInput)
		// tableRowSubtotalVal.appendChild(tableRowInputButton)
		// valCol.appendChild(tableRowSubtotalVal)	
	}
	// tableBody.appendChild(elementCol)
	// tableBody.appendChild(valCol)
	root.appendChild(tableBody)
}

function editValue(key, size, type) {
	//need an input box, save button, placeholder should be the existing value
	log(key)
	log(size)
	log(type)
	const ele = document.querySelector('#' + key.replace(/ /g,''))
	log(ele)

	const parent = ele.parentElement //This is the row
	log(parent)
	
	const value = parseInt(ele.innerText) //value to set as placeholder
	ele.innerText = '' //removes innerText of the element - replace this with an input field
	// ele.removeChild(child)
	//change ele className to input-row and remove id
	// ele.className = 'input-row'
	// ele.removeAttribute('id')
	//append input placeholder = value, set id
	let tableRowInput = document.createElement('input')
	tableRowInput.setAttribute("value", "")
	tableRowInput.setAttribute("placeholder", value)
	tableRowInput.setAttribute("type", "text")
	tableRowInput.setAttribute("id", key.replace(/ /g,''))
	tableRowInput.className = 'input'
	ele.appendChild(tableRowInput) // this adds the new input into the element div.

	//Now just change the button instead of replacing it
	const tableRowInputButton = parent.querySelector('button')
	tableRowInputButton.onclick = function() {saveInputValue(key, size, type)}
	tableRowInputButton.innerText = 'Save'
	// tableRowInputButton.className = 'input-button'
	// ele.appendChild(tableRowInput)
	// ele.appendChild(tableRowInputButton)
	//append button - class input-button, innerText = Save

}

function saveInputValue(key, size, type, flag) {
	log(key)
	log(size)
	log(type)
	const ele = flag ? document.querySelector('#' + key.replace(/ /g,'')) :  document.querySelector('#' + key.replace(/ /g,'')).querySelector('input')
	const button = ele.parentElement.parentElement.querySelector('button')
	log(button)
	const value = ele.value
	const placeholder = ele.placeholder
	log(placeholder)
	log(ele)
	log(ele.parentElement)
	log(ele.parentElement.parentElement.parentElement)
	log (value)
	log(value === '')
	log('this is the type')
	log(type)

	//first save the old value of the row
	const oldVal = type[key]
	
	//then modify type to the new value
	type[key] = parseInt(value === '' ? placeholder : value)
	log(type[key])

	//then recalculate the subtotal and display it
	const subtotal = subtotalCalculator(size, type)
	log(subtotal)
	//Update subtotal
	ele.parentElement.parentElement.parentElement.querySelectorAll("[id^='Total']")[0].innerText = subtotal
	//then calculate if this violates the assets + equity = liabilities
	//then display a warning in red if that's the case at the bottom of the total 
	// const totals = document.querySelectorAll("[id^='Total']");
	//this is just for balance sheet - what about the income statement, cash flow statement or equity statement
	// log('Assets are ' + parseInt(totals[0].innerText))
	// log('Liabilities are ' + parseInt(totals[1].innerText))
	// log('Equity is ' + parseInt(totals[2].innerText))
	// const a = parseInt(totals[0].innerText)
	// const b = parseInt(totals[2].innerText)
	// const c = parseInt(totals[1].innerText)
	// log(a)
	// log(b)
	// log(c)
	// log(a - b !== c)
	

	//Update the row and make changes
	//replace the row with a div with a value equal to the the new value
	const parent = ele.parentElement
	parent.removeChild(ele) //removes the input
	let tableRowVal = document.createTextNode(value === '' ? placeholder : value)
	parent.appendChild(tableRowVal)
	if (flag){
		parent.setAttribute('id', key.replace(/ /g, ''))	
	}
	

	// const rowToAdd = ele.parentElement
	// const buttonToRemove = ele.parentElement.querySelector('button')
	// const inputToRemove = ele.parentElement.querySelector('input')

	// rowToAdd.removeChild(buttonToRemove)
	// rowToAdd.removeChild(inputToRemove)
	// rowToAdd.className = 'row-value'

	// let tableRowElementVal = document.createElement('div')
	// let tableRowVal = document.createTextNode(value === '' ? placeholder : value)
	//add an edit button
	// let tableRowEditButton = document.createElement('button')
	// tableRowInputButton.onclick = function() {saveInputValue(tableRowKey, size, type)}
	// tableRowEditButton.innerText = 'Edit'
	// tableRowEditButton.onclick = function() {editValue(key, size, type)}
	button.innerText = 'Edit'
	button.onclick = function() {editValue(key, size, type, flag)}
	// tableRowEditButton.className = 'edit-button'
	// tableRowElementVal.className = 'edit-value'
	// rowToAdd.style.padding = '14.3px'
	// rowToAdd.setAttribute('id', key.replace(/ /g, ''))
	// tableRowElementVal.appendChild(tableRowEditButton)

	// tableRowElementVal.appendChild(tableRowVal)
	// rowToAdd.appendChild(tableRowElementVal)
	// if ((a - b) !== c) {
	// 	alert('Assets must equal Equity + liabilities')
	// }
}

function generateIndividualRow(root, type, label, subtotal, edit){
	//this creates the shell container and the label row
	const tableBody = document.createElement('div')
	const rowHeader = document.createElement('div')
	tableBody.className = 'container stbck'
	// rowHeader.className = 'row-header'
	rowHeader.className = 'row stmt-header'
	const tableRowKey = Object.keys(type)[0];
	const tableRowlabel = document.createElement('div')
	// tableRowlabel.setAttribute("id", tableRowKey.replace(/ /g,''))
	tableRowlabel.className = 'col-sm-10 individual'
	const rowHeaderName = document.createTextNode(label)
	tableRowlabel.appendChild(rowHeaderName)
	rowHeader.appendChild(tableRowlabel)
	
	const tableRowElementVal = document.createElement('div')
	tableRowElementVal.className = 'col-sm-1'
	
	tableRowElementVal.setAttribute("id", tableRowKey.replace(/ /g,''))
	const tableRowVal = document.createTextNode(type[tableRowKey])
	tableRowElementVal.appendChild(tableRowVal)
	rowHeader.appendChild(tableRowElementVal)
	
	tableBody.appendChild(rowHeader)
	root.appendChild(tableBody)
}

function subtotalCalculator(size, type){
	let sub = 0
	for (let i = 0; i < size; i++){
		let key = Object.keys(type)[i]
		sub += type[key]
	}
	return sub
}


//Use this function to validate subtotal - if the subtotal is violated - do not change 
//to fillable
function validateSubtotal(size, type, subtotalValue){
	let total = 0
	for (let i = 0; i < size; i++){
		let key = Object.keys(type)[i]
		total += type[key]
	}
	return subtotalValue === total
}
