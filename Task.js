export class Task {
    constructor(name, description, state, priority, id) {
        this.name = name;
        this.description = description;
        this.state = state;
        this.priority = priority;
        Task.idGeneral++;
        this._id = (!!id ? id : Task.idGeneral);
    }
    get id() {
        return this._id;
    }
}
Task.idGeneral = 0;
