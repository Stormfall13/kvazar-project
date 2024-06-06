import React from 'react'
import './globalTable.css'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const CountingWindow = ({ data, onClose }) => {

    return (
        <div className='counting__window'>
            <div className='counting__area'>{data}</div>
            <button className='close__countingWindow' onClick={onClose}><CloseOutlinedIcon/></button>
        </div>
    )
}

export default CountingWindow;
