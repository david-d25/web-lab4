export default function () {
  let map = {};
  let maxBufferLength = 0;
  let buffer = '';

  this.addCheatListener = function (code, handler) {
    map[code.toUpperCase()] = handler;

    for (let it in map)
      if (it.length > maxBufferLength)
        maxBufferLength = it.length;
  };

  window.addEventListener('keypress', onKeyPress);

  function onKeyPress(event) {
    if (event.key.length === 1) { // It's a character key
      buffer += event.key.toUpperCase();
      if (buffer.length > maxBufferLength)
        buffer = buffer.substring(1);

      for (let it in map) {
        if (buffer.endsWith(it)) {
          map[it]();
        }
      }
    }
  }
};