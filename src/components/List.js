import React from 'react'
import {List as SemanticList} from 'semantic-ui-react'
import GoalItem from './GoalItem'


const List = (props) => {
  const {items, onItemChange, onItemDelete} = props

  return (
    <SemanticList divided size='big' relaxed='very' className='scrollable-list'>
      {items.map((item) => <GoalItem {...item} key={item.id} onChange={onItemChange} onDelete={onItemDelete} /> )}
    </SemanticList>
  )
}

export default List