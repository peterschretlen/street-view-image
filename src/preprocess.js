'use strict';

const fs = require('fs');
const byline = require('byline');
const pipe = require('pump-promise');
const through = require('through2');

const process = (result) => through.obj( (obj, enc, cb) => {

	result.push(obj);
	cb(null);

});

const deserialize = () => through.obj( (obj,enc,cb ) => cb(null, obj.toString()));

const load = async (filename) => {

	const result = [];
	const rs = fs.createReadStream(filename);
	const is = byline.createStream( rs ); 
	const pipeline = await pipe( 
			is, 
			deserialize(),
			process(result)
		);

	return result;
};

module.exports.load = load; 