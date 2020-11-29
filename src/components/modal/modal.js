import React from 'react';
import './modal.css';
import Backdrop from '../backdrop/backdrop';

export default function Modal({show, closeModal}) {
  const template = (
    <>
      <Backdrop show={show} backdropClicked={() => closeModal(false)} />
      <div className="modal">
        <header>Confirmation alert</header>
        <section>Are you sure you want to delete the tab?</section>
        <footer>
          <button className="cancel" onClick={() => closeModal(false)}>
            No
          </button>
          <button className="confirm" onClick={() => closeModal(true)}>
            Yes
          </button>
        </footer>
      </div>
    </>
  );

  return show ? template : null;
}
