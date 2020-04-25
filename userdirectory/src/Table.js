import React, { useCallback, useState } from "react";
import API from "./utils/API";

class Table extends React.Component {
  state = {
    data: [],
    filteredData: [],
  };

  componentDidMount() {
    const employees = API.getRandomUsers().then((data) => {
      console.log(data.data.results);
      const newData = data.data.results.map((employee) => {
        console.log(employee);
        return {
          photo: employee.picture.medium,
          name: employee.name.first + " " + employee.name.last,
          email: employee.email,
          dob: employee.dob.date,
        };
      });
      //   console.log(newData);
      this.setState({
        data: newData,
        filteredData: newData,
      });
    });
  }

  handleSearchInputChange(inputvalue) {
    console.log(inputvalue);
    const newData = this.state.data.filter((employee) => {
      return employee.name.toLowerCase().includes(inputvalue);
    });
    this.setState({
      filteredData: newData,
    });
  }

  render() {
    // console.log(this.state.data);

    return (
      <div>
        <input
          onChange={(event) => {
            this.handleSearchInputChange(event.target.value);
          }}
        ></input>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Photo</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">DOB</th>
            </tr>
          </thead>
          <tbody>
            {this.state.filteredData.map((employee) => {
              return (
                <tr>
                  <td>
                    <img src={employee.photo} alt="Random"></img>
                  </td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.dob}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
