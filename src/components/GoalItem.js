import React from 'react'
import {List, Form, Input, TextArea} from 'semantic-ui-react'

const GoalItem = (props) => {
  const {title, description, onChange, id, onDelete} = props
  const onFieldChange = (event) => onChange(id, { value: event.target.value, name:  event.target.name})
  const onItemDelete = () => onDelete(id)
  return (
    <List.Item>
      <List.Icon name='close' link size='large' onClick={onItemDelete} />
      <List.Content>
        <Form>
          <Form.Field>
            <Input placeholder='Type a goal title here' value={title} name='title' onChange={onFieldChange}/>
          </Form.Field>
          <Form.Field>
            <TextArea rows={2} placeholder='Type a goal description here' name='description' value={description} onChange={onFieldChange} />
          </Form.Field>
        </Form>
      </List.Content>
    </List.Item>
  )
}

export default GoalItem