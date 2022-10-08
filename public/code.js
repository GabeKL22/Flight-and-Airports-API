/*
Gabriel Leffew
CSC 342, Spring 2022
Final Project 
*/
"use strict";

window.onload = initializePage;

/*
Function name: initializePage
Desciption:    initializes the page when the window is loaded.
Parameters:    none
Return Value:  none
*/
function initializePage() {
    document.getElementById("getALLF").addEventListener("click", getALLFlights);
    document.getElementById("getALLA").addEventListener("click", getALLAirports);

    document.getElementById("getF").addEventListener("submit", getFlight);
    document.getElementById("getA").addEventListener("submit", getAirport);

    document.getElementById("addF").addEventListener('click', showAddFlights);
    document.getElementById("addA").addEventListener('click', showAddAirports);

    document.getElementById("updateF").addEventListener('click', selectFlightUpdate);
    document.getElementById("updateA").addEventListener('click', selectAirportUpdate)

    document.getElementById("deleteF").addEventListener('click', selectFlightDelete);
    document.getElementById("deleteA").addEventListener('click', selectAirportDelete);

}

/*
Function name: getALLFlights
Desciption:    gets all flights in the flight database.
Parameters:    e - the event listener event
Return Value:  none
*/
function getALLFlights(e) {
    let req = new XMLHttpRequest();
    e.preventDefault();
    let error = {'error': 'Not Found'};
    req.open('GET', '/api/flights/');
    req.addEventListener("load", function() {
        if (this.readyState === 4 && this.status === 200) {
            buildFlightTable(JSON.parse(req.responseText));
        }
        else {
            console.log(error);
        }
    });
    req.send();
}

/*
Function name: getALLAirports
Desciption:    gets all airports in the flight database.
Parameters:    e - the event listener event
Return Value:  none
*/
function getALLAirports(e) {
    let req = new XMLHttpRequest();
    e.preventDefault();
    let error = {'error': 'Not Found'};
    req.open('GET', '/api/airports/');
    req.addEventListener("load", function() {
        if (this.readyState === 4 && this.status === 200) {
            buildAirportTable(JSON.parse(req.responseText));
        }
        else {
            console.log(error);
        }
    });
    req.send();
}

/*
Function name: getFlight
Desciption:    gets a specific id for flights
Parameters:    e - the event listener event
Return Value:  none
*/
function getFlight(e) {
    let req = new XMLHttpRequest();
    e.preventDefault();
    let error = {'error': 'Not Found'};
    req.addEventListener("load", function () {
        if (this.readyState === 4 && this.status === 200) {
            buildFlightTable(JSON.parse(req.responseText));
        }
        else {
            console.log(error);
            var div = document.getElementById("data");
            removeChildren(div);
            let heading = document.createElement('h1');
            heading.textContent = 'Error: Not Found';
            div.appendChild(heading);
        }
    });
    req.open('GET', `/api/flights/${document.forms.getF.searchF.value}`);
    req.send();
    
}

