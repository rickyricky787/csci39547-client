import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "./commons/Loader";
import "../css/AddStudent.css";
import { addStudent } from "../redux/actions/studentsActions";
import { addStudentThunk } from "../redux/reducers/studentReducers";

//component to add a student to a campus in single campus view
class AddStudentToCampus extends Component {
  state = {
    firstname: null,
    lastname: null,
    email: null,
    gpa: null,
    CampusId: this.props.location.state.campusid,
  };

  changeFirstName = (e) => {
    var text = e.target.value;
    this.setState({
      firstname: text,
    });
  };

  changeLastName = (e) => {
    var text = e.target.value;
    this.setState({
      lastname: text,
    });
  };

  changeEmail = (e) => {
    var text = e.target.value;
    this.setState({
      email: text,
    });
  };

  changeGPA = (e) => {
    var text = e.target.value;
    this.setState({
      gpa: text,
    });
  };

  submitStudent = async (firstname, lastname, email, gpa, CampusId) => {
    //make sure correct input is entered
    if (
      firstname == null ||
      lastname == null ||
      email == null ||
      gpa == null ||
      CampusId == null
    ) {
      alert("incomplete");
    } else if (
      !email.match(
        "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%" +
          "&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-" +
          "9](?:[a-z0-9-]*[a-z0-9])?"
      )
    ) {
      alert("wrong email format");
    } else {
      this.setState({
        firstname: null,
        lastname: null,
        email: null,
        gpa: null,
        CampusId: null,
      });

//object that is sent to the database to store a new student
      var studentObj = {
        first_name: firstname,
        last_name: lastname,
        email: email,
        gpa: gpa,
        CampusId: CampusId,
        image_url: "https://homepages.cae.wisc.edu/~ece533/images/fruits.png",
      };

      await this.props.AddStudent(studentObj);
    }
  };

  render() {
    return !this.props.isLoading ? (
      <div className="container" id="add-form">
        {this.props.successMsg && (
          <h1 id="success-msg">{this.props.successMsg}</h1>
        )}
        <h1 style={{ color: "rebeccapurple" }}>Add A Student</h1>
        <label id="add-label">First Name</label>
        <br />
        <input type="text" id="studentName" onChange={this.changeFirstName} />
        <br />
        <label id="add-label">Last Name</label>
        <br />
        <input type="text" id="studentName" onChange={this.changeLastName} />
        <br />
        <label id="add-label">Email</label>
        <br />
        <input type="text" id="studentName" onChange={this.changeEmail} />
        <br />
        <label id="add-label">GPA</label>
        <br />
        <input type="text" id="studentName" onChange={this.changeGPA} />
        <br />

        <button
          className="btn"
          id="add-btn"
          onClick={() =>
            //data that is inputed
            this.submitStudent(
              this.state.firstname,
              this.state.lastname,
              this.state.email,
              this.state.gpa,
              this.state.CampusId
            )
          }
        >
          Add Student
        </button>
      </div>
    ) : (
      <div id="loader">
        <Loader />
      </div>
    );
  }
}

function mapState(state) {
  return {
    successMsg: state.Students.addSuccessMsg,
    isLoading: state.Students.isLoading,
  };
}

function mapDispatch(dispatch) {
  return {
    AddStudent: (obj) => {
      dispatch(addStudentThunk(obj));
    },
  };
}

export default connect(mapState, mapDispatch)(AddStudentToCampus);
