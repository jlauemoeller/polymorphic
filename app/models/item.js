export default DS.Model.extend({
  properties: DS.hasMany('property', {polymorphic: true})
});
