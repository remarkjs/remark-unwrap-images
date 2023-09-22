import assert from 'node:assert/strict'
import test from 'node:test'
import {remark} from 'remark'
import remarkHtml from 'remark-html'
import remarkUnwrapImages from './index.js'

test('remarkUnwrapImages', async function (t) {
  await t.test('should unwrap images', async function () {
    assert.equal(
      String(
        await remark()
          .use(remarkUnwrapImages)
          .use(remarkHtml)
          .process('![hi](there.png)')
      ),
      '<img src="there.png" alt="hi">\n'
    )
  })

  await t.test('should unwrap multiple images', async function () {
    assert.equal(
      String(
        await remark()
          .use(remarkUnwrapImages)
          .use(remarkHtml)
          .process('![alpha](alpha.png) ![bravo](bravo.png)')
      ),
      '<img src="alpha.png" alt="alpha">\n \n<img src="bravo.png" alt="bravo">\n'
    )
  })

  await t.test(
    'should not unwrap images next to other content',
    async function () {
      assert.equal(
        String(
          await remark()
            .use(remarkUnwrapImages)
            .use(remarkHtml)
            .process('some text ![and](and.png) an image')
        ),
        '<p>some text <img src="and.png" alt="and"> an image</p>\n'
      )
    }
  )

  await t.test('should not unwrap if there are no images', async function () {
    assert.equal(
      String(
        await remark()
          .use(remarkUnwrapImages)
          .use(remarkHtml)
          .process('some text')
      ),
      '<p>some text</p>\n'
    )
  })

  await t.test(
    'should not unwrap if there are no images in links',
    async function () {
      assert.equal(
        String(
          await remark()
            .use(remarkUnwrapImages)
            .use(remarkHtml)
            .process('[](#remark)')
        ),
        '<p><a href="#remark"></a></p>\n'
      )
    }
  )

  await t.test('should supports links', async function () {
    assert.equal(
      String(
        await remark()
          .use(remarkUnwrapImages)
          .use(remarkHtml)
          .process('[![hi](there.png)](#remark)')
      ),
      '<a href="#remark"><img src="there.png" alt="hi"></a>\n'
    )
  })

  await t.test(
    'should not unwrap links next to other content',
    async function () {
      assert.equal(
        String(
          await remark()
            .use(remarkUnwrapImages)
            .use(remarkHtml)
            .process('[![hi](there.png)](#remark)!')
        ),
        '<p><a href="#remark"><img src="there.png" alt="hi"></a>!</p>\n'
      )
    }
  )

  await t.test('should not unwrap links with other content', async function () {
    assert.equal(
      String(
        await remark()
          .use(remarkUnwrapImages)
          .use(remarkHtml)
          .process('[![Hello](there.png), world](#remark)')
      ),
      '<p><a href="#remark"><img src="there.png" alt="Hello">, world</a></p>\n'
    )
  })

  await t.test('should supports image references', async function () {
    assert.equal(
      String(
        await remark()
          .use(remarkUnwrapImages)
          .use(remarkHtml)
          .process('![hi][image]\n\n[image]: kitten.png')
      ),
      '<img src="kitten.png" alt="hi">\n'
    )
  })
})
