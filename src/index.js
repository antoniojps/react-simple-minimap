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

  computeScale = () => {
    const { windowWidth } = this.state
    const minimapWidth = 114
    const scale = minimapWidth / windowWidth
    return { transform: `scale(${scale || 1})` }
  }

  render() {
    const { of } = this.props
    const scale = this.computeScale()
    return (
      <div className={styles.minimapWindow} ref={this.refMinimap}>
        <div className={styles.minimapWindow__preview} style={scale}>
          {of}
        </div>
      </div>
    )
  }
}

Minimap.propTypes = {
  of: PropTypes.node.isRequired
}

export default Minimap