/*
Function name: getAirport
Desciption:    gets a specific symbol for airports
Parameters:    e - the event listener event
Return Value:  none
*/
function getAirport(e) {
    let req = new XMLHttpRequest();
    e.preventDefault();
    let error = {'error': 'Not Found'};
    req.addEventListener("load", function () {
        if (this.readyState === 4 && this.status === 200) {
            buildAirportTable(JSON.parse(req.responseText));
        }
        else {
            console.log(error);
            var div = document.getElementById("data");
            removeChildren(div);
            let heading = document.createElement('h1');
            heading.textContent = 'Error: Not Found';
            div.appendChild(heading);
        }
        
    });
    req.open('GET', `/api/airports/${document.forms.getA.searchA.value}`);
    req.send();
    
}
/*
Function name: showAddFlights
Desciption:    creates a form using the DOM to enter user input
               into the table. Calls addFlights when submitted
Parameters:    e - the event listener event
Return Value:  none
*/
//SHOW ADD HTML
function showAddFlights(e) {
    e.preventDefault();
    var div = document.getElementById("data");
    removeChildren(div);

    
    let heading = document.createElement('h1');
    heading.textContent = 'Enter a Flight into the database';
    let form = document.createElement('form');
    form.setAttribute("id", "addFlightsForm");
    let labelID = document.createElement('label');
    labelID.textContent = 'ID';
    labelID.setAttribute('for', 'id');
    let inputID = document.createElement('input');
    inputID.setAttribute('type', 'text');
    inputID.setAttribute("id", "id");
    inputID.required = true;
    let labelFrom = document.createElement('label');
    labelFrom.textContent = 'From';
    labelFrom.setAttribute('for', 'from');
    let inputFrom = document.createElement('input');
    inputFrom.setAttribute('type', 'text');
    inputFrom.setAttribute("id", "from");
    inputFrom.required = true;
    let labelTo = document.createElement('label');
    labelTo.textContent = 'To';
    labelTo.setAttribute('for', 'to');
    let inputTo = document.createElement('input');
    inputTo.setAttribute('type', 'text');
    inputTo.setAttribute("id", "to");
    inputTo.required = true;
    let labelDate = document.createElement('label');
    labelDate.textContent = 'Date';
    labelDate.setAttribute('for', 'date');
    let inputDate = document.createElement('input');
    inputDate.setAttribute('type', 'text');
    inputDate.setAttribute("id", "date");
    inputDate.required = true;
    let labelDeparture = document.createElement('label');
    labelDeparture.textContent = 'Departure';
    labelDeparture.setAttribute('for', 'departure');
    let inputDeparture = document.createElement('input');
    inputDeparture.setAttribute('type', 'text');
    inputDeparture.setAttribute("id", "departure");
    inputDeparture.required = true;
    let labelArrival = document.createElement('label');
    labelArrival.textContent = 'Arrival';
    labelArrival.setAttribute('for', 'arrival');
    let inputArrival = document.createElement('input');
    inputArrival.setAttribute('type', 'text');
    inputArrival.setAttribute("id", "arrival");
    inputArrival.required = true;
    let labelPlane = document.createElement('label');
    labelPlane.textContent = 'Plane';
    labelPlane.setAttribute('for', 'plane');
    let inputPlane = document.createElement('input');
    inputPlane.setAttribute('type', 'text');
    inputPlane.setAttribute("id", "plane");
    inputPlane.required = true;
    let labelNumOnBoard = document.createElement('label');
    labelNumOnBoard.textContent = 'Number on board';
    labelNumOnBoard.setAttribute('for', 'NumOnBoard');
    let inputNumOnBoard = document.createElement('input');
    inputNumOnBoard.setAttribute('type', 'text');
    inputNumOnBoard.setAttribute("id", "NumOnBoard");
    inputNumOnBoard.required = true;
    let labelWeather = document.createElement('label');
    labelWeather.textContent = 'Weather';
    labelWeather.setAttribute('for', 'weather');
    let inputWeather = document.createElement('input');
    inputWeather.setAttribute('type', 'text');
    inputWeather.setAttribute("id", "weather");
    inputWeather.required = true;
    let input_submit = document.createElement('input');
    input_submit.setAttribute('id', 'addFlightSubmit');
    input_submit.setAttribute('type', 'submit');
    input_submit.setAttribute('value', 'Submit');

    
    form.appendChild(labelID);
    form.appendChild(inputID);
    form.appendChild(labelFrom);
    form.appendChild(inputFrom);
    form.appendChild(labelTo);
    form.appendChild(inputTo);
    form.appendChild(labelDate);
    form.appendChild(inputDate);
    form.appendChild(labelDeparture);
    form.appendChild(inputDeparture);
    form.appendChild(labelArrival);
    form.appendChild(inputArrival);
    form.appendChild(labelPlane);
    form.appendChild(inputPlane);
    form.appendChild(labelNumOnBoard);
    form.appendChild(inputNumOnBoard);
    form.appendChild(labelWeather);
    form.appendChild(inputWeather);
    form.appendChild(input_submit);
    div.appendChild(heading);
    div.appendChild(form);

    document.getElementById("data").appendChild(form);
    //document.getElementById("addFlightsForm").addEventListener('submit', addFlights);
    addEventListener('submit', addFlights);
}

/*
Function name: showAddAirports
Desciption:    creates a form using the DOM to enter user input
               into the table. Calls addAirports when submitted
Parameters:    e - the event listener event
Return Value:  none
*/
function showAddAirports(e) {
    e.preventDefault();
    var div = document.getElementById("data");
    removeChildren(div);

    let heading = document.createElement('h1');
    heading.textContent = 'Enter an Airport into the database';
    let form = document.createElement('form');
    form.setAttribute("id", "addAirportsForm");
    let labelsiteID = document.createElement('label');
    labelsiteID.textContent = 'SiteID';
    labelsiteID.setAttribute('for', 'siteID');
    let inputsiteID = document.createElement('input');
    inputsiteID.setAttribute('type', 'text');
    inputsiteID.setAttribute("id", "siteID");
    inputsiteID.required = true;
    let labelCity = document.createElement('label');
    labelCity.textContent = 'City';
    labelCity.setAttribute('for', 'city');
    let inputCity = document.createElement('input');
    inputCity.setAttribute('type', 'text');
    inputCity.setAttribute("id", "city");
    inputCity.required = true;
    let labelState = document.createElement('label');
    labelState.textContent = 'State';
    labelState.setAttribute('for', 'state');
    let inputState = document.createElement('input');
    inputState.setAttribute('type', 'text');
    inputState.setAttribute("id", "state");
    inputState.required = true;
    let labelSymbol = document.createElement('label');
    labelSymbol.textContent = 'Symbol';
    labelSymbol.setAttribute('for', 'symbol');
    let inputSymbol = document.createElement('input');
    inputSymbol.setAttribute('type', 'text');
    inputSymbol.setAttribute("id", "symbol");
    inputSymbol.required = true;
    let labelStatus = document.createElement('label');
    labelStatus.textContent = 'Status';
    labelStatus.setAttribute('for', 'status');
    let inputStatus = document.createElement('input');
    inputStatus.setAttribute('type', 'text');
    inputStatus.setAttribute("id", "status");
    inputStatus.required = true;
    let labelElevation = document.createElement('label');
    labelElevation.textContent = 'Elevation';
    labelElevation.setAttribute('for', 'elevation');
    let inputElevation = document.createElement('input');
    inputElevation.setAttribute('type', 'text');
    inputElevation.setAttribute("id", "elevation");
    inputElevation.required = true;
    let labelOwnership = document.createElement('label');
    labelOwnership.textContent = 'Ownership';
    labelOwnership.setAttribute('for', 'ownership');
    let inputOwnership = document.createElement('input');
    inputOwnership.setAttribute('type', 'text');
    inputOwnership.setAttribute("id", "ownership");
    inputOwnership.required = true;
    let labelAcres = document.createElement('label');
    labelAcres.textContent = 'Acres';
    labelAcres.setAttribute('for', 'acres');
    let inputAcres = document.createElement('input');
    inputAcres.setAttribute('type', 'text');
    inputAcres.setAttribute("id", "acres");
    inputAcres.required = true;
    let input_submit = document.createElement('input');
    input_submit.setAttribute('type', 'submit');
    input_submit.setAttribute('value', 'Submit');
    
    form.appendChild(labelsiteID);
    form.appendChild(inputsiteID);
    form.appendChild(labelCity);
    form.appendChild(inputCity);
    form.appendChild(labelState);
    form.appendChild(inputState);
    form.appendChild(labelSymbol);
    form.appendChild(inputSymbol);
    form.appendChild(labelStatus);
    form.appendChild(inputStatus);
    form.appendChild(labelElevation);
    form.appendChild(inputElevation);
    form.appendChild(labelOwnership);
    form.appendChild(inputOwnership);
    form.appendChild(labelAcres);
    form.appendChild(inputAcres);
    form.appendChild(input_submit);

    div.appendChild(heading);
    div.appendChild(form);

    addEventListener('submit', addAirports);
}

