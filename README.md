polymorphic
===========

Demonstration of a problem with polymorphic hasMany associations and ember-data

To try out the demo, clone and then

`npm install && bower install`

then

`ember serve`


Details
=======
The code in this repo demonstrates an assertion error when instances of derived classes are added to a `hasMany` relationship based on a common base class that I ran into when upgrading a project from Ember App Kit for Rails. The code worked fine with EAK but fails with ember-cli.

Tested against Ember 1.5.1 and Ember Data 1.0.0-beta.7+canary.b45e23ba (as per ember-cli new generator) and with 1.0.0-beta.8.

The code creates a simple app with three buttons. Clicking one of the buttons adds an instance of the corresponding property type to a `hasMany` association.

The data model is as follows: an `Item` has many properties. A `Property` is either a `BooleanProperty` or a `DateProperty`. Both of these property types extend the common base `Property` which the `hasMany` association on `Item` uses.

The action code in the controller simply creates an instance of the relevant type and uses `.addObject` to add it to the association, e.g.

```javascript
  addDateProperty: function () {
    var property = this.store.createRecord('dateProperty');
    this.get('model.properties').addObject(property);
  }
```

The call to `addObject` throws an exception because an assertion in `replaceContent` fails:

```javascript
     replaceContent: function(index, removed, added) {
        // Map the array of record objects into an array of  client ids.
        added = map(added, function(record) {
          Ember.assert("You cannot add '" + record.constructor.typeKey + "' records to this relationship (only '" + this.type.typeKey + "' allowed)", !this.type || record instanceof this.type);
          return record;
        }, this);

        this._super(index, removed, added);
      }
````

Specifically, the check `record instanceof this.type` fails.
