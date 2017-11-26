'use strict';

const moment = require('moment');
const util = require('util');
const axios = require('axios');
const vm = require('vm');
const _ = require('lodash');

const search = async (lat, lon) => {
	const url = `https://maps.googleapis.com/maps/api/js/GeoPhotoService.SingleImageSearch?pb=!1m5!1sapiv3!5sUS!11m2!1m1!1b0!2m4!1m2!3d${lat}!4d${lon}!2d50!3m10!2m2!1sen!2sGB!9m1!1e2!11m4!1m3!1e2!2b1!3e2!4m10!1e1!1e2!1e3!1e4!1e8!1e6!5m1!1e2!6m1!1e2&callback=_xdc_v2mub5`;

	const response = await axios.get(url, { responseType: 'text' }).catch( error => console.log(error) );

	const jsonpSandbox = vm.createContext({ _xdc_v2mub5 : function(r){return r;}});

	const jsonObj = vm.runInContext(response.data, jsonpSandbox, {displayErrors: true});

	return jsonObj;
};

const getImageSpec = (obj) => {

	//geocoded address =  jq '.[1][3][2][0][0]'
	//long array of panoids:  jq '.[1][5][0][3][0] | length'
	//date values:    cat testobj.json | jq '.[1][5][0][8] | map( { index: .[0], year: .[1][0], month : .[1][1] } )'

	const address = obj[1][3][2][0][0];
	const panoSpecs = obj[1][5][0][3][0].map( s => {

		console.log(s);

		return {
			id: _.get(s, '[0][1]', ''),
			lat: _.get(s, '[2][0][2]', 0),
			lon: _.get(s, '[2][0][3]', 0),
			p1: _.get(s, '[2][1][0]', 0), 
			p2: _.get(s, '[2][2][0]', 0), 
			p3: _.get(s, '[2][2][1]', 0), 
			p4: _.get(s, '[2][2][2]', 0) 
		}
	})


	const spec = {
		address: address,
		pano : panoSpecs
	}

	return spec;
}

module.exports.search = search; 
module.exports.getImageSpec = getImageSpec; 