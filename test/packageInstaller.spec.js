var assert = require('chai').assert;
var expect = require('chai').expect;
var packageInstaller = require('../js/packageinstaller.js');
var should = require('chai').should();

describe('PackageInstaller', function () {
  describe('validate', function() {
    it('should return error \'Packages are required.\'', function() {
      var input = null;
      expect(function() {
        packageInstaller.validate(input);
      }).to.throw('Packages are required.');
    })
    it('should return error \'Packages must be of type array.\'', function() {
      var input = {};
      expect(function() {
        packageInstaller.validate(input);
      }).to.throw('Packages must be of type array.');
    })
    it('should return error \'All packages must be of type string.\'', function() {
      var input = ["Pkg1: Dependency1", {}, "Pkg2: Dependency2"];
      expect(function() {
        packageInstaller.validate(input);
      }).to.throw('All packages must be of type string.');
    })
    it('should return error \'Package does not match expected format of \'Package: Dependency\'.\' (no package)', function() {
      var input = [": Dependency1", "Pkg2: Dependency2"];
      expect(function() {
        packageInstaller.validate(input);
      }).to.throw('Package does not match expected format of \'Package: Dependency\'.');
    })
    it('should return error \'Package does not match expected format of \'Package: Dependency\'.\' (double space)', function() {
      var input = ["DoubleSpace:  Dependency1", "Pkg2: Dependency2"];
      expect(function() {
        packageInstaller.validate(input);
      }).to.throw('Package does not match expected format of \'Package: Dependency\'.');
    })
    it('should return error \'Package does not match expected format of \'Package: Dependency\'.\' (no space)', function() {
      var input = ["NoSpace:Dependency", "Pkg2: Dependency2"];
      expect(function() {
        packageInstaller.validate(input);
      }).to.throw('Package does not match expected format of \'Package: Dependency\'.');
    })
  })
})
