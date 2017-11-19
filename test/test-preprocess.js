'use strict';

const assert = require('chai').assert;

const preprocess = require('../src/preprocess');

let svSequence;

describe("Pre-Process Test", function() {
    beforeEach( async function() {
    	svSequence = await preprocess.load('./test/data/street_view_sequence.txt');
    });
    describe("data attributes", function() {
        it("should have 92 entries", function() {
            assert.equal(92, svSequence.length);
        });
        it("should have lat/lon pairs", function() {
            assert.equal( 43.6858598, svSequence[0].lat);
            assert.equal( -79.3119806, svSequence[0].lon);
        });
        it("should have a panoid", function() {
            assert.equal( 'D517TPevWUs8JDlP2ahItA', svSequence[91].pano);
        });        
        it("should have a date (month-year)", function() {
            assert.equal( 5, svSequence[0].month);
            assert.equal( 2013, svSequence[0].year);
        });                
    });
});

