import React, { Component } from 'react';
class Signin extends Component {
    //construction of class Signin that 
    constructor(){
        super();
        this.state = {
            email:'',
            password:'',
            ppassword:'',
            name:'',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.back = this.back.bind(this);
    }
    // this function takes the form data to create the user in the data base
    handleSubmit(e){
        e.preventDefault();
        if(this.state.ppassword!==this.state.password){
            alert('passwords does not match');
        }else{
            const data = new URLSearchParams("correo="+this.state.email+"&clave="+this.state.password+"&nombre="+this.state.name);
            fetch('/usuario', {
                method: 'POST',
                body: data,
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            })
            .then(res => res.json())
            .then(this.props.callback('login'))
            .catch(err => alert(err.message));
        }
    }
    // this function change the states and keep it
    handleInputChange(e){
        const{name, value} = e.target;
        this.setState({
            [name]:value
        })
    }
    // this function returns to the login without adding a user
    back(){
        this.props.callback('login')
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Login</h5>
                                <form onSubmit={this.handleSubmit} className="form-signin">
                                    <h1 className="p-1 h3 mb-3 font-weight-normal">Please sign in</h1>
                                    <div className="form-label-group">
                                        <label className="sr-only">Email address</label>
                                        <input name="email" onChange={this.handleInputChange} type="email" id="email" className="m-1 form-control" placeholder="Email address" required autoFocus />
                                    </div>
                                    <div className="form-label-group">
                                        <label className="sr-only">Password</label>
                                        <input name="password" onChange={this.handleInputChange} type="password" id="password" className="m-1 form-control" placeholder="Password" required />
                                    </div>
                                    <div className="form-label-group">
                                        <label className="sr-only">Re-Password</label>
                                        <input name="ppassword" onChange={this.handleInputChange} type="password" id="ppassword" className="m-1 form-control" placeholder="Re-Password" required />
                                    </div>
                                    <div className="form-label-group">
                                        <label className="sr-only">Name</label>
                                        <input name="name" onChange={this.handleInputChange} type="test" id="name" className="m-1 form-control" placeholder="Name" required />
                                    </div>
                                    <button className="m-1 btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                                    <div className="d-flex justify-content-center p-2">
                                        <a href="#" className="badge badge-light" onClick={this.back}>Back</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signin;
