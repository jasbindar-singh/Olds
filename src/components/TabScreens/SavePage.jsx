import React, { useContext } from 'react'
import Card from '../card/Card'
import { SavedContext } from '../Tabs/Tabs'

function SavePage() {
    
    const {saveList} = useContext(SavedContext)
    
    return (
        <div className="tab-screens-page">
            <div className="tab-page-content">
                <h2 className="tab-content-header">Saved,</h2>
                {
                    !!saveList.length ? (
                        saveList.map((data, index) => {
                            return <Card key={index} data={data}/>
                        })
                    ) : (
                        <p className="tab-content-load">No items to show</p>
                    )
                }
            </div>
        </div>
    )
}

export default SavePage
