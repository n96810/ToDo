import {inject} from "aurelia-framework";
import {DataServices} from "./data-services";

@inject(DataServices)
export class ToDos {
    constructor(data) {
        this.data = data;
        this.TODO_SERVICE = "todos";
        this.todosArray = [];
    }

    async getUserTodos(id) {
        let response = await this.data.get(this.TODO_SERVICE + "/user/" + id);
        if (!response.error && !response.message) {
            this.todosArray = response;
        }
    }

    async save(todo) {
        if (todo) {
            if (!todo._id) {
                let response = await this.data.post(todo, this.TODO_SERVICE);
                if (!response.error) {
                    this.todosArray.push(response);
                }
                return response;
            } else {
                let response = await this.data.put(todo, this.TODO_SERVICE + "/" + todo._id);
                if (!response.error) {
                    //this.todosArray.push(response);
                }
                return response;
            }
        }
    }

    async deleteTodo(id) {
        let response = await this.data.delete(this.TODO_SERVICE + "/" + id);
        if (!response.error) {
            for (let i = 0; i < todosArray.length; i++) {
                if (this.todosArray[i]._id === id) {
                    this.todosArray.splice(i, 1);
                }
            }
        }
    }
    
    async uploadFile(files, userId, todoId) {
        let formData = new FormData();
        console.log(JSON.stringify(files[0]));
        console.log(JSON.stringify(files[1]));

        files.forEach((item, index) => {
            formData.append("file" + index, item);
        });

        let response = await this.data.uploadFiles(formData, this.TODO_SERVICE + "/uploads/" + userId + "/" + todoId);
        return response;
    }
}