import React from 'react';

const ContactForm = ({ onClose }: { onClose: () => void }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* ✖ Bottone per chiudere il popup */}
        <button onClick={onClose} style={styles.closeButton}>
          ✕
        </button>

        {/* ✅ Form Tally integrato direttamente nel sito */}
        <iframe
          data-tally-src="https://tally.so/r/n0NPNZ?transparentBackground=1&hideTitle=1&dynamicHeight=1"
          width="100%"
          height="100%"
          frameBorder="0"
          title="Crea il tuo Sito Web (gratis!)"
          style={styles.iframe}
        ></iframe>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modal: {
    position: 'relative' as const,
    backgroundColor: 'white',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '800px',
    height: '90vh',
    overflow: 'hidden',
  },
  iframe: {
    border: 'none',
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute' as const,
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    zIndex: 10,
  },
};

export default ContactForm;
