export default {
  install: function (Vue) {
    let toaster = null;
    Vue.prototype.$setToaster = function(toasterInstance) {
      toaster = toasterInstance;
    };

    Vue.prototype.$toast = function (text, options) {
      if (toaster)
        toaster.toast(text, options);
      else
        console.warn("Can't find Toaster instance!");
    };
  }
};
