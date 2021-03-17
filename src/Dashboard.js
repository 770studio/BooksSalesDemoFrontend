import * as React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Title } from 'react-admin';

import   { Component } from 'react';


 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
  export default class SimpleExample extends Component  {

     
    render() {
      const notify = () => {
        //console.log(6666666666666)
        toast("Wow so easy !");
      }  
     
      return (
        <Card>
        <Title title="Welcome to the administration" />
 
        <div>
        <button onClick={notify}>Notify !</button>
        <ToastContainer />
         </div>
 

        </Card>
      )
    }
  } 