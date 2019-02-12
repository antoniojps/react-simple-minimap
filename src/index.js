import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

class Minimap extends Component {
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

  render() {
    const { of } = this.props
    const previewStyle = this.computePreviewStyle()
    const minimapStyle = this.computeMinimapStyle()

    return (
      <div
        className={styles.minimapWindow}
        style={minimapStyle}
        ref={this.refMinimap}
      >
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
