import { useEffect } from 'react';
import { ModalStyled, Overlay } from './Modal.styled';

export const Modal = ({ closeModal, largeImageUrl, tags }) => {
  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalStyled>
        <img src={largeImageUrl} alt={tags} />
      </ModalStyled>
    </Overlay>
  );
};
