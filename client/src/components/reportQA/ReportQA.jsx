import React, { useState, useEffect } from 'react';
import './report.css';

const ReportQA = () => {
  const [dataTable, setDataTable] = useState([]);


  useEffect(() => {
    fetch('http://localhost:5000/api/dop-work', {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        setDataTable(data)
      });
  }, []);

  // console.log(dataTable);

  useEffect(() => {

    const matchingObjects = dataTable.filter(dataTables => dataTables.typeTest === 'Первая');

    const counts = matchingObjects.reduce((acc, dataTables) => {
        const key = `${dataTables.id}|${dataTables.inspector}|${dataTables.linkReport}|${dataTables.typeTest}|${dataTables.point}`;
        if (!acc[key]) {
            acc[key] = 0;
        }
        acc[key]++;
        return acc;
    }, {});
    
    // console.log("Комбинации inspector, linkReport и 'typeTest: Первая' и число их повторений:");
    Object.entries(counts).forEach(([key, count]) => {
        const [id, inspector, linkReport, typeTest, point] = key.split('|');
        // console.log(`Inspector: ${inspector}, LinkReport: ${linkReport}, TypeTest: ${typeTest}, Count: ${count}`);
        if(count > 1){
          // console.log(point/count);
          const newPoint = point / count;
          console.log(newPoint);
          updatePoints(id, newPoint);
        }
    });

    const updatePoints = async (id, point) => {
        try {
          const response = await fetch(`http://localhost:5000/api/dop-work/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ point: point }),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
        } catch (error) {
          console.error('Error:', error);
        }
    };

  }, [dataTable]);

  return (
    <div className="wrapp__qa-main">
      <h2>Баллы тестировщиков QA</h2>
      <div className="wrapp__qa">
        {dataTable.map((reglament, index) => (
          <ul key={index}>
            <li>ID: {reglament.id}</li>
            <li>Инспектор: {reglament.inspector}</li>
            <li>Балл: {reglament.point}</li>
            <li>Регламент: {reglament.linkReport}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default ReportQA;