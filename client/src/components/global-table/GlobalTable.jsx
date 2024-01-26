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
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  return randomArrayItem(roles);
};

const initialRows = [
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
];

// function EditToolbar(props) {
//   const { setRows, setRowModesModel } = props;

//   const handleClick = () => {
//     const id = randomId();
//     setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
//     setRowModesModel((oldModel) => ({
//       ...oldModel,
//       [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
//     }));
//   };

//   return (
//    //  <GridToolbarContainer>
//    //    <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
//    //      Add record
//    //    </Button>
//    //  </GridToolbarContainer>
// 	false
//   );
// }

const GlobalTable = () => {

    const [dopWorks, setDopWorks] = useState([]);

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
                setDopWorks(response)
            })
        })
    }, [])

    // console.log(dopWorks)
	 const [rows, setRows] = React.useState(initialRows);
	 const [rowModesModel, setRowModesModel] = React.useState({});
 
	 const handleRowEditStop = (params, event) => {
		 if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			 event.defaultMuiPrevented = true;
		 }
	 };
 
	 const handleEditClick = (id) => () => {
		 setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
	 };
 
	 const handleSaveClick = (id) => () => {
		 setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
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
		 { field: 'name', headerName: 'ID', width: 180, editable: true },
		 {
			 field: 'Date',
			 headerName: 'Дата',
			 type: 'number',
			 width: 80,
			 align: 'left',
			 headerAlign: 'left',
			 editable: true,
		 },
		 {
			 field: 'link',
			 headerName: 'Ссылка на регламент',
			 type: 'text',
			 width: 180,
			 editable: true,
		 },
		 {
			 field: 'inspector',
			 headerName: 'Проверяющй',
			 width: 220,
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
			width: 180,
			editable: true,
		},
		{
			field: 'typeTest',
			headerName: 'Вид проверки',
			type: 'text',
			width: 180,
			editable: true,
		},
		{
			field: 'recommen',
			headerName: 'Рекомендации',
			type: 'text',
			width: 180,
			editable: true,
		},
		{
			field: 'errors',
			headerName: 'Ошибки',
			type: 'text',
			width: 180,
			editable: true,
		},
		{
			field: 'critic',
			headerName: 'Крит-е ошибки',
			type: 'text',
			width: 180,
			editable: true,
		},
		{
			field: 'counting',
			headerName: 'Отчет',
			type: 'text',
			width: 180,
			editable: true,
		},
		{
			field: 'iteration',
			headerName: 'Итерация',
			type: 'text',
			width: 180,
			editable: true,
		},
		{
			field: 'pointsRemove',
			headerName: 'Снятые баллы',
			type: 'text',
			width: 180,
			editable: true,
		},
		{
			field: 'dispute',
			headerName: 'Спор',
			type: 'text',
			width: 180,
			editable: true,
		},
		{
			field: 'commentError',
			headerName: 'Коммент ошибки',
			type: 'text',
			width: 180,
			editable: true,
		},
		{
			field: 'deadlines',
			headerName: 'Сроки',
			type: 'text',
			width: 180,
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
			width: 180,
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
			 type: 'text',
			 headerName: 'Ссылка для отчета',
			 width: 200,
			 cellClassName: 'text',
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
		 <Box
			 sx={{
			 height: 500,
			 width: '100%',
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
	 );
	 


   //  return (
   //      <div className='main__table'>
   //          <h1>Глобальная таблица</h1>
   //          <h2 className="title__second">Отчет по доп работам</h2>
   //          {/* <div className="m__container">
   //              <div className="wrapp__table">
   //              <div className="title__table">
   //                  <p>ID</p>
   //                  <p>Дата</p>
   //                  <p>Ссылка на регламент</p>
   //                  <p>Проверяющий</p>
   //                  <p>Исполнитель</p>
   //                  <p>Кол-во доп работ в рег-те</p>
   //                  <p>Вид работ</p>
   //                  <p>Вид проверки</p>
   //                  <p>Рекомендации</p>
   //                  <p>Ошибки</p>
   //                  <p>Крит-е ошибки</p>
   //                  <p>Отчет</p>
   //                  <p>Итерация</p>
   //                  <p>Снятые баллы</p>
   //                  <p>Спор</p>
   //                  <p>Коммент ошибки</p>
   //                  <p>Сроки</p>
   //                  <p>Просрочка тестировщика</p>
   //                  <p>Баллы</p>
   //                  <p>Просрочка исполнителя</p>
   //                  <p>Департамент</p>
   //                  <p>Ссылка для отчета</p>
   //              </div>
   //              {dopWorks && dopWorks.map(dopWork => {
   //                  return(
   //                      <div key={dopWork.id} className="wrapper__container">
   //                          <ul>
   //                              <li>{dopWork.id}</li>
   //                              <li>{(new Date(dopWork.date)).toLocaleDateString()}</li>
   //                              <li><a className='link__reglament' href={dopWork.reglament} target='_blank'>{dopWork.reglament}</a></li>
   //                              <li>{dopWork.inspector}</li>
   //                              <li>{dopWork.executor}</li>
   //                              <li>{dopWork.amount}</li>
   //                              <li>{dopWork.typeWork}</li>
   //                              <li>{dopWork.typeTest}</li>
   //                              <li>{dopWork.recommen}</li>
   //                              <li>{dopWork.errors}</li>
   //                              <li>{dopWork.critic}</li>
   //                              <li>{dopWork.counting}</li>
   //                              <li>{dopWork.iteration}</li>
   //                              <li>{dopWork.pointsRemove}</li>
   //                              <li>{dopWork.dispute}</li>
   //                              <li>{dopWork.commentError}</li>
   //                              <li>{dopWork.deadlines}</li>
   //                              <li>{dopWork.delayTester}</li>
   //                              <li>{dopWork.point}</li>
   //                              <li>{dopWork.delayExecutor}</li>
   //                              <li>{dopWork.departament}</li>
   //                              <li><a href={dopWork.linkReport} target='_blank'>{dopWork.linkReport}</a></li>
   //                          </ul> 
   //                      </div>
   //                  )
   //              })} 
   //              </div>
   //          </div>  */}
   //      </div>
   //  )

}

export default GlobalTable;
