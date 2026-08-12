'use client';

import Link from 'next/link';
import css from './ModalErrorSave.module.css';

interface ModalErrorSaveProps {
    onClose: () => void;
}

const ModalErrorSave = ({ onClose }: ModalErrorSaveProps) => {
    return (
        <div className={css.modalErrorSaveBackdrop}>
            <div
                className={css.modalErrorSave}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-error-save-title"
            >
                <button
                    className={css.modalErrorSaveCloseButton}
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <svg
                        className={css.modalErrorSaveCloseIcon}
                        width="24"
                        height="24"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                    >
                        <use href="/sprite.svg#Controls=close, Type=stroke, Size=32px" />
                    </svg>
                </button>

                <h2
                    className={css.modalErrorSaveTitle}
                    id="modal-error-save-title"
                >
                    Error while saving
                </h2>

                <p className={css.modalErrorSaveText}>
                    To save this article, you need to
                    <br />
                    authorize first
                </p>

                <div className={css.modalErrorSaveActions}>
                    <Link
                        href="/login"
                        className={css.modalErrorSaveLoginButton}
                    >
                        Login
                    </Link>

                    <Link
                        href="/register"
                        className={css.modalErrorSaveRegisterButton}
                    >
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ModalErrorSave;