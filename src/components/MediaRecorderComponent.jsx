import React, { useRef, useState } from "react";
import axios from "../api/axios";

const MediaRecorderComponent = () => {
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const mediaStreamRef = useRef(null);
  const videoRecorderRef = useRef(null);
  const audioRecorderRef = useRef(null);
  const videoChunksRef = useRef([]);
  const audioChunksRef = useRef([]);

  React.useEffect(() => {
    if (
      window.location.protocol !== "https:" &&
      window.location.hostname !== "localhost" &&
      window.location.hostname !== "127.0.0.1"
    ) {
      setError("La grabación solo funciona en HTTPS.");
    }
  }, []);

  const startRecording = async () => {
    setError("");
    setVideoUrl(null);
    setAudioUrl(null);
    setVideoFile(null);
    setAudioFile(null);

    if (
      window.location.protocol !== "https:" &&
      window.location.hostname !== "localhost" &&
      window.location.hostname !== "127.0.0.1"
    ) {
      setError("La grabación solo funciona en HTTPS.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      mediaStreamRef.current = stream;


      // VIDEO: probar varios mimeTypes
      const videoMimeTypes = [
        "video/mp4",
        "video/webm",
        "video/webm;codecs=vp8",
        "video/webm;codecs=vp9"
      ];
      let videoMimeTypeOk = null;
      let videoRecorder = null;
      for (const mt of videoMimeTypes) {
        if (MediaRecorder.isTypeSupported(mt)) {
          try {
            videoRecorder = new MediaRecorder(stream, { mimeType: mt });
            videoMimeTypeOk = mt;
            break;
          } catch (e) {
            // sigue probando
          }
        }
      }
      if (!videoRecorder) {
        setError("Este navegador o dispositivo no soporta grabación de video con los formatos requeridos.\n\nSugerencias:\n- Usa la última versión de Chrome, Firefox o Edge.\n- Prueba en una computadora de escritorio.\n- Si estás en móvil, prueba con Chrome o Firefox.\n- Verifica que la cámara no esté siendo usada por otra app.");
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      videoRecorderRef.current = videoRecorder;
      videoChunksRef.current = [];
      videoRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) videoChunksRef.current.push(e.data);
      };
      // ...existing code...


      // AUDIO: probar varios mimeTypes
      const audioMimeTypes = [
        "audio/webm",
        "audio/webm;codecs=opus",
        "audio/wav"
      ];
      let audioMimeTypeOk = null;
      let audioRecorder = null;
      for (const mt of audioMimeTypes) {
        if (MediaRecorder.isTypeSupported(mt)) {
          try {
            audioRecorder = new MediaRecorder(stream, { mimeType: mt });
            audioMimeTypeOk = mt;
            break;
          } catch (e) {
            // sigue probando
          }
        }
      }
      if (!audioRecorder) {
        setError("Este navegador o dispositivo no soporta grabación de audio con los formatos requeridos.\n\nSugerencias:\n- Usa la última versión de Chrome, Firefox o Edge.\n- Prueba en una computadora de escritorio.\n- Si estás en móvil, prueba con Chrome o Firefox.\n- Verifica que el micrófono no esté siendo usado por otra app.");
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      audioRecorderRef.current = audioRecorder;
      audioChunksRef.current = [];
      audioRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      // Start both
      try {
        videoRecorderRef.current.start();
        audioRecorderRef.current.start();
        setRecording(true);
      } catch (e) {
        setError("Error al iniciar la grabación: " + e.message);
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
    } catch (err) {
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setError("Permiso denegado para acceder a cámara/micrófono.");
      } else {
        setError("Error al acceder a cámara/micrófono: " + err.message);
      }
    }
  };

  const stopRecording = () => {
    setRecording(false);

    // Stop recorders
    if (videoRecorderRef.current && videoRecorderRef.current.state !== "inactive") {
      videoRecorderRef.current.stop();
    }
    if (audioRecorderRef.current && audioRecorderRef.current.state !== "inactive") {
      audioRecorderRef.current.stop();
    }

    // Stop tracks
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }

    // Handle video
    videoRecorderRef.current.onstop = () => {
      const videoBlob = new Blob(videoChunksRef.current, { type: videoRecorderRef.current.mimeType });
      if (videoBlob.size === 0) {
        setError("El archivo de vídeo está vacío.");
        return;
      }
      const ext = videoRecorderRef.current.mimeType === "video/mp4" ? "mp4" : "webm";
      const file = new File([videoBlob], `grabacion_video.${ext}`, { type: videoRecorderRef.current.mimeType });
      setVideoFile(file);
      setVideoUrl(URL.createObjectURL(videoBlob));
    };

    // Handle audio
    audioRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: audioRecorderRef.current.mimeType });
      if (audioBlob.size === 0) {
        setError("El archivo de audio está vacío.");
        return;
      }
      const file = new File([audioBlob], "grabacion_audio.webm", { type: audioRecorderRef.current.mimeType });
      setAudioFile(file);
      setAudioUrl(URL.createObjectURL(audioBlob));
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!videoFile || !audioFile) {
      setError("Debes grabar y detener la grabación antes de enviar.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("audio", audioFile);

    try {
      await axios.post("/api/tu-endpoint/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        maxContentLength: 50 * 1024 * 1024, // 50MB
      });
      alert("¡Archivos enviados correctamente!");
      setVideoUrl(null);
      setAudioUrl(null);
      setVideoFile(null);
      setAudioFile(null);
    } catch (err) {
      if (err.response && err.response.status === 413) {
        setError("El archivo es demasiado grande (error 413).");
      } else {
        setError("Error al enviar archivos: " + (err.message || "Desconocido"));
      }
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Grabador de Vídeo y Audio</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}

      {!recording && (
        <button onClick={startRecording} disabled={!!error || recording}>
          Iniciar grabación
        </button>
      )}
      {recording && (
        <button onClick={stopRecording} disabled={!recording}>
          Detener grabación
        </button>
      )}

      {/* Previews */}
      {videoUrl && (
        <div>
          <h3>Preview Vídeo</h3>
          <video src={videoUrl} controls width={320} />
        </div>
      )}
      {audioUrl && (
        <div>
          <h3>Preview Audio</h3>
          <audio src={audioUrl} controls />
        </div>
      )}

      {/* Submit */}
      <form onSubmit={handleSubmit}>
        <button type="submit" disabled={!videoFile || !audioFile || loading}>
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
};

export default MediaRecorderComponent;
