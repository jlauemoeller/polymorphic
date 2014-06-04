export default Ember.ObjectController.extend({
  actions: {
    addGenericProperty: function () {
      var property = this.store.createRecord('property');
      this.get('model.properties').addObject(property);
    },

    addBooleanProperty: function () {
      var property = this.store.createRecord('booleanProperty');
      this.get('model.properties').addObject(property);
    },

    addDateProperty: function () {
      var property = this.store.createRecord('dateProperty');
      this.get('model.properties').addObject(property);
    }
  }
});
