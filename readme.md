# remark-unwrap-images [![Build Status](https://travis-ci.org/remarkjs/remark-unwrap-images.svg?branch=master)](https://travis-ci.org/remarkjs/remark-unwrap-images)

Remark plugin to remove wrapping paragraph tag for images.

## Installation

```
npm i -S remark-unwrap-images
```

## Usage

```js
const remark = require('remark')
const unwrapImages = require('remark-unwrap-images')
const html = require('remark-html')

remark()
  .use(unwrapImages)
  .use(html)
  .process(markdownString, function (err, file) {
    if (err) { throw err }

    console.log(String(file))
  })
```
