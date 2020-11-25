
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


const ESdata = {
	beg: {
		"Beginning Balance": 500
	},

	activity: {
		"Earnings": -1000,
		"Share issuance": 200,
		"Loan from shareholder": 100
	},
	end: {
		"Ending Balance": -200
	} 
}

const ESbudget = {
	beg: {
		"Beginning Balance": 300
	},

	activity: {
		"Earnings": -800,
		"Share issuance": 150,
		"Loan from shareholder": 75
	},
	end: {
		"Ending Balance": -225
	} 
}

const myBS = new balanceSheet(header, BSdata);
const myIS = new incomeStatement(header, ISdata);
const myES = new equityStatement(header, ESdata);


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
	myES.generateHeader('#head', 'Statement of Equity')
	myES.generateFormBody('#stmt', false, false)
	myES.addBudgetData(ESbudget)
	const footer = document.querySelector('#footer')
	const text = document.createTextNode('This is the statement of equity. The edit feature is not enabled. Additional budgeted data was added to this report. The difference between budget and actual was computed automatically.')
	footer.appendChild(text)
}
