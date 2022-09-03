import React from 'react'

export default function Todo({ item, onRemove, onToggleComplete }) {
  return (
    <>
    <div>{ item.text }</div>
    <input type="checkbox" checked={ item.complete } onChange={ () => onToggleComplete(item)}/>
    <button onClick={ () => onRemove(item) }>Delete</button>
    </>
  )
}
