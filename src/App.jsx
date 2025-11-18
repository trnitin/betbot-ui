// import { useState,useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)
//   const [bets,setBets] = useState([])

//   useEffect(() => {
//     async function fetcher(){
//       // const data = await fetch('http://localhost:8000/betlist');
//       // const data = await fetch('http://localhost:8000/integratedBetfairOrder');
//       const data = await fetch('http://localhost:3000/betlist');

//       const resp = await data.json();
//      return resp
//     }
//     // setInterval(() => {
//     //   fetcher().then((res) => {
//     //     setBets(res)
//     //   }).catch((err) => {
//     //     console.log(err)
//     //   })
//     // // },5000)
//     // return

//     const intervalId = setInterval(() => {
//           fetcher().then((res) => {
//             if(res){
//               setBets(res); 
//             }
//             // update state with fetched data
//           }).catch((err) => {
//             console.log('Error during fetching:', err);
//           });
//         }, 5000);
    
//         // Cleanup function to clear the interval
//         return () => clearInterval(intervalId);
//   },[])

//   // useEffect(() => {
//   //   const fetcher = async () => {
//   //     try {
//   //       const response = await fetch('http://localhost:8000/betlist');
        
//   //       // Check if the response is OK (status code 200-299)
//   //       if (!response.ok) {
//   //         throw new Error(`HTTP error! status: ${response.status}`);
//   //       }

//   //       const data = await response.json();
//   //       return data; // return the fetched data
//   //     } catch (error) {
//   //       console.error('Error fetching data:', error);
//   //       return []; // return an empty array or handle as needed
//   //     }
//   //   };

//   //   const intervalId = setInterval(() => {
//   //     fetcher().then((res) => {
//   //       if(res){
//   //         setBets(res); 

//   //       }
//   //       // update state with fetched data
//   //     }).catch((err) => {
//   //       console.log('Error during fetching:', err);
//   //     });
//   //   }, 10000);

//   //   // Cleanup function to clear the interval
//   //   return () => clearInterval(intervalId);
//   // }, []); //

//   const clickedItem = async (id) => { 
//     const newBets = [...bets]
//     newBets.map((ele) => {
//       if(ele.apolloBetId === id){
//         ele.read = true
//       }
//       return ele
//     })
//     setBets(newBets)
//     // const resp = await fetch('http://localhost:8000/updatebet',{
//     //   method:'POST',
//     //   headers:{
//     //     "content-type":'Application/json',
//     //   },
//     //   body: JSON.stringify({id:id})
//     // })
//     // const data = await resp.json();
//     console.log('clicked')
//   }

//   return (
//     <>
//     <h1>Bet List</h1>
//     {console.log(bets,"nets")}
//     <div className="betLayout">
//     {bets && bets.map((ele) => {
//       const date = new Date(ele?.betPlacedDate)
//         return(
//           <div className={'card'} key={ele?.apolloBetId} onClick={()=>clickedItem(ele?.apolloBetId)} style={{backgroundColor: !ele?.betfairPlaced ? '#e0e0e0' : 'white',border:ele?.success? '1px solid green':'1px solid red'}}>
//              <p> {ele?.selectionName}: <span className={ele?.side ? 'unread' : 'read'}> {ele?.side ?  'Lay': 'Back'}</span>, To Play: <span className={ele.side ? 'read': 'unread'}>{ele.side ?  'Back':'Lay'}</span></p>
//             <div style={{display:'flex',gap:'10px'}}>
//               <h6 style={{margin:'0px',marginBottom:'7px'}}>Size: {ele?.sizeMatched}</h6>
//               ,<h6 style={{margin:'0px',marginBottom:'7px'}}>Price: {ele?.price}</h6>
//             </div>
//             {/* {date.toDateString()} */}
//             <p>Event: {ele?.eventName}</p>
//             <p>Time:  {date?.toLocaleTimeString()}</p>
//             <div style={{display:'flex',gap:'10px'}}>
//             <p>Tried:{ele?.betfairPlaced ? "True" : "False"},</p>
//             <p>Success: {ele?.success ? "True":"False"}</p>
//             </div>
            
