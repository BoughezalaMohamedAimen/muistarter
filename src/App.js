import React, {useState} from 'react'
import MiniDrawer from './layouts/Drawer'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";

import Dashboard from "./pages/dashboard"
import Clients from "./pages/clients"
import Purshases from "./pages/purshases"
import Sales from "./pages/sales"
import Providers from "./pages/providers"
import Charges from "./pages/charges"
import Products from "./pages/products"

export default function App() {

  const [darkmode, setdarkmode] = useState("light")
  const theme = createTheme({
    palette: {
      mode: darkmode,
      primary: {
        main: "#990020",
        darker: '#053e85',
      },
      neutral: {
        main: '#64748B',
        contrastText: '#fff',
      },
    },
    components: {
      MuiAppBar: {
        defaultProps: {
          enableColorOnDark: true
        }
      }
    }
  });

  return (
    <>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MiniDrawer darkmode={{darkmode,setdarkmode}} >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/purshases" element={<Purshases />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/providers" element={<Providers />} />
          <Route path="/charges" element={<Charges />} />
          <Route path="/products" element={<Products />} />
        </Routes>
        </MiniDrawer>
      </ThemeProvider>
    </BrowserRouter>

    </>
  )
}
