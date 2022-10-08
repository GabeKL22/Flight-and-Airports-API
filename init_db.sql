CREATE TABLE flights (
    id INTEGER primary key,
    from_ TEXT,
    to_ TEXT,
    date TEXT,
    departure TEXT,
    arrival TEXT,
    plane TEXT,
    NumOnBoard INTEGER,
    weather TEXT
);

CREATE TABLE airports (
    siteID INTEGER,
    city TEXT,
    state TEXT,
    symbol TEXT,
    status TEXT,
    elevation REAL,
    ownership TEXT,
    acres REAL
);

INSERT into flights (id, from_, to_, date, departure, arrival, plane, NumOnBoard, weather) VALUES (1, "BWI", "LAX", "2-23-22", "10:50", "14:25", "BOEING 737", 97, "Clear");
INSERT into flights (id, from_, to_, date, departure, arrival, plane, NumOnBoard, weather) VALUES (2, "FLL", "BWI", "3-12-22", "15:45", "18:30", "BOEING 747", 148, "Cloudy");
INSERT into flights (id, from_, to_, date, departure, arrival, plane, NumOnBoard, weather) VALUES (3, "PHL", "FLL", "3-13-22", "8:35", "11:15", "BOEING 737", 92, "Raining");
INSERT into flights (id, from_, to_, date, departure, arrival, plane, NumOnBoard, weather) VALUES (4, "JFK", "LAX", "3-13-22", "18:00", "22:15", "AIRBUS A220", 87, "Raining");
INSERT into flights (id, from_, to_, date, departure, arrival, plane, NumOnBoard, weather) VALUES (5, "LAX", "PHL", "3-14-22", "7:45", "10:50", "AIRBUS A330", 103, "Clear");

INSERT into airports (siteID, city, state, symbol, status, elevation, ownership, acres) VALUES (08456, "Baltimore", "Maryland", "BWI", "Operational", 143.4, "PUBLIC", 3160);
INSERT into airports (siteID, city, state, symbol, status, elevation, ownership, acres) VALUES (03192, "Fort Lauderdale", "Florida", "FLL", "Operational", 65, "PUBLIC", 1380);
INSERT into airports (siteID, city, state, symbol, status, elevation, ownership, acres) VALUES (15793, "New York", "New York", "JFK", "Operational", 13, "PUBLIC", 5202);
INSERT into airports (siteID, city, state, symbol, status, elevation, ownership, acres) VALUES (01818, "Los Angeles", "California", "LAX", "Operational", 127.8, "PUBLIC", 3500);
INSERT into airports (siteID, city, state, symbol, status, elevation, ownership, acres) VALUES (21217, "Philadelphia", "Pennsylvania", "PHL", "Operational", 35.9, "PUBLIC", 2302);
