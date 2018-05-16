const test = require('ava')
const remark = require('remark')
const html = require('remark-html')

const unwrapImages = require('.')

const markdown = `
![hi](there.png)
`

test('unwraps images', t => {
  const { contents } = remark()
    .use(unwrapImages)
    .use(html)
    .processSync(markdown)

  t.snapshot(contents)
})
