# remark-unwrap-images

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**remark**][remark] plugin to remove the wrapping paragraph for images.

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

## Contribute

See [`contributing.md`][contributing] in [`remarkjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [Code of Conduct][coc].
By interacting with this repository, organisation, or community you agree to
abide by its terms.

## License

[MIT][license] © Compositor and Zeit, Inc.

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/remarkjs/remark-unwrap-images/master.svg

[build]: https://travis-ci.org/remarkjs/remark-unwrap-images

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-unwrap-images.svg

[coverage]: https://codecov.io/github/remarkjs/remark-unwrap-images

[downloads-badge]: https://img.shields.io/npm/dm/remark-unwrap-images.svg

[downloads]: https://www.npmjs.com/package/remark-unwrap-images

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-unwrap-images.svg

[size]: https://bundlephobia.com/result?p=remark-unwrap-images

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/remark

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/master/contributing.md

[support]: https://github.com/remarkjs/.github/blob/master/support.md

[coc]: https://github.com/remarkjs/.github/blob/master/code-of-conduct.md

[license]: license

[remark]: https://github.com/remarkjs/remark
