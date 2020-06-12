import React, { forwardRef, useEffect, useState, useRef } from 'react'
import Card from '../card/Card'

function TabPage(props, ref) {

    const searchRef = useRef(null)
    const lazyLoadRef = useRef(null)
    const pageNumber = useRef(1)
    const observer = useRef(new IntersectionObserver((entry) => {
        if(entry[0].isIntersecting){
            fetchData()
        }
    }, {threshold: 1}))

    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        let currentObserver = observer.current;

        if(props.name !== 'Search' && props.name !== 'Saved')
            currentObserver.observe(lazyLoadRef.current)

        return () => {currentObserver.disconnect()}
    }, [props.name])

    const fetchData = async () => {
        setLoading(true)
        await fetch(`https://api.currentsapi.services/v1/search?category=${props.name.toLowerCase()}&page_number=${pageNumber.current}&language=en&apiKey=${process.env.REACT_APP_API_KEY}`)
        .then(response => response.json())
        .then(data => {
            setDataList(prev => {
                return [...prev, ...data.news]
            })
            setLoading(false)
            pageNumber.current = pageNumber.current + 1;
        })
        .catch(err => {
            console.log(err)
            alert("API Limit Reached!")
        })
    }

    const debounce = (func, time) => {
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

    const searchData = async () => {
        setLoading(true)
        await fetch(`https://api.currentsapi.services/v1/search?keywords=${searchRef.current.value.trim().toLowerCase()}&language=en&apiKey=${process.env.REACT_APP_API_KEY}`)
        .then(response => response.json())
        .then(data => {
            setDataList([...data.news])
        })
        .catch(err => {
            console.log(err)
            alert("API Limit Reached!")
        })
        setLoading(false)
    }

    let searchDebounce = debounce(searchData, 1000);

    const handleChange = () => {
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
                    !!dataList.length ? (
                        dataList.map((data, index) => {
                            return <Card key={index} data={data}/>
                        })
                    ) : (
                        props.name === 'Search' || props.name === 'Saved' ? <p className="tab-content-load">No items to show</p> : null
                    )
                }
                <div ref={lazyLoadRef} className="tab-content-lazy-loader">
                    {
                        loading ? (
                                <div className="tab-content-load">
                                    <div className="loader"></div>
                                    Loading Olds...
                                </div>
                            ) : null
                    }
                </div>
            </div>
        </div>
    )
}

export default React.memo(forwardRef(TabPage))