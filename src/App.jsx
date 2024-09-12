import './App.css';
import "./index.css";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import AppRouter from './router/router';
import { onAuthStateChanged, auth , getDoc, db, doc} from './config/firebase';
import { User, ActiveData } from './config/context';
import { useEffect, useState } from 'react';

function App() {

  let [value, setValue] = useState("")
  let [data, setData] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, async(u) => {
      if (u) {
        let docRef = doc(db, "Users", u.uid);
        let docSnap = await getDoc(docRef)
          setData(docSnap.data());
        setValue(u);
      } else {
        setValue("");
      }
    })
  }, [])

  return (
    <User.Provider value={value}>
      <ActiveData.Provider value={data}>
    <AppRouter />
    </ActiveData.Provider>
    </User.Provider>
  )
}

export default App
