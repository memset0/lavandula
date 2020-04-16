if (require.main == module) {
	lavandula = {}
	require('./utils.js')
}

lavandula.algorithm = {
	int: {},
	poly: {}
}

let utils = lavandula.utils
let algorithm = lavandula.algorithm
let int = lavandula.algorithm.int
let poly = lavandula.algorithm.poly

int.from = num => BigInt(num)
int.fromArray = arr => {
	let res = new Array()
	arr.forEach(val => res.push(int.from(val)))
	return res
}
int.export = num => parseInt(num)
int.exportArray = arr => {
	let res = new Array()
	arr.forEach(val => res.push(int.export(val)))
	return res
}

int.resize = (arr, except) => {
	res = arr.slice(0, except)
	while (res.length < except) {
		res.push(0)
	}
	return int.fromArray(res)
}

int.mod = 998244353n
int.set_mod = mod => (int.mod = int.from(mod))

int.inc = (x, y) => {
	let res = int.from(x) + int.from(y)
	return res >= int.mod ? res - int.mod : res;
}
int.sub = (x, y) => {
	let res = int.from(x) - int.from(y)
	return res < 0 ? res + int.mod : res;
}
int.mul = (x, y) => {
	return int.from(x) * int.from(y) % int.mod
}
int.pow = (a, b) => {
	a = int.from(a)
	b = int.from(b) % (int.mod - 1n)
	let s = 1n;
	for (; b; b >>= 1n, a = int.mul(a, a))
		if (b & 1n) {
			s = int.mul(s, a)
		}
	return s;
}
int.inv = x => int.pow(x, int.mod - 2n)
int.opp = x => (x === 0n ? 0 : int.sub(int.mod, x))

int.min = function (...arg) {
	let res = arg[0]
	for (let i = 0; i < arg.length; i++)
		if (arg[i] < res) {
			res = arg[i]
		}
	return int.export(res)
}

int.max = function (...arg) {
	let res = arg[0]
	for (let i = 0; i < arg.length; i++)
		if (arg[i] > res) {
			res = arg[i]
		}
	return int.export(res)
}

int.cipolla = function (num) {
	let key = null, sqr = null
	function merge(a, b) {
		return [
			int.inc(int.mul(a[0], b[0]), int.mul(int.mul(a[1], b[1]), sqr)),
			int.inc(int.mul(a[0], b[1]), int.mul(a[1], b[0]))
		]
	}
	do {
		key = utils.random(int.export(int.mod))
		sqr = int.sub(int.mul(key, key), num)
	} while (int.pow(sqr, (int.mod - 1n) >> 1n) != int.mod - 1n)
	let s = [1, 0], a = [key, 1]
	for (let b = (int.mod + 1n) >> 1n; b; b >>= 1n, a = merge(a, a))
		if (b & 1n) {
			s = merge(s, a)
		}
	return int.export(int.min(s[0], int.sub(int.mod, s[0])))
}

algorithm.dft = function (src) {
	let lim = 1, k = 0
	while (lim < src.length) {
		lim <<= 1;
		k++;
	}
	let mu = new Array(lim)
	let arr = new Array(lim)
	let rev = new Array(lim)
	for (let i = 0; i < lim; i++) {
		rev[i] = (rev[i >> 1] >> 1) | ((i & 1) << (k - 1))
		arr[rev[i]] = i < src.length ? int.from(src[i]) : 0n
	}
	mu[0] = 0n
	for (let len = 1; len < lim; len <<= 1) {
		mu_root = int.pow(3, (int.mod - 1n) / int.from(len << 1))
		mu[len] = 1n
		for (let i = 1; i < len; i++) {
			mu[i + len] = int.mul(mu[i + len - 1], mu_root);
		}
	}
	for (let len = 1; len < lim; len <<= 1)
		for (let i = 0; i < lim; i += (len << 1))
			for (let j = 0; j < len; j++) {
				let x = arr[i + j]
				let y = int.mul(arr[i + j + len], mu[j + len])
				arr[i + j] = int.inc(x, y)
				arr[i + j + len] = int.sub(x, y)
			}
	return int.exportArray(arr)
}

