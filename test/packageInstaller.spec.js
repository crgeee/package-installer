var assert = require('chai').assert;
var expect = require('chai').expect;
var packageInstaller = require('../js/packageinstaller.js');
var should = require('chai').should();

describe('PackageInstaller', function () {
  describe('install', function() {
    it('should return error \'Packages are required.\'', function() {
      var input = null;
      expect(function() {
        packageInstaller.install(input);
      }).to.throw('Packages are required.');
    })
  })
})