/*
Function name: addFlights
Desciption:    does a post request to flights with the data given in the form
               by the user.
Parameters:    e - the event listener event
Return Value:  none
*/
//ADD
function addFlights(e) {
    let req = new XMLHttpRequest();
    e.preventDefault();
    let data = document.getElementById('data');
    let error = {'error': 'could not be created'};
    let obj = {
        "id": document.getElementById("addFlightsForm").id.value,
        "from_": document.getElementById("addFlightsForm").from.value,
        "to_": document.getElementById("addFlightsForm").to.value,
        "date": document.getElementById("addFlightsForm").date.value,
        "departure": document.getElementById("addFlightsForm").departure.value,
        "arrival": document.getElementById("addFlightsForm").arrival.value,
        "plane": document.getElementById("addFlightsForm").plane.value,
        "NumOnBoard": document.getElementById("addFlightsForm").NumOnBoard.value,
        "weather": document.getElementById("addFlightsForm").weather.value
    }
    req.addEventListener("load", function () {
        if (this.readyState === 4 && this.status === 201) {
            removeChildren(data);
            let success = document.createElement("h1");
            success.textContent = "Flight added to database!";
            data.appendChild(success);
        }
        else {
            console.log(error);
        }
    })
    req.open('POST', `/api/flights`);
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify(obj));
}

/*
Function name: addFlights
Desciption:    does a post request to airports with the data given in the form
               by the user.
Parameters:    e - the event listener event
Return Value:  none
*/
function addAirports(e) {
    let req = new XMLHttpRequest();
    e.preventDefault();
    let data = document.getElementById('data');
    let error = {'error': 'could not be created'};
    let obj = {
        "siteID": document.getElementById("addAirportsForm").siteID.value,
        "city": document.getElementById("addAirportsForm").city.value,
        "state": document.getElementById("addAirportsForm").state.value,
        "symbol": document.getElementById("addAirportsForm").symbol.value,
        "status": document.getElementById("addAirportsForm").status.value,
        "elevation": document.getElementById("addAirportsForm").elevation.value,
        "ownership": document.getElementById("addAirportsForm").ownership.value,
        "acres": document.getElementById("addAirportsForm").acres.value
    }
    req.addEventListener("load", function () {
        if (this.readyState === 4 && this.status === 201) {
            removeChildren(data);
            let success = document.createElement("h1");
            success.textContent = "Airport added to database!";
            data.appendChild(success);
        }
        else {
            console.log(error);
        }
    })
    req.open('POST', `/api/airports`);
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify(obj));
}

