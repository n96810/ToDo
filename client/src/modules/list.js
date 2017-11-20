import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {auth} from "aurelia-auth";

@inject(Router, auth)
export class Wall {
    constructor(router) {
        this.router = router;
        this.auth = auth;
        this.message = 'List';

        this.user = JSON.parse(sessionStorage.getItem("user"));
        this.showList = true;
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
}