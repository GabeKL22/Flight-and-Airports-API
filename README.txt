
Welcome to the Flights and Airports API. 

To get started you first have to initiate the database. 

enter the following command:

>sqlite3 data.db

Once inside of sqlite3, run the command:

sqlite3>.read init_db.sql
sqlite3>.exit
This will load the starting data into a database named 'data.db'.

Once you've done this run the command 'node index.js', head over to your browser and type localhost://3000 

Once you're there, you will see two dropdown boxes, one for flights and one for airports (each does the same):

The following options can be used (by clicking them) in the dropdown menu:
The first option does the following: (GET ALL)
    Clicking "Get ALL flights":
        returns a table of all the flights in the database.

    Clicking "Get ALL airports":
        returns a table of all the flights in the database.

The second option does the following: (GET SPECIFIC)
    Entering a specific Flight ID and hitting enter: 
        returns the flight table of the specified ID.

    Entering a specific Airport Symbol and hitting enter:
        returns the airport table of the specified symbol. 

The third option does the following: (ADD)
    Clicking "Add a Flight":
        creates an HTML form with specified fields of data for adding a new flight. Users must enter all values
        in order to submit. After submission a flight with the user-given data will be added to the database. 
    Clicking "Add an Airport":
        creates an HTML form with specified fields of data for adding a new airport. Users must enter all values
        in order to submit. After submission an airport with the user-given data will be added to the database. 

The fourth option does the following: (UPDATE) 
*NOTE - I did it this way because I was tired of entering all the fields to be updated everytime. 
    Clicking "Update a Flight":
        prompts the user with a dropdown menu of all the flight IDs, when one is selected, a form is created/updated 
        with the values of that flight, changing anything and pressing Update will update the flight in the database
        to have the newly inputted data.
    Clicking "Update an Airport":
        prompts the user with a dropdown menu of all the airport symbols, when one is selected, a form is created/updated 
        with the values of that airport, changing anything and pressing Update will update the airport in the database
        to have the newly inputted data.

The fifth option does the following: (DELETE)
    Clicking "Delete a Flight":
        prompts the use to enter a flight ID to delete that entire flight from the database, if the flight ID is found it
        will then be deleted. If not found a error will be sent to the console.
    Clicking "Delete an Airport":
        prompts the use to enter an airport symbol to delete that entire airport from the database, if the flight ID is 
        found it will then be deleted. If not found a error will be sent to the console. 
