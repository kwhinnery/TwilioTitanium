var db = Ti.Database.open('directory');
db.execute('CREATE TABLE IF NOT EXISTS people(id INTEGER PRIMARY KEY, name TEXT, phone TEXT)');
db.close();

exports.getList = function(nameSearch) {
    var list = [];

    var searchTerm = (nameSearch) ? nameSearch : '';

    var db = Ti.Database.open('directory'),
        rows = db.execute("SELECT * FROM people WHERE name LIKE \'%" + searchTerm + "%\'");

    while (rows.isValidRow()) {
        list.push({
            id: rows.fieldByName('id'),
            name: rows.fieldByName('name'),
            phone: rows.fieldByName('phone')
        });
        rows.next();
    }    

    db.close();
    return list;
};

exports.addPerson = function(name, phone) {
    var db = Ti.Database.open('directory');
    db.execute('INSERT INTO people(name,phone) VALUES(?,?)',name,phone);
    db.close();
};

exports.updatePerson = function(person) {
    var db = Ti.Database.open('directory');
    db.execute('UPDATE people SET name = ?, phone = ? WHERE id = ?', person.name, person.phone, person.id);
    db.close();
};

exports.deletePerson = function(person) {
    var db = Ti.Database.open('directory');
    db.execute('DELETE FROM people WHERE id = ?', person.id);
    db.close();
};

exports.findDefaultPerson = function() {
    var db = Ti.Database.open('directory'),
        rows = db.execute('SELECT * FROM people'),
        person = null;

    while (rows.isValidRow()) {
        // Grab the first one
        person = {
            id: rows.fieldByName('id'),
            name: rows.fieldByName('name'),
            phone: rows.fieldByName('phone')
        };
        break;
    }

    db.close();
    return person;
};