/*
Function name: selectFlightUpdate
Desciption:    creates a dropdown menu with id's of every
               flight, then updates the form "value field" with
               thats specific flights data
Parameters:    e - the event listener event
Return Value:  none
*/
function selectFlightUpdate(e) {
    e.preventDefault();
    var div = document.getElementById("data");
    removeChildren(div);

    let heading = document.createElement("h1");
    heading.textContent = "Select a Flight ID to update";
    heading.setAttribute("for", "flightsUPDATE");
    let select = document.createElement("select");
    select.setAttribute("id", "flightUPDATE");
    let options = [];

    div.appendChild(heading);
    let req = new XMLHttpRequest();
    e.preventDefault();
    req.open('GET', '/api/flights/');
    req.addEventListener("load", function() {
        let d = req.responseText;
        let jsonResponse = JSON.parse(d);
        for (let i = 0; i < JSON.parse(req.responseText).length; i++) {
            options[i] = document.createElement("option");
            //options[i].setAttribute("value", `${i}`);
            
            options[i].textContent = jsonResponse[i].id;
            console.log()
            select.appendChild(options[i]);
        }
        div.appendChild(select);
        let form = document.createElement('form');
        form.setAttribute("id", "updateFlightsForm");

        document.getElementById("flightUPDATE").addEventListener("click", e => { 
            e.preventDefault();
            console.log("clicked");
            let deleteForm = document.getElementById("updateFlightsForm");
            removeChildren(deleteForm);
            var div = document.getElementById("data");
            let labelID = document.createElement('label');
            labelID.textContent = 'ID';
            labelID.setAttribute('for', 'id');
            let inputID = document.createElement('input');
            inputID.setAttribute('type', 'text');
            inputID.setAttribute("value", `${document.getElementById("flightUPDATE").value}`);
            inputID.setAttribute("id", "id");
            inputID.required = true;
            let labelFrom = document.createElement('label');
            labelFrom.textContent = 'From';
            labelFrom.setAttribute('for', 'from');
            let inputFrom = document.createElement('input');
            inputFrom.setAttribute('type', 'text');
            inputFrom.setAttribute("id", "from");
            inputFrom.setAttribute("value", `${jsonResponse[document.getElementById("flightUPDATE").value-1].from_}`);
            inputFrom.required = true;
            let labelTo = document.createElement('label');
            labelTo.textContent = 'To';
            labelTo.setAttribute('for', 'to');
            let inputTo = document.createElement('input');
            inputTo.setAttribute('type', 'text');
            inputTo.setAttribute("id", "to");
            inputTo.setAttribute("value", `${jsonResponse[document.getElementById("flightUPDATE").value-1].to_}`);
            inputTo.required = true;
            let labelDate = document.createElement('label');
            labelDate.textContent = 'Date';
            labelDate.setAttribute('for', 'date');
            let inputDate = document.createElement('input');
            inputDate.setAttribute('type', 'text');
            inputDate.setAttribute("id", "date");
            inputDate.setAttribute("value", `${jsonResponse[document.getElementById("flightUPDATE").value-1].date}`);
            inputDate.required = true;
            let labelDeparture = document.createElement('label');
            labelDeparture.textContent = 'Departure';
            labelDeparture.setAttribute('for', 'departure');
            let inputDeparture = document.createElement('input');
            inputDeparture.setAttribute('type', 'text');
            inputDeparture.setAttribute("id", "departure");
            inputDeparture.setAttribute("value", `${jsonResponse[document.getElementById("flightUPDATE").value-1].departure}`);
            inputDeparture.required = true;
            let labelArrival = document.createElement('label');
            labelArrival.textContent = 'Arrival';
            labelArrival.setAttribute('for', 'arrival');
            let inputArrival = document.createElement('input');
            inputArrival.setAttribute('type', 'text');
            inputArrival.setAttribute("id", "arrival");
            inputArrival.setAttribute("value", `${jsonResponse[document.getElementById("flightUPDATE").value-1].arrival}`);
            inputArrival.required = true;
            let labelPlane = document.createElement('label');
            labelPlane.textContent = 'Plane';
            labelPlane.setAttribute('for', 'plane');
            let inputPlane = document.createElement('input');
            inputPlane.setAttribute('type', 'text');
            inputPlane.setAttribute("id", "plane");
            inputPlane.setAttribute("value", `${jsonResponse[document.getElementById("flightUPDATE").value-1].plane}`)
            inputPlane.required = true;
            let labelNumOnBoard = document.createElement('label');
            labelNumOnBoard.textContent = 'Number on board';
            labelNumOnBoard.setAttribute('for', 'NumOnBoard');
            let inputNumOnBoard = document.createElement('input');
            inputNumOnBoard.setAttribute('type', 'text');
            inputNumOnBoard.setAttribute("id", "NumOnBoard");
            inputNumOnBoard.setAttribute("value", `${jsonResponse[document.getElementById("flightUPDATE").value-1].NumOnBoard}`)
            inputNumOnBoard.required = true;
            let labelWeather = document.createElement('label');
            labelWeather.textContent = 'Weather';
            labelWeather.setAttribute('for', 'weather');
            let inputWeather = document.createElement('input');
            inputWeather.setAttribute('type', 'text');
            inputWeather.setAttribute("id", "weather");
            inputWeather.setAttribute("value", `${jsonResponse[document.getElementById("flightUPDATE").value-1].weather}`)
            inputWeather.required = true;
            let input_submit = document.createElement('input');
            input_submit.setAttribute('id', 'updateFlightSubmit');
            input_submit.setAttribute('type', 'submit');
            input_submit.setAttribute('value', 'Update');

            form.appendChild(labelID);
            form.appendChild(inputID);
            form.appendChild(labelFrom);
            form.appendChild(inputFrom);
            form.appendChild(labelTo);
            form.appendChild(inputTo);
            form.appendChild(labelDate);
            form.appendChild(inputDate);
            form.appendChild(labelDeparture);
            form.appendChild(inputDeparture);
            form.appendChild(labelArrival);
            form.appendChild(inputArrival);
            form.appendChild(labelPlane);
            form.appendChild(inputPlane);
            form.appendChild(labelNumOnBoard);
            form.appendChild(inputNumOnBoard);
            form.appendChild(labelWeather);
            form.appendChild(inputWeather);
            form.appendChild(input_submit);
            
            div.appendChild(form);
            console.log(jsonResponse);

            document.getElementById("data").appendChild(form);
            document.getElementById("updateFlightsForm").addEventListener("submit", updateFlight);
        })
        
    });
    req.send();

}

