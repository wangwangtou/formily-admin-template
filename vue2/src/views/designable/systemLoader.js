const _MODULE_STATES = {
}
export const loadModule = async function(moduleName) {
  const {
    _module,
    _waitHandles
  } = _MODULE_STATES[moduleName] = _MODULE_STATES[moduleName] || {
    _module: null,
    _waitHandles: []
  }
  if (_module) {
    if (_module.loading) {
      return new Promise((resolve, reject) => {
        _waitHandles.push({ resolve, reject })
      })
    } else {
      return _module
    }
  } else {
    _MODULE_STATES[moduleName]._module = { loading: true }
    return new Promise((resolve, reject) => {
      _waitHandles.push({ resolve, reject })
      window.System.import(moduleName).then(editorModule => {
        _MODULE_STATES[moduleName] = {
          _module: editorModule,
          _waitHandles: []
        }
        _waitHandles.map(({ resolve }) => resolve(editorModule))
      }).catch(err => {
        _MODULE_STATES[moduleName] = {
          _module: null,
          _waitHandles: []
        }
        _waitHandles.map(({ reject }) => reject(err))
      })
    })
  }
}
