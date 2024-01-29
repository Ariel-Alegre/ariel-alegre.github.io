import React, { useEffect } from 'react';

const MyIzipayComponent = () => {
  useEffect(() => {
    const callbackResponsePayment = (response) => console.log(response);

    try {
      const iziConfig = {
        config: {
          // Configuración específica, puedes personalizar según tus necesidades
          // ...
          render: {
            typeForm: 'pop-up'
          },
          // ...
        }
      };

      const checkout = new ({ config: iziConfig });

      checkout &&
        checkout.LoadForm({
          authorization: 'TU_TOKEN_SESSION',
          keyRSA: 'TU_KEY_RSA',
          callbackResponse: callbackResponsePayment,
        });
    } catch (error) {
      console.log(error.message, error.Errors, error.date);
    }
  }, []); // El segundo argumento del useEffect asegura que este código se ejecute solo una vez al montar el componente

  return (
    <div>
      {/* Contenido del componente */}
    </div>
  );
};

export default MyIzipayComponent;
