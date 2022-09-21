exports.runOnFieldUpdate = (path, fn) =>
  function (next) {
    if (!this.isModified(path)) return next()
    console.log(this, path, fn)
    fn.bind(this, next)()
  }
