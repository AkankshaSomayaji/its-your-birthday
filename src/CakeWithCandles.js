import React, { useState, useEffect } from 'react';
import { animated, useSprings } from 'react-spring';
import litCandle from './images/candle-lit.svg';
import unlitCandle from './images/candle-unlit.svg';

const CakeWithCandles = ({ candleCount }) => {
  const [candles, setCandles] = useState([]);
  const [blownCandles, setBlownCandles] = useState(Array(candleCount).fill(false));

  useEffect(() => {
    // Create an array of candle positions
    const initialCandles = Array.from({ length: candleCount }, (_, index) => ({
      x: Math.random() * 400, // initial x position
      y: -50, // initial y position above the cake
      delay: index * 100, // staggered delay for animation
    }));

    setCandles(initialCandles);

    // Request microphone access
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);

        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        analyser.getByteFrequencyData(dataArray);

        const detectBlowing = () => {
          analyser.getByteFrequencyData(dataArray);

          // You need to implement a logic to detect blowing based on dataArray
          // This might involve analyzing frequency or amplitude changes.

          // For simplicity, I'll assume blowing if the first element of the array is high.
          const isBlowing = dataArray[0] > 150;

          if (isBlowing) {
            // Assuming a single candle for simplicity
            setBlownCandles([true]);
          }

          requestAnimationFrame(detectBlowing);
        };

        detectBlowing();
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });
  }, [candleCount]);

  const candleSprings = useSprings(
    candleCount,
    candles.map(({ x, y, delay }, index) => ({
      key: {index},
      from: { opacity: 0, y: -50 }, // initial position and opacity
      to: { opacity: 1, y: 0 }, // final position and opacity
      delay, // staggered delay
      config: { duration: 500 }, // animation duration
      reset: true, // reset the animation when the number of candles changes
    }))
  );

  return (
    <div style={{ position:'relative', width:'300px', height:'400px' }}>
      <div className="cake"/>
      {candleSprings.map((props, index) => (
        <animated.div
          key={index}
          style={{
            position: 'absolute',
            bottom: '40px',
            left: candles[index]?.x || 0,
            transform: blownCandles[index] ? 'none' : props.y?.to((y) => `translateY(${y}px)`),
            opacity: props.opacity,
          }}
        >
          <img src={blownCandles[index] ? unlitCandle : litCandle} alt="🕯️" />
        </animated.div>
      ))}
    </div>
  );
};

export default CakeWithCandles;
