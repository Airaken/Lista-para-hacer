import React, { Component } from 'react';
import './Task.css'

class Task extends Component{
    constructor(props){
        super(props);
         // usersSelect validates if the list of users of task cards is selected
        this.state = { 
            name:this.props.task.titulo,
            description:this.props.task.descripcion,
            status:this.props.task.status,
            disabled:true,
            visible:true
        }
        this.handlerOnChange = this.handlerOnChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }  
     // this function executes the necessary code to load the data before assembling the elements
    componentDidMount() {
        
    }
    // this function change the status of task 
    swithcTask(status){
        fetch('/tarea/cambiarStado/'+this.props.task.id+'&'+status, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => res.json())
            .then(data => {
                if (data.ok) {
                    console.log(data.ok)
                } else {
                    alert(data.err.message)
                }
            })
            .catch(err => alert(err.message));
    }
    // this function change usersSelect depending on which link is selected
    handleClick(e) {
        console.log(e.target.name);
        console.log(this.state.status);
        let disabled = false;
        let visible = false;
        switch (e.target.name) {
            case 'Edit':
                disabled = false;
                visible = false
                this.setState({
                    disabled,
                    visible
                })
                break;
            case 'Cancel':
                disabled = true;
                visible = true;
                let name = this.props.task.titulo;
                let description = this.props.task.descripcion;
                this.setState({
                    disabled,
                    visible,
                    name,
                    description
                })
                break;
            case 'Save':
                disabled = true;
                visible = true;
                const data = new URLSearchParams("titulo=" + this.state.name + "&descripcion=" + this.state.description);
                fetch('/tarea/'+this.props.task.id, {
                    method: 'PUT',
                    body: data,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.ok) {
                            this.setState({
                                disabled,
                                visible
                            })
                        } else {
                            alert(data.err.message)
                        }
                    })
                    .catch(err => alert(err.message));
                break;
            case 'open':
            this.swithcTask('OPEN')
            this.setState({status:'OPEN'})
                break;
            case 'in-progress':
            this.swithcTask('IN-PROGRESS')
            this.setState({status:'IN-PROGRESS'})
                break;
            case 'completed':
            this.swithcTask('COMPLETED')
            this.setState({status:'COMPLETED'})
                break;
            case 'archived':
            this.swithcTask('ARCHIVED')
            this.setState({status:'ARCHIVED'})
                break;
            default:
                break;
        }
    }
    // this function change the states and keep it
    handlerOnChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }
    // main render task
    render() {
        let id = `id-${this.props.task.id}`;
        let task = this.props.task;
        let badge = '';
        switch(this.state.status){
            case 'OPEN':badge = 'primary'
                break;
            case 'IN-PROGRESS':badge = 'secondary'
                break;
            case 'COMPLETED':badge = 'success'
                break;
            case 'ARCHIVED':badge = 'danger'
                break;
            default:
                break;
        }
        return (
            <div className="col-lg-4 col-md-6 col-sm-12 col-12 mb-3 mt-3">
                <div className="card" key={task.id}>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="task-tab" data-toggle="tab" href={`#task-${id}`} role="tab" aria-controls="task" aria-selected="true">Task</a>
                        </li>              
                        <li className="nav-item">
                            <a className="nav-link" id="status-tab" data-toggle="tab" href={`#status-${id}`} role="tab" aria-controls="status" aria-selected="false">Status</a>
                        </li>
                        <li className="nav-item mx-auto">
                            <span  className={`nav-item status badge badge-${badge}`}>{this.state.status}</span>
                        </li>
                    </ul>
                    <div className="tab-content" id="tabContent">
                        {/* tab of task info */}
                        <div className="tab-pane fade show active" id={`task-${id}`} role="tabpanel" aria-labelledby="task-tab">
                            {/* tthis is body card, it have name of task and message of task */}
                            <div className="card-body">
                                <input onChange={this.handlerOnChange} disabled={this.state.disabled} value={this.state.name} name="name" type="text" className={`card-title form-control task-title ${this.state.disabled === true ? 'task-title-border' : ' '}`} />
                                <textarea onChange={this.handlerOnChange} disabled={this.state.disabled} value={this.state.description} name="description" className="form-control" aria-label="With textarea"></textarea>
                                <div className="border mt-3">
                                    <div className="row p-2 btn-toolbar justify-content-between" >
                                        <div className="col col-lg-4 " >
                                            <button id="edit" name="Edit" onClick={this.handleClick} type="button" className={` badge badge-primary ${this.state.visible === true ? 'visible' : 'invisible'}`}> Edit</button>
                                        </div>
                                        <div className={`row col buttons ${this.state.visible === false ? 'visible' : 'invisible'}`}>
                                            <div className="col-6" role="group" >
                                                <button id="cancel" name="Cancel" onClick={this.handleClick} type="button" className=" badge badge-secondary"> Cancel</button>
                                            </div>
                                            <div className="col-4">
                                                <button id="save" name="Save" onClick={this.handleClick} type="button" className=" badge badge-success">Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* tab of satus  values: ['OPEN', 'IN-PROGRESS', 'COMPLETED', 'ARCHIVED'],*/}
                        <div className="tab-pane fade" id={`status-${id}`} role="tabpanel" aria-labelledby="status-tab">
                            <div className="body-card m-4">
                                <div className="list-group">
                                    <button onClick={this.handleClick} name="open" type="button" className={`list-group-item list-group-item-action ${this.state.status === 'OPEN' ? 'active' : ''}`}>OPEN</button>
                                    <button onClick={this.handleClick} name="in-progress" type="button" className={`list-group-item list-group-item-action ${this.state.status === 'IN-PROGRESS' ? 'active' : ''}`}>IN-PROGRESS</button>
                                    <button onClick={this.handleClick} name="completed" type="button" className={`list-group-item list-group-item-action ${this.state.status ==='COMPLETED' ? 'active' : ''}`}>COMPLETED</button>
                                    <button onClick={this.handleClick} name="archived" type="button" className={`list-group-item list-group-item-action ${this.state.status === 'ARCHIVED' ? 'active' : ''}`}>ARCHIVED</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        )
    }
}

export default Task;