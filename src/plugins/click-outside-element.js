export default {
  install (Vue) {
    Vue.directive('click-outside', {
      bind: function (element, binding, vnode) {
        element.clickOutsideEvent = function (event) {
          if (!(element === event.target || element.contains(event.target))) {
            binding.value(event)
          }
        }
        document.body.addEventListener('click', element.clickOutsideEvent)
      },
      unbind: function (element) {
        document.body.removeEventListener('click', element.clickOutsideEvent)
      }
    })
  }
}
