/* FR Library*/

function total(tblselect, label, operations, budget){
	const table = document.querySelector('#' + tblselect)
	const row = document.createElement('tr')
	const rowLabel = document.createElement('td')
	rowLabel.innerText = label
	rowLabel.className = 'label'
	row.appendChild(rowLabel)

	
	const oplen = Object.keys(operations).length
	console.log(oplen)
	let total = 0
	let totalbudg = 0
	for (let i = 0; i < oplen; i++){
		let operation = Object.keys(operations)[i]
		let selector = 'Total' + operation.replace(/ /g, '') + tblselect
		console.log(selector)
		const val = parseInt(document.querySelector('#' + selector).innerText)
		console.log("The value of the total is ")
		console.log(val)

		if (operations[operation] === 'add'){
			total += val
		} else {	
			total -= val
		}

		if (budget){
			let budgetselect = 'Total' + operation.replace(/ /g, '') + 'budget' +  tblselect
			const budg = parseInt(document.querySelector('#' + budgetselect).innerText)
			console.log(budg)

			if (operations[operation] === 'add'){
			totalbudg += budg
			} else {	
				totalbudg -= budg
			}
			}
	}
	const rowValue = document.createElement('td')
	rowValue.className = 'value Total'
	rowValue.innerText = total
	rowValue.setAttribute('id', label.replace(/ /g, '') + tblselect)
	row.appendChild(rowValue)
	if (budget){
		const rowBud = document.createElement('td')
		rowBud.className = 'value Total budget'
		rowBud.innerText = totalbudg
		rowBud.setAttribute('id', label.replace(/ /g, '')+ "budget" + tblselect)
		row.appendChild(rowBud)	

		const rowDiff = document.createElement('td')
		rowDiff.className = 'value Total budget'
		rowDiff.innerText = total - totalbudg
		rowDiff.setAttribute('id', label.replace(/ /g, '')+ "diff" + tblselect)
		row.appendChild(rowDiff)	

		const rowBudDiff = document.createElement('td')
		rowBudDiff.className = 'value Total budget'
		rowBudDiff.innerText = (total - totalbudg) / totalbudg
		rowBudDiff.setAttribute('id', label.replace(/ /g, '')+ "budgetdiff" + tblselect)
		row.appendChild(rowBudDiff)
	}
	

	

	table.appendChild(row)
}

function header(data, table, span) {
   const header = data["header"]
   console.log(header)
   const headerlength = Object.keys(header).length
   console.log(headerlength)
   for (let i = 0; i < headerlength; i++){
      let key = Object.keys(header)[i]
      console.log(header[key])

      //Do the work of creating header nodes
      let tr = document.createElement('tr')
      let th = document.createElement('th')
      th.className = "header"
      th.setAttribute("colspan", span)
      th.innerText = header[key]
      tr.appendChild(th)
      table.appendChild(tr)
   }
}



function budgetHeader(table, span){
	const tr = document.createElement('tr')
	const td = document.createElement('td')
	td.className = 'subheader actual'
	td.setAttribute('colspan', 1)
	const button = document.createElement('button')
	button.onclick = function() {collapseBudget();}
	button.innerText = 'Hide'
	button.setAttribute('id', 'hidebutton')
	td.appendChild(button)
	tr.appendChild(td)

	const actual = document.createElement('td')
	actual.className = 'subheader actual'
	actual.setAttribute('colspan', 1)
	actual.innerText = 'Actual'
	tr.appendChild(actual)

	const budget = document.createElement('td')
	budget.className = 'subheader budget'
	budget.setAttribute('colspan', 1)
	budget.innerText = 'Budget'
	tr.appendChild(budget)

	const diff = document.createElement('td')
	diff.className = 'subheader budget'
	diff.setAttribute('colspan', 1)
	diff.innerText = 'Diff'
	tr.appendChild(diff)

	const percent = document.createElement('td')
	percent.className = 'subheader budget'
	percent.setAttribute('colspan', 1)
	percent.innerText = '% Diff'
	tr.appendChild(percent)

	table.appendChild(tr)
}

//data[label], budget[label] label, sub, table, 5
function sectionBudget(data, budget, label, sub, table, span){
	const tr = document.createElement('tr')
	const td = document.createElement('td')
	td.className = "subheader " + label
	td.setAttribute("colspan", span)
	td.innerText = label
	const button = document.createElement('button')
	button.setAttribute('type', 'button')
	const buttonlabel = 'button' + label.replace(/ /g, '')
	button.setAttribute('id', buttonlabel)
	button.innerText = 'Hide'
	button.onclick = function() {collapseRows(buttonlabel, label)}
	console.log(button)
	td.appendChild(button)
	tr.appendChild(td)

	table.appendChild(tr)

	let subactual = 0
	let subbudget = 0

	const length = Object.keys(data).length
	for (let i =0; i < length; i++){
		const tbrow = document.createElement('tr')
      	//sublabel for name of row
		const tdlabel = document.createElement('td')
		tdlabel.className = 'label'
		let sublabel = Object.keys(data)[i]
		tdlabel.innerText = sublabel

		//actual value for row
		const tdvalue = document.createElement('td')
		tdvalue.className = "value " + label
		tdvalue.setAttribute('id', sublabel.replace(/ /g, '') + table.getAttribute('id'))
		let value = data[sublabel]
		tdvalue.innerText = value
		//track subtotal
		subactual += value

		//budget value for row
		const tdbudget = document.createElement('td')
		tdbudget.className = "value " + label + " budget"
		tdbudget.setAttribute('id', sublabel.replace(/ /g, '') +"budget" + table.getAttribute('id'))
		let budg = budget[sublabel]
		tdbudget.innerText = budg
		//track subtotal
		subbudget += budg

		//diff value for row
		const tddiff = document.createElement('td')
		tddiff.className = "value " + label + " budget"
		tddiff.setAttribute('id', sublabel.replace(/ /g, '')+ "diff" + table.getAttribute('id'))
		let diff = value - budg
		tddiff.innerText = diff

		//diff % value for row
		const tdperc = document.createElement('td')
		tdperc.className = "value " + label + " budget"
		tdperc.setAttribute('id', sublabel.replace(/ /g, '')+ "budgetdiff" + table.getAttribute('id'))
		let diffperc = diff / budg
		tdperc.innerText = diffperc

		//append to end of row
		tbrow.appendChild(tdlabel)
		tbrow.appendChild(tdvalue)
		tbrow.appendChild(tdbudget)
		tbrow.appendChild(tddiff)
		tbrow.appendChild(tdperc)
		table.appendChild(tbrow)
	}
	if (sub){
   	  const subrow = document.createElement('tr')
   	  const sublabel = document.createElement('td')
   	  sublabel.className = 'label'
   	  sublabel.innerText = 'Total ' + label 
   	  subrow.appendChild(sublabel)

   	  const subrowval = document.createElement('td')
   	  subrowval.className = "value " + label
   	  subrowval.setAttribute('id', sublabel.innerText.replace(/ /g, '') + table.getAttribute('id'))
   	  subrowval.innerText = subactual
   	  subrow.appendChild(subrowval)

   	  const subrowbudg = document.createElement('td')
   	  subrowbudg.className = "value " + label + " budget"
   	  subrowbudg.setAttribute('id', sublabel.innerText.replace(/ /g, '') + "budget" + table.getAttribute('id'))
   	  subrowbudg.innerText = subbudget
   	  subrow.appendChild(subrowbudg)

   	  const subrowdiff = document.createElement('td')
   	  subrowdiff.className = "value " + label + " budget"
   	  subrowdiff.setAttribute('id', sublabel.innerText.replace(/ /g, '') + "diff" + table.getAttribute('id'))
   	  subrowdiff.innerText = subactual - subbudget
   	  subrow.appendChild(subrowdiff)

   	  const subrowperc = document.createElement('td')
   	  subrowperc.className = "value " + label + " budget"
   	  subrowperc.setAttribute('id', sublabel.innerText.replace(/ /g, '') + "budgetdiff" + table.getAttribute('id'))
   	  subrowperc.innerText = (subactual - subbudget) / subbudget
   	  subrow.appendChild(subrowperc)

   	  table.appendChild(subrow)
   }
}

