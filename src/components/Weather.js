import React from 'react'

const Weather = (props) => {
    const {city,icon,celsius,temp_max,temp_min,description} = props;
    // console.log(celsius)
    
    return (
        <div className="container text-light">
            <div className="cards pt-4">
                <h1>{city}</h1>
                <h5 className='py-4'>
                    <i className={`wi ${icon} display-1`}></i>
                </h5>
                {
                    celsius===null ? null : <h1 className='py-2'>{celsius}&deg; C</h1>
                }
                <h3>
                    { temp_min && <span className="px-4">{temp_min}&deg; C</span>}
                    {temp_max && <span className="px-4">{temp_max}&deg; C</span>}
                </h3>
                <h4 className="py-3">{description}</h4>
            </div>
        </div>
    )
}

export default Weather
