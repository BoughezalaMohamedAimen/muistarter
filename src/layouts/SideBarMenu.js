import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import GroupIcon from '@mui/icons-material/Group';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InventoryIcon from '@mui/icons-material/Inventory';
import LineAxisIcon from '@mui/icons-material/LineAxis';
import AddchartIcon from '@mui/icons-material/Addchart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Link } from 'react-router-dom';

export default function SideBarMenu() {
  return (
    <>
        <Link to="/">
          <List>
            <ListItem button>
              <ListItemIcon>
                <LineAxisIcon/>
              </ListItemIcon>
              <ListItemText primary={"DashBoard"} />
            </ListItem>
          </List>
        </Link>
        <Divider />
        <Link to="/providers">
          <List>
              <ListItem button>
                <ListItemIcon>
                  <GroupIcon/>
                </ListItemIcon>
                <ListItemText primary={"Fourinisseurs"} />
              </ListItem>
          </List>
        </Link>
        <Divider />
        <Link to="/clients">
          <List>
              <ListItem button>
                <ListItemIcon>
                  <GroupIcon/>
                </ListItemIcon>
                <ListItemText primary={"Clients"} />
              </ListItem>
          </List>
        </Link>
        <Divider />
        <Link to="/purshases">
          <List>
              <ListItem button>
                <ListItemIcon>
                  <AddchartIcon/>
                </ListItemIcon>
                <ListItemText primary={"Achats"} />
              </ListItem>
          </List>
        </Link>
        <Divider />
        <Link to="/sales">
          <List>
              <ListItem button>
                <ListItemIcon>
                  <TrendingUpIcon/>
                </ListItemIcon>
                <ListItemText primary={"Ventes"} />
              </ListItem>
          </List>
        </Link>
        <Divider />
        <Link to="/charges">
          <List>
              <ListItem button>
                <ListItemIcon>
                  <InventoryIcon/>
                </ListItemIcon>
                <ListItemText primary={"Charges"} />
              </ListItem>
          </List>
        </Link>
        <Divider />
        <Link to="/products">
          <List>
              <ListItem button>
                <ListItemIcon>
                  <ListAltIcon/>
                </ListItemIcon>
                <ListItemText primary={"Produits"} />
              </ListItem>
          </List>
        </Link>
        <Divider />
    </>
  )
}
