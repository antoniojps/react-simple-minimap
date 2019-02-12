# react-simple-minimap

> A React Minimap component based of [visual studio's preview minimap](https://code.visualstudio.com/updates/v1_10#_preview-minimap)

> 🗾 Gives you a high level overview of your page or component which is very useful for quick navigation or page preview

[![NPM](https://img.shields.io/npm/v/react-simple-minimap.svg)](https://www.npmjs.com/package/react-simple-minimap) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Intro

![](https://cdn.jsdelivr.net/gh/antoniojps/react-simple-minimap@gh-pages/react-simple-minimap.gif)

## Install

```bash
yarn add react-simple-minimap
```

## Usage

```jsx
import React, { Component } from 'react'

import Minimap from 'react-simple-minimap'

class Page extends Component {
  renderPage = () => (
    <>
      <Header>...</Header>
      <Main>...</Main>
      <Footer>...</Footer>
    </>
  )

  render() {
    return (
      <>
        <Minimap of={this.renderPage()} />
        {this.renderPage()}
      </>
    )
  }
}
```

## Props

| Property | Type                 | Default | Required? | Description                                    |
| :------- | :------------------- | :------ | :-------- | :--------------------------------------------- |
| `of`     | `Node`               | `null`  | ✓         | The component to be previewed, normally a page |
| `width`  | `number`             | `114`   |           | Minimap width in pixels                        |
| `height` | `number` or `string` | `300`   |           | Minimap height can be any unit                 |

## License

MIT © [antoniojps](https://github.com/antoniojps)
