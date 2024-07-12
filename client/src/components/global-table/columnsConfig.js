import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import './globalTable.css';

const formatDateString = (value) => {
    const date = new Date(value);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};

export const getColumnsConfig = (handleEditClick, handleDeleteClick, getRowFromUniqueId, handleCountingClick) => [
    {
        field: 'edit',
        headerName: 'Изменить',
        width: 80,
        cellClassName: 'actions',
        renderCell: (params) => {
            const row = getRowFromUniqueId(params.id);
            return (
                <button className='edit__icon' onClick={() => handleEditClick(row)}>
                    <EditIcon />
                </button>
            );
        },
    },
    { 
        field: 'id', 
        headerName: 'ID', 
        width: 50, 
        cellClassName: 'cellColumn',
        editable: false,
    },
    {
        field: 'date',
        headerName: 'Дата',
        type: 'text',
        width: 100,
        align: 'left',
        headerAlign: 'left',
        cellClassName: 'cellColumn',
        valueFormatter: (params) => formatDateString(params.value),
    },
    {
        field: 'reglament',
        headerName: 'Ссылка на регламент',
        type: 'link',
        width: 180,
        editable: true,
        cellClassName: 'cellColumn',
        renderCell: (params) => {
            const reglamentIndex = params.value.indexOf('/reglament');
            const displayText = reglamentIndex !== -1 ? params.value.substring(reglamentIndex) : 'Нет ссылки';
        
            return (
                <a href={params.value} target="_blank" rel="noopener noreferrer">
                    {displayText}
                </a>
            );
        },
    },
    {
        field: 'inspector',
        headerName: 'Проверяющй',
        width: 180,
        editable: true,
        type: 'text',
    },
    {
        field: 'executor',
        headerName: 'Исполнитель',
        type: 'text',
        width: 180,
        editable: true,
    },
    {
        field: 'amount',
        headerName: 'Кол-во доп работ в рег-те',
        type: 'text',
        width: 180,
        editable: true,
    },
    {
        field: 'typeWork',
        headerName: 'Вид работ',
        type: 'text',
        width: 120,
        editable: true,
    },
    {
        field: 'typeTest',
        headerName: 'Вид проверки',
        type: 'text',
        width: 120,
        editable: true,
    },
    {
        field: 'recommen',
        headerName: 'Рекомендации',
        type: 'text',
        width: 120,
        editable: true,
    },
    {
        field: 'errors',
        headerName: 'Ошибки',
        type: 'text',
        width: 80,
        editable: true,
    },
    {
        field: 'critic',
        headerName: 'Крит-е ошибки',
        type: 'text',
        width: 120,
        editable: true,
    },
    {
        field: 'counting',
        headerName: 'Отчет',
        type: 'text',
        width: 120,
        editable: true,
        cellClassName: 'cellCounting',
        renderCell: (params) => (
            <div onClick={() => handleCountingClick(params.value)}>
                {params.value}
            </div>
        ),
    },
    {
        field: 'iteration',
        headerName: 'Итерация',
        type: 'text',
        width: 100,
        editable: true,
    },
    {
        field: 'pointsRemove',
        headerName: 'Снятые баллы',
        type: 'text',
        width: 120,
        editable: true,
    },
    {
        field: 'dispute',
        headerName: 'Спор',
        type: 'text',
        width: 60,
        editable: true,
    },
    {
        field: 'commentError',
        headerName: 'Коммент ошибки',
        type: 'text',
        width: 140,
        editable: true,
    },
    {
        field: 'deadlines',
        headerName: 'Сроки',
        type: 'text',
        width: 100,
        editable: true,
    },
    {
        field: 'delayTester',
        headerName: 'Просрочка тестировщика',
        type: 'text',
        width: 180,
        editable: true,
    },
    {
        field: 'point',
        headerName: 'Баллы',
        type: 'text',
        width: 60,
        editable: true,
    },
    {
        field: 'delayExecutor',
        headerName: 'Просрочка исполнителя',
        type: 'text',
        width: 180,
        editable: true,
    },
    {
        field: 'departament',
        headerName: 'Отдел',
        type: 'text',
        width: 180,
        editable: true,
    },
    {
        field: 'linkReport',
        type: 'link',
        headerName: 'Ссылка для отчета',
        width: 200,
        cellClassName: 'action',
        renderCell: (params) => {
            if (!params.value) {
                return <span>Invalid URL</span>;
            }
        
            const reglamentIndex = params.value.indexOf('/reglament');
            const displayText = reglamentIndex !== -1 ? params.value.substring(reglamentIndex) : params.value;
        
            return (
                <a href={params.value} target="_blank" rel="noopener noreferrer">
                    {displayText}
                </a>
            );
        },
    },
    {
        field: 'reportPeriods',
        headerName: 'Дата отчета',
        type: 'text',
        width: 100,
        align: 'left',
        headerAlign: 'left',
        cellClassName: 'cellColumn',
        valueFormatter: (params) => formatDateString(params.value),
    },
    {
        field: 'delete',
        headerName: 'Удалить',
        width: 100,
        cellClassName: 'actions',
        renderCell: (params) => {
            const row = getRowFromUniqueId(params.id);
            return (
                <button className='delete__icon' onClick={() => handleDeleteClick(row)}>
                    <DeleteIcon />
                </button>
            );
        },
    },
];