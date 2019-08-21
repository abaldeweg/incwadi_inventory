import store from '../store'

function getClass (state) {
  return {
    notification: true,
    notification_neutral: state === 'neutral',
    notification_success: state === 'success',
    notification_caution: state === 'caution',
    notification_error: state === 'error'
  }
}

export default function (msg, state, timer) {
  store.dispatch(
    'notification/add',
    {
      id: new Date().getTime(),
      msg: msg,
      state: state || 'neutral',
      class: getClass(state),
      timer: timer || 5000
    },
    {
      root: true
    }
  )
}
