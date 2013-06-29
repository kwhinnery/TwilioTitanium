var ui = require('ui/ui'),
    directory = require('services/DirectoryService');

module.exports = function() {
    var currentPerson = null,
        self = Ti.UI.createView({
        opacity:0
    });

    var form = Ti.UI.createView({
        layout:'vertical',
        width:320,
        left:0
    });
    self.add(form);

    var formHeader = ui.label('Company Directory', {
        top:10,
        left:10,
        fontSize:24,
        fontWeight:'bold'
    });
    form.add(formHeader);

    var nameField = Ti.UI.createTextField({
        top:10,
        left:10,
        right:10,
        borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        height:50,
        hintText:'Name'
    });
    form.add(nameField);

    var phoneField = Ti.UI.createTextField({
        top:10,
        left:10,
        right:10,
        borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        height:50,
        hintText:'Phone Number'
    });
    form.add(phoneField);

    var saveButton = ui.blackButton('Save', {
        top:10,
        left:10,
        width:300
    });
    form.add(saveButton);

    var clearButton = ui.grayButton('Clear', {
        top:10,
        left:10,
        width:300
    });
    form.add(clearButton);

    // clear out current person data and reset form
    function resetForm() {
        phoneField.blur();
        nameField.blur();
        phoneField.value = '';
        nameField.value = '';
        currentPerson = null;
    }

    // save current data
    saveButton.addEventListener('click', function() {
        if (!currentPerson) {
            directory.addPerson(nameField.value, phoneField.value);
        } else {
            currentPerson.name = nameField.value;
            currentPerson.phone = phoneField.value;
            directory.updatePerson(currentPerson);
        }
        resetForm();
        refreshTable();
    });

    // clear current user data
    clearButton.addEventListener('click', resetForm);

    var list = Ti.UI.createView({
        left:320
    });
    self.add(list);

    var addButton = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.ADD,
    }), flexSpace = Ti.UI.createButton({
        systemButton:Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });

    addButton.addEventListener('click', function() {
        directory.addPerson('New Person', '+16518675309');
        refreshTable();
    });

    var toolbar = Ti.UI.iOS.createToolbar({
        top:0,
        height:44,
        items:[flexSpace,addButton],
        barColor:'#000'
    });
    list.add(toolbar);

    var tableView = Ti.UI.createTableView({
        top:44,
        editable:true
    });
    list.add(tableView);

    // Handle a table view row click
    tableView.addEventListener('click', function(e) {
        currentPerson = e.rowData.person;
        nameField.value = currentPerson.name;
        phoneField.value = currentPerson.phone;
    });

    // Handle a delete
    tableView.addEventListener('delete', function(e) {
        directory.deletePerson(e.rowData.person);
        resetForm();
    });

    // grab list of people, refresh table view
    function refreshTable() {
        var people = directory.getList(),
        tableData = [];

        people.forEach(function(person) {
            var tvr = Ti.UI.createTableViewRow({
                hasDetail:true,
                person:person,
                height:60
            });
            tvr.add(ui.label(person.name, {
                fontSize:18,
                fontWeight:'bold',
                top:10,
                left:10,
                height:Ti.UI.SIZE,
                color:'#000'
            }));
            tvr.add(ui.label(person.phone, {
                fontSize:12,
                top:35,
                left:10,
                height:Ti.UI.SIZE,
                color:'#787878'
            }));
            tableData.push(tvr);
        });
        tableView.setData(tableData);
    }

    //fetch initial list
    refreshTable();

    return self;
};