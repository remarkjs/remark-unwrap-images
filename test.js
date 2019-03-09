const test = require('ava')
const remark = require('remark')
const html = require('remark-html')

const unwrapImages = require('.')

const image = `
![hi](there.png)
`

test('unwraps images', t => {
  const { contents } = remark()
    .use(unwrapImages)
    .use(html)
    .processSync(image)

  t.snapshot(contents)
})

const linkImage = `
[![hi](there.png)](#remark)
`

test('supports links', t => {
  const { contents } = remark()
    .use(unwrapImages)
    .use(html)
    .processSync(linkImage)

  t.snapshot(contents)
})

const referenceImage = `
![hi][image]

[image]: kitten.png
`

test('supports image references', t => {
  const { contents } = remark()
    .use(unwrapImages)
    .use(html)
    .processSync(referenceImage)

  t.snapshot(contents)
})
