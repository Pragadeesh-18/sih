import DS from 'ember-data';

export default DS.Model.extend({
    timestamp : DS.attr('date'),
    hallSensor: DS.attr('number'),
    Co2Sensor: DS.attr('number')
});
