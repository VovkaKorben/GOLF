



import MainPage from './comps/MainPage.js';
import Editor from './comps/Editor.js';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

export default function App() {



  return (





    <Routes>
      <Route path="/" element={<MainPage />} />

      <Route path="/game/:url_game_id?" element={<Editor />} />
    </Routes>


  )
}

