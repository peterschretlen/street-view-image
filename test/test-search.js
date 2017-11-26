'use strict';

const assert = require('chai').assert;

const svs = require('../src/streetViewSearch');

const result = require('./data/searchResult.json');

let svSpec;

describe("Search Result Spec Test", function() {
    beforeEach( async function() {
    	svSpec = svs.getImageSpec(result);
    });
    describe("data attributes", function() {
        it("should have an address", function() {
            assert.equal("1509 Danforth Ave", svSpec.address);
        });
        it("should have 61 panoids", function() {
            assert.equal( 61, svSpec.pano.length);
        });        
        it("should have expected fields", function() {
            assert.equal( "QFLYaTpGIMtjc2lr6URgnA", svSpec.pano[54].id);
        });        

    });
});

