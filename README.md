kagekiri
====

Shadow DOM-piercing `querySelector()` / `querySelectorAll()` implementation.

Usage
---

Install:

```sh
npm install --save kagekiri
```

Query the `document` or a specific element:

```javascript
import { querySelector, querySelectorAll } from 'kagekiri'

// query the document
const elements = querySelectorAll('.container button')
const element = querySelector('.container button')

// or a specific element
const elements = querySelectorAll('button', otherElement)
const element = querySelector('button', otherElement)
```

Example
---

A custom element:

```html
<my-component></my-component>
<script>
  class MyComponent extends HTMLElement {
    constructor() {
      super()
      const shadowRoot = this.attachShadow({mode: 'open'})
      shadowRoot.innerHTML = '<span class="hello">Hello</span>'
    }
  }
  customElements.define('my-component', MyComponent)
</script>
```

It renders as:

```html
<my-component>
  <!-- shadow root (open) -->
  <span class="hello">Hello</span>
</my-component>
```

You can't query the `.hello` element:

```js
document.querySelector('.hello')    // undefined 😞
document.querySelectorAll('.hello') // empty 😞
```

But with `kagekiri` you can!

```js
kagekiri.querySelector('.hello')    // <span> 😃
kagekiri.querySelectorAll('.hello') // [<span>] 😃
```

Your can even query _across_ the shadow boundary!

```js
kagekiri.querySelector('my-component .hello')   // <span> 😃
kagekiri.querySelector('my-component > .hello') // <span> 😃
```

How it works
---

`kagekiri` parses the CSS selector using [postcss-selector-parser](https://www.npmjs.com/package/postcss-selector-parser). Then it queries the entire DOM tree, traverses any `shadowRoot`s it may find, and checks the selector from children to ancestors (the same way a browser would).

Note that it only works on open shadow DOM. Closed shadow DOM cannot be traversed.

Slotted elements are considered to be children of their slots (inside the shadow DOM) rather than children of their host components. If you don't want this behavior, you can use the normal `querySelector()`/`querySelectorAll()` API.

See the tests for full supported CSS features.

The name
---

陰 _kage_ (shadow) + 切り _kiri_ (cut).

Roughly, "shadow-cutter."

Build
---

```sh
npm run build
```

Test
---

```sh
npm test
```

Debug:

```sh
npm run test:debug
```

Lint:

```sh
npm run lint
```

Fix most lint issues:

```sh
npm run lint:fix
```
