var dotaccess = require('dotaccess')

exports['get stuff'] = function(assert, beforeExit) {
  var obj = {
    answer: 42,
    deep: {
      trench: 43,
      'funky names': 44,
      'including a .': 45
    }
  }

  assert.equal(42, dotaccess.get(obj, 'answer'), 'Expect 42 - dot string')
  assert.equal(42, dotaccess.get(obj, ['answer']), 'Expect 42 - array')
  assert.equal(43, dotaccess.get(obj, 'deep.trench'), 'Expect 43 - dot string')
  assert.equal(43, dotaccess.get(obj, ['deep', 'trench']), 'Expect 43 - array')
  assert.equal(44, dotaccess.get(obj, 'deep.funky names'), 'Expect 44 - dot string')
  assert.equal(45, dotaccess.get(obj, ['deep', 'including a .']), 'Expect 45 - array')
  assert.equal(46, dotaccess.get(obj, 'missing', 46), 'Expect 46')
  assert.equal(46, dotaccess.get(obj, ['missing'], 46), 'Expect 46')
}

exports['set stuff'] = function(assert, beforeExit) {
  var obj = {
    existing: {
      one: 47
    }
  }

  dotaccess.set(obj, 'answer', 42)
  dotaccess.set(obj, 'deep.trench', 43)
  dotaccess.set(obj, ['deep', 'funky names'], 44)
  dotaccess.set(obj, ['deep', 'including a .'], 45)
  dotaccess.set(obj, 'existing.one', 'foo bared')

  assert.equal(42, dotaccess.get(obj, 'answer'), 'Expect 42 - dot string')
  assert.equal(42, dotaccess.get(obj, ['answer']), 'Expect 42 - array')
  assert.equal(43, dotaccess.get(obj, 'deep.trench'), 'Expect 43 - dot string')
  assert.equal(43, dotaccess.get(obj, ['deep', 'trench']), 'Expect 43 - array')
  assert.equal(44, dotaccess.get(obj, 'deep.funky names'), 'Expect 44 - dot string')
  assert.equal(45, dotaccess.get(obj, ['deep', 'including a .']), 'Expect 45 - array')
  assert.equal(46, dotaccess.get(obj, 'missing', 46), 'Expect 46')
  assert.equal(46, dotaccess.get(obj, ['missing'], 46), 'Expect 46')
  assert.equal(47, dotaccess.get(obj, ['existing', 'one']), 'Expect 47 - array')
}

exports['failed sets'] = function(assert, beforeExit) {
  var obj = {
    bool: true,
    integer: 42,
    floating: 0.5
  }

  assert.throws(function() {
    dotaccess.set(obj, 'bool.one', 42);
  }, 'cant hang off a boolean');

  assert.throws(function() {
    dotaccess.set(obj, 'integer.one', 42);
  }, 'cant hang off a integer');

  assert.throws(function() {
    dotaccess.set(obj, 'floating.one', 42);
  }, 'cant hang off a float');
}
