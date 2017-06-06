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
    it('should return error \'Packages must be of type array.\'', function() {
      var input = {};
      expect(function() {
        packageInstaller.install(input);
      }).to.throw('Packages must be of type array.');
    })
    it('should return error \'All packages must be of type string.\'', function() {
      var input = ["Pkg1: Dependency1", {}, "Pkg2: Dependency2"];
      expect(function() {
        packageInstaller.install(input);
      }).to.throw('All packages must be of type string.');
    })
    it('should return error \'Package does not match expected format of \'Package: Dependency\'.\'', function() {
      var input = [": Dependency1", "Pkg2: Dependency2"];
      expect(function() {
        packageInstaller.install(input);
      }).to.throw('Package does not match expected format of \'Package: Dependency\'.');
    })
  })
})
