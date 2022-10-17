import React from 'react'

/**Element called when a popup is needed
 */
function Popup(props){
    return (props.trigger)?(
        <div className='popup'>
            <div className='popup-inner'>
                
                <button className='close-btn' onClick={() => props.setTrigger(false)}>close</button>
                { props.children }
            </div>
        </div>
    ) : null;
}

export default Popup