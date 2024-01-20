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
      <div className="cake">
        <svg id="visual" viewBox="0 0 900 600" width="900" height="600" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <path
            d="M0 386L30 387C60 388 120 390 180 390.5C240 391 300 390 360 391C420 392 480 395 540 396C600 397 660 396 720 393C780 390 840 385 870 382.5L900 380L900 601L870 601C840 601 780 601 720 601C660 601 600 601 540 601C480 601 420 601 360 601C300 601 240 601 180 601C120 601 60 601 30 601L0 601Z" fill="#f7770f"></path><path d="M0 443L30 442.5C60 442 120 441 180 440.3C240 439.7 300 439.3 360 440C420 440.7 480 442.3 540 442.8C600 443.3 660 442.7 720 439.5C780 436.3 840 430.7 870 427.8L900 425L900 601L870 601C840 601 780 601 720 601C660 601 600 601 540 601C480 601 420 601 360 601C300 601 240 601 180 601C120 601 60 601 30 601L0 601Z" fill="#f35339"></path><path d="M0 483L30 483.3C60 483.7 120 484.3 180 486.8C240 489.3 300 493.7 360 492.2C420 490.7 480 483.3 540 483.7C600 484 660 492 720 495.2C780 498.3 840 496.7 870 495.8L900 495L900 601L870 601C840 601 780 601 720 601C660 601 600 601 540 601C480 601 420 601 360 601C300 601 240 601 180 601C120 601 60 601 30 601L0 601Z" fill="#e23553"></path><path d="M0 546L30 544.7C60 543.3 120 540.7 180 539C240 537.3 300 536.7 360 535.3C420 534 480 532 540 533.2C600 534.3 660 538.7 720 540.7C780 542.7 840 542.3 870 542.2L900 542L900 601L870 601C840 601 780 601 720 601C660 601 600 601 540 601C480 601 420 601 360 601C300 601 240 601 180 601C120 601 60 601 30 601L0 601Z"
            fill="#c62368"
          >
          </path>
        </svg>
      </div>
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
