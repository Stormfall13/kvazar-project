import React from 'react';
import './report.css';
import { useState, useEffect } from 'react';

const ReportQA = () => {

    const [reglamentList, setReglamentList] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:5000/api/dop-work', {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
        .then(res => res.json())
        .then(response => {
            setTimeout(() => {
                setReglamentList(response)
            })
        })
    }, [])

    return (
        <div className='wrapp__qa-main'>
            <h2>Отчет тестировщиков QA</h2>
            <div className="wrapp__qa">
                {reglamentList && reglamentList.map((reglamentLists) => {
                    return (
                        <ul key={reglamentLists.id}>
                            <li >{reglamentLists.inspector}</li>
                            <li >{reglamentLists.point}</li>
                        </ul> 
                    )
                })}
            </div>
        </div>
    )
}

export default ReportQA;