//             {/* <p>Favourite: {ele.selectionName}</p> */}
//           </div>
//         )
//       })}
//     </div> 
//     </>
//   )
// }

// export default App

import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [bets, setBets] = useState([])

  useEffect(() => {
    async function fetcher() {
      // for lotus betlist
      // const data = await fetch('http://localhost:8000/betlist');

      // for t-10 betlist
      const data = await fetch('http://localhost:3000/betlist');
      const resp = await data.json();
      return resp
    }

    const intervalId = setInterval(() => {
      fetcher().then((res) => {
        if (res) {
          setBets(res);
        }
        // update state with fetched data
      }).catch((err) => {
        console.log('Error during fetching:', err);
      });
    }, 1000);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, [])

  return (
    <>
      <h1>Bet List</h1>
      {/* for lotus betlist view */}

      {/* <div className="betLayout">
    {bets && bets.map((ele) => {
      const date = new Date(ele?.betPlacedDate)
        return(
          <div className={'card'} key={ele?.apolloBetId} onClick={()=>clickedItem(ele?.apolloBetId)} style={{backgroundColor: ele?.placed ? '#e0e0e0' : 'white',border:ele?.success? '1px solid green':'1px solid red'}}>
             <p> {ele?.selectionName}: <span className={ele?.side ? 'unread' : 'read'}> {ele?.side ?  'Lay': 'Back'}</span>, To Play: <span className={ele.side ? 'read': 'unread'}>{ele.side ?  'Back':'Lay'}</span></p>
            <div style={{display:'flex',gap:'10px'}}>
              <h6 style={{margin:'0px',marginBottom:'7px'}}>Size: {ele?.sizeMatched}</h6>
              ,<h6 style={{margin:'0px',marginBottom:'7px'}}>Price: {ele?.price}</h6>
            </div>
            <p>Event: {ele?.eventName}</p>
            <p>Time:  {date?.toLocaleTimeString()}</p>
            <div style={{display:'flex',gap:'10px'}}>
            <p>Tried:{ele?.placed ? "True" : "False"},</p>
            <p>Success: {ele?.success ? "True":"False"}</p>
            </div>
          </div>
        )
      })}
    </div>  */}


      {/* for t-10 betlistview */}
      <div className="betLayout">
        {bets?.data && bets?.data?.map((ele) => {
          return (
            <div className={'card'} key={ele?.betId} style={{ backgroundColor: ele?.betfairPlaced ? '#e0e0e0' : 'white', border: ele?.success ? '1px solid green' : '1px solid red' }}>
              {/* <p>Event: {ele?.eventName}</p> */}
              <p style={{fontSize:'16px',fontWeight:'bold'}}>user: {ele?.userName}</p>
              <p style={{fontSize:'15px'}}>selected: {ele?.selectionName}</p>
              <div style={{ display: 'flex', gap: '3px' }}>
                 <p><b>Stake:{ele?.stake}</b>,</p>
                <p><b>Odds:{ele.oddsPrice}</b></p>
              </div>
              <p>Played: <span className={ele?.type === 'L' ? 'unread' : 'read'}>{ele?.type === 'L' ? "Lay" : 'Back'}</span>, To Play: <span className={ele?.type === 'L' ? 'read' : 'unread'}>{ele?.type === 'L' ? "Back" : 'Lay'}</span></p>
              <p>Time: {new Date(ele?.createdAt).toLocaleString("en-US", { timeZone: 'Asia/Kolkata' })}</p>

              <div style={{ display: 'flex', gap: '10px' }}>
                <p>Tried:{ele?.betfairPlaced ? "True" : "False"},</p>
                <p>Success: {ele?.success ? "True" : "False"}</p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
