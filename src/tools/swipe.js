
import store from './store';
import Log from 'tools/log';

function Swipe () {
  let start = 0;
  let end = 0;

  function use (config) {
    return new Promise((resolve) => {
      init();
      Log('App', 'use swipe');
      resolve(config);
    }).catch((err) => { throw new Error(err); });
  }

  function touchstart (e) {
    start = e.touches[0].clientX;
  }

  function touchend (e) {
    end = e.changedTouches[0].clientX;
    const dist = Math.abs(end - start);
    if (dist > 50) {
      store.set('swipe', { forward: (start - end) > 0 });
    }
  }

  function init () {
    window.addEventListener('touchstart', touchstart);
    window.addEventListener('touchend', touchend);
  }

  function remove () {
    window.removeEventListener('touchstart', touchstart);
    window.removeEventListener('touchend', touchend);
  }

  return {
    use,
    init,
    remove
  };
}
export default Swipe();
