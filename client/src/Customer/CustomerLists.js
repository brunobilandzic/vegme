import React from 'react'
import CustomerItem from './CustomerItem'

export default function CustomerLists(props) {
    const {items} = props
  return (
    <>
        {items && items.map(i => <CustomerItem key={i.id} customer={i}/>)}
    </>
  )
}
