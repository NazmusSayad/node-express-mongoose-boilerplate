exports.runOnFieldUpdate = (path, fn) =>
  function (next) {
    if (!this.isModified(path)) return next()
    fn.bind(this, next)()
  }
