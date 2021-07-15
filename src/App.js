
import './App.css';
import MainComp from './main_comp'
import {Component} from 'react'

class App extends Component{

  constructor(){
    super();
  }

  render(){

    return(
      <div>

        <div className = "main-header"> Users Managment System </div>
        <MainComp />
        
      </div>
    )

  }
}

export default App;
