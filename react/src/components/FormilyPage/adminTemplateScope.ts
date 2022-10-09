import { useUserState } from '@/hooks'
import { Field } from '@formily/core'
import { useNavigate, useSearchParams } from 'react-router-dom'

const FORM = {
  useTipCapsLock: function(field: Field, eventName: string) {
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
  }
}
const ADMIN = {
  useLogin(field: Field) {
    const { userActions: { login } } = useUserState()
    const [ searchParams ] = useSearchParams()
    const navigate = useNavigate()
    return async function onClick() {
      field.setComponentProps({
        loading: true
      })
      try {
        const { username, password } = await field.form.submit()
        await login({ username, password })
        const getOtherQuery = (searchParams: URLSearchParams): URLSearchParams => {
          const res = new URLSearchParams()
          for (const key in searchParams.entries()) {
            if (key !== 'redirect') {
              res.set(key, searchParams.get(key))
            }
          }
          return res
        }
        const query = getOtherQuery(searchParams).toString()
        navigate(searchParams.get('redirect') || '/' + (query ? '?' + query : ''))
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
