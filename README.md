# parcel-transformer-css-to-string

Transform plugin for [Parcel v2](https://github.com/parcel-bundler/parcel)

> Transform pligin for Parcel v1: [parcel-plugin-css-to-string](https://github.com/shoonia/parcel-plugin-css-to-string)

> in process...

Importing CSS files as a string to JavaScript.

**styles.inline.css**
```css
.text {
  color: #162D3D;
}
```
**index.js**
```js
import styles from "./styles.inline.css";

console.log(styles); // ".text{color:#162D3D}"
```

## Install

```bash
npm i parcel-transformer-css-to-string
# or
yarn add -D parcel-transformer-css-to-string
```

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

## License

[MIT](./LICENSE)
