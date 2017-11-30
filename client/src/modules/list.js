import {inject} from 'aurelia-framework';
import {ToDos} from '../resources/data/todos';
import {AuthService} from "aurelia-auth";

@inject(ToDos, AuthService)
export class List {
    constructor(todos, auth) {
        console.log('starting list');
        this.todos = todos;
        this.auth = auth;
        
        this.user = JSON.parse(sessionStorage.getItem("user"));
        this.showList = true;
        this.showCompleted = false;
        this.priorities = ["Low", "Medium", "High", "Critical"];
    }

    logout() {
        sessionStorage.removeItem("user");
        this.auth.logout();
    }

    createTodo() {
        this.todoObj = {
            "todo": "",
            "description": "",
            "dateDue": new Date(),
            "userId": this.user._id,
            "priority": this.priorities[0]
        }
        this.showList = false;
    }

    async saveTodo() {
        if (this.todoObj) {
            let response = await this.todos.save(this.todoObj);
            if (response.error) {
                alert("There was an error creating the ToDo");
            } else {
                //Could provide feedback
            }
            this.showList = true;
        }
    }

    async activate() {
        await this.todos.getUserTodos(this.user._id);
    }
    
    editTodo(todo) {
        this.todoObj = todo;
        this.showList = false;
    }
    
    deleteTodo(todo) {
        this.todos.deleteTodo(todo._id);
    }

    completeTodo(todo) {
        todo.completed = !todo.completed;
        this.todoObj = todo;
        this.saveTodo();
    }
}