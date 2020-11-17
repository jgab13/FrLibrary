/* examples js*/
'use strict';
const log = console.log

class financialReport {
	constructor(header){
		this.header = header
	}

	generateHeader(selector, report){
		const root = document.querySelector(selector)
		root.className = 'statement';
		const header = document.createElement('div')
		header.className = 'header';

		const header_row = document.createElement('div')
		const reportName = document.createTextNode(this.header.name)
		header_row.className = 'header-row';
		header_row.appendChild(reportName)

		const header_row2 = document.createElement('div')
		const reportTitle = document.createTextNode(report)
		header_row2.className = 'header-row';
		header_row2.appendChild(reportTitle)

		const header_row3 = document.createElement('div')
		const reportYear = document.createTextNode(this.header.year)
		header_row3.className = 'header-row';
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

	generateFormBody(selector, subtotal){
		const root = document.querySelector(selector)
		root.className = 'statement'
		generateStatementSection(root, this.assetSize, this.assets, "Assets", subtotal)
		generateStatementSection(root, this.liabilitySize, this.liabilities, "Liabilities", subtotal)
		generateStatementSection(root, this.equitySize, this.equity, "Equity", subtotal)
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

	generateFormBody(selector, subtotal){
		const root = document.querySelector(selector)
		root.className = 'statement'
		generateStatementSection(root, this.incomeSize, this.income, "Income", subtotal)
		generateStatementSection(root, this.expenseSize, this.expenses, "Expenses", subtotal)
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

	generateFormBody(selector, subtotal){
		const root = document.querySelector(selector)
		root.className = 'statement'
		generateStatementSection(root, this.operationSize, this.operations, "Expenses", subtotal)
		generateStatementSection(root, this.investingSize, this.investing, "Investing Cash flow", subtotal)
		generateStatementSection(root, this.financeSize, this.financing, "Financing Cash flow", subtotal)
	}
}

class equityStatement extends financialReport{
	constructor(header, data){
		super(header);
		this.data = data;
		this.shares = data["shares"];
		this.earnings = data["earnings"];
		this.sharesSize = Object.keys(data["shares"]).length;
		this.earnSize = Object.keys(data["earnings"]).length;
	}

	generateFormBody(selector, subtotal){
		const root = document.querySelector(selector)
		generateStatementSection(root, this.sharesSize, this.shares, "Shareholdings", subtotal)
		generateStatementSection(root, this.earnSize, this.earnings, "Retained Earnings", subtotal)
	}
}

function generateStatementSection(root, size, type, label, subtotal){
	const tableBody = document.createElement('div')
	const rowHeader = document.createElement('div')
	const rowHeaderName = document.createTextNode(label)
	rowHeader.className = 'row-header'
	rowHeader.appendChild(rowHeaderName)
	tableBody.appendChild(rowHeader)

	const elementCol = document.createElement('div')
	elementCol.className = 'element-col'
	const valCol = document.createElement('div')
	valCol.className = 'val-cal'

	for (let i = 0; i < size; i++){
		let tableRowElement = document.createElement('div')
		let tableRowKey = Object.keys(type)[i];
		let tableRowName = document.createTextNode(tableRowKey)
		tableRowElement.className = 'row-name'
		tableRowElement.appendChild(tableRowName)
		elementCol.appendChild(tableRowElement)

		let tableRowElementVal = document.createElement('div')
		let tableRowVal = document.createTextNode(type[tableRowKey])
		tableRowElementVal.className = 'row-value'
		tableRowElementVal.appendChild(tableRowVal)
		valCol.appendChild(tableRowElementVal)
	}
	if (subtotal){
		const tableRowSubtotal = document.createElement('div')
		let tableRowName = document.createTextNode('Total ' + label)
		tableRowSubtotal.className = 'row-name'
		tableRowSubtotal.appendChild(tableRowName)
		elementCol.appendChild(tableRowSubtotal)

		let tableRowSubtotalVal = document.createElement('div')
		let tableRowVal = document.createTextNode(subtotalCalculator(size, type))
		tableRowSubtotalVal.className = 'row-value'
		tableRowSubtotalVal.appendChild(tableRowVal)
		valCol.appendChild(tableRowSubtotalVal)	
	}
	tableBody.appendChild(elementCol)
	tableBody.appendChild(valCol)
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
