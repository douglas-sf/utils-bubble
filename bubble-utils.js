function Utils(context) {
  function useAsync(fn, ...args) {
    return context.async((cb) => {
      fn(...args)
        .then((response) => cb(null, response))
        .catch((err) => cb(err, null));
    });
  }

  function formatToBubbleDatatypeObject(data, initialPrefix = '') {
    if (typeof data !== 'object') return data;

    let result = {};

    Object.entries(data).forEach((entry) => {
      const [oldKey, oldValue] = entry;

      const key = initialPrefix + oldKey;

      if (typeof oldValue !== 'object') {
        result[key] = oldValue;
      } else if (oldValue instanceof Array) {
        result[key] = oldValue.map((vlw) => transformNestedObject(vlw, initialPrefix));
      } else {
        const prefix = key + '.';
        const newData = transformNestedObject(oldValue, prefix);
        result = { ...result, ...newData };
      }
    });

    return result;
  }

  return { useAsync, formatToBubbleDatatypeObject };
}
