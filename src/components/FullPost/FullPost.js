import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidUpdate () {
        if (this.props.id) {
        //to make sure if we already have loaded the post to prevent inifinite looping
        //and also checking if it was the same post so no need to make http request again
        //We make the request if there's no loadedposts or id we do have pne but the IDs are different
            if ( !this.state.loadedPost ||  (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
                axios.get("https://jsonplaceholder.typicode.com/posts/" + this.props.id)
                    .then(response => {
                        //console.log(response);
                        this.setState({loadedPost: response.data})
                    });
            }
        }
    }

    deletePostHandler = () => {
        axios.delete("https://jsonplaceholder.typicode.com/posts/" + this.props.id)
        .then(response => {
            console.log(response);
        });
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.props.id) {
            post = <p style={{textAlign: 'center'}}>Loading...</p>;
        }
        if(this.state.loadedPost) {             //initially its null cuz fetching data async hence above if code as waiting period
        post = (
            <div className="FullPost">
                <h1>{this.state.loadedPost.title}</h1>
                <p>{this.state.loadedPost.body}</p>
                <div className="Edit">
                    <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                </div>
            </div>
            );
        }
        return post;
    }
}

export default FullPost;