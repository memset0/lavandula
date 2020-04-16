lavandula.utils = {}

let utils = lavandula.utils

utils.md5 = require('./lib/md5.js')
utils.swap = (a, b) => { b = [a, a = b][0] }
utils.random = (l) => Math.floor(Math.random() * l)
utils.random_range = (l, r) => (l + random(r - l))
utils.random_hash = () => utils.md5(Date() + Math.random() + 114514 + 'Menci TQL!')