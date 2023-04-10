import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Event2sigma from './pages/event2sigma/Event2sigma';
import Sigma2atk from './pages/sigma2atk/Sigma2atk';
import Sigma2siem from './pages/sigma2siem/Sigma2siem';
import Siem2siem from './pages/siem2siem/Siem2siem';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="event2sigma" element={<Event2sigma />} />
      <Route path="sigma2atk" element={<Sigma2atk />} />
      <Route path="sigma2siem" element={<Sigma2siem />} />
      <Route path="siem2siem" element={<Siem2siem/>}/>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
