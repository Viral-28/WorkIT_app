import axios from "axios";
import authHeader from './auth-header';

const apiurl = "http://localhost:8001/api/post/";

class BlogServices {

    getAllPosts(){
        return axios
        .get(apiurl 
        )
        .then(response => { 
          return response.data;
        });
    }

    getPostWithTag(tags){
      console.log(tags)
        return axios
        .get(apiurl + "tags", {
          params:{ tags:tags},  
          headers: authHeader() }
          )
        .then(response => { 
          return response.data;
        });
    }

    getPostByUser(userName){
        return axios
        .get(apiurl +"mypost",
        {params:{ userName:userName},  
        headers: authHeader() }
        )
        .then(response => { 
          return response.data;
        });
    }

    addPost(tag,title,content,postDate,userName){
        console.log("U/serName");
        console.log("U/serName"+userName);
        return axios
        .put(apiurl+"update", {
            tag,
            title,content,postDate,userName,
        },{ headers: authHeader() })
        .then(response => { 
          return response.data;
        });
    }

    addPostComment(id, userName, comment){
        console.log("Post Comment called");
        return axios
        .put(apiurl + "comment", {
            id,
            userName,comment
        })
        .then(response => { 
          return response.data;
        });
    }

    getPostById(id){
      return axios
      .get(apiurl +"id",
      {params:{ id:id} }
      )
      .then(response => { 
        return response.data;
      });
  }

}

export default new BlogServices();