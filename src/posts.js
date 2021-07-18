import './userStyle.css'
import { Component } from 'react'

class PostsComp extends Component {

  constructor() {
    super();

    this.state = { toHide : false, toAdd: false, titleToAdd: "", bodyToAdd: "" }
  }


  addNewPost = () => {

    this.props.callbackNewPost([this.state.titleToAdd, this.state.bodyToAdd])
    this.setState({ toAdd: false })

  }

  render() {

    let divToPresent;

    if (this.state.toAdd) {

      divToPresent = <div>
        <h4>New Post - User {this.props.id}</h4>

        <div className="square">

          <input type="text" className = "inputhBar" placeholder="Title" onChange={e => this.setState({ titleToAdd: e.target.value })} /> <br />
          <input type="text" className = "inputhBar" placeholder="Body" onChange={e => this.setState({ bodyToAdd: e.target.value })} /> <br /> <br />

          <input type="button" value="Cancel" onClick={() => this.setState({ toAdd: false })} />
          <input type="button" value="Add" onClick={this.addNewPost} />

        </div>

      </div>
    }

    else {

      let allPosts;

      if (this.state.toHide) {
        allPosts = null;
      }

      else{
        allPosts = this.props.posts.map((item, index) => {

          return <div key={index} className="square">
            Title : {item.title} <br />
            Body : {item.body} <br />
          </div>
        })
      }

      let buttonValue = this.state.toHide ? "Present" : "Hide";  

      divToPresent = <div>
        <h3>Posts - User {this.props.id}</h3>
        <input type="button" value="Add" onClick={() => this.setState({ toAdd: true })} />
        <input type="button" value={buttonValue} 
        onClick={() => this.setState({ toHide: !this.state.toHide })} /> <br /><br />
        <div>

          {allPosts}

        </div>

      </div>

    }

    return (

      <div>

        {divToPresent}

      </div>
    )

  }
}

export default PostsComp;
