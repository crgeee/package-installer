function PackageInstaller() {
  return {
    install: install,
    isEmptyOrWhitespace: isEmptyOrWhitespace,
    validate: validate
  };

  /**
   * @function install
   * @desc Parses and returns packages as a string.
   * @param {Array} packages - Input array of packages as Package: Dependency strings for installation.
   * @returns {string} packages result
   */
  function install(packages) {
    validate(packages);

    var parsedPackagesObj = {};
    var returnResults;

    for (var i = 0; i < packages.length; i++) {
      // split array into two and get Package & Dependency
      var splitArr = packages[i].split(': ');
      var thisPackage = splitArr[0].trim();
      var thisDependency = splitArr[1].trim();

      // check if dependency exists and is in the object.
      // add property if exists and is not in object
      if (!isEmptyOrWhitespace(thisDependency) && !parsedPackagesObj[thisDependency]) {
        parsedPackagesObj[thisDependency] = [];
      }

      // check if package exists and is in the object.
      // add property if exists and is not in object
      if (!parsedPackagesObj[thisPackage]) {
        parsedPackagesObj[thisPackage] = [];
      }

      // check if dependency exists.
      // if true, push to the package's array as a dependency
      if (!isEmptyOrWhitespace(thisDependency)) {
        parsedPackagesObj[thisPackage].push(thisDependency);
      }
    }
  }

  /**
   * @function isEmptyOrWhitespace
   * @desc Determines if provided string is empty (null, undefined) or whitespace.
   * @param {string} str - input string to check.
   * @returns {boolean} true or false if it is empty or whitespace.
   */
  function isEmptyOrWhitespace(str) {
    return str == null || str.length < 1 || str.match(/^ *$/) !== null;
  }

  /**
   * @function validate
   * @desc Parses input array, determines if valid and returns package.
   * @param {Array} packages - input of install packages string array.
   * @returns {boolean} result if packages are valid.
   */
  function validate(packages) {
    if (packages == null) {
      throw 'Packages are required.';
    }

    if (!Array.isArray(packages)) {
      throw 'Packages must be of type array.';
    }

    packages.forEach(function(pkg) {
      if (typeof pkg !== 'string') {
        throw 'All packages must be of type string.';
      }
      if (!pkg.match(/^\w+(: )(\w+)\S$|\w+(: $)/ig)) {
        throw 'Package does not match expected format of \'Package: Dependency\'.';
      }
    });

    return true;
  }
}

module.exports = PackageInstaller();
