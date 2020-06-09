import React, { forwardRef, useEffect, useState, useRef } from 'react'
import Card from '../card/Card'

function TabPage(props, ref) {

    const searchRef = useRef(null)

    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData(){
            if(props.name !== 'Search' && props.name !== 'Saved'){
                setLoading(true)
                await fetch(`https://newsapi.org/v2/top-headlines?country=us&language=en&pageSize=5&category=${props.name.toLowerCase()}&apiKey=${process.env.REACT_APP_API_KEY}`)
                .then(response => response.json())
                .then(data => {
                    setDataList([...data.articles])
                    setLoading(false)
                })
                .catch(err => {
                    console.log(err)
                })
            }
            if(props.name === 'Saved'){
                setDataList(props.saveList)
            }
        }
        fetchData()
    }, [props]);

    let searchDebounce = debounce(searchData, 1000);

    function debounce(func, time){
        let clear;
        return function(){
            let context = this;
            let args = arguments;
            clearTimeout(clear)
            clear = setTimeout(() => {
                func.apply(context, args)
            }, time)
        }
    }

    async function searchData(){
        setLoading(true)
        await fetch(`https://newsapi.org/v2/top-headlines?pageSize=5&q=${searchRef.current.value.toLowerCase}&apiKey=${process.env.REACT_APP_API_KEY}`)
        .then(response => response.json())
        .then(data => {
            setDataList([...data.articles])
        })
        .catch(err => {
            console.log(err)
        })
        setLoading(false)
    }

    function handleChange(){
        searchDebounce()
    }

    return (
        <div ref={ref} className="tab-screens-page">
            <div className="tab-page-content">
                <h2 className="tab-content-header">{props.name},</h2>
                {
                    props.name === 'Search' ? <input type="text" ref={searchRef} onChange={handleChange} className="tab-search" placeholder="Search using keywords..."/> : null
                }
                {
                    loading ? (
                        <p className="tab-content-load">Loading Olds...</p>
                    ) : (
                        !!dataList.length ? (
                            dataList.map((data, index) => {
                                return <Card key={index} data={data}/>
                            })
                        ) : (
                            <p className="tab-content-load">No items to show</p>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default React.memo(forwardRef(TabPage))