import React, { useRef, useState } from 'react';
import './App.css';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import HTMLFlipBook from 'react-pageflip';
import pageBG from './images/page_bg.png';
import CakeWithCandles from './CakeWithCandles';

const Page = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} data-density={props.density || "hard"}>
      <div style={{backgroundImage: `url(${pageBG})`, height:"772px", width:"550px", border:"2px solid rgb(198, 194, 194)", padding:"20px 20px 10px 20px"}}>
        {props.children}
      </div>
    </div>
  );
});

const BirthdayCard = () => {
  const location = useLocation();
  const decodedData = JSON.parse(atob(queryString.parseUrl(location.pathname+location.search).query.data));
  const flipBookRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    <Page>
      <div className='card-front'>
        <span className='card-tag'>Happy Birthday!</span>
        <span className='card-name'>{decodedData.name}</span>
        {/* <span>You're aging like fine wine!</span> */}
      </div>
    </Page>,
    <Page>
      <div className='card-front-back'>
      <span>{decodedData.message}</span>
      </div>
    </Page>,
    <Page>
      <div className='card-main'>
        <span className='card-wish'>Make a wish!!!</span>
        <span className='card-cake'>Here will be the cake with candles</span>
        <div>
          {currentPage!==0 && <CakeWithCandles candleCount={decodedData.age}/>}
        </div>
      </div>
    </Page>,
    <Page />
  ];

  const onPage = (e) => {
    setCurrentPage(e.data);
  }

  return (
    <div style={{height:"100vh", display:"flex", justifyContent:"center", alignItems:"center", background:"#FCAF3C"}}>
      <HTMLFlipBook
        width={550}
        height={802}
        minWidth={115}
        maxWidth={2000}
        minHeight={100}
        maxHeight={2533}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        onFlip={onPage}
        style={{backgroundImage: `url(./images/page_bg.png)`}}
        ref={flipBookRef}
      >
        {pages}
      </HTMLFlipBook>
    </div>
  );
};

export default BirthdayCard;