function section(data, label, sub, table, span){
   //Create the subheader label
   const tr = document.createElement('tr')
   const td = document.createElement('td')
   td.className = "subheader " + label
   td.setAttribute("colspan", span)
   td.innerText = label
   const button = document.createElement('button')
   button.setAttribute('type', 'button')
   const buttonlabel = 'button' + label.replace(/ /g, '')
   button.setAttribute('id', buttonlabel)
   button.innerText = 'Hide'
   button.onclick = function() {collapseRows(buttonlabel, label)}
   console.log(button)
   td.appendChild(button)
   tr.appendChild(td)

   table.appendChild(tr)

   //tally section subtotal
   let subtotal = 0

   console.log(data[label])
   const length = Object.keys(data).length
   console.log(length)
   for (let i = 0; i < length; i++){
      //row for the new label and value
      const tbrow = document.createElement('tr')
      //sublabel for name of row
      const tdlabel = document.createElement('td')
      tdlabel.className = 'label'
      let sublabel = Object.keys(data)[i]
      tdlabel.innerText = sublabel

      //value for row
      const tdvalue = document.createElement('td')
      tdvalue.className = "value " + label
      tdvalue.setAttribute('id', sublabel.replace(/ /g, '') + table.getAttribute('id'))
      let value = data[sublabel]
      tdvalue.innerText = value
      //track subtotal
      subtotal += value
      console.log(sublabel)
      console.log(data[sublabel])
      console.log("this is the subtotal")
      console.log(subtotal)
      
      //append to end of row
      tbrow.appendChild(tdlabel)
      tbrow.appendChild(tdvalue)
      table.appendChild(tbrow)
   }
   if (sub){
   	  const subrow = document.createElement('tr')
   	  const sublabel = document.createElement('td')
   	  sublabel.className = 'label'
   	  sublabel.innerText = 'Total ' + label 
   	  subrow.appendChild(sublabel)

   	  const subrowval = document.createElement('td')
   	  subrowval.className = "value " + label
   	  subrowval.setAttribute('id', sublabel.innerText.replace(/ /g, '') + table.getAttribute('id'))
   	  subrowval.innerText = subtotal
   	  subrow.appendChild(subrowval)
   	  table.appendChild(subrow)
   }
}


function statementGenerator(data, id, sub, budget, edit){
	//Use this to add a table.

	const table = document.createElement('table')
	table.setAttribute('id', id)

	//header components
	console.log("this is the budget argument")
	console.log(budget)
	if (edit === undefined){
		if (budget === undefined){
			header(data, table, 2)	
		} else {
			header(data, table, 5)
			budgetHeader(table, 5)
		}	
	} else {
		if (budget === undefined){
			header(data, table, 3)	
		} else {
			header(data, table, 7)
			budgetHeader(table, 7)
		}
	}
	
	const sections = Object.keys(data).length
	//for each subcomponent
	for (let j = 1; j < sections; j++){
      let label = Object.keys(data)[j]
      if (edit === undefined){
	      if (budget === undefined){
	      	section(data[label], label, sub, table, 2)	
	      } else {
	      	sectionBudget(data[label], budget[label], label, sub, table, 5)
	      }	
      } else {
      	if (budget === undefined){
	      	sectionEdit(data[label], label, sub, table, 3)	
	      } else {
	      	sectionBudgetEdit(data[label], budget[label], label, sub, table, 7)
	      }
      }
	}
	return table
}




function collapseBudget () {
   	console.log("button clicked - hide")
   	const tobehidden = document.querySelectorAll(".budget")
   	for (let i = 0; i < tobehidden.length; i++){
   		tobehidden[i].classList.add("hidden");
   	}
   	const hide = document.querySelector('#hidebutton')
   	hide.onclick = function() {expandBudget();};
   	// hide.onclick = function() {expandBudget()}
   	hide.innerHTML = "show"
   	console.log(hide)
}

   //Not 100% sure why this isn't working
function expandBudget () {
   	console.log("button clicked - show")
   	
   	const tobehidden = document.querySelectorAll(".budget")
   	for (let i = 0; i < tobehidden.length; i++){
   		tobehidden[i].classList.remove("hidden");
   	}
   	const show = document.querySelector('#hidebutton')
   	show.onclick = function() {collapseBudget();};
   	// show.onclick = function() {collapseBudget();}
   	show.innerHTML = "hide"
   	show.setAttribute("id", 'hidebutton')
   	console.log(show)
}

function collapseRows(id, key) {
   	const tobehidden = document.querySelectorAll('.value.' + key)
   	for (let i = 0; i < tobehidden.length; i++){
   		tobehidden[i].parentElement.classList.add("hidden");
   	}
   	console.log(key)
   	const button = document.querySelector('#' + id)
   	console.log(button)
   	button.innerHTML = 'show'
   	button.onclick = function() {expandRows(id, key);}
}

