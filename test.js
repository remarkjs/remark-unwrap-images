var remark = require('remark')
var html = require('remark-html')
var test = require('tape')
var unwrap = require('.')

test('remark-unwrap-images', function(t) {
  t.equal(
    remark()
      .use(unwrap)
      .use(html)
      .processSync('![hi](there.png)')
      .toString(),
      '<img src="there.png" alt="hi">\n',
    'should unwrap images'
  )

  t.equal(
    remark()
      .use(unwrap)
      .use(html)
      .processSync('some text ![and](and.png) an image')
      .toString(),
      '<p>some text <img src="and.png" alt="and"> an image</p>\n',
    'should not unwrap images next to other content'
  )

  t.equal(
    remark()
      .use(unwrap)
      .use(html)
      .processSync('[![hi](there.png)](#remark)')
      .toString(),
      '<a href="#remark"><img src="there.png" alt="hi"></a>\n',
    'should supports links'
  )


  t.equal(
    remark()
      .use(unwrap)
      .use(html)
      .processSync('![hi][image]\n\n[image]: kitten.png')
      .toString(),
      '<img src="kitten.png" alt="hi">\n',
    'should supports image references'
  )

  t.end()
})
