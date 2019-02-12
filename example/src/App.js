import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/languages/hljs/javascript'
import monokai from 'react-syntax-highlighter/dist/styles/hljs/monokai'
import Minimap from 'react-simple-minimap'

SyntaxHighlighter.registerLanguage('javascript', js)

class App extends Component {
  renderCode = () => (
    <Code>
      <SyntaxHighlighter
        styles={{ marginTop: '-1rem' }}
        language="js"
        style={monokai}
        customStyle={{ backgroundColor: '#292A3A' }}
      >
        {`
  import React, { Component } from 'react'
  import styled from 'styled-components'
  import PropTypes from 'prop-types'

  export default class MiniMap extends Component {
    constructor(props) {
      super(props)
      this.refMinimap = React.createRef()
      this.state = {
        scrollPercent: 0,
        windowScroll: 0,
        windowWidth: document.documentElement.clientWidth
      }
    }

    componentDidMount() {
      window.addEventListener('scroll', this.updateScrollPercent)
      window.addEventListener('resize', this.updateWidth)
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.updateScrollPercent)
      window.removeEventListener('resize', this.updateWidth)
    }

    updateWidth = () => {
      this.setState(() => ({
        windowWidth: document.documentElement.clientWidth
      }))
    }

    updateScrollPercent = () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop

      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight

      const scrolled = winScroll / height
      this.scrollToPercent()
      this.setState(() => ({
        scrollPercent: scrolled
      }))
    }

    scrollToPercent = () => {
      const { scrollPercent } = this.state
      const minimap = this.refMinimap.current

      const minimapHeight = minimap.clientHeight
      const scrollHeight = minimap.scrollHeight

      const height = scrollHeight - minimapHeight

      minimap.scrollTo(0, height * scrollPercent)
    }

    computeScale = () => {
      const { windowWidth } = this.state
      const minimapWidth = 114
      const scale = minimapWidth / windowWidth
      return scale
    }

    render() {
      const { of } = this.props
      const scale = this.computeScale()
      return (
        <MinimapWindow ref={this.refMinimap}>
          <Preview scale={scale}>{of}</Preview>
        </MinimapWindow>
      )
    }
  }
















































































































































































  // damn, you're actually reading this?
  // so what are you waiting for?
  // yarn add react-simple-minimap

        `}
      </SyntaxHighlighter>
    </Code>
  )

  renderPage = () => (
    <div className="App">
      <Header>
        <h1>React Simple Minimap</h1>
        <p>
          Look to your right
          <br />
          <span role="img" aria-label="RightPointer">
            👉
          </span>
        </p>
      </Header>
      {this.renderCode()}
    </div>
  )

  render() {
    return (
      <Fragment>
        <Minimap of={this.renderPage()} width={200} height={300} />
        {this.renderPage()}
      </Fragment>
    )
  }
}

const Code = styled.div`
  margin-top: -1rem;
`

const Header = styled.div`
  color: #ebf2f1;
  background-color: #1e202b;
  padding: 1rem;
  h1 {
    font-size: 2rem;
    margin-top: 0;
  }
  p {
    font-size: 1rem;
  }
`

export default App
