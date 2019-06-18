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
    'should unwraps images'
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
