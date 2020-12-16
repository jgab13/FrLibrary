const BSdata = {
	header: {
		"company": "My Company",
		"statement": "Balance Sheet",
		"date": "Dec 31, 2020"
	},
	Assets: {
		"Cash": 100,
		"Accounts Receivable": 200,
		"PPE": 300,
		"Other Assets": 200
	},
	Liabilities: {
		"Accounts Payable": 200,
		"Long term Debt": 400
	},
	Equity: {
		"Retained Earnings": 100,
		"Outstanding Shares": 100
	}
}

const BSbudget = {
	Assets: {
		"Cash": 200,
		"Accounts Receivable": 300,
		"PPE": 290,
		"Other Assets": 196
	},
	Liabilities: {
		"Accounts Payable": 250,
		"Long term Debt": 476
	},
	Equity: {
		"Retained Earnings": 200,
		"Outstanding Shares": 50
	}
}

const person = {
	header: {
		"statement": "Jonathan's budget",
		"date": "Dec 31, 2020"
	},
	Income: {
		"Income 1": 100,
		"Income 2": 200,
		"Income 3": 300,
		"Income 4": 200
	},
	Expenses: {
		"Expense 1": 200,
		"Expense 2": 400
	}
}

function createBS(){
	const table = statementGenerator(BSdata, "tb1", true, BSbudget)
	// const table = NotFillableStatement(BSdata, "tb1", true)
	console.log(table)
	const stmt = document.querySelector('#stmt')
	console.log(stmt)
	stmt.appendChild(table)
	total("tb1", "Liabilities + Equity", {
		"Liabilities": "add",
		"Equity": "add",
	}, true)
	// total("tb1", "Liabilities + Equity", {
	// 	"Liabilities": "add",
	// 	"Equity": "add",
	// })
	// myBS.generateHeader('#head', 'Balance Sheet')
	// myBS.generateFormBody('#stmt', true)
	// myBS.lineItemDetail(addCash, "Cash")
	// const footer = document.querySelector('#footer')
	// const text = document.createTextNode('This is the balance statement. This form cannot be editted and is not fillable. The cash row can be collapsed and expanded to see additional cash details')
	// footer.appendChild(text)
}

function createBudget(){
	const table = statementGenerator(person, "tb2", true)
	console.log(table)
	const stmt = document.querySelector('#stmt2')
	console.log(stmt)
	stmt.appendChild(table)
	total("tb2", "Net Income", {
		"Income": "add",
		"Expenses": "sub",
	})
}



function slideshow() {
	const slides = []
	const slide1 = statementGenerator(person, "tb3", true)
	const slide2 = statementGenerator(BSdata, 'tb4', true)
	slides.push(slide1)
	slides.push(slide2)
	createAutomaticSlideShow('#slideshow', 'auto', slides, 2000)
}

function ManualSlideShow() {
	const slides = []
	const slide1 = statementGenerator(person, "tb5", true)
	const slide2 = statementGenerator(BSdata, 'tb6', true)
	slides.push(slide1)
	slides.push(slide2)
	createManualSlideShow('#slideshow2', 'manual', slides)
}

function onLoadFunctions() {
	formatValues();
	formatDifferences();
	checkDifferences(10, 'budgetdiff', "green", "red")
	addLink("Total Income");
	addLink("Cash");
	checkLinkedValues("Total Income", "Total income does not match across statements");
	checkLinkedValues("Cash", "Cash does not match across statements");

}


window.addEventListener("load", () =>{
	createBS();
})

window.addEventListener("load", () =>{
	createBudget();
})



window.addEventListener("load", () =>{
	slideshow()
})

window.addEventListener("load", () =>{
	ManualSlideShow()
})

window.addEventListener("load", () => {
	onLoadFunctions();
})
// const header = {
// 	name: "My Company",
// 	year: "Dec 31, 2020"
// }

