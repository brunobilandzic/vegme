import React from 'react'

export default function CustomerItem(props) {
    const {customer} = props
  return (
    <>{customer.name}</>
  )
}
