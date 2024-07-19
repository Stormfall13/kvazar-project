import React, { useEffect, useState, useRef } from 'react'
import './globalTable.css';
import '../../App.css';
import Box from '@mui/material/Box';
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarExport,
	GridToolbarColumnsButton,
	GridToolbarDensitySelector,
	ruRU,
} from '@mui/x-data-grid';
import ReportQA from '../reportQA/ReportQA';
import FormTableTesting from './FormTableTesting';
import { getColumnsConfig } from './columnsConfig';
import CountingWindow from './CountingWindow';
import useUserRoles from '../../auth/useUserRoles';
import ConfirmModal from './ConfirmModal';

function CustomToolbar() {
	return (
	<GridToolbarContainer>
		<GridToolbarColumnsButton className='btnGrid' />
		<GridToolbarDensitySelector className='btnGrid' />
		<GridToolbarExport className='btnGrid' />
	</GridToolbarContainer>
	);
}

const myLocaleText = {
	toolbarExport: 'Экспорт',
	toolbarExportLabel: 'Экспорт',
	toolbarExportCSV: 'Скачать в формате CSV',
};

const GlobalTable = () => {

	const [ currentId , setCurrentId ] = useState(''); // id строки
	const [ rowsItem , setRowsItem ] = useState('');  // строка при клике на редактирование
	const [ isFormVisible, setIsFormVisible ] = useState(false); // переменная открытия формы редактирования
	const [ countingWindowVisible, setCountingWindowVisible ] = useState(false); 
    const [ countingWindowData, setCountingWindowData ] = useState('');
	const [isModalVisible, setIsModalVisible] = useState(false); // открытие окна для подтверждения удаления
	const [rowToBeDeleted, setRowToBeDeleted] = useState(null); // строка которая передается в окно удаления строки т.е. id туда передает
	const formRef = useRef(null); // при клике на редактирования прокручивает страницу до формы

	const [rows, setRows] = React.useState([]);
	const [rowModesModel, setRowModesModel] = React.useState({});
	const sortRowsByCreatedAt = (rowArray) => {
		return [...rowArray].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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
	
		const getRowFromUniqueId = (uniqueId) => {
			return rows.find(row => row.uniqueId === uniqueId);
		}

	const roles = useUserRoles();

	const userHasRole = (role) => {
		return roles.includes(role);
	};

	const handleEditClick = (row) => {
		// console.log(row);
		setCurrentId(row.id);
		setRowsItem(row);
		setIsFormVisible(true);
		setTimeout(() => {
            if (formRef.current) {
                formRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 0);
		
	};
	const handleCountingClick = (data) => {
        setCountingWindowData(data);
        setCountingWindowVisible(true);
    };
    const handleCloseCountingWindow = () => {
        setCountingWindowVisible(false);
        setCountingWindowData('');
    };

	const handleDeleteClick = (row) => {
        setRowToBeDeleted(row);
        setIsModalVisible(true);
    };

	const cancelDelete = () => {
        setIsModalVisible(false);
        setRowToBeDeleted(null);
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

	const confirmDelete = async (row) => {
		console.log(row.id);
		if (rowToBeDeleted) {
            try {
                const response = await fetch(`http://localhost:5000/api/dop-work/${rowToBeDeleted.id}`, {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                    },
                });

                if (response.ok) {
                    setRows(rows.filter((r) => r.id !== rowToBeDeleted.id));
                    console.log(`Row with ID: ${rowToBeDeleted.id} has been deleted.`);
                } else {
                    console.error(`Failed to delete row with ID: ${rowToBeDeleted.id}`);
                }
            } catch (error) {
                console.error('Error while deleting row:', error);
            } finally {
                setIsModalVisible(false);
                setRowToBeDeleted(null);
            }
        }	
	}

	const columns = getColumnsConfig(handleEditClick, handleDeleteClick, getRowFromUniqueId, handleCountingClick);
	
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
				className='global__table'
				rows={rows}
				getRowId={(row) => row.uniqueId}
				columns={columns}
				editMode="row"
				rowModesModel={rowModesModel}
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
			<div ref={formRef}>
				<FormTableTesting currentId={currentId} rowsItem={rowsItem} fetchData={fetchData} isVisible={isFormVisible}  onClose={() => setIsFormVisible(false)}  />
			</div>
			<ReportQA/>
			<ConfirmModal show={isModalVisible} onClose={cancelDelete} onConfirm={confirmDelete} />
			{countingWindowVisible && <CountingWindow data={countingWindowData} onClose={handleCloseCountingWindow} />}
		</>
	);
}

export default GlobalTable;
