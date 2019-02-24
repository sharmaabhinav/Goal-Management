import React from 'react'
import {Button} from 'semantic-ui-react'

const Footer = (props) => {
  const {onSave, onAdd} = props
  return (
    <React.Fragment>
      <Button floated='left' color='orange' size='big' onClick={onAdd}>Add a New Goal</Button>
      <Button floated='right' color='green' size='big' onClick={onSave}>Save</Button>
    </React.Fragment>
  )
}

export default Footer