function expandRows(id, key) {
   	const tobehidden = document.querySelectorAll('.value.' + key)
   	for (let i = 0; i < tobehidden.length; i++){
   		tobehidden[i].parentElement.classList.remove("hidden");
   	}
   	console.log(key)
   	const button = document.querySelector('#' + id)
   	console.log(button)
   	button.innerHTML = 'hide'
   	button.onclick = function() {collapseRows(id, key)}
}

function formatValues () {
	let x = document.querySelectorAll(".value");
	let len = x.length; 
    for (let i = 0; i < len; i++) { 
        let num = Number(x[i].innerHTML) 
                  .toLocaleString('en'); 
        x[i].innerHTML = num; 
        x[i].classList.add("currSign"); 
 	}
 }

function formatDifferences(){
 	let y = document.querySelectorAll("[id*='budgetdiff']"); 
 	let len = y.length
    for (let i = 0; i < len; i++) { 
        let num = (parseFloat(y[i].innerHTML) * 100).toFixed(0) + "%"
        y[i].innerHTML = num; 
        y[i].classList.remove("currSign")
    } 
}

function checkDifferences(threshold, id, success, failure){
	const diffsToCheck = document.querySelectorAll("[id*=" + id + "]")
   	for (let i = 0; i < diffsToCheck.length; i++){
   		console.log(parseFloat(diffsToCheck[i].innerHTML))
   		if (parseFloat(diffsToCheck[i].innerHTML) > 0 && parseFloat(diffsToCheck[i].innerHTML) > threshold) {
   			diffsToCheck[i].style.color = "white";
   			diffsToCheck[i].style.backgroundColor = success;
   		} else if (parseFloat(diffsToCheck[i].innerHTML) < 0 && parseFloat(diffsToCheck[i].innerHTML) < -threshold){
   			diffsToCheck[i].style.color = "white";
   			diffsToCheck[i].style.backgroundColor = failure;
   		}
   	}
}

function addLink(label){
	const formatLabel = label.replace(/ /g, '')
	console.log(formatLabel)
	const elements = document.querySelectorAll("[id*=" + formatLabel + "]")
	console.log("ELements to link")
	console.log(elements)
	for (let i=0; i < elements.length - 1; i++){
		let elementToModify = elements[i].parentElement.querySelector('.label')
		elementToModify.innerHTML = "<a href=#" + elements[i + 1].getAttribute('id') + ">" + elementToModify.innerText
	}
	const elementToModify = elements[elements.length - 1].parentElement.querySelector('.label')
	elementToModify.innerHTML = "<a href=#" + elements[0].getAttribute('id') + ">" + elementToModify.innerText
}

function checkLinkedValues(label, message){
	const formatLabel = label.replace(/ /g, '')
	console.log(formatLabel)
	const diffsToCheck = document.querySelectorAll("[id*=" + formatLabel + "]")
	console.log(diffsToCheck)
	let val = null
	let condition = false;
	for (let i = 0; i < diffsToCheck.length; i++){
		if (val === null){
			val = parseFloat(diffsToCheck[i].innerHTML)
			console.log(val)
		} else {
			if (parseFloat(diffsToCheck[i].innerHTML) !== val) {
				condition = true
				break;
			} 
		}
	}
	if (condition){
		for (let j = 0; j < diffsToCheck.length; j++){
			if (!diffsToCheck[j].getAttribute('id').includes('diff') && !diffsToCheck[j].getAttribute('id').includes('budget')){
				let parent = diffsToCheck[j].parentElement
				console.log(parent)
				let container = document.createElement('div')
				container.style.color = 'red'
				container.style.float = 'right'
				let stmt = document.createTextNode(message)
				container.append(stmt)
				parent.querySelector('.label').append(container)	
			}
		}	
	}
}



let index = 0
function nextSlide (key) {
	let slides = document.querySelectorAll('.' + key)
	console.log(slides.length)
	for (let i = 0; i < slides.length; i++){
		slides[i].style.display = 'none';
	}
	index++
	index = index % slides.length
	console.log(index)
	slides[index].style.removeProperty('display')
	
	
}

function prevSlide (key) {
	let slides = document.querySelectorAll('.' + key)
	console.log(slides.length)
	for (let i = 0; i < slides.length; i++){
		slides[i].style.display = 'none';
	}
	index--;
	index = index < 0 ? slides.length - 1 : index % slides.length
	console.log(index)
	slides[index].style.removeProperty('display')
	
}

function createAutomaticSlideShow(root, selector, slides, speed){
	const anchor = document.querySelector(root);
	const container = document.createElement('div')
	container.className = 'slideshow'
	anchor.appendChild(container)
	console.log("this part worked")
	for (let i =0; i < slides.length; i++){
		slides[i].className = selector
		if (i !== 0){
			slides[i].style.display = 'none'
		}
		container.appendChild(slides[i])
	}
	setInterval(function(){
		console.log("Is this part working?")
		nextSlide(selector);}
		, speed);
}

function createManualSlideShow(root, selector, slides){
	const anchor = document.querySelector(root);
	const container = document.createElement('div')
	container.className = 'slideshow'
	anchor.appendChild(container)
	console.log("this part worked")
	for (let i =0; i < slides.length; i++){
		slides[i].className = selector
		if (i !== 0){
			slides[i].style.display = 'none'
		}
		container.appendChild(slides[i])
	}
	const next = document.createElement('button')
	next.innerText = 'Next'
	next.onclick = function() {nextSlide(selector);}
	const prev = document.createElement('button')
	prev.innerText = 'Previous'
	prev.onclick = function () {prevSlide(selector);}
	container.appendChild(next)
	container.appendChild(prev)
}
	


	
	 




// /* fr library js*/
// 'use strict';
// const log = console.log

// //Requirements for today:
// //	validation for each report
// //	totalling

// class financialReport {
// 	constructor(header){
// 		this.header = header
// 	}

// 	generateHeader(selector, report){
// 		//root selector
// 		//create a container
// 		//create 3 rows
// 		//add id for each row
// 		//height, color, font, etc.
// 		const root = document.querySelector(selector)
// 		//create container
// 		const header = document.createElement('div')
// 		header.className = 'container bckgrnd';
// 		// header.setAttribute('id', 'header')


// 		const header_row = document.createElement('div')
// 		const reportName = document.createTextNode(this.header.name)
// 		// header_row.className = 'header-row';
// 		header_row.className = 'row head'
// 		header_row.appendChild(reportName)

// 		const header_row2 = document.createElement('div')
// 		const reportTitle = document.createTextNode(report)
// 		// header_row2.className = 'header-row';
// 		header_row2.className = 'row head'
// 		header_row2.appendChild(reportTitle)

// 		const header_row3 = document.createElement('div')
// 		const reportYear = document.createTextNode(this.header.year)
// 		// header_row3.className = 'header-row';
// 		header_row3.className = 'row head'
// 		header_row3.appendChild(reportYear)

