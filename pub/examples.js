
const header = {
	name: "My Company",
	year: "Dec 31, 2020"
}

const BSdata = {
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

const ISdata = {
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

const myBS = new balanceSheet(header, BSdata);
const myIS = new incomeStatement(header, ISdata);


// const bs = document.querySelector('.btn-group')
// log(bs)

// bs.addEventListener('click', createStatement);


function createBS(){

	myBS.generateHeader('#head', 'Balance Sheet')
	log(myBS)
	myBS.generateFillableBody('#stmt', true)
}

function createIS(){
	myIS.generateHeader('#head', 'Income Statement')
	myIS.generateFormBody('#stmt', true, true)
	const footer = document.querySelector('#footer')
	const text = document.createTextNode('This is the income statement. Click on edit to change the value. Click save to change the value and update the subtotal.')
	footer.appendChild(text)
}

function createCF(){

}

function createES(){
	
}