// const BSdata = {
// 	assets: {
// 		"Cash": 100,
// 		"Accounts Receivable": 200,
// 		"PPE": 300,
// 		"Other Assets": 200
// 	},
// 	liabilities: {
// 		"Accounts Payable": 200,
// 		"Long term Debt": 400
// 	},
// 	equity: {
// 		"Retained Earnings": 100,
// 		"Outstanding Shares": 100
// 	}
// }

// const ISdata = {
// 	income: {
// 		"Income 1": 100,
// 		"Income 2": 200,
// 		"Income 3": 300,
// 		"Income 4": 200
// 	},
// 	expenses: {
// 		"Expense 1": 100,
// 		"Expense 2": 100
// 	}
// }


// const CFdata = {
// 	beg: {
// 		"Beginning Balance": 500
// 	},
// 	operations: {
// 		"Net income": 1000,
// 		"Depreciation": 5000,
// 		"Loss on sale": -360
// 	},
// 	investing: {
// 		"Capex": 5500,
// 		"Losses": -3700
// 	},
// 	financing: {
// 		"Debt payments": -7500,
// 		"Share issuance": 5000
// 	},
// 	end: {
// 		"Ending Balance": -200
// 	} 
// }

// const ESdata = {
// 	beg: {
// 		"Beginning Balance": 500
// 	},

// 	activity: {
// 		"Earnings": -1000,
// 		"Share issuance": 200,
// 		"Loan from shareholder": 100
// 	},
// 	end: {
// 		"Ending Balance": -200
// 	} 
// }

// const ESbudget = {
// 	beg: {
// 		"Beginning Balance": 300
// 	},

// 	activity: {
// 		"Earnings": -800,
// 		"Share issuance": 150,
// 		"Loan from shareholder": 75
// 	},
// 	end: {
// 		"Ending Balance": -225
// 	} 
// }

// const addCash = {
// 	Cash: {
// 		"Deposits": 50,
// 		"Cash Equivalents": 25,
// 		"Treasury Bills": 25
// 	}
// }

// const myBS = new balanceSheet(header, BSdata);
// const myIS = new incomeStatement(header, ISdata);
// const myES = new equityStatement(header, ESdata);
// const myCF = new cashFlowStatement(header, CFdata);


// // const bs = document.querySelector('.btn-group')
// // log(bs)

// // bs.addEventListener('click', createStatement);


// function createBS(){
// 	myBS.generateHeader('#head', 'Balance Sheet')
// 	myBS.generateFormBody('#stmt', true)
// 	myBS.lineItemDetail(addCash, "Cash")
// 	const footer = document.querySelector('#footer')
// 	const text = document.createTextNode('This is the balance statement. This form cannot be editted and is not fillable. The cash row can be collapsed and expanded to see additional cash details')
// 	footer.appendChild(text)
// }

// function createIS(){
// 	myIS.generateHeader('#head', 'Income Statement')
// 	myIS.generateFormBody('#stmt', true, true)
// 	const footer = document.querySelector('#footer')
// 	const text = document.createTextNode('This is the income statement. Click on edit to change the value. Click save to change the value and update the subtotal.')
// 	footer.appendChild(text)
// }

// function createCF(){
// 	myCF.generateHeader('#head', 'Cashflow Statement')
// 	myCF.generateFillableBody('#stmt', true)
// 	const footer = document.querySelector('#footer')
// 	const text = document.createTextNode('This is the cash flow statement. This is a default fillable form with the current value as placeholders. Click on edit to change the value. Click save to change the value and update the subtotal.')
// 	footer.appendChild(text)
// }

// function createES(){
// 	myES.generateHeader('#head', 'Statement of Equity')
// 	myES.generateFormBody('#stmt', false, false)
// 	myES.addBudgetData(ESbudget)
// 	const footer = document.querySelector('#footer')
// 	const text = document.createTextNode('This is the statement of equity. The edit feature is not enabled. Additional budgeted data was added to this report. The difference between budget and actual was computed automatically.')
// 	footer.appendChild(text)
// }
