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
        .then(data => {
            setReglamentList(data);
            console.log(reglamentList);
        });
    }, []);

    return (
        <div className='wrapp__qa-main'>
            <h2>Баллы тестировщиков QA</h2>
            <div className="wrapp__qa">
                {reglamentList.map((reglament, index) => ( 
                    <ul key={index}>
                        <li>{reglament.inspector}</li>
                        <li>{reglament.point}</li>
                    </ul>
                ))}
            </div>
        </div>
    )
}

export default ReportQA;