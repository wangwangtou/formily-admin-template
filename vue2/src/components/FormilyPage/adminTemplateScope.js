import store from '../../store'
import router from '../../router'

const FORM = {
  /**
   * @param {import('@formily/core').Field} field
   * @returns {Function}
   */
  useTipCapsLock: function(field, eventName) {
    field.setComponentProps({
      'onNativeKeyup': function onkeyup(e) {
        var valCapsLock = e.key
        var valShift = e.shiftKey
        field.query('.').take(tip => {
          const open = (valCapsLock >= 'a' && valCapsLock <= 'z' && valShift) ||
          (valCapsLock >= 'A' && valCapsLock <= 'Z' && !valShift)
          tip.setComponentProps({
            open
          })
        })
      },
      'onBlur': function onblur() {
        field.query('.').take(tip => {
          tip.setComponentProps({
            open: false
          })
        })
      }
    })
    // if (eventName === 'blur') {
    //   return function onblur() {
    //     field.query('.').take(tip => {
    //       tip.setComponentProps({
    //         open: false
    //       })
    //     })
    //   }
    // }
    // return function onkeyup(e) {
    //   var valCapsLock = e.key
    //   var valShift = e.shiftKey
    //   field.query('.').take(tip => {
    //     const open = (valCapsLock >= 'a' && valCapsLock <= 'z' && valShift) ||
    //     (valCapsLock >= 'A' && valCapsLock <= 'Z' && !valShift)
    //     tip.setComponentProps({
    //       open
    //     })
    //   })
    // }
  }
}
const ADMIN = {
  /**
   * @param {import('@formily/core').Field} field
   * @returns {Function}
   */
  useLogin: function(field) {
    return async function onClick() {
      field.setComponentProps({
        loading: true
      })
      try {
        const data = await field.form.submit()
        await store.dispatch('user/login', data)
        const getOtherQuery = (query) => {
          return Object.keys(query).reduce((acc, cur) => {
            if (cur !== 'redirect') {
              acc[cur] = query[cur]
            }
            return acc
          }, {})
        }
        const query = router.currentRoute.query || {}
        router.push({ path: query.redirect || '/', query: getOtherQuery(query) })
      } catch (e) {
        console.log('error submit!', e)
      }
      field.setComponentProps({
        loading: false
      })
    }
  }
}
const VALIDATOR = {
  userName() {
    return function validate(str) {
      const valid_map = ['admin', 'editor']
      return valid_map.indexOf(str.trim()) >= 0
    }
  }
}
export { FORM, ADMIN, VALIDATOR }
