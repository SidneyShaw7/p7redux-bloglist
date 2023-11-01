import { forwardRef } from 'react'
import { useImperativeHandle } from 'react'
import { useState } from 'react'
import { TextField, Button } from '@mui/material'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        {/* <button onClick={toggleVisibility}>{props.buttonLabel}</button> */}
        <Button variant='contained' color='primary' onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        {/* <button onClick={toggleVisibility}>cancel</button> */}
        <Button variant='contained' color='primary' onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
