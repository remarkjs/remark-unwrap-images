import test from 'tape'
import {remark} from 'remark'
import remarkHtml from 'remark-html'
import remarkUnwrapImages from './index.js'

test('remarkUnwrapImages', (t) => {
  t.equal(
    remark()
      .use(remarkUnwrapImages)
      .use(remarkHtml)
      .processSync('![hi](there.png)')
      .toString(),
    '<img src="there.png" alt="hi">\n',
    'should unwrap images'
  )

  t.equal(
    remark()
      .use(remarkUnwrapImages)
      .use(remarkHtml)
      .processSync('![alpha](alpha.png) ![bravo](bravo.png)')
      .toString(),
    '<img src="alpha.png" alt="alpha">\n \n<img src="bravo.png" alt="bravo">\n',
    'should unwrap multiple images'
  )

  const processor = remark().use(remarkUnwrapImages)
  t.deepEqual(
    processor.runSync(processor.parse('![alpha](alpha.png) ![bravo](bravo.png)')),
    { type: 'root', children: [ { type: 'image', title: null, url: 'alpha.png', alt: 'alpha', position: { start: { line: 1, column: 1, offset: 0 }, end: { line: 1, column: 20, offset: 19 } } }, { type: 'image', title: null, url: 'bravo.png', alt: 'bravo', position: { start: { line: 1, column: 21, offset: 20 }, end: { line: 1, column: 40, offset: 39 } } } ], position: { start: { line: 1, column: 1, offset: 0 }, end: { line: 1, column: 40, offset: 39 } } },
    'should not put text nodes in root'
  )

  t.equal(
    remark()
      .use(remarkUnwrapImages)
      .use(remarkHtml)
      .processSync('some text ![and](and.png) an image')
      .toString(),
    '<p>some text <img src="and.png" alt="and"> an image</p>\n',
    'should not unwrap images next to other content'
  )

  t.equal(
    remark()
      .use(remarkUnwrapImages)
      .use(remarkHtml)
      .processSync('some text')
      .toString(),
    '<p>some text</p>\n',
    'should not unwrap if there are no images'
  )

  t.equal(
    remark()
      .use(remarkUnwrapImages)
      .use(remarkHtml)
      .processSync('[](#remark)')
      .toString(),
    '<p><a href="#remark"></a></p>\n',
    'should not unwrap if there are no images in links'
  )

  t.equal(
    remark()
      .use(remarkUnwrapImages)
      .use(remarkHtml)
      .processSync('[![hi](there.png)](#remark)')
      .toString(),
    '<a href="#remark"><img src="there.png" alt="hi"></a>\n',
    'should supports links'
  )

  t.equal(
    remark()
      .use(remarkUnwrapImages)
      .use(remarkHtml)
      .processSync('[![hi](there.png)](#remark)!')
      .toString(),
    '<p><a href="#remark"><img src="there.png" alt="hi"></a>!</p>\n',
    'should not unwrap links next to other content'
  )

  t.equal(
    remark()
      .use(remarkUnwrapImages)
      .use(remarkHtml)
      .processSync('[![Hello](there.png), world](#remark)')
      .toString(),
    '<p><a href="#remark"><img src="there.png" alt="Hello">, world</a></p>\n',
    'should not unwrap links with other content'
  )

  t.equal(
    remark()
      .use(remarkUnwrapImages)
      .use(remarkHtml)
      .processSync('![hi][image]\n\n[image]: kitten.png')
      .toString(),
    '<img src="kitten.png" alt="hi">\n',
    'should supports image references'
  )

  t.end()
})
