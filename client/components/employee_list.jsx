import React, { Component } from 'react';
// import { createContainer } from 'meteor/react-meteor-data';
import { withTracker } from 'meteor/react-meteor-data';
import { EmployeesCollection } from '../../imports/api/employees';
import EmployeeDetail from './employee_detail';

const PER_PAGE = 20;

class EmployeeList extends Component {

  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.page = 1;
  }

  handleButtonClick() {
    Meteor.subscribe("employees", PER_PAGE*this.page);
    this.page +=1
  }
  
  render() {
    // props.employees => an array of employee objects
    return (
      <>
        <div className="employee-list">
          {this.props.employees.map((employee) => (
            <EmployeeDetail employee={employee} key={employee._id} />
          ))}
        </div>
        <button onClick={this.handleButtonClick.bind(this)} className="btn btn-primary">
          Load more...
        </button>
      </>
    );
  }
}

export default withTracker(() => {
  // 1 step set up subscription
  Meteor.subscribe("employees", PER_PAGE);

  // 2 step return an object. Whatever we return will be sent to EmployeesList as props
  return { employees: EmployeesCollection.find({}).fetch() };
})(EmployeeList);
