/*
Gabriel Leffew
CSC 342, Spring 2022
Final Project 
*/
const express = require('express');
const path = require('path')
const sqlite3 = require('sqlite3');
const app = express();
app.use(express.json({strict: false}));
const port = 3000;

let db = new sqlite3.Database('./data.db', (err) => {
    if (err) {
        console.log('ERROR: ' + err);
        exit(1);
    }
});
// Main page
app.get("/api/", (req, res) => {
    res.sendFile(path.join(__dirname), "/public/index.html");
});

// Static files
app.use(express.static('public'));

// Root API endpoint
app.get("/api/", (req, res) => {
    res.json({ "message": "OK"})
});
//GET ALL FLIGHTS
app.get('/api/flights/',  (req, res) => {
    let sql = "SELECT * FROM flights";
    let error = { 'error': '404 Not Found' }
        db.all(sql, (err, rows) => {
            if (err) {
                res.status(404).json(error);
                return;
            }
            res.json(rows);
        });
});
//GET ALL AIRPORTS
app.get('/api/airports/',  (req, res) => {
    let sql = "SELECT * FROM airports";
    let error = { 'error': '404 Not Found' }
        db.all(sql, (err, rows) => {
            if (err) {
                res.status(404).json(error);
                return;
            }
            res.json(rows);
        });
});
//GET FLIGHT ID
app.get('/api/flights/:id',  (req, res) => {
    let sql = "SELECT * FROM flights WHERE id = ?";
    let error = { 'error': '404 Not Found' }
        db.all(sql, req.params.id, (err, rows) => {
            if (rows.length === 0) {
                res.status(404).json(error);
                return;
            }
            rows.forEach(row => res.json(row));
        });
});
//GET AIRPORT symbol
app.get('/api/airports/:symbol', (req, res) => {
    let sql = `SELECT * FROM airports WHERE symbol = ?`;
    let error = { 'error': '404 Not Found' }
        db.all(sql, req.params.symbol, (err, rows) => {
            if (rows.length === 0) {
                res.status(404).json(error);
                return;
            }
            rows.forEach(row => res.json(row));
        });
});
//POST FLIGHT
app.post("/api/flights/", (req, res, next) => {
    let error = { 'error': '400 Bad Request' };
    let params = [req.body.id, req.body.from_, req.body.to_,
         req.body.date, req.body.departure, req.body.arrival,
          req.body.plane, req.body.NumOnBoard, req.body.weather];
    if (params.includes(undefined) === false) {
        let sql = 'INSERT into flights ("id", "from_", "to_", "date", "departure", "arrival", "plane", "NumOnBoard", "weather") VALUES (?,?,?,?,?,?,?,?,?)';
        db.run(sql, params, function (err, result) {
            if (err) {
                res.status(400).json(error);
                return;
            }
            res.status(201);
            res.set('Location', '/api/flights/' + this.lastID);
            res.end();
        });
    }
    else {
        res.status(400).json(error);
    }
});
//POST AIRPORT
app.post("/api/airports/", (req, res, next) => {
    let error = { 'error': '400 Bad Request' };
    let params = [req.body.siteID, req.body.city, req.body.state,
         req.body.symbol, req.body.status, req.body.elevation,
          req.body.ownership, req.body.acres];     
    if (params.includes(undefined) === false) {
        let sql = 'INSERT into airports ("siteID", "city", "state", "symbol", "status", "elevation", "ownership", "acres") VALUES (?,?,?,?,?,?,?,?)';
        db.run(sql, params, function (err, result) {
            if (err) {
                res.status(400).json(error);
                return;
            }
            res.status(201);
            res.set('Location', '/api/airports/' + req.body.symbol);
            res.end();
        });
    }
    else{
        res.status(400).json(error);
    }
});
//UPDATE A FLIGHT
app.put('/api/flights/:id', function (req, res, next) {
    let error = { 'error': '404 Not Found' };
    let params = [req.body.id, req.body.from_, req.body.to_,
        req.body.date, req.body.departure, req.body.arrival,
         req.body.plane, req.body.NumOnBoard, req.body.weather];
    if (params.includes(undefined) === false) {
        let sql = `UPDATE flights SET "id" = ?, "from_" = ?, "to_" = ?, "date" = ?, "departure" = ?, "arrival" = ?, "plane" = ?, "NumOnBoard" = ?, "weather" = ? WHERE id = "${req.params.id}"`;
        db.run(sql, params, (err) => {
            if (err) {
                res.status(404).json(error);
                return;
            }
            res.json({message: this.changes + ' changes made'});
        });
    }
    else {
     res.status(400).json({error: '400 Bad Request'});
    }
}); 

//UPDATE AN AIRPORT
app.put('/api/airports/:symbol', function (req, res, next) {
    let error = { 'error': '404 Not Found' };
    let params = [req.body.siteID, req.body.city, req.body.state,
        req.body.symbol, req.body.status, req.body.elevation,
         req.body.ownership, req.body.acres];
    if (params.includes(undefined) === false) {
        let sql = `UPDATE airports SET "siteID" = ?, "city" = ?, "state" = ?, "symbol" = ?, "status" = ?, "elevation" = ?, "ownership" = ?, "acres" = ? WHERE symbol = "${req.params.symbol}"`;
        db.run(sql, params, function (err, result) {
            if (err) {
                res.status(404).json(error);
                return;
            }
            res.json({message: this.changes + ' changes made'});
        });
    }
    else {
      res.status(400).json({error: '400 Bad Request'});
    }
});

//DELETE A FLIGHT
app.delete('/api/flights/:id', (req, res, next) => {
    let error = { 'error': '404 Not Found' };
    let sql_ = "SELECT * FROM flights WHERE id = ?";
    db.all(sql_, req.params.id, (err, rows) => {
        if (rows.length === 0) {
            res.status(404).json(error);
            return;
        }
        else {
            let sql = `DELETE FROM flights WHERE id = ?`;
            db.run(sql, req.params.id, (err, result) => {
                if (err) {
                    res.status(404).json(error);
                    return;
                }
                res.status(204).json({message : 'no content'});
            });
        }
    });
});
//DELETE AN AIRPORT
app.delete('/api/airports/:symbol', (req, res, next) => {
    let error = { 'error': '404 Not Found' };
    let sql_ = `SELECT * FROM airports WHERE symbol = ?`;
    db.all(sql_, req.params.symbol, (err, rows) => {
        if (rows.length === 0) {
            res.status(404).json(error);
            return;
        }
        else {
            let sql = `DELETE FROM airports WHERE symbol = ?`;
            db.all(sql, req.params.symbol, (err, result) => {
                if (err) {
                    res.status(404).json(error);
                    return;
                };
                res.status(204).json({message : 'no content'});
            });
        }
    });
});
app.listen(port, () => {
    console.log(`Final project running on port ${port}`);
});