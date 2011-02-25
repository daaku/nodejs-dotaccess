module.exports.set = set
module.exports.get = get

function parts(key) {
  if (Array.isArray(key)) return key
  return key.split('.')
}

function set(obj, key, value, overwrite) {
  key = parts(key)
  var lastKey = key.pop()
  for (var i=0, l=key.length; i<l; i++) {
    var part = key[i]
    if (!(part in obj)) obj[part] = {}
    obj = obj[part]
    if (!obj) throw new Error('dotaccess: incompatible value in ' + part)
  }
  if (overwrite || !(lastKey in obj)) obj[lastKey] = value
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
