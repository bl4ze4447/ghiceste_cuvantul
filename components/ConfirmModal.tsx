'use client'

import './styles/ConfirmModal.css';

import { ModalAnswer } from '@/constants/constants';

interface ConfirmModalProps {
  action: string;
  setModalResult: React.Dispatch<React.SetStateAction<ModalAnswer>>;
  invertColors: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    action, 
    setModalResult, 
    invertColors
}) => {
    return (
        <section>
            <div className="modal">
                <p className="modal-p">Sunteți sigur?</p>
                <p className="modal-p mp-em">{action}</p>
                <div className='modal-answers-container'>
                    <div className={`modal-answer ${invertColors ? 'ma-gray' : 'ma-red'}`}>
                        <p className='modal-action' onClick={() => { setModalResult(ModalAnswer.NO) }}>Nu</p>
                    </div>
                    <div className={`modal-answer ${invertColors ? 'ma-red' : 'ma-gray'}`}>
                        <p className='modal-action' onClick={() => { setModalResult(ModalAnswer.YES) }}>Da</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ConfirmModal;