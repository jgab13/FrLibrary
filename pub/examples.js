
const header1 = {
	name: "My Company",
	year: "Dec 31, 2020"
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

const myBS = new balanceSheet(header1, data);
const myIS = new incomeStatement(header1, data2);


// const bs = document.querySelector('.btn-group')
// log(bs)

// bs.addEventListener('click', createStatement);


function createBS(){

	myBS.generateHeader('#head', 'Balance Sheet')
	log(myBS)
	myBS.generateFillableBody('#stmt', true)
}

function createIS(){

}

function createCF(){

}

function createES(){
	
}
