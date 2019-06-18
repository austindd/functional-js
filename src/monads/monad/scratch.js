const { Monad, MonadLazy } = require('./monad');

const { add, subtract, multiply, divide, increment, decrement } = require('../../math/math');

const { consoleDir } = require('../../util/util');



function test_001() {
  const monad = Monad.lift(0);

  monad
    .map(add(1))
    .map(add(2))
    .join()
  
  consoleDir(monad);
}

test_001();
