import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

const EyeTracker: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    const runFaceLandmarksDetection = async () => {
      const net = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
      );

      const videoElement = webcamRef.current?.video;

      if (videoElement) {
        const mediaStream = videoElement.srcObject as MediaStream;

        const videoTrack = mediaStream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(videoTrack);

        const detectEyes = async () => {
          const imageBitmap = await imageCapture.grabFrame();

          const predictions = await net.estimateFaces({
            input: imageBitmap,
            predictIrises: true,
          });

          if (predictions.length > 0) {
            predictions.forEach((prediction) => {
              const leftEye = prediction.annotations.leftEyeUpper0;
              const rightEye = prediction.annotations.rightEyeUpper0;

              drawEye(leftEye, '#00ff00'); // Menggambar kotak persegi untuk mata kiri
              drawEye(rightEye, '#00ff00'); // Menggambar kotak persegi untuk mata kanan
            });
          }

          requestAnimationFrame(detectEyes);
        };

        detectEyes();
      }
    };

    runFaceLandmarksDetection();
  }, []);

  const drawEye = (eyePoints: number[][], color: string) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (context) {
      context.strokeStyle = color;
      context.lineWidth = 2;

      eyePoints.forEach((point, index) => {
        if (index === 0) {
          context.beginPath();
          context.moveTo(point[0], point[1]);
        } else {
          context.lineTo(point[0], point[1]);
        }
      });

      context.closePath();
      context.stroke();

      document.body.appendChild(canvas);
    }
  };

  return (
    <div>
      <Webcam ref={webcamRef} />
    </div>
  );
};

export default EyeTracker;
