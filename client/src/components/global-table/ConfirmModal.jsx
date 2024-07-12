import React from 'react';
import './ConfirmModal.css';

const ConfirmModal = ({ show, onClose, onConfirm }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Хотите удалить строку?</h2>
        <div className="modal-actions">
          <button className="btn btn-confirm" onClick={onConfirm}>Да</button>
          <button className="btn btn-cancel" onClick={onClose}>Нет</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;