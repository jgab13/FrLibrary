//Sample data
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
function createBS(){
	
	const table = f.statementGenerator(BSdata, "tb1", true)
	f.draganddrop("tb1")
	const stmt = document.querySelector('#stmt')
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

	const table = f.statementGenerator(person, "tb2", true, null, true)
	const table2 = f.statementGenerator(person, "tb3", true, personBudget, true)
	const stmt = document.querySelector('#stmt2')
	const stmt2 = document.querySelector('#stmt3')
	stmt.appendChild(table)
	stmt2.appendChild(table2)
	f.total("tb2", "Net Income", {
		"Income": "add",
		"Expenses": "sub",
	})
	f.total("tb3", "Net Income", {
		"Income": "add",
		"Expenses": "sub",
	}, true)
	f.draganddrop("tb2")
	f.draganddrop("tb3")
}



function slideshow() {

	const slides = []
	const slide1 = f.statementGenerator(person, "tb5", false)
	const slide2 = f.statementGenerator(BSdata2, 'tb6', false)
	slides.push(slide1)
	slides.push(slide2)
	f.createAutomaticSlideShow('#slideshow', 'auto', slides, 3000)
}

function onLoadFunctions() {
	f.formatValues();
	f.formatDifferences();
	f.checkDifferences("tb3", 10,"#1CAC78", "#fd5c63")
	f.addLink("Total Income");
	f.addLink("Total Expenses");
}

function onChangeFunctions() {
	f.editTotal("tb2", "Net Income", {
		"Income": "add",
		"Expenses": "sub",
	})
	f.editTotal("tb3", "Net Income", {
		"Income": "add",
		"Expenses": "sub",
	}, true)
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