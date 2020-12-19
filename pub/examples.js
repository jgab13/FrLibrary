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


const BSdata2 = {
	header: {
		"company": "FraudCo",
		"statement": "Balance Sheet",
		"date": "Dec 31, 2019"
	},
	Assets: {
		"Cash": 101,
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
		"Outstanding Shares": 90
	}
}

const person = {
	header: {
		"statement": "Jonathan's Income Statement",
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

const Income = {
	"Sub Income 1": 50,
	"Sub Income 2": 50
}

const personBudget = {
	Income: {
		"Income 1": 175,
		"Income 2": 220,
		"Income 3": 275,
		"Income 4": 110
	},
	Expenses: {
		"Expense 1": 300,
		"Expense 2": 595
	}
}



const f = new fr()
const fa = new fr()
const fb = new fr()
const fc = new fr()
const fd = new fr()

function createBS(){
	
	const table = f.statementGenerator(BSdata, "tb1", true)
	// const table = NotFillableStatement(BSdata, "tb1", true)
	f.draganddrop("tb1")
	console.log(table)
	const stmt = document.querySelector('#stmt')
	console.log(stmt)
	stmt.appendChild(table)
	f.addSubComponents({
		"Cash Equivalents": 40,
		"Treasury Bills": 60
		}, "Cash", "Assets", table)
	f.total("tb1", "Liabilities + Equity", {
		"Liabilities": "add",
		"Equity": "add"
	})
}



function createBudget(){

	const table = fa.statementGenerator(person, "tb2", true, null, true)
	const table2 = fd.statementGenerator(person, "tb3", true, personBudget, true)
	const stmt = document.querySelector('#stmt2')
	const stmt2 = document.querySelector('#stmt3')
	console.log(stmt)
	stmt.appendChild(table)
	stmt2.appendChild(table2)
	fa.total("tb2", "Net Income", {
		"Income": "add",
		"Expenses": "sub",
	})
	fd.total("tb3", "Net Income", {
		"Income": "add",
		"Expenses": "sub",
	}, true)
	fa.draganddrop("tb2")
	fd.draganddrop("tb3")
}



function slideshow() {

	const slides = []
	const slide1 = fb.statementGenerator(person, "tb5", false)
	const slide2 = fb.statementGenerator(BSdata2, 'tb6', false)
	slides.push(slide1)
	slides.push(slide2)
	// fb.rateCalculor(0.3, "Long term Debt", slide2, "Interest to pay")
	fb.createAutomaticSlideShow('#slideshow', 'auto', slides, 3000)
}

function onLoadFunctions() {
	f.formatValues();
	f.formatDifferences();
	f.checkDifferences("tb3", 10,"#1CAC78", "#fd5c63")
	f.addLink("Total Income");
	f.addLink("Total Expenses");
	// f.addLink("Cash");
	// f.checkLinkedValues("Total Income", "Total income does not match across statements");
}

function onChangeFunctions() {
	fa.editTotal("tb2", "Net Income", {
		"Income": "add",
		"Expenses": "sub",
	})
	fd.editTotal("tb3", "Net Income", {
		"Income": "add",
		"Expenses": "sub",
	})
	// f.editTotal("tb1", "Liabilities + Equity", {
	// 	"Liabilities": "add",
	// 	"Equity": "add",
	// })
	f.checkDifferences("tb3", 10,"#1CAC78", "#fd5c63")
	f.formatDifferences();
}




window.addEventListener("load", () =>{
	createBS();
	createBudget();
	slideshow()
	onLoadFunctions();
})

window.addEventListener("click", () =>{
	onChangeFunctions();
})