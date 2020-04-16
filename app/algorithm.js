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

algorithm.dft = function (src) {
	let lim = 1, k = 0
	while (lim < src.length) {
		lim <<= 1;
		k++;
	}
	mu = new Array(lim)
	arr = new Array(lim)
	rev = new Array(lim)
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
		return [int.inv(src[0])]
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