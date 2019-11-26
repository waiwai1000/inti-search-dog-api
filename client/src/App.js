import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';
import {
  Jumbotron,
  Alert,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Table

} from 'reactstrap';




class App extends Component {
  constructor() {
    super();
    this.state = {
      alertVisible: false,
      popSelectDog: false,
      popRegister:false,
      popCheckKey:false,
      name: '',
      dogs: [],
      selectdogs: [],
      keystatus:false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onClose = this.onClose.bind(this);
    this.openregister = this.openregister.bind(this);
    this.opencheckkey = this.opencheckkey.bind(this);

  }
  getAlldogs = () => {
    axios
      .get('/getalldogs')
      .then(result => {
        this.setState({ dogs: result.data });
        console.log(this.state.dogs);
      })
      .catch(error => {
        console.log(error);
      });
  };
  openregister(){
    this.setState({ popRegister: true });
  }
  opencheckkey(){
    this.setState({ popCheckkey: true });
  }

  componentDidMount() {
    this.getAlldogs();
  }
  setKey() {
    this.setState({ keystatus: true });
  }
  //for popup
  onDismiss() {
    this.setState({ alertVisible: false });
  }
  onClose() {
    this.setState({ popSelectDog: false });
    this.setState({ popRegister: false });
    this.setState({ popCheckkey: false });
  }
  //for form
  onSubmit = e => {
    e.preventDefault();
    this.setState({ alertVisible: false });
    
    const query = `/getdog?q=${this.state.name}`;
    console.log(query);

  const api_key =  `b285f718-c95f-4368-9aa1-36d80d906d77`;
    axios
      .get(query)
      .then(result => {
        
        console.log(result.data.name)

        if (result.data === 'Not found') {
          this.setState({ alertVisible: true });
        }
        this.updatedogimage(result.data._id,result.data.name);
        this.getAlldogs();
      })
      .catch(error => {
        this.setState({ alertVisible: true });
      });
    //const data = this.state.dogs;
    //this.setState({ dogs: this.state.dogs.reverse() });
  };

  // for form field
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  removedog(_id) {
    this.setState({
      dogs: this.state.dogs.filter(dog => {
        if (dog._id !== _id) return dog;
      })
    });
    const query = `/deletedog?_id=${_id}`;
    axios
      .get(query)
      .then(result => {
        this.onClose();
        this.getAlldogs();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  }
  editdog(_id) {


    axios
    .get(`/selectdogs?_id=${_id}`)
    .then(result => {
      this.setState({ selectdogs: result.data });
      console.log(this.state.selectdogs);
      this.getAlldogs();
    })
    .catch(error => {
      console.log(error);
    });

    this.setState({ popSelectDog: true });

    
  }
  updateDogdetails(_id) {
   
    var dogName = document.getElementById('dogName').value
    var dogWeight= document.getElementById('dogWeight').value
    var dogHeight= document.getElementById('dogHeight').value
    var dogBred_for = document.getElementById('dogBred_for').value
    var dogBreed_group = document.getElementById('dogBreed_group').value
    var dogLife_span = document.getElementById('dogLife_span').value
    var dogTemperament = document.getElementById('dogTemperament').value
    var dogImage_url = document.getElementById('dogImage_url').value
    
   
    const body = {
      'dogName': dogName,
      '_id':_id,
      'dogWeight':dogWeight,
      'dogHeight':dogHeight,
      'dogBred_for':dogBred_for,
      'dogBreed_group':dogBreed_group,
      'dogLife_span' : dogLife_span,
      'dogTemperament':dogTemperament,
      'dogImage_url':dogImage_url


    }
    axios
    .post(`/updatedogdetails`,body)
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    });
    
  }
  //  generateUUID()
  // {
  //   var d = new Date().getTime();
    
  //   if( window.performance && typeof window.performance.now === "function" )
  //   {
  //     d += performance.now();
  //   }
    
  //   var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c)
  //   {
  //     var r = (d + Math.random()*16)%16 | 0;
  //     d = Math.floor(d/16);
  //     return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  //   });
  
  // return uuid;
  // }
  
  // register_key() {
   
  //   var email = document.getElementById('dogName').value;
  //   var key= generateUUID();
  //   const body = {
  //     'email': email,
  //     'key': key
     

  //   }
  //   axios
  //   .post(`/add_api`,body)
  //   .then(result => {
  //     alert("Your Api Key : "+ key);
  //     console.log(result);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });

    
    
  // }

  select_check_key() {

    var key= document.getElementById('key');
   
    const body = {
      'key': key
    }
    axios
    .post(`/selectapi`,body)
    .then(result => {
    if(result.key)
    {
      this.setKey();
    }
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    });

  }

  updatedogimage(_id,name) {
    this.setState({
      dogs: this.state.dogs.filter(dog => {
        if (dog._id !== _id) return dog;
      })
    });
    const query = `/updatedogimg?_id=${_id}&name=${name}`;
    axios
      .get(query)
      .then(result => {
        this.getAlldogs();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  }
  
  render() {
    return (

   
 

      
      <div className="App">
        <Jumbotron>
          <h1 className="display-3">dogs</h1>
          <p className="lead">Search for dogs</p>
        </Jumbotron>
        <Container>
          <Row>
            <Col>
              <Alert
                color="danger"
                isOpen={this.state.alertVisible}
                toggle={this.onDismiss}
              >
                dog not found
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col>
              <Alert
                color="green"
                isOpen={this.state.popCheckKey}
                toggle={this.onClose}
              >
                    <div class="w3-modal-content">             
                    <div class="w3-container">
                   
                      <div class="form-style-5">

                    <p>Api Key</p>
                    <Input
                    type="text"
                    name="key"
                    id="key" 
                    onChange={this.onChange}
                  />
                  <Button color="primary"
                          onClick={() => {
                            this.opencheckkey();
                          }}
                        >
                          Check api key
                        </Button>
</div>
                      
                     
                      
                    
                    </div>
                    </div>
                  

              </Alert>
            </Col>
          </Row>
          <Row>
            <Col>
              <Alert
                color="green"
                isOpen={this.state.popRegister}
                toggle={this.onClose}
              >
                    <div class="w3-modal-content">             
                    <div class="w3-container">
                   
                      <div class="form-style-5">

                    <p>Email</p>
                    <Input
                    type="text"
                    name="email"
                    id="email" 
                    onChange={this.onChange}
                  />
                  <Button color="primary"
                          onClick={() => {
                            this.openregister();
                          }}
                        >
                          Register
                        </Button>
</div>
                      
                     
                      
                    
                    </div>
                    </div>
                  

              </Alert>
            </Col>
          </Row>
          <Row>
            <Col>
              <Alert
                color="green"
                isOpen={this.state.popSelectDog}
                toggle={this.onClose}
              >

                  {this.state.selectdogs.map(dog => {

                  if(dog.image=== null)
                  {
                    dog.image = "https://upload.wikimedia.org/wikipedia/commons/6/6c/No_image_3x4.svg";
                  }
                  return (

 
                    <div class="w3-modal-content">             
                    <div class="w3-container">
                   
                      <div class="form-style-5">

                    <p>Name</p>
                    <Input
                    type="text"
                    name="name"
                    id="dogName"
                    defaultValue = {dog.name}
                    
                    onChange={this.onChange}
                  />
                  <p>Weight (KG)</p>
                    <Input
                    type="text"
                    name="name"
                    id="dogWeight"
                    defaultValue = {dog.weight}
                    
                    onChange={this.onChange}
                  />
                  <p>Height (CM)</p>
                    <Input
                    type="text"
                    name="name"
                    id="dogHeight"
                    defaultValue = {dog.height}
                    
                    onChange={this.onChange}
                  />
                  <p>Bred For</p>
                    <Input
                    type="text"
                    name="name"
                    id="dogBred_for"
                    defaultValue = {dog.bred_for}
                    
                    onChange={this.onChange}
                  />
                  <p>Breed Group</p>
                    <Input
                    type="text"
                    name="name"
                    id="dogBreed_group"
                    defaultValue = {dog.breed_group}
                    
                    onChange={this.onChange}
                  />
                  <p>Life Span</p>
                    <Input
                    type="text"
                    name="name"
                    id="dogLife_span"
                    defaultValue = {dog.life_span}
                    
                    onChange={this.onChange}
                    
                  />
                       <p>Temperament</p>
                    <Input
                    type="text"
                    name="name"
                    id="dogTemperament"
                    defaultValue = {dog.temperament}  
                    
                    onChange={this.onChange}
                    
                  />
                           <p>Image URL</p>
                    <Input
                    type="text"
                    name="name"
                    id="dogImage_url"
                    defaultValue = {dog.image}
                    
                    onChange={this.onChange}
                    
                  />
               
                  <img src={dog.image} />
                  <p> </p>
                  <Button color="primary"
                          onClick={() => {
                            this.updateDogdetails(dog._id);
                          }}
                        >
                          Edit
                        </Button>&nbsp;&nbsp;&nbsp;
                        <Button color="primary"
                          onClick={() => {
                            this.removedog(dog._id);
                          }}
                        >
                          Delete
                        </Button>
</div>
                      
                     
                      
                    
                    </div>
                    </div>
                  
                  );
                })}
  


              </Alert>
            </Col>
          </Row>
          <Row>
          <Button
                          onClick={() => {
                            this.register();
                          }}
                        >
                          Register Api Key
                        </Button>
                        <Button
                          onClick={() => {
                            this.applykey();
                          }}
                        >
                          Enter Api Key
                        </Button>
            </Row>
            <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="name">Enter dog name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="enter dog name..."
                    onChange={this.onChange}
                  />
                </FormGroup>
                <Button color="primary">Submit</Button>
                <p />
              </Form>
            </Col>
          </Row>
          <Row>
            <Table>
              <thead>
                <tr>
                  
                  <th>name</th>
                  <th>image</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.dogs.map(dog => {

                  if(dog.image=== null)
                  {
                    dog.image = "https://upload.wikimedia.org/wikipedia/commons/6/6c/No_image_3x4.svg";
                  }
                  return (
                    <tr>
                     
                      <td>{dog.name}</td>
                      <td>
                      
                        <img src={dog.image} />
                      </td>
                      <td> <Button
                          onClick={() => {
                            this.editdog(dog._id);
                          }}
                        >
                          Edit
                        </Button>&nbsp;&nbsp;&nbsp;
                        <Button
                          onClick={() => {
                            this.removedog(dog._id);
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Row>
        </Container>
      </div>





    );
  }
  
}

export default App;


