export class Task
{
    static idGeneral = 0;
    name: string;
    description: string;
    state: string;
    priority: number;
    private _id: number;

    constructor(name: string, description: string, state: string, priority: number, id?: number)
    {
        this.name = name;
        this.description = description;
        this.state = state;
        this.priority = priority;
        Task.idGeneral++;
        this._id =(!!id ? id : Task.idGeneral);
    }

    get id(): number
    {
        return this._id;
    }
}