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
                // Если это регламент, используем только имя инспектора как ключ
                // Если это итерация, используем комбинацию имени инспектора и итерации, чтобы суммировать по ним баллы
                const itemKey = currentValue.iteration
                    ? `${inspectorLowerCase}-iteration-${currentValue.iteration}`
                    : `${inspectorLowerCase}-reglament`;

                // Создаем запись, если она еще не существует
                if (!acc[itemKey]) {
                    acc[itemKey] = {
                        inspector: currentValue.inspector,
                        points: currentValue.iteration ? 0 : currentValue.point, // Если это итерация, начинаем с 0
                        onlyOnce: !currentValue.iteration // Метка для проверки, что регламент добавляется только один раз
                    };
                }

                // Для итераций всегда добавляем баллы
                if (currentValue.iteration) {
                    acc[itemKey].points += currentValue.point;
                }
                // В случае если ключ регламента ещё не встречался, мы уже добавили его выше
                
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
                {reglamentList.length > 0 && reglamentList.map((reglament, index) => (
                    <ul key={index}>
                        <li>{reglament.inspector}</li>
                        <li>{reglament.points}</li>
                    </ul>
                ))}
            </div>
        </div>
    )
}

export default ReportQA;