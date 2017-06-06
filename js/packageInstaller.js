function PackageInstaller() {
  return {
    install: install
  };

  /**
   * @function install
   * @desc Parses and returns packages as a string.
   * @param {Array} packages - Input array of packages as Package: Dependency strings for installation.
   * @returns {string} packages result
   */
  function install(packages) {
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
      if (pkg.indexOf(':') < 1) {
        //todo change indexOf to regEx pattern matching
        throw 'Package does not match expected format of \'Package: Depdency\' ';
      }
    });

    return packages;
  }
}

module.exports = PackageInstaller();
