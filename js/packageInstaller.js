function PackageInstaller() {
  return {
    install: install,
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
      if (!pkg.match(/^\w+(: )(\w+)|\w+(: $)/ig)) {
        throw 'Package does not match expected format of \'Package: Dependency\'.';
      }
    });

    return true;
  }
}

module.exports = PackageInstaller();
