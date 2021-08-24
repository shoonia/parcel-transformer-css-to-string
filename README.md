# parcel-transformer-css-to-string

[![support parcel v2](https://img.shields.io/badge/Parcel-v2-3638f4)](https://github.com/parcel-bundler/parcel)
[![ci status](https://github.com/shoonia/parcel-transformer-css-to-string/actions/workflows/ci.yml/badge.svg)](https://github.com/shoonia/parcel-transformer-css-to-string/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/parcel-transformer-css-to-string.svg)](https://www.npmjs.com/package/parcel-transformer-css-to-string)

Importing CSS files as a string to JavaScript.

Transform plugin for **Parcel v2**

> Support **Parcel v1**: [parcel-plugin-css-to-string](https://github.com/shoonia/parcel-plugin-css-to-string)

## Example

**styles.inline.css**

```css
.text {
  color: #000000;
}
```

**index.js**

```js
import styles from "./styles.inline.css";

console.log(styles);
```

**Result:**

```js
console.log(".text{color:#000}");
```

## Install

```bash
npm i parcel-transformer-css-to-string
# or
yarn add -D parcel-transformer-css-to-string
```

## How to use

Add the plugin to `transformers` section in your `.parcelrc`.

In example use a [Glob](https://en.wikipedia.org/wiki/Glob_(programming)) pattern for `*.inline.css` files that will be inlined as a string into JavaScript.

**.parcelrc**

```json
{
  "extends": "@parcel/config-default",
  "transformers": {
    "*.inline.css": [
      "parcel-transformer-css-to-string"
    ]
  }
}
```

## Minify config

You can configure minify CSS in production build, where custom configuration can be set by creating `cssnano.config.js` file

**cssnano.config.js**

```js
module.exports = {
  preset: [
    "default",
    {
      calc: false,
      discardComments: {
        removeAll: true,
      },
    },
  ],
}
```

## PostCSS

You can configure CSS transforming with PostCSS creating a configuration file using one of these names (in that priority): `.postcssrc` (JSON), `.postcssrc.json`, `.postcssrc.js`, or `postcss.config.js`.

> If you use PostCSS config then you need added `cssnano` plugin to minify production build.

**.postcssrc**

```js
{
  "plugins": {
    "postcss-import": {},
    "autoprefixer": {},
    "cssnano": {}
  }
}
```

## Alternative

You can use official build-in named pipelines `bundle-text:`. In this case Parcel create a JavaScript module.

**style.css**

```css
.text {
  color: #000000;
}
```

**index.js**

```js
import styles from "bundle-text:./styles.css";

console.log(styles);
```

**Reslut:**

```js
/* Parcel module system is going here...  */

t("euGYv").register(JSON.parse('{"lhRnf":"index.js"}'));
console.log(e(".text{color:#000}"))
```

## License

[MIT](./LICENSE)
