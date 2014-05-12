module.exports.set = set
module.exports.unset = unset
module.exports.get = get

function parts(key) {
  if (Array.isArray(key)) return key
  return key.split('.')
}

function lookup(obj, key) {
  key = parts(key)
  var lastKey = key.pop()
  for (var i=0, l=key.length; i<l; i++) {
    var part = key[i]
    if (!(part in obj)) obj[part] = {}
    obj = obj[part]
    if (!obj) throw new Error('dotaccess: incompatible value in ' + part)
  }
  return [obj, lastKey];
}

function set(obj, key, value, overwrite) {
  var objectAndKey = lookup(obj, key)
    , obj = objectAndKey[0]
    , key = objectAndKey[1];
  if (overwrite || !(key in obj)) obj[key] = value
}

function unset(obj, key) {
  var objectAndKey = lookup(obj, key)
    , obj = objectAndKey[0]
    , key = objectAndKey[1];
  return delete obj[key];
}

function get(obj, key, def) {
  key = parts(key)
  for (var i=0, l=key.length; i<l; i++) {
    var part = key[i]
    if (!(part in obj)) return def
    obj = obj[part]
  }
  return obj
}