/*
Function name: selectAirportUpdate
Desciption:    creates a dropdown menu with the symbols of every
               airport, then updates the form "value field" with
               thats specific airports data
Parameters:    e - the event listener event
Return Value:  none
*/
function selectAirportUpdate(e) {
    e.preventDefault();
    var div = document.getElementById("data");
    removeChildren(div);

    let heading = document.createElement("h1");
    heading.textContent = "Select an Airport symbol to update";
    heading.setAttribute("for", "airportsUPDATE");
    let select = document.createElement("select");
    select.setAttribute("id", "airportUPDATE");
    let options = [];

    div.appendChild(heading);
    let req = new XMLHttpRequest();
    e.preventDefault();
    req.open('GET', '/api/airports/');
    req.addEventListener("load", function() {
        let d = req.responseText;
        let jsonResponse = JSON.parse(d);
        for (let i = 0; i < JSON.parse(req.responseText).length; i++) {
            options[i] = document.createElement("option");
            options[i].setAttribute("value", `${i}`);
            options[i].textContent = jsonResponse[i].symbol;
            select.appendChild(options[i]);
        }
        div.appendChild(select);
        let form = document.createElement('form');
        form.setAttribute("id", "updateAirportsForm");

        document.getElementById("airportUPDATE").addEventListener("click", e => {
            e.preventDefault();
            console.log(jsonResponse[document.getElementById("airportUPDATE").value]);
            let deleteForm = document.getElementById("updateAirportsForm");
            removeChildren(deleteForm);
            var div = document.getElementById("data");
            let labelsiteID = document.createElement('label');
            labelsiteID.textContent = 'SiteID';
            labelsiteID.setAttribute('for', 'siteID');
            let inputsiteID = document.createElement('input');
            inputsiteID.setAttribute('type', 'text');
            inputsiteID.setAttribute("id", "siteID");
            inputsiteID.setAttribute("value", `${jsonResponse[document.getElementById("airportUPDATE").value].siteID}`);
            inputsiteID.required = true;
            let labelCity = document.createElement('label');
            labelCity.textContent = 'City';
            labelCity.setAttribute('for', 'city');
            let inputCity = document.createElement('input');
            inputCity.setAttribute('type', 'text');
            inputCity.setAttribute("id", "city");
            inputCity.setAttribute("value", `${jsonResponse[document.getElementById("airportUPDATE").value].city}`);
            inputCity.required = true;
            let labelState = document.createElement('label');
            labelState.textContent = 'State';
            labelState.setAttribute('for', 'state');
            let inputState = document.createElement('input');
            inputState.setAttribute('type', 'text');
            inputState.setAttribute("id", "state");
            inputState.setAttribute("value", `${jsonResponse[document.getElementById("airportUPDATE").value].state}`);
            inputState.required = true;
            let labelSymbol = document.createElement('label');
            labelSymbol.textContent = 'Symbol';
            labelSymbol.setAttribute('for', 'symbol');
            let inputSymbol = document.createElement('input');
            inputSymbol.setAttribute('type', 'text');
            inputSymbol.setAttribute("id", "symbol");
            inputSymbol.setAttribute("value", `${jsonResponse[document.getElementById("airportUPDATE").value].symbol}`);
            inputSymbol.required = true;
            let labelStatus = document.createElement('label');
            labelStatus.textContent = 'Status';
            labelStatus.setAttribute('for', 'status');
            let inputStatus = document.createElement('input');
            inputStatus.setAttribute('type', 'text');
            inputStatus.setAttribute("id", "status");
            inputStatus.setAttribute("value", `${jsonResponse[document.getElementById("airportUPDATE").value].status}`);
            inputStatus.required = true;
            let labelElevation = document.createElement('label');
            labelElevation.textContent = 'Elevation';
            labelElevation.setAttribute('for', 'elevation');
            let inputElevation = document.createElement('input');
            inputElevation.setAttribute('type', 'text');
            inputElevation.setAttribute("id", "elevation");
            inputElevation.setAttribute("value", `${jsonResponse[document.getElementById("airportUPDATE").value].elevation}`);
            inputElevation.required = true;
            let labelOwnership = document.createElement('label');
            labelOwnership.textContent = 'Ownership';
            labelOwnership.setAttribute('for', 'ownership');
            let inputOwnership = document.createElement('input');
            inputOwnership.setAttribute('type', 'text');
            inputOwnership.setAttribute("id", "ownership");
            inputOwnership.setAttribute("value", `${jsonResponse[document.getElementById("airportUPDATE").value].ownership}`);
            inputOwnership.required = true;
            let labelAcres = document.createElement('label');
            labelAcres.textContent = 'Acres';
            labelAcres.setAttribute('for', 'acres');
            let inputAcres = document.createElement('input');
            inputAcres.setAttribute('type', 'text');
            inputAcres.setAttribute("id", "acres");
            inputAcres.setAttribute("value", `${jsonResponse[document.getElementById("airportUPDATE").value].acres}`);
            inputAcres.required = true;
            let input_submit = document.createElement('input');
            input_submit.setAttribute('type', 'submit');
            input_submit.setAttribute('value', 'Submit');
            
            form.appendChild(labelsiteID);
            form.appendChild(inputsiteID);
            form.appendChild(labelCity);
            form.appendChild(inputCity);
            form.appendChild(labelState);
            form.appendChild(inputState);
            form.appendChild(labelSymbol);
            form.appendChild(inputSymbol);
            form.appendChild(labelStatus);
            form.appendChild(inputStatus);
            form.appendChild(labelElevation);
            form.appendChild(inputElevation);
            form.appendChild(labelOwnership);
            form.appendChild(inputOwnership);
            form.appendChild(labelAcres);
            form.appendChild(inputAcres);
            form.appendChild(input_submit);

            div.appendChild(form);

            document.getElementById("updateAirportsForm").addEventListener("submit", updateAirport);

        })

    })
    req.send();
}

