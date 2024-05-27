import React, { useEffect, useState } from 'react'
import './globalTable.css'

import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {
	GridRowModes,
	DataGrid,
	GridToolbarContainer,
	GridToolbarExport,
	GridToolbarColumnsButton,
	GridToolbarDensitySelector,
	GridRowEditStopReasons,
	ruRU,
} from '@mui/x-data-grid';
import ReportQA from '../reportQA/ReportQA';
import FormTableTesting from './FormTableTesting';


function CustomToolbar() {
	return (
	<GridToolbarContainer>
		<GridToolbarColumnsButton />
		<GridToolbarDensitySelector />
		<GridToolbarExport />
	</GridToolbarContainer>
	);
}

const myLocaleText = {
	toolbarExport: 'Экспорт',
	toolbarExportLabel: 'Экспорт',
	toolbarExportCSV: 'Скачать в формате CSV',
};

const GlobalTable = () => {

	const [ currentId , setCurrentId ] = useState('');
	const [ rowsItem , setRowsItem ] = useState('');

	// const handleEditClick = (id) => {
	// 	console.log(id);
	// 	setCurrentId(id);
	// 	setRowsItem(row);
	// };

	const handleEditClick = (row) => {
		console.log(row);
		setCurrentId(row.id);
		setRowsItem(row);
	};

	const [rows, setRows] = React.useState([]);
	const [rowModesModel, setRowModesModel] = React.useState({});
	const sortRowsByCreatedAt = (rowArray) => {
		return [...rowArray].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
	};
	

	const fetchData = async () => {
		try {
			const response = await fetch('http://localhost:5000/api/dop-work', {
				method: "GET",
				headers: {
					"Accept": "application/json"
			}
		});
			const data = await response.json();
			const sortedData = sortRowsByCreatedAt(data);
			setRows(sortedData.map((item, index) => ({ ...item, id: item.key || item.id || index })));
		} catch (error) {
			console.error("Failed to fetch data: ", error);
		}
	};
	
	useEffect(() => {
		fetchData();
	}, []);


	const handleRowEditStop = (params, event) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true;
		}
	};


	const handleDeleteClick = (id) => () => {
		setRows(rows.filter((row) => row.uniqueId !== id));
	};


	const handleCancelClick = (id) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.uniqueId === id);
		if (editedRow.isNew) {
			setRows(rows.filter((row) => row.uniqueId !== id));
		}
	};

	const processRowUpdate = (newRow) => {
    // console.log('Updated Row:', newRow);
    const updatedRow = { ...newRow };
    // console.log(updatedRow);
    setRows(currentRows => {
		return currentRows.map(row => row.id === newRow.id ? updatedRow : row);
    });

    return updatedRow;
	};

	const handleRowModesModelChange = (newRowModesModel) => {
		setRowModesModel(newRowModesModel);
	};


	const formatDateString = (value) => {
		const date = new Date(value);
		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Месяцы начинаются с 0
		const year = date.getFullYear();
		return `${day}.${month}.${year}`;
	};

	// const getRowIdFromUniqueId = (uniqueId) => {
	// 	const row = rows.find(row => row.uniqueId === uniqueId);
	// 	setRowsItem(row)
	// 	return row ? row.id : null;
	// }	

	const getRowFromUniqueId = (uniqueId) => {
		return rows.find(row => row.uniqueId === uniqueId);
	}
	
	
	const columns = [
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
			valueOptions: ['Market', 'Finance', 'Development'],
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
			headerName: 'Кол-во доп  работ в рег-те',
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
			headerName: 'Департамент',
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
			field: 'actions',
			type: 'actions',
			headerName: 'Параметры',
			width: 100,
			cellClassName: 'actions',
			// getActions: ({ id }) => {
			// 	return [
			// 		<button onClick={() => handleEditClick(id)}><EditIcon/></button>
			// 	];
			// },
			getActions: ({ id: uniqueId }) => {
				// const rowId = getRowIdFromUniqueId(uniqueId);
				const row = getRowFromUniqueId(uniqueId);
				return [
					// <button onClick={() => handleEditClick(rowId)}><EditIcon/></button>
					<button onClick={() => handleEditClick(row)}><EditIcon/></button>
				];
			},
		},
	];


	return (
		<>
			<button onClick={fetchData}>Перезагрузить таблицу</button>
			<Box
				sx={{
				height: 500,
				maxWidth: '1800px',
				margin: '0 auto',
				'& .actions': {
					color: 'text.secondary',
				},
				'& .textPrimary': {
					color: 'text.primary',
				},
				}}
			>
				<DataGrid
				rows={rows}
				getRowId={(row) => row.uniqueId}
				columns={columns}
				editMode="row"
				rowModesModel={rowModesModel}
				onRowModesModelChange={handleRowModesModelChange}
				onRowEditStop={handleRowEditStop}
				processRowUpdate={processRowUpdate}
				localeText={{ ...ruRU.components.MuiDataGrid.defaultProps.localeText, ...myLocaleText }}
				slotProps={{
					toolbar: { setRows, setRowModesModel, },
				}}
				components={{
					Toolbar: CustomToolbar,
				}}
				/>
			</Box>
			<FormTableTesting currentId={currentId} rowsItem={rowsItem} />
			<ReportQA/>
		</>
		
	);


}

export default GlobalTable;
