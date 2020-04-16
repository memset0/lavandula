lavandula.utils = {};
lavandula.create = {};
lavandula.algorithm = {};

(function () {
	let create = lavandula.create

	create.element = function (tag, attr = {}) {
		return $(`<${tag}/>`).attr(attr)
	}

	create.chip = function (text, icon = '') {
		let $chip = $(`
			<div class="lavandula-chip">
				<span class="lavandula-chip-title">${text}</span>
			</div>
		`)
		if (icon) {
			$chip.prepend($(`
				<span class="lavandula-chip-icon">
					<i class="lavandula-icon material-icons">${icon}</i>
				</span>
			`))
		}
		return $chip
	}

	create.checkbox = function (id, checked = false, text = '') {
		return $(`
			<label class="lavandula-checkbox">
				${text}
				<input type="checkbox" ${checked ? 'checked' : ''} id="${id}" />
				<i class="lavandula-checkbox-icon"></i>
			</label>
		`)
	}

	create.icon = function (icon) {
		return $(`
			<i class="lavandula-icon material-icons">${icon}</i>
		`)
	}

	create.icon_button = function (icon) {
		return $(`
			<button class="lavandula-btn lavandula-btn-icon">
				<i class="lavandula-icon material-icons">${icon}</i>
			</button>
		`)
	}

	create.table = function (id, keys, dataset) {
		let $table = $(`
			<div class="lavandula-table-fluid" id="${id}">
				<table class="lavandula-table mdui-table-hoverable">
					<thead></thead>
					<tbody></tbody>
				</table>
			</div>
		`)
		let $thead = $table.find('thead')
		$tr = $('<tr/>').appendTo($thead)
		keys.forEach(key => $tr.append($('<td/>').text(key)))
		let $tbody = $table.find('tbody')
		dataset.forEach(data => {
			$tr = $('<tr/>').appendTo($tbody)
			keys.forEach(key => $tr.append($('<td/>').text(data[key])))
		})
		lavandula.mdui.mutation('#' + id)
		return $table
	}

	create.panel = function (title, $content) {
		let $panel = $(`
			<div class="lavandula-panel-card">
				<div class="lavandula-panel-card-title">${title}</div>
				<div class="lavandula-panel-card-content"></div>
			</div>
		`)
		$panel.children('.lavandula-panel-card-content').append($content)
		return $panel
	}

	create.panel_links = function (title, links) {
		$content = $('<ul/>')
		links.forEach(link => {
			$content.append($(`
				<li><a href="${link.href}" target="_blank">${link.text}</a></li>
			`))
		})
		return create.panel(title, $content)
	}
})();

(function () {
	let utils = lavandula.utils

	utils.md5 = require('./lib/md5.js')
	utils.swap = (a, b) => { b = [a, a = b][0] }
	utils.random = (l) => Math.floor(Math.random() * l)
	utils.random_range = (l, r) => (l + random(r - l))
	utils.random_hash = () => utils.md5(Date() + Math.random() + 114514 + 'Menci TQL!')

})();

(function () {
	let utils = lavandula.utils
	let algorithm = lavandula.algorithm
	
	algorithm.fpow = function (a, b, mod = 998244353) {
		let s = 1;
		for (; b; b >>= 1, a = a * a % mod) {
			if (b & 1) {
				s = s * a % mod;
			}
		}
		return s;
	}
	
	algorithm.resize = function (arr, except) {
		res = arr.slice(0, except)
		while (res.length < except) {
			res.push(0)
		}
		return res
	}
	
	algorithm.dft = function (src, mod = 998244353) {
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
			arr[rev[i]] = i < src.length ? src[i] : 0
		}
		mu[0] = 0
		for (let len = 1; len < lim; len <<= 1) {
			mu_root = algorithm.fpow(3, (mod - 1) / (len << 1), mod)
			mu[len] = 1
			for (let i = 1; i < len; i++) {
				mu[i + len] = mu[i + len - 1] * mu_root % mod;
			}
		}
		for (let len = 1; len < lim; len <<= 1)
		for (let i = 0; i < lim; i += (len << 1))
		for (let j = 0; j < len; j++) {
			let x = arr[i + j]
			let y = arr[i + j + len] * mu[j + len] % mod
			let inc = x + y
			let sub = x - y
			arr[i + j] = inc >= mod ? inc - mod : inc;
			arr[i + j + len] = sub < 0 ? sub + mod : sub;
		}
		return arr
	}
	
	algorithm.idft = function (src, mod = 998244353) {
		let arr = algorithm.dft(src, mod)
		let inv = algorithm.fpow(arr.length, mod - 2, mod)
		for (let i = 1; i < arr.length; i++)
		if (i < (arr.length - i)) {
			utils.swap(arr[i], arr[arr.length - i])
		}
		for (let i = 0; i < arr.length; i++) {
			arr[i] = arr[i] * inv % mod;
		}
		return arr
	}
	
	algorithm.poly = {}
	algorithm.poly.mul = function (arr, oth, mod = 998244353) {
		let len = arr.length + oth.length
		let f = algorithm.dft(algorithm.resize(arr, len))
		let g = algorithm.dft(algorithm.resize(oth, len))
		console.log(f)
		console.log(g)
		for (let i = 0; i < f.length; i++) {
			f[i] = f[i] * g[i] % mod
		}
		return algorithm.resize(algorithm.idft(f), len)
	}
})();