// 		header.appendChild(header_row)
// 		header.appendChild(header_row2)
// 		header.appendChild(header_row3)
// 		root.appendChild(header)
// 	}
// }

// class balanceSheet extends financialReport{
// 	constructor(header, data){
// 		super(header);
// 		this.type = 'bs' //used to flag
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
// 		generateFillableSection(root, this.assetSize, this.assets, "Assets", subtotal, this.type)
// 		generateFillableSection(root, this.liabilitySize, this.liabilities, "Liabilities", subtotal, this.type)
// 		generateFillableSection(root, this.equitySize, this.equity, "Equity", subtotal, this.type)
// 		if (subtotal) {
// 			generateTotal(root, "Total Libailities and Equity", calculateTotal(this.type))
// 			validateTotal(subtotal, this.type)
// 		}
// 	}

// 	generateFormBody(selector, subtotal, edit){
// 		const root = document.querySelector(selector)
// 		root.className = 'statement'
// 		generateStatementSection(root, this.assetSize, this.assets, "Assets", subtotal, edit, this.type)
// 		generateStatementSection(root, this.liabilitySize, this.liabilities, "Liabilities", subtotal, edit, this.type)
// 		generateStatementSection(root, this.equitySize, this.equity, "Equity", subtotal, edit, this.type)
// 		if (subtotal) {
// 			generateTotal(root, "Total Libailities and Equity", calculateTotal(this.type))
// 			validateTotal(subtotal, this.type)

// 		}
// 	}

// 	lineItemDetail(data, label){
// 		const root = document.querySelector('#' + label.replace(/ /g, ''))
// 		addCollapsableDetails(root, data, label)
// 	}
// }

// class incomeStatement extends financialReport{
// 	constructor(header, data){
// 		super(header);
// 		this.type = 'is' //used to flag
// 		this.data = data;
// 		this.income = data["income"];
// 		this.expenses = data["expenses"];
// 		this.incomeSize = Object.keys(data["income"]).length;
// 		this.expenseSize = Object.keys(data["expenses"]).length;
// 	}

// 	generateFillableBody(selector, subtotal) {
// 		const root = document.querySelector(selector)
// 		root.className = 'statement'
// 		generateFillableSection(root, this.incomeSize, this.income, "Income", subtotal, this.type)
// 		generateFillableSection(root, this.expenseSize, this.expenses, "Expenses", subtotal, this.type)
// 		//generateIndividualRow(root, this.beg, "Net Income", subtotal, true)
// 		if (subtotal) {
// 			generateTotal(root, "Net Income", calculateTotal(this.type))
// 			validateTotal(subtotal, this.type)
// 		}
// 	}

// 	generateFormBody(selector, subtotal, edit){
// 		const root = document.querySelector(selector)
// 		root.className = 'statement'
// 		generateStatementSection(root, this.incomeSize, this.income, "Income", subtotal, edit, this.type)
// 		generateStatementSection(root, this.expenseSize, this.expenses, "Expenses", subtotal, edit, this.type)
// 		if (subtotal) {
// 			generateTotal(root, "Net Income", calculateTotal(this.type))
// 			validateTotal(subtotal, this.type)
// 		}
// 	}
// }

// class cashFlowStatement extends financialReport{
// 	constructor(header, data){
// 		super(header);
// 		this.type = 'cf' //used to flag
// 		this.data = data;
// 		this.operations = data["operations"];
// 		this.investing = data["investing"];
// 		this.financing = data["financing"];
// 		this.beg = data["beg"];
// 		this.end = data["end"];
// 		this.operationSize = Object.keys(data["operations"]).length;
// 		this.investSize = Object.keys(data["investing"]).length;
// 		this.financeSize = Object.keys(data["financing"]).length;
// 	}

// 	generateFillableBody(selector, subtotal) {
// 		const root = document.querySelector(selector)
// 		root.className = 'statement'
// 		generateIndividualRow(root, this.beg, "Beginning Balance", subtotal, true)
// 		generateFillableSection(root, this.operationSize, this.operations, "Operating Cash flow", subtotal, true, this.type)
// 		generateFillableSection(root, this.investSize, this.investing, "Investing Cash flow", subtotal, true, this.type)
// 		generateFillableSection(root, this.financeSize, this.financing, "Financing Cash flow", subtotal, true, this.type)
// 		generateIndividualRow(root, this.end, "Ending Balance", subtotal, true)
// 		validateTotal(subtotal, this.type)
// 	}

// 	generateFormBody(selector, subtotal, edit){
// 		const root = document.querySelector(selector)
// 		root.className = 'statement'
// 		generateIndividualRow(root, this.beg, "Beginning Balance", subtotal, edit)
// 		generateStatementSection(root, this.operationSize, this.operations, "Operating Cash flow", subtotal, edit, this.type)
// 		generateStatementSection(root, this.investingSize, this.investing, "Investing Cash flow", subtotal, edit, this.type)
// 		generateStatementSection(root, this.financeSize, this.financing, "Financing Cash flow", subtotal, edit, this.type)
// 		generateIndividualRow(root, this.end, "Ending Balance", subtotal, edit)
// 		validateTotal(subtotal, this.type)
// 	}
// }

// class equityStatement extends financialReport{
// 	constructor(header, data){
// 		super(header);
// 		this.type = 'es' //used to flag
// 		this.data = data;
// 		this.activity = data["activity"];
// 		this.beg = data["beg"];
// 		this.end = data["end"];
// 		this.activitySize = Object.keys(data["activity"]).length;
// 	}

// 	generateFillableBody(selector, subtotal) {
// 		const root = document.querySelector(selector)
// 		generateIndividualRow(root, this.beg, "Beginning Balance", subtotal, true)
// 		generateFillableSection(root, this.activitySize, this.activity, "Current Year Activity", subtotal, this.type)
// 		generateIndividualRow(root, this.end, "Ending Balance", subtotal, true)
// 		validateTotal(subtotal, this.type)

// 	}

// 	generateFormBody(selector, subtotal, edit){
// 		const root = document.querySelector(selector)
// 		generateIndividualRow(root, this.beg, "Beginning Balance", subtotal, edit)
// 		generateStatementSection(root, this.activitySize, this.activity, "Current Year Activity", subtotal, edit, this.type)
// 		generateIndividualRow(root, this.end, "Ending Balance", subtotal, edit)
// 		validateTotal(subtotal, this.type)
// 		// generateStatementSection(root, this.earnSize, this.earnings, "Retained Earnings", subtotal, edit)
// 	}

