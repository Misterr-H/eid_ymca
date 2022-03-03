import './App.css';
import Header from './components/Header';
import Content from './components/Content';
import Id from './components/Id';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from './keys/Api';
import authHeader from './services/authHeader';
import { useEffect, useState } from 'react';
import { SocketContext, socket } from './services/socket';



function App() {
  const [loggedin, setLoggedin] = useState(false);
  const [username, setUsername] = useState("")
  const [img, setImg] = useState("");
  const [data, setData] = useState({})
  const [plaindata, setPlaindata] = useState({})




  useEffect(() => {
    axios.get(API_URL + "id", { headers: authHeader() }).then(res => {
    
      if (res.data.state) {
        console.log(res.data)
        setUsername(res.data.username);
        setImg(res.data.img);
        setData(res.data.data);
        setPlaindata(res.data.plaindata)
  
        setLoggedin(true);
        
      }
    })
  
    
  }, [])
  
  // axios.get(API_URL + "id", { headers: authHeader() }).then(res => {
    
  //   if (res.data.state) {
  //     console.log(res.data)
  //     setUsername(res.data.username);
  //     setImg(res.data.img);
  //     setData(res.data.data);

  //     setLoggedin(true);
      
  //   }
  // })





  return (
    <>
      <SocketContext.Provider value={socket}>
        <Router>
          <Routes>
            <Route path="/" element={loggedin ? <Id username={username} img={img} data={data} plaindata={plaindata} />: (
                <>
                  <Header />
                  <Content />
                </>
              
            )} />
          </Routes>
        </Router>
      </SocketContext.Provider>
    </>
  );
}

export default App;
