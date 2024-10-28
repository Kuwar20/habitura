import React from 'react'

const Heading = ({title, classname}) => {
  return (
    <div className={`text-6xl font-medium font-primary text-secondary text-center mb-8 ${classname}`}>
      {title}
    </div>
  )
}

export default Heading