/*
Function name: updateFlight
Desciption:    uses a put request to update a specified flight
               in the database.
Parameters:    e - the event listener event
Return Value:  none
*/
function updateFlight(e) {
    console.log("test");
    let req = new XMLHttpRequest();
    let data = document.getElementById("data");
    e.preventDefault();
    let error = {'error': "Not Found"};
    let obj = {
        "id": document.forms.updateFlightsForm.id.value,
        "from_": document.forms.updateFlightsForm.from.value,
        "to_": document.forms.updateFlightsForm.to.value,
        "date": document.forms.updateFlightsForm.date.value,
        "departure": document.forms.updateFlightsForm.departure.value,
        "arrival": document.forms.updateFlightsForm.arrival.value,
        "plane": document.forms.updateFlightsForm.plane.value,
        "NumOnBoard": document.forms.updateFlightsForm.NumOnBoard.value,
        "weather": document.forms.updateFlightsForm.weather.value
    }
    req.addEventListener("load", function () {
        if (this.readyState === 4 && this.status === 200) {
            removeChildren(data);
            let success = document.createElement("h1");
            success.textContent = "Flight Updated!";
            data.appendChild(success);
        }
        else {
            console.log(error)
        }
    });
    console.log(document.forms.updateFlightsForm.id.value);
    req.open('PUT', `/api/flights/${document.forms.updateFlightsForm.id.value}`)
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify(obj));
}

/*
Function name: updateAirport
Desciption:    uses a put request to update a specified airport
               in the database.
Parameters:    e - the event listener event
Return Value:  none
*/
function updateAirport(e) {
    console.log("test");
    let req = new XMLHttpRequest();
    let data = document.getElementById("data");
    e.preventDefault();
    let error = {'error': "Not Found"};
    let obj = {
        "siteID": document.forms.updateAirportsForm.siteID.value,
        "city": document.forms.updateAirportsForm.city.value,
        "state": document.forms.updateAirportsForm.state.value,
        "symbol": document.forms.updateAirportsForm.symbol.value,
        "status": document.forms.updateAirportsForm.status.value,
        "elevation": document.forms.updateAirportsForm.elevation.value,
        "ownership": document.forms.updateAirportsForm.ownership.value,
        "acres": document.forms.updateAirportsForm.acres.value
    }
    req.addEventListener("load", function () {
        if (this.readyState === 4 && this.status === 200) {
            removeChildren(data);
            let success = document.createElement("h1");
            success.textContent = "Airport Updated!";
            data.appendChild(success);
        }
        else {
            console.log(error)
        }
    });
    console.log(document.forms.updateAirportsForm.symbol.value);
    req.open('PUT', `/api/airports/${document.forms.updateAirportsForm.symbol.value}`)
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify(obj));
}

/*
Function name: selectFlightDelete
Desciption:    creates a form using the DOM where a user can enter
               a specific flight to delete.
Parameters:    e - the event listener event
Return Value:  none
*/
//SHOW DELETE
function selectFlightDelete(e) {
    e.preventDefault();
    var div = document.getElementById("data");
    removeChildren(div);

    let heading = document.createElement("h1");
    heading.textContent = "Enter a flight to delete";
    let form = document.createElement('form');
    form.setAttribute("id", "deleteFlight");
    let label = document.createElement("label");
    label.setAttribute("for", "deleteIDF");
    label.textContent = "Flight ID";
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "deleteIDF")
    let input_submit = document.createElement('input');
    input_submit.setAttribute('id', 'deleteFlightSubmit');
    input_submit.setAttribute('type', 'submit');
    input_submit.setAttribute('value', 'Delete');

    
    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(input_submit);
    div.appendChild(heading);
    div.appendChild(form);

    
    addEventListener('submit', deleteFlights);

}

