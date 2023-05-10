import React from 'react'
import { RevolvingDot } from 'react-loader-spinner'

const Catalog = () => {
    return (<div className='d-flex justify-content-center align-items-center' style={{ minHeight: '75vh' }}>
        <RevolvingDot
            height="100"
            width="100"
            radius="25"
            color="#007A3E"
            secondaryColor='#FFAE3B'
            ariaLabel="revolving-dot-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        /></div>
    )
}

export default Catalog