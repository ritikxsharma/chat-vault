import React from 'react'
import '../../styles/loading/_Loader.scss'

const loader = ({type}) => {

  return (
    <div className='loader-container'>
        {
            type === 'spinner' ? (
                <div className="spinner"></div>
            ) : (
                <div className="skeleton"></div>
            )
        }
    </div>
  )
}

export default loader