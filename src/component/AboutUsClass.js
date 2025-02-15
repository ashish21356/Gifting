import React from "react";

class AboutUsClass extends React.Component {
  constructor(props) {
    super(props);
    console.log("parent render");

    this.state = {
     userData: {
      name: 'Dummy',
      location:"Default"
     }
    };
  }

async componentDidMount(){//it is used to call the api.
  //console.log("now component didmount is called.");
  const userData= await fetch("https://api.github.com/users/ashish21356");
const data= await userData.json();
this.setState({
  userData:data,
});
}


  render(props) {
    const { name, type } = this.state.userData; //Destructuring
    //const { count } = this.state;
    console.log(this.state);
    return (
      <div>
        <h1>This is {name} about us page and {type} ....</h1>
        
        {/* <button
          onClick={() => {
            this.setState({
              count: this.state.count + 1,
            });
          }}
        >
          Increase
        </button> */}
      </div>
    );
  }
}

export default AboutUsClass;