// 	addBudgetData(budgetData){
// 		updateFormStmtHeader()
// 		updateFormBody(this.beg, budgetData["beg"])
// 		updateFormBody(this.activity, budgetData["activity"])
// 		updateFormBody(this.end, budgetData["end"])
// 	}
// }

// function collapseRows(nodes, root){
// 	for (let i = 0; i < nodes.length; i++){
// 		if (nodes[i] !== root){
// 			if (nodes[i].className.includes('collapse')){
// 				nodes[i].className = nodes[i].className.replace('collapse ', '')
// 			} else {
// 				nodes[i].className = 'collapse ' + nodes[i].className
// 			}	
// 		}
		
// 	}
// }

// function addCollapsableDetails(root, data, label){
// 	log(data)
// 	log(label)
// 	log(root)
// 	const target = root.parentElement
// 	log(target)
// 	//Add toggle button
// 	const togDiv = document.createElement('div')
// 	togDiv.className = 'col-sm-1'
// 	const toggle = document.createElement('button')
// 	toggle.className = 'btn btn-success'
// 	toggle.innerText = 'Toggle'
// 	toggle.onclick = function() {collapseRows(target.parentElement.childNodes, target)}
// 	togDiv.appendChild(toggle)
// 	target.appendChild(togDiv)

// 	log(target.parentElement)
// 	const parentTarget = target.parentElement
// 	log(target.parentElement.childNodes)
// 	let node = null
// 	let location = -1
// 	for (let i = 1; i < target.parentElement.childNodes.length; i++){	
// 		if (target.parentElement.childNodes[i].querySelector('#' + label.replace(/ /g, '')) !== null){

// 			location = i - 1
// 		}
// 	}
// 	log(location)

// 	const newContainer = document.createElement('div')
// 	newContainer.className = 'container sub'
// 	parentTarget.removeChild(target)
// 	newContainer.appendChild(target)
	

// 	for (let j = 0; j < Object.keys(data[label]).length; j++){
// 		let tableRow = document.createElement('div')
// 		tableRow.className = 'row stmt'

// 		//create the label for the table row (ex. cash)
// 		let tableRowlabel = document.createElement('div')
// 		tableRowlabel.className = 'col-sm-10'
// 		let tableRowKey = Object.keys(data[label])[j];
// 		let tableRowName = document.createTextNode(tableRowKey)
// 		tableRowlabel.appendChild(tableRowName)
// 		//add col to the tableRow
// 		tableRow.appendChild(tableRowlabel)

// 		//create the value of the table row
// 		let tableRowElementVal = document.createElement('div')
// 		tableRowElementVal.className = 'col-sm-1'
// 		tableRowElementVal.setAttribute("id", tableRowKey.replace(/ /g,''))
// 		let tableRowVal = document.createTextNode(data[label][tableRowKey])
// 		tableRowElementVal.appendChild(tableRowVal)
// 		//add col to the tableRow
// 		tableRow.appendChild(tableRowElementVal)
// 		newContainer.appendChild(tableRow)
// 	}

// 	parentTarget.insertBefore(newContainer, parentTarget.childNodes[location + 1])


// 	//add data to container after the element
// 	//Need to find the position of the label to insert before or append to the end depending
// 	//on location


// }

// function updateFormStmtHeader(){
// 	const root = document.querySelectorAll('.container.stbck')[0]
// 	const row_header = document.createElement('div')
// 	row_header.className = 'row stmt'

// 	const div1 = document.createElement('div')
// 	div1.className = 'col-sm-9'
	
// 	const div2 = document.createElement('div')
// 	div2.className = 'col-sm-1'
// 	div2.appendChild(document.createTextNode('Actual'))

// 	const div3 = document.createElement('div')
// 	div3.className = 'col-sm-1'
// 	div3.appendChild(document.createTextNode('Budget'))

// 	const div4 = document.createElement('div')
// 	div4.className = 'col-sm-1'
// 	div4.appendChild(document.createTextNode('Diff'))

// 	row_header.appendChild(div1)
// 	row_header.appendChild(div2)
// 	row_header.appendChild(div3)
// 	row_header.appendChild(div4)

// 	root.insertBefore(row_header, root.childNodes[0])
// }

// function updateFormBody(data, budget){
// 	const len = Object.keys(budget).length
// 	for (let i = 0; i < len; i++){
// 		let tableRowKey = Object.keys(budget)[i].replace(/ /g,'')
// 		let selector = document.querySelector("#" + tableRowKey)
// 		let parent = selector.parentElement
// 		let value = parseInt(selector.innerText)
// 		let budgetValue = parseInt(budget[Object.keys(budget)[i]])
// 		let difference = value - budgetValue

// 		let budgetDiv = document.createElement('div')
// 		budgetDiv.className = 'col-sm-1'
// 		budgetDiv.appendChild(document.createTextNode(budgetValue))

// 		let diffDiv = document.createElement('div')
// 		diffDiv.className = 'col-sm-1'
// 		diffDiv.appendChild(document.createTextNode(difference))

// 		parent.childNodes[0].className = parent.childNodes[0].className.includes('individual') ? 'col-sm-9 individual' : 'col-sm-9'

// 		parent.appendChild(budgetDiv)
// 		parent.appendChild(diffDiv)

// 		log(selector.parentElement.childNodes)
// 		log(value)
// 		log(difference)
// 		log(selector)
// 		log(selector.parentElement)

// 	}

// }

// function generateStatementSection(root, size, type, label, subtotal, edit, flag){
// 	//this creates the shell container and the label row
// 	const tableBody = document.createElement('div')
// 	const rowHeader = document.createElement('div')
// 	const rowHeaderName = document.createTextNode(label)
// 	tableBody.className = 'container stbck'
// 	// rowHeader.className = 'row-header'
// 	rowHeader.className = 'row stmt-header'
// 	rowHeader.appendChild(rowHeaderName)
// 	tableBody.appendChild(rowHeader)

// 	//Now create a row with two columns for each things - 3 in other cases of a button
// 	//and append to the tablebody.
// 	// const elementCol = document.createElement('div')
// 	// elementCol.className = 'element-col'
// 	// const valCol = document.createElement('div')
// 	// valCol.className = 'val-cal'

// 	for (let i = 0; i < size; i++){
// 		//this is the table row - populate everything in here
// 		let tableRow = document.createElement('div')
// 		tableRow.className = 'row stmt'

// 		//create the label for the table row (ex. cash)
// 		let tableRowlabel = document.createElement('div')
// 		tableRowlabel.className = 'col-sm-10'
// 		let tableRowKey = Object.keys(type)[i];
// 		let tableRowName = document.createTextNode(tableRowKey)
// 		tableRowlabel.appendChild(tableRowName)
// 		//add col to the tableRow
// 		tableRow.appendChild(tableRowlabel)

		
// 		// tableRow.appendChild(tableRowName)
// 		// elementCol.appendChild(tableRowElement)

