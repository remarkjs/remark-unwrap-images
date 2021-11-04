# remark-unwrap-images

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**[remark][]** plugin to remove the wrapping paragraph for images.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a [unified][] ([remark][]) plugin that searches for paragraphs
which contain only images (possibly in links) and nothing else, and then remove
those surrounding paragraphs.

**unified** is a project that transforms content with abstract syntax trees
(ASTs).
**remark** adds support for markdown to unified.
**mdast** is the markdown AST that remark uses.
This is a remark plugin that transforms mdast.

## When should I use this?

This project can make it simpler to style images with CSS, for example
displaying them at the full available width, because paragraph styles no longer
interfere with them.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
In Node.js (version 12.20+, 14.14+, or 16.0+), install with [npm][]:

```sh
npm install remark-unwrap-images
```

In Deno with [Skypack][]:

```js
import remarkUnwrapImages from 'https://cdn.skypack.dev/remark-unwrap-images@3?dts'
```

In browsers with [Skypack][]:

```html
<script type="module">
  import remarkUnwrapImages from 'https://cdn.skypack.dev/remark-unwrap-images@3?min'
</script>
```

## Use

Say we have the following file `example.md`.

```markdown
# Hello world

Lorem ipsum.

![hi](there.png)
```

And our module `example.js` looks as follows:

```js
import {read} from 'to-vfile'
import {remark} from 'remark'
import remarkHtml from 'remark-html'
import remarkUnwrapImages from 'remark-unwrap-images'

main()

async function main() {
  const file = await remark()
    .use(remarkUnwrapImages)
    .use(remarkHtml)
    .process(await read('example.md'))

  console.log(String(file))
}
```

Now running `node example.js` yields:

```html
<h1>Hello world</h1>
<p>Lorem ipsum.</p>
<img src="there.png" alt="hi">
```

## API

This package exports no identifiers.
The default export is `remarkUnwrapImages`.

#### `unified().use(remarkUnwrapImages)`

Plugin to remove the wrapping paragraph for images.
There are no options.

## Types

This package is fully typed with [TypeScript][].
There are no extra exported types.

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, and 16.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

This plugin works with `unified` version 6+ and `remark` version 7+.

## Security

Use of `remark-unwrap-images` does not involve **[rehype][]** (**[hast][]**) or
user content, it only removes some existing nodes, so there are no openings for
[cross-site scripting (XSS)][xss] attacks.

## Related

*   [`remark-images`](https://github.com/remarkjs/remark-images)
    — add a simpler image syntax
*   [`remark-embed-images`](https://github.com/remarkjs/remark-embed-images)
    — embed local images as data URIs, inlining files as base64-encoded values

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

[skypack]: https://www.skypack.dev

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/remarkjs/.github/blob/HEAD/support.md

[coc]: https://github.com/remarkjs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[remark]: https://github.com/remarkjs/remark

[unified]: https://github.com/unifiedjs/unified

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[typescript]: https://www.typescriptlang.org

[rehype]: https://github.com/rehypejs/rehype

[hast]: https://github.com/syntax-tree/hast
