import React from 'react'


function TabListItem(props) {
    return (
        <li className="tab-list-item" onClick={props.onPress}>
            {props.icon}
            <p className="tab-list-category">{props.name}</p>
        </li>
    )
}

export default TabListItem