// 		//add edit button with a function
// 		//create the value of the table row
// 		let tableRowElementVal = document.createElement('div')
// 		tableRowElementVal.className = 'col-sm-1'
// 		tableRowElementVal.setAttribute("id", tableRowKey.replace(/ /g,''))
// 		let tableRowVal = document.createTextNode(type[tableRowKey])
// 		tableRowElementVal.appendChild(tableRowVal)
// 		//add col to the tableRow
// 		tableRow.appendChild(tableRowElementVal)

// 		//Add an edit button
// 		if (edit){
// 			let tableRowButton = document.createElement('div')
// 			tableRowButton.className = 'col-sm-1'
// 			let tableRowEditButton = document.createElement('button')
// 			// tableRowInputButton.onclick = function() {saveInputValue(tableRowKey, size, type)}
// 			tableRowEditButton.innerText = 'Edit'
// 			// tableRowEditButton.className = 'edit-button'
// 			tableRowEditButton.className = 'btn btn-success'
// 			tableRowEditButton.onclick = function() {editValue(tableRowKey, size, type, flag)}
// 			// tableRowElementVal.className = 'edit-value'
// 			tableRowButton.appendChild(tableRowEditButton)	
// 			tableRow.appendChild(tableRowButton)			
// 		}
// 		// valCol.appendChild(tableRowElementVal)
// 		tableBody.appendChild(tableRow)

// 	}
// 	if (subtotal){
// 		const tableRowSubtotal = document.createElement('div')
// 		tableRowSubtotal.className = 'row stmt'
// 		const tableRowSubCol = document.createElement('div')
// 		tableRowSubCol.className = 'col-sm-10'
// 		const tableRowName = document.createTextNode('Total ' + label)
// 		tableRowSubCol.appendChild(tableRowName)

// 		// tableRowSubtotal.className = 'row-name'
		
// 		tableRowSubtotal.appendChild(tableRowSubCol)
		

// 		const tableRowSubtotalVal = document.createElement('div')
// 		tableRowSubtotalVal.className = 'col-sm-1'
// 		tableRowSubtotalVal.setAttribute("id", 'Total' + label)
// 		const tableRowVal = document.createTextNode(subtotalCalculator(size, type))
// 		// tableRowSubtotalVal.className = 'row-value'
// 		tableRowSubtotalVal.appendChild(tableRowVal)
// 		tableRowSubtotal.appendChild(tableRowSubtotalVal)	

// 		tableBody.appendChild(tableRowSubtotal)
// 	}
// 	// tableBody.appendChild(elementCol)
// 	// tableBody.appendChild(valCol)
// 	root.appendChild(tableBody)
// }

// function generateFillableSection(root, size, type, label, subtotal, flag){
// 	console.log(size)
// 	console.log(type)
// 	const tableBody = document.createElement('div')
// 	const rowHeader = document.createElement('div')
// 	const rowHeaderName = document.createTextNode(label)
// 	tableBody.className = 'container stbck'
// 	// rowHeader.className = 'row-header'
// 	rowHeader.className = 'row stmt-header'
// 	rowHeader.appendChild(rowHeaderName)
// 	tableBody.appendChild(rowHeader)

// 	// const tableBody = document.createElement('div')
// 	// const rowHeader = document.createElement('div')
// 	// const rowHeaderName = document.createTextNode(label)
// 	// rowHeader.className = 'row-header'
// 	// tableBody.className = 'container'
// 	// rowHeader.appendChild(rowHeaderName)
// 	// tableBody.appendChild(rowHeader)

// 	// const elementCol = document.createElement('div')
// 	// elementCol.className = 'element-col'
// 	// const valCol = document.createElement('div')
// 	// valCol.className = 'val-cal'
// 	// log(size)
// 	// log(type)
// 	for (let i = 0; i < size; i++){
// 		//this is the table row - populate everything in here
// 		let tableRow = document.createElement('div')
// 		tableRow.className = 'row stmt'

// 		//create the label for the table row (ex. cash)
// 		let tableRowlabel = document.createElement('div')
// 		tableRowlabel.className = 'col-sm-10'
// 		let tableRowKey = Object.keys(type)[i];
// 		let tableRowName = document.createTextNode(tableRowKey)
// 		console.log(tableRowKey)
// 		tableRowlabel.appendChild(tableRowName)
// 		//add col to the tableRow
// 		tableRow.appendChild(tableRowlabel)

// 		// log(i)
// 		// let tableRowElement = document.createElement('div')
// 		// let tableRowKey = Object.keys(type)[i];
// 		// log(tableRowKey)
// 		// let tableRowName = document.createTextNode(tableRowKey)
// 		// tableRowElement.className = 'row-name'
// 		// tableRowElement.appendChild(tableRowName)
// 		// elementCol.appendChild(tableRowElement)

// 		let tableRowInputVal = document.createElement('div')
// 		tableRowInputVal.className = 'col-sm-1'
// 		let tableRowInput = document.createElement('input')
// 		tableRowInput.setAttribute("value", "")
// 		tableRowInput.setAttribute("placeholder", type[tableRowKey])
// 		tableRowInput.setAttribute("type", "text")
// 		tableRowInput.setAttribute("id", tableRowKey.replace(/ /g,''))
// 		tableRowInput.className = 'input'
// 		tableRowInputVal.appendChild(tableRowInput)
// 		tableRow.appendChild(tableRowInputVal)


// 		// let tableRowInput = document.createElement('input')
// 		// tableRowInput.setAttribute("value", "")
// 		// tableRowInput.setAttribute("placeholder", type[tableRowKey])
// 		// tableRowInput.setAttribute("type", "text")
// 		// tableRowInput.setAttribute("id", tableRowKey.replace(/ /g,''))
// 		let tableRowButtonVal = document.createElement('div')
// 		tableRowButtonVal.className = 'col-sm-1'
// 		let tableRowInputButton = document.createElement('button')
// 		tableRowInputButton.onclick = function() {saveInputValue(tableRowKey, size, type, flag)}
// 		tableRowInputButton.innerText = 'Save'
// 		tableRowInputButton.className = 'btn btn-success'
// 		// tableRowElementVal.className = 'input-row'
// 		// tableRowElementVal.appendChild(tableRowInput)
// 		// tableRowElementVal.appendChild(tableRowInputButton)
// 		// valCol.appendChild(tableRowElementVal)
// 		tableRowButtonVal.appendChild(tableRowInputButton)
// 		tableRow.appendChild(tableRowButtonVal)
// 		tableBody.appendChild(tableRow)
// 	}
// 	if (subtotal){
// 		// const tableRowSubtotal = document.createElement('div')
// 		// let tableRowName = document.createTextNode('Total ' + label)
// 		// tableRowSubtotal.className = 'row-name'
// 		// tableRowSubtotal.appendChild(tableRowName)
// 		// elementCol.appendChild(tableRowSubtotal)

