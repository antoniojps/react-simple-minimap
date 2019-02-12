import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

class Minimap extends Component {
  constructor(props) {
    super(props)
    this.refMinimap = React.createRef()
    this.state = {
      scrollPercent: 0,
      scrollPercentTop: 0,
      scrollPercentBottom: 0,
      windowScroll: 0,
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.updateScrollPercent)
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateScrollPercent)
    window.removeEventListener('resize', this.updateDimensions)
  }

  updateDimensions = () => {
    this.setState(() => ({
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight
    }))
  }

  updateScrollPercent = () => {
    const { windowHeight } = this.state

    const winScrollTop =
      document.body.scrollTop || document.documentElement.scrollTop
    const winScrollBottom = winScrollTop + windowHeight

    // full document height regardless of scroll
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight

    const scrolled = winScrollTop / height

    const maxScrollTop = height - document.documentElement.clientHeight
    const maxScrollTopPercent = maxScrollTop / height
    let scrolledTop = winScrollTop / height
    scrolledTop =
      scrolledTop >= maxScrollTopPercent ? maxScrollTopPercent : scrolledTop

    const maxScrollBottom = 1
    let scrolledBottom = winScrollBottom / height
    scrolledBottom =
      scrolledBottom >= maxScrollBottom ? maxScrollBottom : scrolledBottom

    this.scrollToPercent()
    this.setState(() => ({
      scrollPercent: scrolled,
      scrollPercentTop: scrolledTop,
      scrollPercentBottom: scrolledBottom
    }))
  }

  scrollToPercent = () => {
    const { scrollPercent } = this.state
    const minimap = this.refMinimap.current

    const minimapHeight = minimap.clientHeight
    const scrollHeight = minimap.scrollHeight

    const height = scrollHeight - minimapHeight
    const windowTop = height * scrollPercent

    minimap.scrollTo(0, windowTop)
  }

  computePreviewStyle = () => {
    const { windowWidth } = this.state
    const { width } = this.props
    const scale = width / windowWidth
    return { transform: `scale(${scale || 1})` }
  }

  computeMinimapStyle = () => {
    const { width, height } = this.props
    return { width, height }
  }

  computeCurrentPreviewStyle = () => {
    const { scrollPercentTop, scrollPercentBottom } = this.state
    console.log(scrollPercentBottom, 'scrollPercentBottom')
    console.log(scrollPercentTop, 'scrollPercentTop')

    // I have the percentage that was scrolled
    // Now I need to calculate based of them the
    // height and top of currentPreview

    return {
      top: 0
    }
  }

  render() {
    const { of } = this.props
    const previewStyle = this.computePreviewStyle()
    const minimapStyle = this.computeMinimapStyle()
    const currentPreviewStyle = this.computeCurrentPreviewStyle()

    return (
      <div
        className={styles.minimapWindow}
        style={minimapStyle}
        ref={this.refMinimap}
      >
        <div
          className={styles.minimapWindow__currentPreview}
          style={currentPreviewStyle}
        />
        <div className={styles.minimapWindow__preview} style={previewStyle}>
          {of}
        </div>
      </div>
    )
  }
}

Minimap.propTypes = {
  of: PropTypes.node.isRequired,
  width: PropTypes.number,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

Minimap.defaultProps = {
  width: 114,
  height: 300
}

export default Minimap
