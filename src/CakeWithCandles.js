import React, { useState, useEffect } from 'react';
import { animated, useSprings } from 'react-spring';

const CakeWithCandles = ({ candleCount }) => {
  const [candles, setCandles] = useState([]);

  useEffect(() => {
    // Create an array of candle positions
    const initialCandles = Array.from({ length: candleCount }, (_, index) => ({
      x: Math.random() * 300, // initial x position
      y: -50, // initial y position above the cake
      delay: index * 100, // staggered delay for animation
    }));

    setCandles(initialCandles);
  }, [candleCount]);

  const candleSprings = useSprings(
    candleCount,
    candles.map(({ x, y, delay }, index) => ({
      from: { opacity: 0, y: -50 }, // initial position and opacity
      to: { opacity: 1, y: 0 }, // final position and opacity
      delay, // staggered delay
      config: { duration: 500 }, // animation duration
      reset: true, // reset the animation when the number of candles changes
    }))
  );

  return (
    <div style={{ position: 'relative', width: '300px', height: '400px' }}>
      <div className="cake"/>
      {candleSprings.map((props, index) => (
        <animated.div
          key={index}
          style={{
            position: 'absolute',
            bottom: '40px',
            left: candles[index]?.x || 0,
            transform: props.y?.to((y) => `translateY(${y}px)`),
            opacity: props.opacity,
          }}
        >
          🕯️
        </animated.div>
      ))}
    </div>
  );
};

export default CakeWithCandles;