// 		// let tableRowSubtotalVal = document.createElement('div')
// 		// let tableRowVal = document.createTextNode(subtotalCalculator(size, type))
// 		// tableRowSubtotalVal.className = 'row-value'
// 		// tableRowSubtotalVal.setAttribute("id", 'Total' + label)
// 		// tableRowSubtotalVal.appendChild(tableRowVal)
// 		// valCol.appendChild(tableRowSubtotalVal)	
// 		const tableRowSubtotal = document.createElement('div')
// 		tableRowSubtotal.className = 'row stmt'
// 		const tableRowSubCol = document.createElement('div')
// 		tableRowSubCol.className = 'col-sm-10'
// 		const tableRowName = document.createTextNode('Total ' + label)
// 		tableRowSubCol.appendChild(tableRowName)

// 		// tableRowSubtotal.className = 'row-name'
		
// 		tableRowSubtotal.appendChild(tableRowSubCol)
		

// 		const tableRowSubtotalVal = document.createElement('div')
// 		tableRowSubtotalVal.className = 'col-sm-1'
// 		tableRowSubtotalVal.setAttribute("id", 'Total' + label.replace(/ /g,''))
// 		const tableRowVal = document.createTextNode(subtotalCalculator(size, type))
// 		// tableRowSubtotalVal.className = 'row-value'
// 		tableRowSubtotalVal.appendChild(tableRowVal)
// 		tableRowSubtotal.appendChild(tableRowSubtotalVal)	

// 		tableBody.appendChild(tableRowSubtotal)
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
// 	// tableBody.appendChild(elementCol)
// 	// tableBody.appendChild(valCol)
// 	root.appendChild(tableBody)
// }

// function editValue(key, size, type, flag) {
// 	//need an input box, save button, placeholder should be the existing value
// 	log(key)
// 	log(size)
// 	log(type)
// 	const ele = document.querySelector('#' + key.replace(/ /g,''))
// 	log(ele)

// 	const parent = ele.parentElement //This is the row
// 	log(parent)
	
// 	const value = parseInt(ele.innerText) //value to set as placeholder
// 	ele.innerText = '' //removes innerText of the element - replace this with an input field
// 	// ele.removeChild(child)
// 	//change ele className to input-row and remove id
// 	// ele.className = 'input-row'
// 	// ele.removeAttribute('id')
// 	//append input placeholder = value, set id
// 	let tableRowInput = document.createElement('input')
// 	tableRowInput.setAttribute("value", "")
// 	tableRowInput.setAttribute("placeholder", value)
// 	tableRowInput.setAttribute("type", "text")
// 	tableRowInput.setAttribute("id", key.replace(/ /g,''))
// 	tableRowInput.className = 'input'
// 	ele.appendChild(tableRowInput) // this adds the new input into the element div.

// 	//Now just change the button instead of replacing it
// 	const tableRowInputButton = parent.querySelector('button')
// 	tableRowInputButton.onclick = function() {saveInputValue(key, size, type, flag)}
// 	tableRowInputButton.innerText = 'Save'
// 	// tableRowInputButton.className = 'input-button'
// 	// ele.appendChild(tableRowInput)
// 	// ele.appendChild(tableRowInputButton)
// 	//append button - class input-button, innerText = Save

// }

// function saveInputValue(key, size, type, flag) {
// 	log(key)
// 	log(size)
// 	log(type)
// 	const ele = flag ? document.querySelector('#' + key.replace(/ /g,'')) :  document.querySelector('#' + key.replace(/ /g,'')).querySelector('input')
// 	const button = ele.parentElement.parentElement.querySelector('button')
// 	log(button)
// 	const value = ele.value
// 	const placeholder = ele.placeholder
// 	log(placeholder)
// 	log(ele)
// 	log(ele.parentElement)
// 	log(ele.parentElement.parentElement.parentElement)
// 	log (value)
// 	log(value === '')
// 	log('this is the type')
// 	log(type)

// 	//first save the old value of the row
// 	const oldVal = type[key]
	
// 	//then modify type to the new value
// 	type[key] = parseInt(value === '' ? placeholder : value)
// 	log(type[key])

// 	//then recalculate the subtotal and display it
// 	const subtotal = subtotalCalculator(size, type)
// 	log(subtotal)
// 	//Update subtotal
// 	ele.parentElement.parentElement.parentElement.querySelectorAll("[id^='Total']")[0].innerText = subtotal
// 	//then calculate if this violates the assets + equity = liabilities
// 	//then display a warning in red if that's the case at the bottom of the total 
// 	// const totals = document.querySelectorAll("[id^='Total']");
// 	//this is just for balance sheet - what about the income statement, cash flow statement or equity statement
// 	// log('Assets are ' + parseInt(totals[0].innerText))
// 	// log('Liabilities are ' + parseInt(totals[1].innerText))
// 	// log('Equity is ' + parseInt(totals[2].innerText))
// 	// const a = parseInt(totals[0].innerText)
// 	// const b = parseInt(totals[2].innerText)
// 	// const c = parseInt(totals[1].innerText)
// 	// log(a)
// 	// log(b)
// 	// log(c)
// 	// log(a - b !== c)
	

// 	//Update the row and make changes
// 	//replace the row with a div with a value equal to the the new value
// 	const parent = ele.parentElement
// 	log(parent)
// 	parent.removeChild(ele) //removes the input
// 	let tableRowVal = document.createTextNode(value === '' ? placeholder : value)
// 	parent.appendChild(tableRowVal)
// 	// parent.setAttribute('id', key.replace(/ /g, ''))
// 	// if (flag){
// 	// 	log('The flag value has been select.')
// 	// 		
// 	// }
	

// 	// const rowToAdd = ele.parentElement
// 	// const buttonToRemove = ele.parentElement.querySelector('button')
// 	// const inputToRemove = ele.parentElement.querySelector('input')

// 	// rowToAdd.removeChild(buttonToRemove)
// 	// rowToAdd.removeChild(inputToRemove)
// 	// rowToAdd.className = 'row-value'

