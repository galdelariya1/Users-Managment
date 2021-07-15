import './userStyle.css'
import {Component} from 'react'

class TodoComp extends Component{

  constructor(){
    super();

    this.state = {toHide : false, toAdd : false, titleToAdd : ""}
  }

  
  markCompleted = (index) => {


    this.props.callbackMarkCompleted(index)
  }

  addNewToDo = () => {

    this.props.callbackNewToDo(this.state.titleToAdd)
    this.setState({toAdd : false})

  }

  render(){

    let divToPresent;

    if(this.state.toAdd) {

      divToPresent = <div>
          <h4>New Todo - User {this.props.id}</h4>

          <div className = "square">

          Title : <input type = "text" onChange = {e => this.setState({titleToAdd : e.target.value})} /> <br/> <br/>

          <input type = "button" value = "Cancel" onClick = {() => this.setState({toAdd : false})} />
          <input type = "button" value = "Add" onClick = {this.addNewToDo} />

          </div>

      </div>
    }

    else {

        let allTasks;
        
        if(this.state.toHide){
          allTasks = null;
        }
        
        else{
          allTasks = this.props.tasks.map((item, index) => {

            let markCompletedButton;
            let isCompleted = item.completed ? "Yes" : "No" ;

            if(!item.completed){
              markCompletedButton = <input type = "button" value = "Mark Completed" onClick = {() => this.markCompleted(index)} />
            }

          return <div key={index} className = "square">
              Title : {item.title} <br/>
              Completed : {isCompleted} <br/>
              {markCompletedButton}
              </div>
        
          })
        }

        let buttonValue = this.state.toHide ? "Present" : "Hide";  

        divToPresent = <div>
        <h3>Todos - User {this.props.id}</h3>
        <input type = "button" value = "Add" onClick = {() => this.setState({toAdd : true})}/> 
        <input type = "button" value = {buttonValue}
        onClick = {() => this.setState({toHide : !this.state.toHide})}/> <br/><br/>

        <div>

          {allTasks}

        </div>

      </div>

      }

    return(
       
      <div>

        {divToPresent}

      </div>
    )

  }
}

export default TodoComp;
