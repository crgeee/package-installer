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

  }

  /**
   * @function validate
   * @desc Parses input array, determines if valid and returns package.
   * @param {Array} packages - input of install packages string array.
   * @returns {Array} packages result after validation.
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
      if (!pkg.match(/([a-z,0-9])\w+(: )([a-z,0-9])\w+/ig)) {
        //todo change indexOf to regEx
        throw 'Package does not match expected format of \'Package: Dependency\'.';
      }
    });

    return packages;
  }
}

module.exports = PackageInstaller();
