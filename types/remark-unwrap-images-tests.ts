import unified = require('unified')
import unwrap = require('remark-unwrap-images')

unified().use(unwrap)
