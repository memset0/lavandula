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

int.set_mod = mod => {
	int.mod = parseInt(mod)
	int.MOD = BigInt(int.mod)
}
int.set_mod(998244353)

int.inc = (x, y) => {
	let res = x + y
	return res >= int.mod ? res - int.mod : res;
}
int.sub = (x, y) => {
	let res = x - y
	return res < 0 ? res + int.mod : res;
}
int.mul = (x, y) => {
	return parseInt(BigInt(x) * BigInt(y) % int.MOD)
}
int.pow = (a, b) => {
	b = parseInt(BigInt(b) % (int.MOD - 1n))
	let s = 1;
	for (; b; b >>= 1, a = int.mul(a, a))
		if (b & 1) {
			s = int.mul(s, a)
		}
	return s;
}
int.inv = x => int.pow(x, int.mod - 2)
int.opp = x => (x === 0 ? 0 : int.sub(int.mod, x))

int.min = function (...arg) {
	let res = arg[0]
	for (let i = 0; i < arg.length; i++)
		if (arg[i] < res) {
			res = arg[i]
		}
	return res
}

int.max = function (...arg) {
	let res = arg[0]
	for (let i = 0; i < arg.length; i++)
		if (arg[i] > res) {
			res = arg[i]
		}
	return res
}

poly.copy = arr => arr.slice()
poly.resize = (arr, except) => {
	res = arr.slice(0, except)
	while (res.length < except) {
		res.push(0)
	}
	return poly.copy(res)
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
		key = utils.random(int.mod)
		sqr = int.sub(int.mul(key, key), num)
	} while (int.pow(sqr, (int.mod - 1) >> 1) != int.mod - 1)
	let s = [1, 0], a = [key, 1]
	for (let b = (int.mod + 1) >> 1; b; b >>= 1, a = merge(a, a))
		if (b & 1) {
			s = merge(s, a)
		}
	return int.min(s[0], int.sub(int.mod, s[0]))
}

algorithm.dft = function (src) {
	let lim = 1, k = 0
	while (lim < src.length) {
		lim <<= 1;
		k++;
	}
	let rev = new Array()
	for (let i = 0; i < lim; i++) {
		rev.push((rev[i >> 1] >> 1) | ((i & 1) << (k - 1)))
	}
	let mu = new Array(lim)
	mu[0] = 0
	for (let len = 1; len < lim; len <<= 1) {
		mu_root = int.pow(3, (int.mod - 1) / (len << 1))
		mu[len] = 1
		for (let i = 1; i < len; i++) {
			mu[i + len] = int.mul(mu[i + len - 1], mu_root);
		}
	}
	let arr = new Array()
	for (let i = 0; i < lim; i++) {
		arr.push(rev[i] < src.length ? src[rev[i]] : 0)
	}
	for (let len = 1; len < lim; len <<= 1)
		for (let i = 0; i < lim; i += (len << 1))
			for (let j = 0; j < len; j++) {
				let x = arr[i + j]
				let y = int.mul(arr[i + j + len], mu[j + len])
				arr[i + j] = int.inc(x, y)
				arr[i + j + len] = int.sub(x, y)
			}
	return arr
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
	return arr
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
	let arr_dfted = algorithm.dft(poly.resize(arr, len))
	let oth_dfted = algorithm.dft(poly.resize(oth, len))
	for (let i = 0; i < arr_dfted.length; i++) {
		arr_dfted[i] = int.mul(arr_dfted[i], oth_dfted[i])
	}
	let res = poly.resize(algorithm.idft(arr_dfted), len)
	return res
}

poly.inv = function (arr) {
	if (arr.length == 1) {
		return [int.inv(arr[0])]
	}
	let oth = poly.inv(poly.resize(arr, (arr.length + 1) >> 1))
	let len = arr.length * 2 - 1
	let arr_dfted = algorithm.dft(poly.resize(arr, len))
	let oth_dfted = algorithm.dft(poly.resize(oth, len))
	for (let i = 0; i < arr_dfted.length; i++) {
		arr_dfted[i] = int.mul(oth_dfted[i], int.sub(2, int.mul(arr_dfted[i], oth_dfted[i])))
	}
	let res = poly.resize(algorithm.idft(arr_dfted), arr.length)
	return res
}

poly.int = function (arr) {
	let res = new Array()
	res.push(0)
	for (let i = 0; i < arr.length - 1; i++) {
		res.push(int.mul(arr[i], int.inv(i + 1)))
	}
	return res
}

poly.der = function (arr) {
	let res = new Array()
	for (let i = 1; i < arr.length; i++) {
		res.push(int.mul(arr[i], i))
	}
	res.push(0)
	return res
}

poly.ln = function (arr) {
	let der = poly.mul(poly.der(arr), poly.inv(arr))
	let res = poly.int(poly.resize(der, arr.length))
	return res
}

poly.exp = function (arr) {
	if (arr.length == 1) {
		return [1]
	}
	let part1 = poly.exp(poly.resize(arr, (arr.length + 1) >> 1))
	let part2 = poly.ln(poly.resize(part1, arr.length))
	for (let i = 0; i < arr.length; i++) {
		part2[i] = int.opp(part2[i])
	}
	part2[0] = int.inc(part2[0], 1)
	for (let i = 0; i < arr.length; i++) {
		part2[i] = int.inc(part2[i], arr[i])
	}
	let res = poly.resize(poly.mul(part1, part2), arr.length)
	return res
}

poly.sqrt = function (arr) {
	if (arr.length == 1) {
		return [int.cipolla(arr[0])]
	}
	let cur = poly.sqrt(poly.resize(arr, (arr.length + 1) >> 1))
	let part1 = poly.inc(poly.resize(poly.mul(cur, cur), arr.length), arr)
	let part2 = poly.inv(poly.resize(poly.inc(cur, cur), arr.length))
	let res = poly.resize(poly.mul(part1, part2), arr.length)
	return res
}

poly.pow = function (src, b) {
	let res = [1]
	let arr = poly.copy(src)
	for (; b; b >>= 1, arr = poly.resize(poly.mul(arr, arr), src.length))
		if (b & 1) {
			res = poly.resize(poly.mul(res, arr), src.length)
		}
	return res
}

poly.challenge = function (arr, k) {
	let part1 = poly.inc(arr, [int.sub(2, arr[0])])
	let part2 = poly.exp(poly.int(poly.inv(poly.sqrt(arr))))
	let part3 = poly.inc(poly.ln(poly.sub(part1, part2)), [1])
	let part4 = poly.der(poly.pow(part3, k))
	return poly.resize(part4, arr.length - 1)
}

if (require.main == module) {
	// debugger goes here...
	console.log(poly.challenge([1, 9, 2, 6, 0, 8, 1, 7], 19260817))
}