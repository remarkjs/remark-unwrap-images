import assert from 'node:assert/strict'
import test from 'node:test'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {unified} from 'unified'
import remarkUnwrapImages from './index.js'

test('remarkUnwrapImages', async function (t) {
  await t.test('should unwrap images', async function () {
    assert.equal(
      String(
        await unified()
          .use(remarkParse)
          .use(remarkUnwrapImages)
          .use(remarkRehype)
          .use(rehypeStringify)
          .process('![hi](there.png)')
      ),
      '<img src="there.png" alt="hi">'
    )
  })

  await t.test('should unwrap multiple images', async function () {
    assert.equal(
      String(
        await unified()
          .use(remarkParse)
          .use(remarkUnwrapImages)
          .use(remarkRehype)
          .use(rehypeStringify)
          .process('![alpha](alpha.png) ![bravo](bravo.png)')
      ),
      '<img src="alpha.png" alt="alpha">\n \n<img src="bravo.png" alt="bravo">'
    )
  })

  await t.test(
    'should not unwrap images next to other content',
    async function () {
      assert.equal(
        String(
          await unified()
            .use(remarkParse)
            .use(remarkUnwrapImages)
            .use(remarkRehype)
            .use(rehypeStringify)
            .process('some text ![and](and.png) an image')
        ),
        '<p>some text <img src="and.png" alt="and"> an image</p>'
      )
    }
  )

  await t.test('should not unwrap if there are no images', async function () {
    assert.equal(
      String(
        await unified()
          .use(remarkParse)
          .use(remarkUnwrapImages)
          .use(remarkRehype)
          .use(rehypeStringify)
          .process('some text')
      ),
      '<p>some text</p>'
    )
  })

  await t.test(
    'should not unwrap if there are no images in links',
    async function () {
      assert.equal(
        String(
          await unified()
            .use(remarkParse)
            .use(remarkUnwrapImages)
            .use(remarkRehype)
            .use(rehypeStringify)
            .process('[](#remark)')
        ),
        '<p><a href="#remark"></a></p>'
      )
    }
  )

  await t.test('should supports links', async function () {
    assert.equal(
      String(
        await unified()
          .use(remarkParse)
          .use(remarkUnwrapImages)
          .use(remarkRehype)
          .use(rehypeStringify)
          .process('[![hi](there.png)](#remark)')
      ),
      '<a href="#remark"><img src="there.png" alt="hi"></a>'
    )
  })

  await t.test(
    'should not unwrap links next to other content',
    async function () {
      assert.equal(
        String(
          await unified()
            .use(remarkParse)
            .use(remarkUnwrapImages)
            .use(remarkRehype)
            .use(rehypeStringify)
            .process('[![hi](there.png)](#remark)!')
        ),
        '<p><a href="#remark"><img src="there.png" alt="hi"></a>!</p>'
      )
    }
  )

  await t.test('should not unwrap links with other content', async function () {
    assert.equal(
      String(
        await unified()
          .use(remarkParse)
          .use(remarkUnwrapImages)
          .use(remarkRehype)
          .use(rehypeStringify)
          .process('[![Hello](there.png), world](#remark)')
      ),
      '<p><a href="#remark"><img src="there.png" alt="Hello">, world</a></p>'
    )
  })

  await t.test('should supports image references', async function () {
    assert.equal(
      String(
        await unified()
          .use(remarkParse)
          .use(remarkUnwrapImages)
          .use(remarkRehype)
          .use(rehypeStringify)
          .process('![hi][image]\n\n[image]: kitten.png')
      ),
      '<img src="kitten.png" alt="hi">'
    )
  })
})
