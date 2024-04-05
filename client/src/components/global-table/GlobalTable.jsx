import React, { useEffect } from 'react'
import './globalTable.css'

import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
	GridRowModes,
	DataGrid,
	GridToolbarContainer,
	GridToolbarExport,
	GridToolbarColumnsButton,
	GridToolbarDensitySelector,
	GridActionsCellItem,
	GridRowEditStopReasons,
	ruRU,
} from '@mui/x-data-grid';
import {
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import ReportQA from '../reportQA/ReportQA';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  return randomArrayItem(roles);
};

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

	 const [rows, setRows] = React.useState([]);
	 const [rowModesModel, setRowModesModel] = React.useState({});

	 const sortRowsByCreatedAt = (rowArray) => {
		return [...rowArray].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
	  };
	

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
			const sortedData = sortRowsByCreatedAt(data);
			setRows(sortedData.map((item, index) => ({ ...item, id: item.key || item.id || index })));
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
		// console.log(row);
		
		// const updateData = { ...row };
		// console.log(updateData);
		


		try {

			// console.log('Saving row with id:', id);
			// console.log('Data to be sent:', row);

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
		}finally {
			// выйти из режима редактирования, независимо от того, была ли ошибка
			setRowModesModel((prev) => ({ ...prev, [id]: { mode: GridRowModes.View } }));
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
 
	//  const processRowUpdate = (newRow) => {
	// 	 const updatedRow = { ...newRow, isNew: false };
	// 	 setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
	// 	 return updatedRow;
	//  };
	const processRowUpdate = (newRow) => {
		const updatedRow = { ...newRow };
		// console.log(updatedRow);
		setRows(currentRows => {
		  return currentRows.map(row => row.id === newRow.id ? updatedRow : row);
		});

		return newRow;
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
			<ReportQA/>
		 </>
		 
	 );
	 

}

export default GlobalTable;
