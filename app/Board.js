import React, { Component } from 'react';
import Task from './Task';

class Board extends Component{
    constructor(){
        super();
        this.state = {
            tasks:[],
            name:'',
            description:''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // this function executes the necessary code to load the data before assembling the elements
    componentDidMount(){
        this.fetchsTasks();
    }
    // this function unmount a fetch function to avoid state changes in disassembled elements
    componentWillUnmount(){
        this.fetchsTasks(true);
    }
    // this function returns the list of tasks that have a name similar to the value
    fetchsTasks(off) {
        if(!off){
                fetch('/tarea')
                    .then(res => res.json())
                    .then(data => {
                    if(data.ok){
                        console.log(data.tasks , 'eche y que');
                        this.setState({ tasks:data.tasks})
                    }else{
                        alert(data.err.message)
                    }
                })
                    .catch(err => alert(err.message));
        }  
    }
    // this funciton create a new task in the data base
    handleSubmit(e){
        e.preventDefault();
        const data = new URLSearchParams("titulo="+this.state.name+"&descripcion="+this.state.description);
        fetch('/tarea', {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(res => res.json())
            .then(data =>{
                if(data.ok){
                    this.setState({name:'',description:''})
                    this.fetchsTasks()
                }else{
                    alert(data.err.message)
                }
            })
            .catch(err => alert(err.message));
    }
    // this function change the states and keep it
    handleInputChange(e) {
        const { name, value } = e.target;      
        this.setState({
            [name]: value
        })
    }
    render() {   
        return (
            <div className="container">
                <div className="row rounded-bottom bg-secondary">
                    <div className="col-12">
                        <form onSubmit={this.handleSubmit} >
                            <fieldset className="text-light">
                                <legend>Create a new Task</legend>
                                <div className="form-row">
                                    <div className="col-12 col-sm-4 col-md-3 col-lg-3 pb-2 ">
                                        <input name="name" onChange={this.handleInputChange} value={this.state.name} className="form-control" type="text" placeholder="titulo de la tarea" />
                                    </div>
                                    <div className="col pb2 ">
                                        <input name="description" onChange={this.handleInputChange} value={this.state.description} className="form-control" type="text" placeholder="descipcion de la tarea" />
                                    </div>
                                    <div className="d-flex justify-content-center pb-2 col-12 col-sm-12 col-md-3 col-lg-2">
                                        <button type="submit" className="btn btn-dark" >Create una tarea</button>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
                <div className="row m2">
                    {this.state.tasks.map(task => <Task task={task} key={task.id}/>)}
                </div>
            </div>
        )
    }
}

export default Board;