/*
Function name: selectAirportDelete
Desciption:    creates a form using the DOM where a user can enter
               a specific airport to delete.
Parameters:    e - the event listener event
Return Value:  none
*/
function selectAirportDelete(e) {
    e.preventDefault();
    var div = document.getElementById("data");
    removeChildren(div);

    let heading = document.createElement("h1");
    heading.textContent = "Enter an Airport to delete";
    let form = document.createElement('form');
    form.setAttribute("id", "deleteAirport");
    let label = document.createElement("label");
    label.setAttribute("for", "deleteIDA");
    label.textContent = "Airport Symbol";
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "deleteIDA")
    let input_submit = document.createElement('input');
    input_submit.setAttribute('id', 'deleteAirportSubmit');
    input_submit.setAttribute('type', 'submit');
    input_submit.setAttribute('value', 'Delete');

    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(input_submit);
    div.appendChild(heading);
    div.appendChild(form);

    addEventListener('submit', deleteAirports);
}
//DELETE
/*
Function name: deleteFlights
Desciption:    issues a delete request on a specified flight in 
               the database.
Parameters:    e - the event listener event
Return Value:  none
*/
function deleteFlights(e) {
    let req = new XMLHttpRequest();
    let error = {'error': 'Not Found'};
    e.preventDefault();
    req.addEventListener("load", function () {
        if (this.readyState === 4 && this.status === 204) {
            removeChildren(data);
            let success = document.createElement("h1");
            success.textContent = "Flight deleted from database!";
            data.appendChild(success);
        }
        else {
            console.log(error);
        }
    });
    req.open('DELETE', `/api/flights/${document.getElementById("deleteIDF").value}`);
    req.send();
}

/*
Function name: deleteAirports
Desciption:    issues a delete request on a specified airport in 
               the database.
Parameters:    e - the event listener event
Return Value:  none
*/
function deleteAirports (e) {
    let req = new XMLHttpRequest();
    let error = {'error': 'Not Found'};
    e.preventDefault();
    req.addEventListener("load", function () {
        if (this.readyState === 4 && this.status === 204) {
            removeChildren(data);
            let success = document.createElement("h1");
            success.textContent = "Airport deleted from database!";
            data.appendChild(success);
        }
        else {
            console.log(error);
        }
    });
    req.open('DELETE', `/api/airports/${document.getElementById("deleteIDA").value}`);
    req.send();
}

/*
Function name: buildFlightTable
Desciption:    uses the DOM to build a table of flights from
               the database.
Parameters:    data - the object (of flights)
Return Value:  none
*/
function buildFlightTable(data) {
    var div = document.getElementById("data");
    removeChildren(div);

    var table = document.createElement("table");
    var headingRow = document.createElement("tr");

    //console.log(data.length);

    headingRow.appendChild(document.createElement("th")).appendChild(document.createTextNode("ID"));
    headingRow.appendChild(document.createElement("th")).appendChild(document.createTextNode("From"));
    headingRow.appendChild(document.createElement("th")).appendChild(document.createTextNode("To"));
    headingRow.appendChild(document.createElement("th")).appendChild(document.createTextNode("Date"));
    headingRow.appendChild(document.createElement("th")).appendChild(document.createTextNode("Departure"));
    headingRow.appendChild(document.createElement("th")).appendChild(document.createTextNode("Arrival"));
    headingRow.appendChild(document.createElement("th")).appendChild(document.createTextNode("Plane"));
    headingRow.appendChild(document.createElement("th")).appendChild(document.createTextNode("Number on Board"));
    headingRow.appendChild(document.createElement("th")).appendChild(document.createTextNode("Weather"));

    table.appendChild(headingRow);
    if (data.length === undefined) { 
        let row = document.createElement("tr");

        let id = document.createElement("td");
        id.appendChild(document.createTextNode(data.id));
        row.appendChild(id);

        let from = document.createElement("td");
        from.appendChild(document.createTextNode(data.from_));
        row.appendChild(from);

        let to = document.createElement("td");
        to.appendChild(document.createTextNode(data.to_));
        row.appendChild(to);

        let date = document.createElement("td");
        date.appendChild(document.createTextNode(data.date));
        row.appendChild(date);

        let departure = document.createElement("td");
        departure.appendChild(document.createTextNode(data.departure));
        row.appendChild(departure);

        let arrival = document.createElement("td");
        arrival.appendChild(document.createTextNode(data.arrival));
        row.appendChild(arrival);

        let plane = document.createElement("td");
        plane.appendChild(document.createTextNode(data.plane));
        row.appendChild(plane);

        let NumOnBoard = document.createElement("td");
        NumOnBoard.appendChild(document.createTextNode(data.NumOnBoard));
        row.appendChild(NumOnBoard);

        let weather = document.createElement("td");
        weather.appendChild(document.createTextNode(data.weather));
        row.appendChild(weather);

        table.appendChild(row);       
    }
    else {
        for (let d of data) { // kept getting a 'data is not iterable error' (reason for the if else)
            let row = document.createElement("tr");

            let id = document.createElement("td");
            id.appendChild(document.createTextNode(d.id));
            row.appendChild(id);

            let from = document.createElement("td");
            from.appendChild(document.createTextNode(d.from_));
            row.appendChild(from);

            let to = document.createElement("td");
            to.appendChild(document.createTextNode(d.to_));
            row.appendChild(to);

            let date = document.createElement("td");
            date.appendChild(document.createTextNode(d.date));
            row.appendChild(date);

            let departure = document.createElement("td");
            departure.appendChild(document.createTextNode(d.departure));
            row.appendChild(departure);

            let arrival = document.createElement("td");
            arrival.appendChild(document.createTextNode(d.arrival));
            row.appendChild(arrival);

            let plane = document.createElement("td");
            plane.appendChild(document.createTextNode(d.plane));
            row.appendChild(plane);

            let NumOnBoard = document.createElement("td");
            NumOnBoard.appendChild(document.createTextNode(d.NumOnBoard));
            row.appendChild(NumOnBoard);

            let weather = document.createElement("td");
            weather.appendChild(document.createTextNode(d.weather));
            row.appendChild(weather);

            table.appendChild(row);        
        }
    }
    div.appendChild(table);
}

