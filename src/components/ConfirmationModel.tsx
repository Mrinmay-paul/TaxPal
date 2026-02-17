import React from 'react'

interface Props {
    title: string;
    message?: string;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

function ConfirmationModel(props: Props) {
    const {title,message, isOpen, onClose, onConfirm} = props

    return (
        <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                    <h2 className="text-lg font-semibold mb-4">{title}</h2>
                    <p className="mb-4">{message || "Are you sure you want to proceed?"}</p>
                    <div className="flex justify-end space-x-2">
                        <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
                        <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded-md">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModel
