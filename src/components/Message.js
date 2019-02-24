import React from 'react'
import {Transition, Message} from 'semantic-ui-react'

const TransitionMessage = (props) => {
  const {message, duration, header, visible} = props
  return (
    <Transition visible={visible}  animation='fade left' duration={duration}>
      <Message  size='small' className='notfication' color='green'>
        <Message.Header>{header}</Message.Header>
        <p>
          {message}
        </p>
      </Message>
    </Transition>
  )
}

export default TransitionMessage

