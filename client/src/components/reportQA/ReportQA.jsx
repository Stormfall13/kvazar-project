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
            const pointsByInspector = data.reduce((acc, currentValue) => {
                const inspectorLowerCase = currentValue.inspector.toLowerCase();
                // Используем преобразованное имя как ключ, но сохраняем оригинальное имя
                if (!acc[inspectorLowerCase]) {
                    acc[inspectorLowerCase] = { inspector: currentValue.inspector, point: 0 };
                }
                acc[inspectorLowerCase].point += currentValue.point;
            
                return acc;
            }, {});
            
            // Теперь снова создаем массив объектов для рендеринга
            const reglamentSummary = Object.values(pointsByInspector); // используем Object.values, чтобы получить массив значений
            
            // Обновляем состояние со списком регламентов, теперь он содержит уникальных исполнителей и сумму их баллов
            setTimeout(() => {
                setReglamentList(reglamentSummary);
            }, 1000); // Если timeout не нужен, можно его убрать.
        });
    }, []);

    return (
        <div className='wrapp__qa-main'>
            <h2>Баллы тестировщиков QA</h2>
            <div className="wrapp__qa">
                {reglamentList && reglamentList.map(reglament => (
                    <ul key={reglament.inspector}>
                        <li>{reglament.inspector}</li>
                        <li>{reglament.point}</li>
                    </ul>
                ))}
            </div>
        </div>
    )
}

export default ReportQA;