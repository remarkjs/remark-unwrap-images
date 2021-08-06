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

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):
Node 12+ is needed to use it and it must be `import`ed instead of `require`d.

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

And our module, `example.js`, looks as follows:

```js
import {readSync} from 'to-vfile'
import {remark} from 'remark'
import remarkHtml from 'remark-html'
import remarkUnwrapImages from 'remark-unwrap-images'

const file = readSync('example.md')

remark()
  .use(remarkUnwrapImages)
  .use(remarkHtml)
  .process(file)
  .then((file) => {
    console.log(String(file))
  })
```

Now, running `node example` yields:

```html
<img src="there.png" alt="hi">
```

## API

This package exports no identifiers.
The default export is `remarkUnwrapImages`.

#### `unified().use(remarkUnwrapImages)`

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