/*
Function name: buildAirportTable
Desciption:    uses the DOM to build a table of airports from
               the database.
Parameters:    data - the object (of airports)
Return Value:  none
*/
function buildAirportTable(data) {
    var div = document.getElementById("data");
    removeChildren(div);

    var table = document.createElement("table");
    var headingRow = document.createElement("tr");

    console.log(data);

    headingRow.appendChild(document.createElement("th")).appendChild(document.createTextNode("SiteID"));
    headingRow.appendChild(document.createElement("th")).appendChild(document.createTextNode("City"));
    headingRow.appendChild(document.createElement("th")).appendChild(document.createTextNode("State"));
    headingRow.appendChild(document.createElement("th")).appendChild(document.createTextNode("Symbol"));
    headingRow.appendChild(document.createElement("th")).appendChild(document.createTextNode("Status"));
    headingRow.appendChild(document.createElement("th")).appendChild(document.createTextNode("Elevation"));
    headingRow.appendChild(document.createElement("th")).appendChild(document.createTextNode("Ownership"));
    headingRow.appendChild(document.createElement("th")).appendChild(document.createTextNode("Acres"));
    
    table.appendChild(headingRow);
    if (data.length === undefined) {
        let row = document.createElement("tr");

        let siteID = document.createElement("td");
        siteID.appendChild(document.createTextNode(data.siteID));
        row.appendChild(siteID);

        let city = document.createElement("td");
        city.appendChild(document.createTextNode(data.city));
        row.appendChild(city);

        let state = document.createElement("td");
        state.appendChild(document.createTextNode(data.state));
        row.appendChild(state);

        let symbol = document.createElement("td");
        symbol.appendChild(document.createTextNode(data.symbol));
        row.appendChild(symbol);

        let status = document.createElement("td");
        status.appendChild(document.createTextNode(data.status));
        row.appendChild(status);

        let elevation = document.createElement("td");
        elevation.appendChild(document.createTextNode(data.elevation));
        row.appendChild(elevation);

        let ownership = document.createElement("td");
        ownership.appendChild(document.createTextNode(data.ownership));
        row.appendChild(ownership);

        let acres = document.createElement("td");
        acres.appendChild(document.createTextNode(data.acres));
        row.appendChild(acres);

        table.appendChild(row);  
    }
    else {
        for (let d of data) {
            let row = document.createElement("tr");

            let siteID = document.createElement("td");
            siteID.appendChild(document.createTextNode(d.siteID));
            row.appendChild(siteID);

            let city = document.createElement("td");
            city.appendChild(document.createTextNode(d.city));
            row.appendChild(city);

            let state = document.createElement("td");
            state.appendChild(document.createTextNode(d.state));
            row.appendChild(state);

            let symbol = document.createElement("td");
            symbol.appendChild(document.createTextNode(d.symbol));
            row.appendChild(symbol);

            let status = document.createElement("td");
            status.appendChild(document.createTextNode(d.status));
            row.appendChild(status);

            let elevation = document.createElement("td");
            elevation.appendChild(document.createTextNode(d.elevation));
            row.appendChild(elevation);

            let ownership = document.createElement("td");
            ownership.appendChild(document.createTextNode(d.ownership));
            row.appendChild(ownership);

            let acres = document.createElement("td");
            acres.appendChild(document.createTextNode(d.acres));
            row.appendChild(acres);

            table.appendChild(row);        
        }
    }
    div.appendChild(table);
}

/*
Function name: removeChildren
Desciption:    uses the DOM to remove the childNodes (got this from Dr. Schwesinger)
Parameters:    node - html element
Return Value:  none
*/
function removeChildren(node) {
    if (node !== null) {
        while (node.hasChildNodes()) {
            node.removeChild(node.lastChild);
        }
    }
}