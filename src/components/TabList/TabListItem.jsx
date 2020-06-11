import React, { forwardRef } from 'react'


function TabListItem(props, ref) {

    return (
        <li ref={ref} className="tab-list-item" onClick={props.onPress}>
            {props.icon}
            <p className="tab-list-category">{props.name}</p>
        </li>
    )
}

export default forwardRef(TabListItem)
