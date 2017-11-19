'use strict';

const fs = require('fs');
const byline = require('byline');
const pipe = require('pump-promise');
const through = require('through2');
const moment = require('moment');

const process = (result) => through.obj( (url, enc, cb) => {

	const latLonMatch = /maps\/@(-?\d+\.?\d*),(-?\d+\.?\d*),/g.exec(url);

	const svPoint = {};
    svPoint.lat = parseFloat( latLonMatch[1] );
    svPoint.lon = parseFloat( latLonMatch[2] );
    svPoint.heading = parseFloat( /(\d+\.?\d*)h/g.exec(url)[1] );
    svPoint.pitch = parseFloat( /(\d+\.?\d*)t/g.exec(url)[1] ) - 90;
    svPoint.fov = parseFloat( /(\d+\.?\d*)y/g.exec(url)[1] ) * 2 ;
    svPoint.pano = /!1s([^!]*)!/g.exec(url)[1];

    const date = moment( /!5s([^!]*)!/g.exec(url)[1] );

    svPoint.month = date.month();
    svPoint.year = date.year();

	result.push(svPoint);
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