algorithm.idft = function (src) {
	let arr = algorithm.dft(src)
	let inv = int.inv(arr.length)
	for (let i = 1, j = arr.length - 1; i < j; i++, j--) {
		let tmp = arr[i]
		arr[i] = arr[j]
		arr[j] = tmp
	}
	for (let i = 0; i < arr.length; i++) {
		arr[i] = int.mul(arr[i], inv);
	}
	return int.exportArray(arr)
}

poly.inc = function (arr, oth) {
	let res = new Array()
	let len = int.max(arr.length, oth.length)
	for (let i = 0; i < len; i++) {
		let val = 0
		if (i < arr.length) val = int.inc(val, arr[i])
		if (i < oth.length) val = int.inc(val, oth[i])
		res.push(val)
	}
	return res
}

poly.sub = function (arr, oth) {
	let res = new Array()
	let len = int.max(arr.length, oth.length)
	for (let i = 0; i < len; i++) {
		let val = 0
		if (i < arr.length) val = int.inc(val, arr[i])
		if (i < oth.length) val = int.sub(val, oth[i])
		res.push(val)
	}
	return res
}

poly.mul = function (arr, oth) {
	let len = arr.length + oth.length - 1
	let arr_dfted = algorithm.dft(int.resize(arr, len))
	let oth_dfted = algorithm.dft(int.resize(oth, len))
	for (let i = 0; i < arr_dfted.length; i++) {
		arr_dfted[i] = int.mul(arr_dfted[i], oth_dfted[i])
	}
	let res = int.resize(algorithm.idft(arr_dfted), len)
	return int.exportArray(res)
}

poly.inv = function (src) {
	if (src.length == 1) {
		return [int.export(int.inv(src[0]))]
	}
	let arr = int.fromArray(src)
	let oth = poly.inv(int.resize(src, (src.length + 1) >> 1))
	let len = arr.length * 2 - 1
	let arr_dfted = algorithm.dft(int.resize(arr, len))
	let oth_dfted = algorithm.dft(int.resize(oth, len))
	for (let i = 0; i < arr_dfted.length; i++) {
		arr_dfted[i] = int.mul(oth_dfted[i], int.sub(2, int.mul(arr_dfted[i], oth_dfted[i])))
	}
	let res = int.resize(algorithm.idft(arr_dfted), src.length)
	return int.exportArray(res)
}

poly.int = function (arr) {
	let res = new Array()
	res.push(0n)
	for (let i = 0; i < arr.length - 1; i++) {
		res.push(int.mul(int.from(arr[i]), int.inv(i + 1)))
	}
	return int.exportArray(res)
}

poly.der = function (arr) {
	let res = new Array()
	for (let i = 1; i < arr.length; i++) {
		res.push(int.mul(int.from(arr[i]), int.from(i)))
	}
	res.push(0n)
	return int.exportArray(res)
}

poly.ln = function (arr) {
	let der = poly.mul(poly.der(arr), poly.inv(arr))
	let res = poly.int(int.resize(der, arr.length))
	return int.exportArray(res)
}

poly.exp = function (src) {
	if (src.length == 1) {
		return [1]
	}
	let arr = poly.exp(int.resize(src, (src.length + 1) >> 1))
	let oth = poly.ln(int.resize(arr, src.length))
	for (let i = 0; i < src.length; i++) {
		oth[i] = int.opp(oth[i])
	}
	oth[0] = int.inc(oth[0], 1)
	for (let i = 0; i < src.length; i++) {
		oth[i] = int.inc(oth[i], src[i])
	}
	let res = int.resize(poly.mul(arr, oth), src.length)
	return int.exportArray(res)
}

poly.sqrt = function (src) {
	if (src.length == 1) {
		return [int.cipolla(src[0])]
	}
	let arr = poly.sqrt(int.resize(src, (src.length + 1) >> 1))
	let part1 = poly.inc(int.resize(poly.mul(arr, arr), src.length), src)
	let part2 = poly.inv(int.resize(poly.inc(arr, arr), src.length))
	let res = int.resize(poly.mul(part1, part2), src.length)
	return int.exportArray(res)
}

if (require.main == module) {
	// debugger goes here...
}