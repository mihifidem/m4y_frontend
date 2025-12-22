import React from "react";

export default function HomeInfo() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 p-6">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-8 border border-rose-200 animate-fade-in">
        <h1 className="text-4xl font-bold text-rose-600 mb-6 text-center">Bienvenido a tengo un "Mensaje para ti"</h1>
        <strong>Un regalo, un mensaje, una  emoción.</strong>
        <br></br>  <br></br>
        <p className="text-lg text-gray-700 mb-6 text-center">
        
        Acompaña tu regalo con un mensaje personalizado en vídeo, audio o texto que tu persona especial podrá descubrir al instante.
        No es necesario instalar ninguna aplicación: accede directamente desde tu móvil mediante un código, un QR o tecnología NFC.
        Un detalle único, personal y lleno de emoción, disponible en cualquier momento y lugar.        </p>
      
        <div className="mb-8 flex justify-center">
          <div className="aspect-w-16 aspect-h-9 w-full max-w-xl">
            <iframe
              className="rounded-xl shadow-lg"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/2Vv-BfVoq4g" // Cambia por tu video real
              title="Video explicativo NotodoSonFlores"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm">
          ¿Tienes dudas? Consulta las instrucciones o contacta a soporte.
        </div>
      </div>
    </div>
  );
}
