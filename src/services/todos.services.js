import axios from "axios";
import authHeader from './auth-header';

const apiurl = "http://localhost:8001/api/todo/";

class TodoServices {

    getAllTodos(){
        return axios
        .get(apiurl 
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

    addTodo(title,content,userName){
        console.log("UserName");
        console.log("UserName"+userName);
        return axios
        .put(apiurl+"createTodo", {
            title,content,userName,
        },{ headers: authHeader() })
        .then(response => { 
          return response.data;
        });
    }


}

export default new TodoServices();