const exports = module.exports;

const pipe = (...fns) => (...args) => {
	let x = fns[0](...args);
	for (let i = 1, n = fns.length; i < n; i++) {
		x = fns[i](x);	
	}
	return x;
}

const trace = (x) => {
  console.log(x);
  return x;
};

module.exports = {
  pipe: pipe,
  trace: trace,
}
