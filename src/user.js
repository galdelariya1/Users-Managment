import './userStyle.css'
import { Component } from 'react'
import TodoComp from './todos'
import PostsComp from './posts'

class UserComp extends Component {

  constructor(props) {

    super(props);

    this.state = {
      isAddress: false, id: this.props.item.id, name: this.props.item.name,
      email: this.props.item.email,
      street: this.props.item.address.street,
      city: this.props.item.address.city,
      zipcode: this.props.item.address.zipcode,
      tasks: this.props.tasks,
      posts: this.props.posts
    }
  }

  componentDidUpdate(prevProps) {

    if (this.props.item.id !== prevProps.item.id) {
      this.setState({
        id: this.props.item.id, name: this.props.item.name,
        email: this.props.item.email,
        street: this.props.item.address.street,
        city: this.props.item.address.city,
        zipcode: this.props.item.address.zipcode,
        tasks: this.props.tasks,
        posts: this.props.posts
      })
    }
  }

  presentMoreData = () => {
    this.setState({ isAddress: !this.state.isAddress })
  }

  sendDataToParent = () => {
    this.props.callback1({
      id: this.state.id, name: this.state.name, email: this.state.email,
      street: this.state.street, city: this.state.city, zipcode: this.state.zipcode
    })
    this.setState({ isAddress: false })
  }

  sendDeletionToParent = () => {
    this.props.callback2(this.state.id)
  }


  addNewTask = (newTitle) => {

    let newTasksList = this.state.tasks
    newTasksList.push({ title: newTitle, completed: false })

    this.setState({ tasks: newTasksList })

    this.props.callback3([false, this.state.id])
  }

  addNewPost = (data) => {

    let titleToAdd = data[0]
    let bodyToAdd = data[1]

    let newPostsList = this.state.posts
    newPostsList.push({ title: titleToAdd, body: bodyToAdd })

    this.setState({ posts: newPostsList })

  }

  markCompleted = (index) => {

    let newTasksList = this.state.tasks;
    newTasksList[index].completed = true

    this.setState({ tasks: newTasksList })

    let usercompleted = newTasksList.map(x => x.completed)
    if (usercompleted.includes(false)) {
      this.props.callback3([false, this.state.id])
    }

    else {
      this.props.callback3([true, this.state.id])
    }

  }



  render() {


    let address;

    if (this.state.isAddress) {

      address = <div className="square address">
        Street: <input type="text" className="inputhBar" value={this.state.street} onChange={e => this.setState({ street: e.target.value })} />
        City: <input type="text" className="inputhBar" value={this.state.city} onChange={e => this.setState({ city: e.target.value })} />
        Zip Code: <input type="text" className="inputhBar" value={this.state.zipcode} onChange={e => this.setState({ zipcode: e.target.value })} />
      </div>
    }


    let userTasks;
    let userPosts;

    userTasks = <TodoComp tasks={this.state.tasks} id={this.state.id}
      callbackNewToDo={data => this.addNewTask(data)}
      callbackMarkCompleted={data => this.markCompleted(data)} />
    userPosts = <PostsComp posts={this.state.posts} id={this.state.id}
      callbackNewPost={data => this.addNewPost(data)} />

    return (

      <div className={this.props.className}>
        <div className="id">
          ID : {this.state.id}
        </div>
        Name : <input type="text" className="inputhBar" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
        Email : <input type="text" className="inputhBar" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />

        <input type="button" onClick={this.presentMoreData} value="Additional Data" />

        {address}

        <input type="button" value="Update" onClick={this.sendDataToParent} />
        <input type="button" value="Delete" onClick={this.sendDeletionToParent} />

        {userTasks}
        {userPosts}

      </div>

    )

  }
}

export default UserComp;
