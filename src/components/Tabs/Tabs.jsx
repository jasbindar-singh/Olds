import React, { useRef, useState, useEffect, createContext } from 'react'
import TabScreens from '../TabScreens/TabScreens'
import TabList from '../TabList/TabList'
import TabListItem from '../TabList/TabListItem'
import TabPage from '../TabScreens/TabPage'
import { Icon } from '@iconify/react';
import bxTrendingUp from '@iconify/icons-bx/bx-trending-up';
import bxFootball from '@iconify/icons-bx/bx-football';
import bxCameraMovie from '@iconify/icons-bx/bx-camera-movie';
import bxSearchAlt from '@iconify/icons-bx/bx-search-alt';
import bxStar from '@iconify/icons-bx/bx-star';
import bxGlobe from '@iconify/icons-bx/bx-globe';

export const SavedContext = createContext();

function Tabs() {

    const tabRef = useRef(null);
    const tabPageRef = useRef(null);

    const [saveList, setSaveList] = useState([]);

    useEffect(() => {
        if(!!localStorage.getItem("dataList")){
            let savedData = JSON.parse(localStorage.getItem("dataList"))
            setSaveList([...savedData])
        } else {
            localStorage.setItem("dataList", "[]")
        }
    }, [])

    function deleteSaved(id){
        let filterList = saveList.filter(data => data.id !== id)
        localStorage.setItem("dataList", JSON.stringify(filterList))
        setSaveList([...filterList])
    }

    function addSaved(data){
        let addList = JSON.parse(localStorage.getItem("dataList"))
        addList.unshift({...data, saved: true})
        localStorage.setItem("dataList", JSON.stringify(addList))
        setSaveList([...addList])
    }

    function handleClick(index){
        tabRef.current.scrollLeft = tabPageRef.current.offsetWidth * index;
    }

    return (
        <>
            <TabScreens ref={tabRef}>
                <SavedContext.Provider value={{saveList, deleteSaved, addSaved}}>
                    <TabPage ref={tabPageRef} name="World"/>
                    <TabPage name="Business"/>
                    <TabPage name="Sports"/>
                    <TabPage name="Entertainment"/>
                    <TabPage name="Search"/>
                    <TabPage name="Saved" saveList={saveList}/>
                </SavedContext.Provider>
            </TabScreens>
            <TabList>
                <TabListItem name="World" icon={<Icon icon={bxGlobe} className="tab-list-icon"/>} onPress={handleClick.bind(this, 0)}/>
                <TabListItem name="Business" icon={<Icon icon={bxTrendingUp} className="tab-list-icon"/>} onPress={handleClick.bind(this, 1)}/>
                <TabListItem name="Sports" icon={<Icon icon={bxFootball} className="tab-list-icon"/>} onPress={handleClick.bind(this, 2)}/>
                <TabListItem name="Entertainment" icon={<Icon icon={bxCameraMovie} className="tab-list-icon"/>} onPress={handleClick.bind(this, 3)}/>
                <TabListItem name="Search" icon={<Icon icon={bxSearchAlt} className="tab-list-icon"/>} onPress={handleClick.bind(this, 4)}/>
                <TabListItem name="Saved" icon={<Icon icon={bxStar} className="tab-list-icon"/>} onPress={handleClick.bind(this, 5)}/>
            </TabList>
        </>
    )
}

export default Tabs
