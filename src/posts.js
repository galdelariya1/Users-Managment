import './userStyle.css'
import { Component } from 'react'

class PostsComp extends Component {

  constructor() {
    super();

    this.state = { toHide : true, toAdd: false, titleToAdd: "", bodyToAdd: "" }
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

        <div className="item">

          <input type="text" className = "inputhBar" placeholder="Title" onChange={e => this.setState({ titleToAdd: e.target.value })} /> 
          <input type="text" className = "inputhBar" placeholder="Body" onChange={e => this.setState({ bodyToAdd: e.target.value })} /> 

          <input type="button" value="Cancel" onClick={() => this.setState({ toAdd: false })} />
          <input type="button" value="Add" onClick={this.addNewPost} />

        </div>

      </div>
    }

    else {

      let allPosts = this.props.posts.map((item, index) => {

        return <div key={index} className="item">
          Title : {item.title} <br/>
          Body : {item.body} 
        </div>
      })

      let divAllPosts;

      if (this.state.toHide) {
        divAllPosts = null;
      }

      else{
        divAllPosts = <div className="all-items">
          {allPosts}
        </div>        
      }

      let buttonValue = this.state.toHide ? "Present" : "Hide";  

      divToPresent = <div>
        <h3>Posts - User {this.props.id}</h3>
        <input type="button" value="Add" onClick={() => this.setState({ toAdd: true })} />
        <input type="button" value={buttonValue} 
        onClick={() => this.setState({ toHide: !this.state.toHide })} /> <br/>
        
        {divAllPosts}

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
