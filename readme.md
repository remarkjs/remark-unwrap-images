# remark-unwrap-images

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**remark**][remark] plugin to remove the wrapping paragraph for images.

## Note!

This plugin is ready for the new parser in remark
([`remarkjs/remark#536`](https://github.com/remarkjs/remark/pull/536)).
No change is needed: it works exactly the same now as it did before!

## Install

[npm][]:

```sh
npm install remark-unwrap-images
```

## Use

Say we have the following file, `example.md`.
Imagine section titles and URLs a bit longer though.

```markdown
![hi](there.png)
```

And our script, `example.js`, looks as follows:

```js
var vfile = require('to-vfile')
var remark = require('remark')
var html = require('remark-html')
var unwrapImages = require('remark-unwrap-images')

remark()
  .use(unwrapImages)
  .use(html)
  .process(vfile.readSync('example.md'), function(err, file) {
    if (err) throw err
    console.log(String(file))
  })
```

Now, running `node example` yields:

```html
<img src="there.png" alt="hi">
```

## API

#### `remark().use(unwrapImages)`

Remove the wrapping paragraph for images.
Supports multiple images, white space around images, and images in links as
well.

## Security

Use of `remark-unwrap-images` does not involve [**rehype**][rehype]
([**hast**][hast]) or user content, it only removes some existing nodes, so
there are no openings for [cross-site scripting (XSS)][xss] attacks.

## Contribute

See [`contributing.md`][contributing] in [`remarkjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © Compositor and Vercel, Inc.

<!-- Definitions -->

[build-badge]: https://github.com/remarkjs/remark-unwrap-images/workflows/main/badge.svg

[build]: https://github.com/remarkjs/remark-unwrap-images/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-unwrap-images.svg

[coverage]: https://codecov.io/github/remarkjs/remark-unwrap-images

[downloads-badge]: https://img.shields.io/npm/dm/remark-unwrap-images.svg

[downloads]: https://www.npmjs.com/package/remark-unwrap-images

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-unwrap-images.svg

[size]: https://bundlephobia.com/result?p=remark-unwrap-images

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/remarkjs/remark/discussions

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/remarkjs/.github/blob/HEAD/support.md

[coc]: https://github.com/remarkjs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[remark]: https://github.com/remarkjs/remark

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[rehype]: https://github.com/rehypejs/rehype

[hast]: https://github.com/syntax-tree/hast