// 	// let tableRowElementVal = document.createElement('div')
// 	// let tableRowVal = document.createTextNode(value === '' ? placeholder : value)
// 	//add an edit button
// 	// let tableRowEditButton = document.createElement('button')
// 	// tableRowInputButton.onclick = function() {saveInputValue(tableRowKey, size, type)}
// 	// tableRowEditButton.innerText = 'Edit'
// 	// tableRowEditButton.onclick = function() {editValue(key, size, type)}
// 	button.innerText = 'Edit'
// 	button.onclick = function() {editValue(key, size, type, flag)}
// 	// tableRowEditButton.className = 'edit-button'
// 	// tableRowElementVal.className = 'edit-value'
// 	// rowToAdd.style.padding = '14.3px'
// 	// rowToAdd.setAttribute('id', key.replace(/ /g, ''))
// 	// tableRowElementVal.appendChild(tableRowEditButton)

// 	// tableRowElementVal.appendChild(tableRowVal)
// 	// rowToAdd.appendChild(tableRowElementVal)
// 	// if ((a - b) !== c) {
// 	// 	alert('Assets must equal Equity + liabilities')
// 	// }
// }

// function generateTotal(root, label, value){
// 	//this creates the shell container and the label row
// 	const tableBody = document.createElement('div')
// 	const rowHeader = document.createElement('div')
// 	tableBody.className = 'container stbck'
// 	// rowHeader.className = 'row-header'
// 	rowHeader.className = 'row stmt-header'
// 	const tableRowlabel = document.createElement('div')
// 	// tableRowlabel.setAttribute("id", tableRowKey.replace(/ /g,''))
// 	tableRowlabel.className = 'col-sm-10 individual'
// 	const rowHeaderName = document.createTextNode(label)
// 	tableRowlabel.appendChild(rowHeaderName)
// 	rowHeader.appendChild(tableRowlabel)
	
// 	const tableRowElementVal = document.createElement('div')
// 	tableRowElementVal.className = 'col-sm-1'
	
// 	tableRowElementVal.setAttribute("id", label.replace(/ /g,''))
// 	const tableRowVal = document.createTextNode(value)
// 	tableRowElementVal.appendChild(tableRowVal)
// 	rowHeader.appendChild(tableRowElementVal)
	
// 	tableBody.appendChild(rowHeader)
// 	root.appendChild(tableBody)
// }

// function generateIndividualRow(root, type, label, subtotal, edit){
// 	//this creates the shell container and the label row
// 	const tableBody = document.createElement('div')
// 	const rowHeader = document.createElement('div')
// 	tableBody.className = 'container stbck'
// 	// rowHeader.className = 'row-header'
// 	rowHeader.className = 'row stmt-header'
// 	const tableRowKey = Object.keys(type)[0];
// 	const tableRowlabel = document.createElement('div')
// 	// tableRowlabel.setAttribute("id", tableRowKey.replace(/ /g,''))
// 	tableRowlabel.className = 'col-sm-10 individual'
// 	const rowHeaderName = document.createTextNode(label)
// 	tableRowlabel.appendChild(rowHeaderName)
// 	rowHeader.appendChild(tableRowlabel)
	
// 	const tableRowElementVal = document.createElement('div')
// 	tableRowElementVal.className = 'col-sm-1'
	
// 	tableRowElementVal.setAttribute("id", tableRowKey.replace(/ /g,''))
// 	const tableRowVal = document.createTextNode(type[tableRowKey])
// 	tableRowElementVal.appendChild(tableRowVal)
// 	rowHeader.appendChild(tableRowElementVal)
	
// 	tableBody.appendChild(rowHeader)
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

// //Balance sheet and Income statement totals
// function calculateTotal(flag){
// 	if (flag === 'bs'){
// 		const liabs = parseInt(document.querySelector('#TotalLiabilities').innerText)
// 		const equity = parseInt(document.querySelector('#TotalEquity').innerText)
// 		return liabs + equity

// 	} else if (flag === 'is'){
// 		const income = parseInt(document.querySelector('#TotalIncome').innerText)
// 		const expense = parseInt(document.querySelector('#TotalExpenses').innerText)
// 		return (income - expense)
// 	} 	
// }

// //not sure if this is necessary
// function validateTotal(total, flag){
// 	if (total){
// 		if (flag === 'bs'){
// 			const assets = parseInt(document.querySelector('#TotalAssets').innerText)
// 			const liabs = parseInt(document.querySelector('#TotalLiabilities').innerText)
// 			const equity = parseInt(document.querySelector('#TotalEquity').innerText)

// 			if ((liabs + equity) !== assets){
// 				alert('Liabilities and equity do not add to assets. Invalid subtotals')
// 			}
// 			return

// 		} else if (flag === 'is'){
// 			const income = parseInt(document.querySelector('#TotalIncome').innerText)
// 			const expense = parseInt(document.querySelector('#TotalExpenses').innerText)
// 			const net = parseInt(document.querySelector('#NetIncome').innerText)
// 			if ((income - expense) !== net) {
// 				alert('Net income does not equal income subtract expenses. Invalid subtotals')
// 			}
// 			return

// 		} else if (flag === 'cf') {
// 			log('Here is the cash flow')
// 			const beg = parseInt(document.querySelector('#BeginningBalance').innerText)
// 			log(beg)
// 			const ocf = parseInt(document.querySelector('#TotalOperatingCashflow').innerText)
// 			const icf = parseInt(document.querySelector('#TotalInvestingCashflow').innerText)
// 			const fcf = parseInt(document.querySelector('#TotalFinancingCashflow').innerText)
// 			const end = parseInt(document.querySelector('#EndingBalance').innerText)
// 			if ((beg + ocf + icf + fcf) !== end) {
// 				alert('The cash flow statement does not balance. Beginning balance + total activity should equal ending balance.')
// 			}
// 			return

// 		} else {
// 			const beg = parseInt(document.querySelector('#BeginningBalance').innerText)
// 			const activity = parseInt(document.querySelector('#TotalCurrentYearActivity').innerText)
// 			const end = parseInt(document.querySelector('#EndingBalance').innerText)
// 			if ((beg + activty) !== end) {
// 				alert('The equity statement does not balance. Beginning balance plus activitiy should equal the ending balance')
// 			}
// 			return

// 		}	
// 	} else {
// 		alert('Validation cannot be done since totalling not selected')
// 		return
// 	}
// }

// //Requirements for totalling
// //Balance sheet - add Total Liabilities + Equity
// //if Liabilities + Equity !== Total Assets - show a red error message that these two do not equal

// //Income statement - Net income
// //if Income - expenses !== Net income

// //Cash flow statement Beginning Balance
// //Ending Balance
// //if Beginning, totals !=== Ending Balance

// //Equity statement
// //subtotal + beg !== ending
