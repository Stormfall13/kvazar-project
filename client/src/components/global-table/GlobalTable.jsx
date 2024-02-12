import React, { useEffect, useState } from 'react'
import './globalTable.css'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import ReportQA from '../reportQA/ReportQA';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  return randomArrayItem(roles);
};


const GlobalTable = () => {

	 const [rows, setRows] = React.useState([]);
	 const [rowModesModel, setRowModesModel] = React.useState({});


	 useEffect(() => {
		const fetchData = async () => {
		  try {
			const response = await fetch('http://localhost:5000/api/dop-work', {
			  method: "GET",
			  headers: {
				"Accept": "application/json"
			  }
			});
			const data = await response.json();
			// console.log(data);
			// setRows(data.map((item) => ({ ...item, id: item.key || item.id })));
			setRows(data.map((item, index) => ({ ...item, id: item.key || item.id || index })));
		  } catch (error) {
			console.error("Failed to fetch data: ", error);
		  }
		};
	  
		fetchData();
	  }, []);

 
	 const handleRowEditStop = (params, event) => {
		 if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			 event.defaultMuiPrevented = true;
		 }
	 };
 
	 const handleEditClick = (id) => () => {
		 setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
		 console.log(id);
	 };
 
	 const handleSaveClick = (id) => async () => {
		setRowModesModel((prev) => ({ ...prev, [id]: { mode: GridRowModes.View } }));
	
		const row = rows.find((r) => r.id === id);
		console.log(row);
		try {
			const response = await fetch(`http://localhost:5000/api/dop-work/${id}`, {
				method: 'PUT',
				headers: {
					"Accept": "application/json",
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(row),
			});
			if (!response.ok) {
				throw new Error('Something went wrong while saving');
			}
	
			
			const updatedRow = await response.json();
			setRows((prev) => prev.map((row) => (row.id === id ? updatedRow : row)));
		} catch (error) {
			console.error("Failed to save data: ", error);
		}
	};
 
	 const handleDeleteClick = (id) => () => {
		 setRows(rows.filter((row) => row.id !== id));
	 };
 
	 const handleCancelClick = (id) => () => {
		 setRowModesModel({
			 ...rowModesModel,
			 [id]: { mode: GridRowModes.View, ignoreModifications: true },
		 });
 
		 const editedRow = rows.find((row) => row.id === id);
		 if (editedRow.isNew) {
			 setRows(rows.filter((row) => row.id !== id));
		 }
	 };
 
	 const processRowUpdate = (newRow) => {
		 const updatedRow = { ...newRow, isNew: false };
		 setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
		 return updatedRow;
	 };
 
	 const handleRowModesModelChange = (newRowModesModel) => {
		 setRowModesModel(newRowModesModel);
	 };
 
	 const columns = [
		 { field: 'id', headerName: 'ID', width: 50, cellClassName: 'cellColumn' },
		 {
			 field: 'date',
			 headerName: 'Дата',
			 type: 'number',
			 width: 100,
			 align: 'left',
			 headerAlign: 'left',
			 cellClassName: 'cellColumn',
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
			getActions: ({ id }) => {
			  const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
	  
			  if (isInEditMode) {
				return [
				  <GridActionsCellItem
					icon={<SaveIcon />}
					label="Save"
					sx={{
					  color: 'primary.main',
					}}
					onClick={handleSaveClick(id)}
				  />,
				  <GridActionsCellItem
					icon={<CancelIcon />}
					label="Cancel"
					className="textPrimary"
					onClick={handleCancelClick(id)}
					color="inherit"
				  />,
				];
			  }
	  
			  return [
				<GridActionsCellItem
				  icon={<EditIcon />}
				  label="Edit"
				  className="textPrimary"
				  onClick={handleEditClick(id)}
				  color="inherit"
				/>,
				<GridActionsCellItem
				  icon={<DeleteIcon />}
				  label="Delete"
				  onClick={handleDeleteClick(id)}
				  color="inherit"
				/>,
			  ];
			},
		  },
	 ];
 
	 return (
		<>
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
				columns={columns}
				getRowId={(row) => row.id}
				editMode="row"
				rowModesModel={rowModesModel}
				onRowModesModelChange={handleRowModesModelChange}
				onRowEditStop={handleRowEditStop}
				processRowUpdate={processRowUpdate}
				slotProps={{
					toolbar: { setRows, setRowModesModel },
				}}
				/>
			</Box>
			<ReportQA/>
		 </>
		 
	 );
	 

}

export default GlobalTable;
