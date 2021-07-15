import './userStyle.css'
import axios from 'axios';
import {Component} from 'react'
import UserComp from './user'



class MainComp extends Component{

  constructor(){
    super();

    this.state = {users : [], tasks : [], posts : [], 
                addNewUser : false, nameToAdd : "", emailToAdd : "", idCounter : 0}
  }


  async componentDidMount () {

    let resp = await axios.get("https://jsonplaceholder.typicode.com/users");
    let allUsers = resp.data

    let resp2 = await axios.get("https://jsonplaceholder.typicode.com/todos");
    let tasksList = resp2.data
    this.setState({tasks : tasksList});
    
    let resp3 = await axios.get("https://jsonplaceholder.typicode.com/posts");
    let postsList = resp3.data
    this.setState({posts : postsList});
    
    allUsers.forEach(this.addPresentTag);

    allUsers.forEach(user => {
      user.allCompleted = false;
    });

    this.setState({users : allUsers, idCounter: allUsers[allUsers.length-1].id + 1})
  }

  addPresentTag = (userJson) => {
    userJson.toPresent = true;
  }

  removePresentTag = (userJson) => {
    userJson.toPresent = false;
  }
 
  isAllCompleted = (data) => {

    let completedStatus = data[0]
    let userId = data[1]

    let allUsers = [...this.state.users]
    let indx = allUsers.findIndex((userJson) => userJson.id === userId)
    let userToUpdate = allUsers[indx]

    userToUpdate.allCompleted = completedStatus;

    allUsers[indx] = userToUpdate
    
    this.setState({users: allUsers})
  }

  search = (e) => {

    let allUsers = [...this.state.users];

    if(e.target.value === ""){
      allUsers.forEach(this.addPresentTag)
      this.setState({users : allUsers})
    }

    else{
      for (let indx = 0; indx < allUsers.length; indx++){
        if(allUsers[indx].name.toLowerCase().includes(e.target.value.toLowerCase()) ||  
          (allUsers[indx].email.toLowerCase().includes(e.target.value.toLowerCase()))){
              this.addPresentTag(allUsers[indx])
          }
        else{
          this.removePresentTag(allUsers[indx])
        }
    }

    this.setState({users : allUsers})
  }
}
 
  updateUserData = (data) => {
    let allUsers = [...this.state.users]
    let indx = allUsers.findIndex((userJson) => userJson.id === data.id)
    let userToUpdate = allUsers[indx]

    userToUpdate.name = data.name;
    userToUpdate.email = data.email;
    userToUpdate.address.street = data.street;
    userToUpdate.address.city = data.city;
    userToUpdate.address.zipcode = data.zipcode;

    allUsers[indx] = userToUpdate
    
    this.setState({users: allUsers})

  }

  deleteUser = (id) => {

    let allUsersDeletion = [...this.state.users]
    let newAllUsers = allUsersDeletion.filter(x => x.id !== id)

    this.setState({users: newAllUsers}, () => console.log(this.state.users));
  }

  addUser = () => {
    let newUser = {id : this.state.idCounter, name : this.state.nameToAdd, email : this.state.emailToAdd, 
                  address: {street : "", city: "", zipcode: ""}, allCompleted : true, toPresent : true}
    
    this.setState({users: [...this.state.users, newUser], idCounter : this.state.idCounter + 1, 
                  addNewUser : false, nameToAdd : "", emailToAdd : ""})

  }

  openAddNewUser = () => {

    if(this.state.addNewUser) {
      this.setState({addNewUser : false, nameToAdd : "", emailToAdd : ""})
    }

    else {
      this.setState({addNewUser : true})
    }
  }

  cancelNewUser = () => {
    this.setState({addNewUser : false, nameToAdd : "", emailToAdd : ""})
  }

  clearNewUser = () => {
    this.setState({nameToAdd : "", emailToAdd : ""})
  }

  render(){

      let users = this.state.users.map((item, index) => {

        if(item.toPresent) {  

          let userTasks = this.state.tasks.filter(x => x.userId === item.id)
          let userPosts = this.state.posts.filter(x => x.userId === item.id)

          let classType = "square " + (item.allCompleted ? "green" : "red");

          return <UserComp className = {classType} item = {item}
          tasks = {userTasks}
          posts = {userPosts} 
          callback1 = {data => this.updateUserData(data)}
          callback2 = {data => this.deleteUser(data)}  
          callback3 = {data => this.isAllCompleted(data)} 
          key={index}/>
            
        }

        else{
          return null;
        }
    })

    let newUserScreen;

    if(this.state.addNewUser){
      newUserScreen = <div className = "square">
                <h3>Add New User </h3>
                Name : <input type = "text" value = {this.state.nameToAdd} onChange = {e => this.setState({nameToAdd : e.target.value})}/> <br/>
                Email : <input type = "text" value = {this.state.emailToAdd} onChange = {e => this.setState({emailToAdd : e.target.value})}/> <br/><br/>

                <input type = "button" value = "Add" onClick = {this.addUser}/> <br/>
                <input type = "button" value = "Clear" onClick= {this.clearNewUser} />
                <input type = "button" value = "Cancel" onClick= {this.cancelNewUser} />
                
      </div>
    }

    return(
        <div>

          Search <input type = "text" onChange = {this.search} />
          <input type = "button" value = "Add New User" onClick= {this.openAddNewUser}/> <br/> <br/>

          {newUserScreen}

            {users}

        </div>
    )

  }
}

export default MainComp;
