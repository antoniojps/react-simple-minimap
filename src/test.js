import React from 'react'
import { render, cleanup } from 'react-testing-library'
import Minimap from './'

afterEach(cleanup)

test('<Minimap>', () => {
  const { container, debug } = render(
    <Minimap
      of={
        <div
          styles={{ width: '100%', height: '2000px', backgroundColor: 'red' }}
        />
      }
    />
  )
  expect(container.firstChild).toMatchSnapshot()
  debug()
})
