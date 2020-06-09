import React, { forwardRef } from 'react'

function TabScreens(props, ref) {
    return (
        <div ref={ref} className="tab-screens">
            {props.children}
        </div>
    )
}

export default forwardRef(TabScreens)
