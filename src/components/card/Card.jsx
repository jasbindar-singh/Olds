import React, { useRef, useContext } from 'react'
import { Icon } from '@iconify/react';
import bxCloudDownload from '@iconify/icons-bx/bx-cloud-download';
import bxShareAlt from '@iconify/icons-bx/bx-share-alt';
import bxTrash from '@iconify/icons-bx/bx-trash';
import { SavedContext } from '../Tabs/Tabs';

function Card(props) {

    const saveRef = useRef(null);

    const { addSaved, deleteSaved } = useContext(SavedContext) 

    function saveOffline(){
        saveRef.current.innerHTML = "Saved!";
        saveRef.current.style.display = "block";
        setTimeout(() => {
            saveRef.current.style.display = "none";
        }, 1500)

        addSaved(props.data)
    }

    function shareData(){
        if (navigator.share) {
            navigator.share({
              title: props.data.title,
              url: props.data.url
            })
            .catch(console.error);
          } else {
            if(!!navigator.clipboard)
                navigator.clipboard.writeText(props.data.url)
            saveRef.current.innerHTML = "Link Copied!";
            saveRef.current.style.display = "block";
            setTimeout(() => {
                saveRef.current.style.display = "none";
            }, 1500)
          }
    }

    return (
        <div className="card">
            <div className="card-image" style={{backgroundImage: `url(${props.data.urlToImage})`}}></div>
            <div className="card-content">
                <div className="card-content-heading">{props.data.title}</div>
                <div className="card-content-info">
                    {!!props.data.content ? props.data.content.split('[')[0] : null}
                    <a target="_blank" rel="noreferrer noopener" href={props.data.url}>Read More</a>
                </div>
                <div ref={saveRef} className="card-save-status">Saved!</div>
                <div className="card-options">
                    <div className="card-footer">
                        <p>{props.data.source.name}<br/>
                        {new Date(props.data.publishedAt).toLocaleString()}</p>
                    </div>
                    <div className="card-btn">
                        {
                            props.data.hasOwnProperty("saved") ? (
                                <div className="delete" onClick={() => {deleteSaved(props.data.publishedAt)}}><Icon icon={bxTrash} className="tab-list-icon" /></div>
                            ) : (
                                <>
                                    <div className="save" onClick={saveOffline}><Icon icon={bxCloudDownload} className="tab-list-icon" /></div>
                                    <div className="share" onClick={shareData}><Icon icon={bxShareAlt} className="tab-list-icon" /></div>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
