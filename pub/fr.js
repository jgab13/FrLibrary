/* FR Library*/

(function(global, document) { 

	// this function is currently only in the scope of the anonymous function at the moment.
	function fr() {}

	/* Private properties and functions */
	// unless we attach these to the global window object, they cannot be accessed directly.
	// they will only be in the closure of this function, and can be accessed only the places we use them (such as in the functions of the CircleGenerator prototype)
		// (see examples.js for what we can and cannot access)
	// let _totalNumberOfCirclesEverCreated = 0
	// function _incrementTotalCircles() {
	// 	_totalNumberOfCirclesEverCreated++;
	// }
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

	function budgetHeader(table){
		const tr = document.createElement('tr')
		const td = document.createElement('td')
		td.className = 'subheader actual'
		td.setAttribute('colspan', 1)
		const button = document.createElement('button')
		button.onclick = function() {collapseBudget(table);}
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
	function sectionBudget(data, budget, label, sub, table, span, edit){
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
		button.onclick = function() {collapseRows(buttonlabel, label, table)}
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

			//need an edit and input
			//actual value for row
			const tdvalue = document.createElement('td')
			
			const identifier = sublabel.replace(/ /g, '') + table.getAttribute('id')
			tdvalue.setAttribute('id', identifier)
			let value = data[sublabel]
			subactual += value
			if (edit){
				tdvalue.className = "value " + label +' edit'
		      	const save = document.createElement('button')
		      	// const buttonlabel = sublabel.replace(/ /g, '') + 'button' + table.getAttribute('id')
		      	// save.setAttribute('id', buttonlabel)
		      	save.style.float = 'left'
		      	save.onclick = function () {saveValue(identifier);}
		      	save.innerText = 'Save'
		      	save.setAttribute("id", "editbutton")
		      	tdvalue.appendChild(save)

		      	const inp = document.createElement('input')
		      	// const inplabel = sublabel.replace(/ /g, '') + 'form' + table.getAttribute('id')
		      	// inp.setAttribute('id', inplabel)
		      	inp.setAttribute("placeholder", value)
		      	inp.setAttribute("type", "text")
		 
		      	console.log(inp)
		      	tdvalue.appendChild(inp)
		      	console.log(tdvalue)

			} else {
				tdvalue.className = "value " + label
				tdvalue.innerText = value
			}

			//need an edit and input
			//budget value for row
			const tdbudget = document.createElement('td')
			
			const budgetID = sublabel.replace(/ /g, '') + "budget" + table.getAttribute('id')
			tdbudget.setAttribute('id', budgetID)
			let budg = budget[sublabel]
			subbudget += budg
			if (edit){
				tdbudget.className = "value " + label + ' budget edit'
		      	const saveBudg = document.createElement('button')
		      	// const buttonlabel = sublabel.replace(/ /g, '') + 'button' + table.getAttribute('id')
		      	// save.setAttribute('id', buttonlabel)
		      	saveBudg.style.float = 'left'
		      	saveBudg.onclick = function () {saveValue(budgetID);}
		      	saveBudg.innerText = 'Save'
		      	saveBudg.setAttribute("id", "editbutton")
		      	tdbudget.appendChild(saveBudg)

		      	const input = document.createElement('input')
		      	// const inplabel = sublabel.replace(/ /g, '') + 'form' + table.getAttribute('id')
		      	// inp.setAttribute('id', inplabel)
		      	input.setAttribute("placeholder", budg)
		      	input.setAttribute("type", "text")
		      	tdbudget.appendChild(input)

			} else {
				tdbudget.className = "value " + label + " budget"
				tdbudget.innerText = budg
			}


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
			let diffperc = diff / budg * 100
			console.log("this si the diffperc")
			console.log(diffperc)
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
	   	  subrowperc.innerText = ((subactual - subbudget) / subbudget) * 100
	   	  subrow.appendChild(subrowperc)

	   	  table.appendChild(subrow)
	   }
	}

	function section(data, label, sub, table, span, edit){
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
	   button.onclick = function() {collapseRows(buttonlabel, label, table)}
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
	      const identifier = sublabel.replace(/ /g, '') + table.getAttribute('id')
		  tdvalue.setAttribute('id', identifier)
		  let value = data[sublabel]
		  subtotal += value
	      if (edit === undefined){
		      tdvalue.innerText = value
		      tdvalue.className = "value " + label
		      //track subtotal
		      // console.log('I am here')
		      
	      } else { 
	      	//save button
	      	// console.log('No, I am here')
	      	tdvalue.className = "value " + label + ' edit'
	      	const save = document.createElement('button')
	      	// const buttonlabel = sublabel.replace(/ /g, '') + 'button' + table.getAttribute('id')
	      	// save.setAttribute('id', buttonlabel)
	      	save.style.float = 'left'
	      	save.onclick = function () {saveValue(identifier);}
	      	save.innerText = 'Save'
	      	save.setAttribute("id", "editbutton")
	      	console.log(save)
	      	tdvalue.appendChild(save)
	      	console.log(tdvalue)

	      	const inp = document.createElement('input')
	      	// const inplabel = sublabel.replace(/ /g, '') + 'form' + table.getAttribute('id')
	      	// inp.setAttribute('id', inplabel)
	      	inp.setAttribute("placeholder", value)
	      	inp.setAttribute("type", "text")
	 
	      	console.log(inp)
	      	tdvalue.appendChild(inp)
	      	console.log(tdvalue)
	      	}
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

	function collapseRows(id, key, table) {
	   	const tobehidden = table.querySelectorAll('.value.' + key)
	   	for (let i = 0; i < tobehidden.length; i++){
	   		tobehidden[i].parentElement.classList.add("hidden");
	   	}
	   	console.log(key)
	   	console.log(table)
	   	const button = table.querySelector('#' + id)
	   	console.log(button)
	   	button.innerHTML = 'show'
	   	button.onclick = function() {expandRows(id, key, table);}
	}

	function expandRows(id, key, table) {
	   	const tobehidden = table.querySelectorAll('.value.' + key)
	   	console.log(tobehidden)
	   	for (let i = 0; i < tobehidden.length; i++){
	   		tobehidden[i].parentElement.classList.remove("hidden");
	   	}
	   	console.log(key)
	   	console.log(table)
	   	const button = table.querySelector('#' + id)
	   	console.log(button)
	   	button.innerHTML = 'hide'
	   	button.onclick = function() {collapseRows(id, key, table)}
	}

	function collapseBudget(table) {
	   	console.log("button clicked - hide")
	   	const tobehidden = table.querySelectorAll(".budget")
	   	for (let i = 0; i < tobehidden.length; i++){
	   		tobehidden[i].classList.add("hidden");
	   	}
	   	const hide = table.querySelector('#hidebutton')
	   	hide.onclick = function() {expandBudget(table);};
	   	// hide.onclick = function() {expandBudget()}
	   	hide.innerHTML = "show"
	   	console.log(hide)
	}

	function expandBudget (table) {
	   	console.log("button clicked - show")
	   	
	   	const tobehidden = table.querySelectorAll(".budget")
	   	for (let i = 0; i < tobehidden.length; i++){
	   		tobehidden[i].classList.remove("hidden");
	   	}
	   	const show = table.querySelector('#hidebutton')
	   	show.onclick = function() {collapseBudget(table);};
	   	// show.onclick = function() {collapseBudget();}
	   	show.innerHTML = "hide"
	   	show.setAttribute("id", 'hidebutton')
	   	console.log(show)
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
				if (!diffsToCheck[i].getAttribute('id').includes('diff') && 
					!diffsToCheck[i].getAttribute('id').includes('budget') &&
					!diffsToCheck[i].getAttribute('id').includes('button') &&
					parseFloat(diffsToCheck[i].innerHTML) !== val) {
					condition = true
					break;
				} 
			}
		}
		if (condition){
			for (let j = 0; j < diffsToCheck.length; j++){
				if (!diffsToCheck[j].getAttribute('id').includes('diff') && 
					!diffsToCheck[j].getAttribute('id').includes('budget') &&
					!diffsToCheck[j].getAttribute('id').includes('button')){
					let parent = diffsToCheck[j].parentElement
					console.log(parent)
					if (parent.querySelector('div') === null && !(parent.querySelector('a') === null)){
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
		else {
			for (let m = 0; m < diffsToCheck.length; m++){
				if (!diffsToCheck[m].getAttribute('id').includes('diff') && 
					!diffsToCheck[m].getAttribute('id').includes('budget') &&
					!diffsToCheck[m].getAttribute('id').includes('button')){
					let parent = diffsToCheck[m].parentElement
					if (parent.querySelector('div') !== null){
						console.log('div exists')
						const div = parent.querySelector('div')
						console.log(div)
						parent.querySelector('.label').removeChild(div)
					} 				
				}
			}
		}
	}
	function insertAfter(sibling, element) {
	  sibling.parentElement.insertBefore(element, sibling.nextSibling);
	}

	function saveValue(key){
		console.log('this is the key for saveValue')
		console.log(key)
		const parent = document.querySelector('#' + key)
		// console.log("this is the parent")
		console.log(parent)
		const save = parent.querySelector('#editbutton')
		// console.log("this is the button")
		console.log(save)
		const input = parent.querySelector('input')
		// console.log('this is the input')
		console.log(input)
		//Need to save this value
		const oldValue = parseInt(input.placeholder)
		const searchClass = parent.className.replace('value', '').replace('edit', '').replace('budget', '').trim()
		// if (key.includes('budget')){
		// 	console.log('budget works')
		// 	const subtotalElement = parent.parentElement.parentElement.querySelector("[id*="+ "Total" + searchClass+ "budget]")	
		// 	console.log(subtotalElement)
		// } else {
		// 	const subtotalElement = parent.parentElement.parentElement.querySelector("[id*="+ "Total" + searchClass+"]")	
		// }
		const subtotalElement = key.includes('budget') ? parent.parentElement.parentElement.querySelector("[id*="+ "Total" + searchClass+ "budget]") : parent.parentElement.parentElement.querySelector("[id*="+ "Total" + searchClass+"]")
		console.log(subtotalElement)
		const totalElement = parent.parentElement.parentElement.querySelector(".Total")
		console.log(subtotalElement)
		console.log("Label to search for subtotal")
		console.log(searchClass)
		console.log(totalElement)
		const oldsubtotal = parseInt(subtotalElement.innerText)
		const oldtotal = parseInt(totalElement.innerText)
		console.log(oldtotal)
		

		const value = input.value === '' ? input.placeholder : input.value
		console.log(value)

		//update row


		//Update new subtotal
		const newsubtotal = oldsubtotal - oldValue + parseInt(value)
		subtotalElement.innerText = newsubtotal
		const subtotalers = subtotalElement.parentElement.querySelectorAll("[id*='Total']")
		if (subtotalers.length > 2){
			subtotalers[2].innerText = parseInt(subtotalers[0].innerText) - parseInt(subtotalers[1].innerText)
			subtotalers[3].innerText = parseInt(subtotalers[2].innerText) / parseInt(subtotalers[1].innerText) * 100

		}
		//Update new total
		//EditTotal function does this

		//Change the button to save instead of edit
		save.setAttribute('id', "savebutton")
		save.innerText = "Edit"
		save.onclick = function () {editValue(key)}
		//Update input
		parent.removeChild(input)
		const text = document.createTextNode(value)
		parent.classList.add('currSign')
		parent.appendChild(text)
		console.log(parent)

		const grandParent = parent.parentElement
		console.log(grandParent)
		const parentSibling = grandParent.querySelectorAll('.value')
		console.log(parentSibling)
		if (key.includes('budget')){
			//Need to update the difference stuff
			const actualVal = parentSibling[0].querySelector('input') === null ? parseInt(parentSibling[0].innerText.replace('Edit', '')) : parseInt(parentSibling[0].querySelector('input').placeholder) 
			console.log("FUCLKSKLAGKLFGLKALKFDKLFKLASFD")
			console.log(parentSibling[0].querySelector('.input'))
			console.log(actualVal)
			const budgetVal = value 
			console.log(budgetVal)
			parentSibling[2].innerText = actualVal - budgetVal
			parentSibling[3].innerText = (actualVal - budgetVal) / budgetVal * 100 
		} else if (parentSibling.length > 2){
			const actualVal = value 
			console.log(actualVal)
			const budgetVal = parentSibling[1].querySelector('input') === null ? parseInt(parentSibling[1].innerText.replace('Edit', '')) : parseInt(parentSibling[1].querySelector('input').placeholder)
			console.log(budgetVal)
			parentSibling[2].innerText = actualVal - budgetVal
			parentSibling[3].innerText = (actualVal - budgetVal) / budgetVal * 100 
		}


		//check linked values
		checkLinkedValues("Total"+searchClass, "Total " + searchClass + " do not match across statements")
		
		//Need to recalculate the total as well
	}

	function editValue(key){
		console.log('this is the key for editValue')
		console.log(key)
		const parent = document.querySelector('#' + key)
		// console.log("this is the parent")
		console.log(parent)
		
		// console.log("this is the button")
		
		const value = parent.innerText.replace("Edit", "")
		console.log(value)

		parent.innerText = ""
		// parent.innerText = parent.innerText.replace(value, "")
		const edit = document.createElement('button')
		edit.setAttribute('id', 'editbutton')
		edit.innerText = "Save"
		edit.style.float = 'left'
		edit.onclick = function () {saveValue(key)}
		console.log(edit)

		
		// parent.innerText.replace(value, '')
		// parent.removeChild(button)
		//Change the button to save instead of edit
		
		//Update input
		const editForm = document.createElement('input')
		editForm.setAttribute("placeholder", value)
		editForm.setAttribute("type", "text")
		// parent.appendChild(button)
		parent.appendChild(edit)
		parent.appendChild(editForm)
		// form.classList.remove('value')
		parent.classList.remove('currSign')

		//Need to recalculate the subtotal - need this function
		//Need to recalculate the total as well 
		
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
	/* End of private properties/functions */

	fr.prototype = {

		statementGenerator: function(data, id, sub, budget, edit){
			//Use this to add a table.

			const table = document.createElement('table')
			table.setAttribute('id', id)

			//header components
			console.log("this is the budget argument")
			console.log(budget)
			if (budget === undefined || budget === null){
				header(data, table, 2)	
			} else {
				header(data, table, 5)
				budgetHeader(table)
			}
			
			const sections = Object.keys(data).length
			//for each subcomponent
			for (let j = 1; j < sections; j++){
		      let label = Object.keys(data)[j]
		      if (budget === undefined || budget === null){
		      	section(data[label], label, sub, table, 2, edit)	
		      } else {
		      	sectionBudget(data[label], budget[label], label, sub, table, 5, edit)
		      }	 
			}
			return table
		},
		total: function(tblselect, label, operations, budget){
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
				rowBudDiff.innerText = ((total - totalbudg) / totalbudg) * 100
				rowBudDiff.setAttribute('id', label.replace(/ /g, '')+ "budgetdiff" + tblselect)
				row.appendChild(rowBudDiff)
			}
			table.appendChild(row)
		},
		editTotal: function(tblselect, label, operations, budget){
			const table = document.querySelector('#' + tblselect)
			const oplen = Object.keys(operations).length
			let total = 0
			let totalbudg = 0
			for (let i = 0; i < oplen; i++){
				let operation = Object.keys(operations)[i]
				let selector = 'Total' + operation.replace(/ /g, '') + tblselect
				const val = parseInt(document.querySelector('#' + selector).innerText)
				if (operations[operation] === 'add'){
					total += val
				} else {	
					total -= val
				}
				if (budget){
					let budgetselect = 'Total' + operation.replace(/ /g, '') + 'budget' +  tblselect
					const budg = parseInt(document.querySelector('#' + budgetselect).innerText)
					if (operations[operation] === 'add'){
					totalbudg += budg
					} else {	
						totalbudg -= budg
					}
				}
			}
			const rows = table.querySelectorAll('.Total')
			rows[0].innerText = total
			if (budget){
				rows[1].innerText = totalbudg
				rows[2].innerText = total - totalbudg
				rows[3].innerText = ((total - totalbudg) / totalbudg) * 100
			}
		},
		draganddrop: function(label){
			$(document).ready(function() {
		    // Initialise the table
		    $("#" + label).tableDnD({
		      onDragClass: "drag"
		      });
			});	
		},
		formatValues: function() {
			let x = document.querySelectorAll(".value");
			let len = x.length; 
		    for (let i = 0; i < len; i++) { 
		    	if (!x[i].className.includes('edit')){
			        let num = Number(x[i].innerHTML) 
			                  .toLocaleString('en'); 
			        x[i].innerHTML = num; 
			        x[i].classList.add("currSign");    		
		    	}
		 
		 	}
		 },
		 formatDifferences: function(){
		 	let y = document.querySelectorAll("[id*='budgetdiff']"); 
		 	let len = y.length
		    for (let i = 0; i < len; i++) { 
		        let num = (parseFloat(y[i].innerHTML)).toFixed(0) + "%"
		        y[i].innerHTML = num; 
		        y[i].classList.remove("currSign")
		    } 
		},
		checkDifferences: function(threshold,success, failure){
			const diffsToCheck = document.querySelectorAll("[id*='budgetdiff']")
			console.log(diffsToCheck)
		   	for (let i = 0; i < diffsToCheck.length; i++){
		   		console.log(parseFloat(diffsToCheck[i].innerHTML))
		   		if (parseFloat(diffsToCheck[i].innerHTML) > 0 && parseFloat(diffsToCheck[i].innerHTML) > threshold) {
		   			diffsToCheck[i].style.color = "white";
		   			diffsToCheck[i].style.backgroundColor = success;
		   		} else if (parseFloat(diffsToCheck[i].innerHTML) < 0 && parseFloat(diffsToCheck[i].innerHTML) < -threshold){
		   			diffsToCheck[i].style.color = "white";
		   			diffsToCheck[i].style.backgroundColor = failure;
		   		} else {
		   			diffsToCheck[i].style.color = "black";
		   			diffsToCheck[i].style.backgroundColor = "";
		   		}
		   	}
		},
		addLink: function(label){
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
		},
		checkLinkedValues: function(label, message){
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
					if (!diffsToCheck[i].getAttribute('id').includes('diff') && 
						!diffsToCheck[i].getAttribute('id').includes('budget') &&
						!diffsToCheck[i].getAttribute('id').includes('button') &&
						parseFloat(diffsToCheck[i].innerHTML) !== val) {
						condition = true
						break;
					} 
				}
			}
			if (condition){
				for (let j = 0; j < diffsToCheck.length; j++){
					if (!diffsToCheck[j].getAttribute('id').includes('diff') && 
						!diffsToCheck[j].getAttribute('id').includes('budget') &&
						!diffsToCheck[j].getAttribute('id').includes('button')){
						let parent = diffsToCheck[j].parentElement
						console.log(parent)
						if (parent.querySelector('div') === null && !(parent.querySelector('a') === null)){
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
			else {
				for (let m = 0; m < diffsToCheck.length; m++){
					if (!diffsToCheck[m].getAttribute('id').includes('diff') && 
						!diffsToCheck[m].getAttribute('id').includes('budget') &&
						!diffsToCheck[m].getAttribute('id').includes('button')){
						let parent = diffsToCheck[m].parentElement
						if (parent.querySelector('div') !== null){
							console.log('div exists')
							const div = parent.querySelector('div')
							console.log(div)
							parent.querySelector('.label').removeChild(div)
						} 				
					}
				}
			}
		},
		createAutomaticSlideShow: function(root, selector, slides, speed){
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
		},
		createManualSlideShow: function(root, selector, slides){
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
		},
		rateCalculor: function(rate, label, table, message){
			console.log('#' + label.replace(/ /g,'') + table.getAttribute('id'))
			const element = document.querySelector('#' + label.replace(/ /g,'') + table.getAttribute('id'))

			const value = parseInt(element.innerText)
			const taxes = value * rate
			const parent = element.parentElement

			const tr = document.createElement('tr')
			const td = document.createElement('td')
			td.className = '.label'
			td.innerText = message
			const tdVal = document.createElement('td')
			tdVal.setAttribute('id', td.innerText.replace(/ /g, '') + table.getAttribute('id'))
			tdVal.className = 'value currSign'
			tdVal.innerText = taxes

			tr.appendChild(td)
			tr.appendChild(tdVal)
			insertAfter(element.parentElement, tr)
		},
		addSubComponents: function(data, label, cat, table){
			const root = document.querySelector('#' + label.replace(/ /g, '') + table.getAttribute('id'))
			const collapseButton = document.createElement('button')
			collapseButton.style.float = 'right'
			const buttonlabel =  label.replace(/ /g, '') + "sub"
			collapseButton.setAttribute('id', buttonlabel)
			collapseButton.onclick = function() {collapseRows(buttonlabel, label.replace(/ /g, ''), table);}
			collapseButton.innerText = 'Hide'
			root.parentElement.querySelector('.label').appendChild(collapseButton)

		   console.log(data[label])
		   const length = Object.keys(data).length
		   console.log(length)
		   const collection = []
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
		      tdvalue.className = "value " + label.replace(/ /g, '') + ' ' + cat
		      tdvalue.setAttribute('id', sublabel.replace(/ /g, '') + table.getAttribute('id'))
		      let value = data[sublabel]
		      tdvalue.innerText = value
		      //track subtotal  
		      //append to end of row
		      tbrow.appendChild(tdlabel)
		      tbrow.appendChild(tdvalue)
		      collection.push(tbrow)
		   }
		   for (let j = collection.length - 1; j > -1; j--){
		   		insertAfter(root.parentElement, collection[j])	
		   }
		}
	}
	global.fr = global.fr || fr

})(window, window.document); // pass the global window object and jquery to the anonymous function. They will now be locally scoped inside of the function.