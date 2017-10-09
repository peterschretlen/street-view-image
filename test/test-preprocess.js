'use strict';

const assert = require('chai').assert;

const preprocess = require('../src/preprocess');

let svSequence;

describe("Pre-Process Test", function() {
    beforeEach(function() {
    	svSequence = preprocess.load('./data/street_view_sequence.txt');    
    });
    describe("data attributes", function() {
        it("should have 92 entries", function() {
            assert.equal(92, svSequence.length);
        });
        it("should have lat/lon pairs", function() {
            assert.equal( 90.0, svSequence[0].lat);
            assert.equal( 90.0, svSequence[0].lon);
        });
        it("should have a panoid", function() {
            assert.equal( 90.0, svSequence[0].panoid);
        });        
        it("should have a date (month-year)", function() {
            assert.equal( 90.0, svSequence[0].month);
            assert.equal( 90.0, svSequence[0].year);
        });                
    });
});

