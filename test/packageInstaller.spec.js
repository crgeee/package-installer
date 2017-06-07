var assert = require('chai').assert;
var expect = require('chai').expect;
var packageInstaller = require('../js/packageinstaller.js');
var should = require('chai').should();

describe('PackageInstaller', function() {
  describe('install', function() {
    it('should return string \'CamelCaser, KittenService\'', function() {
      var input = ['KittenService: CamelCaser', 'CamelCaser: '];
      var result = packageInstaller.install(input);
      expect(result).to.have.string('CamelCaser, KittenService');
    })
  })

  describe('isEmptyOrSpaces', function() {
    it('should return true (pass invalid whitespace)', function() {
      assert.equal(packageInstaller.isEmptyOrWhitespace(' '), true);
    })
    it('should return true (pass invalid empty string)', function() {
      assert.equal(packageInstaller.isEmptyOrWhitespace(''), true);
    })
    it('should return true (pass invalid undefined)', function() {
      assert.equal(packageInstaller.isEmptyOrWhitespace(), true);
    })
    it('should return true (pass invalid null)', function() {
      assert.equal(packageInstaller.isEmptyOrWhitespace(null), true);
    })
    it('should return false (pass valid string)', function() {
      assert.equal(packageInstaller.isEmptyOrWhitespace('KittenService: CamelCaser'), false);
    })
    it('should return false (pass valid string)', function() {
      assert.equal(packageInstaller.isEmptyOrWhitespace('CamelCaser: '), false);
    })
  })

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
      var input = ["DoubleSpace:  Dependency1"];
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
    it('should return error \'Package does not match expected format of \'Package: Dependency\'.\' (dependency has space)', function() {
      var input = ["NoSpace:Dependency Is Invalid"];
      expect(function() {
        packageInstaller.validate(input);
      }).to.throw('Package does not match expected format of \'Package: Dependency\'.');
    })
    it('should return without throwing an error (exercise case 1)', function() {
      var input = ['KittenService: CamelCaser', 'CamelCaser: '];
      var result = packageInstaller.validate(input);
      expect(result).to.be.true;
    })
    it('should return without throwing an error (exercise case 2)', function() {
      var input = ['KittenService: ', 'Leetmeme: Cyberportal', 'Cyberportal: Ice', 'CamelCaser: KittenService', 'Fraudstream: Leetmeme', 'Ice: '];
      var result = packageInstaller.validate(input);
      expect(result).to.be.true;
    })
  })
})
