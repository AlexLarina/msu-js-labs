'use strict';

var stringToConvert = '1010101';

/**
 * Converting a string with binary number into decimal
 * @param {string} conversionString - string to be converted
 * @returns {type} or {number}
 */
var converter = function (conversionString) {

    var convertedValue;

    var notBinary = /[^01]/;
    convertedValue = (notBinary.test(conversionString)) ? undefined : parseInt(conversionString, 2);
    
    return convertedValue;
}

converter(stringToConvert); // returns 85