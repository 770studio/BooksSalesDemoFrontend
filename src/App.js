// in src/App.js
import * as React from "react";
import { Show, Admin, Resource, ShowGuesser , ListGuesser } from 'react-admin';
 
//import jsonapiClient from "./json_data_provider/src/index.js";
import jsonapiClient from "ra-jsonapi-client";
import { RentList,   RentCreate} from './Rents';
 
import Dashboard from './Dashboard';
import TestHeader from './Header'
 

import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { Layout } from 'react-admin';
import { AppBar, UserMenu  } from 'react-admin';
 import { makeStyles } from '@material-ui/core/styles';
  
import Avatar from '@material-ui/core/Avatar';

import polyglotI18nProvider from 'ra-i18n-polyglot';
import russianMessages from 'ra-language-russian';

const i18nProvider = polyglotI18nProvider(() => russianMessages, 'ru');

 


 

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
    //primary: blue,
    secondary: {
      main: "#ff9800", // Not far from orange
      action:  "#ff9800",
    },
  },
});




 //const dataProvider = jsonapiClient('https://alizonmart.com/dmb/api/v1');
// const dataProvider = jsonapiClient('http://127.0.0.1:8000/api/v1');
 const dataProvider = jsonapiClient('https://770.agency/demo/books_sales_backend/api/v1');

 
 const useStyles = makeStyles({
  title: {
      flex: 1,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
  },
  spacer: {
      flex: 1,
  },
}); 

 
 
const MyCustomIcon = () => {
  const classes = useStyles();
  return (
      <Avatar
          className={classes.avatar}
          src="https://marmelab.com/images/avatars/adrien.jpg"
      />
  )
};
 const MyLayout = (props) => <Layout {...props} appBar={MyAppBar} />;
 const MyUserMenu = props => (<UserMenu {...props} icon={<MyCustomIcon />} />);

 const MyAppBar = props => <AppBar {...props} userMenu={<MyUserMenu />} />;

 const App = (props) => (
        

      <Admin i18nProvider={i18nProvider} theme={theme}  layout={MyLayout} dashboard={Dashboard} dataProvider={dataProvider} >
       <TestHeader/>
         
      <Resource  name="rents" options={{ label: 'Аренда книг' }}   list={RentList}  create={RentCreate}  />
      <Resource name="books" options={{ label: 'Книги' }} list={ListGuesser} show={ShowGuesser} />
      <Resource name="users" options={{ label: 'Арендаторы' }} list={ListGuesser} show={ShowGuesser}  />
        </Admin>
        

        
        
     
   );

 
 

 

export default App;