import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import React from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios
      .get("http://5d60ae24c2ca490014b27087.mockapi.io/api/v1/users")
      .then(({ data: users }) => {
        this.setState({
          users
        });
      });
  }

  handlePicture = col => {
    return <img width={50} height={50} src={col}></img>;
  };

  statusEditAction = (cell, row) => (
    <div>
      <td
        onClick={() => this.toggleDynamic("edit")}
        className="btn btn-primary ml-s btn-table-action-md"
      >
        <i className="fa fa-pencil align-baseline" />
      </td>
      <td
        onClick={() => this.handlePushToPermissionRoles(cell)}
        className="btn btn-danger ml-2 btn-table-action-md"
      >
        <i className="fa fa-trash align-baseline" />
      </td>
    </div>
  );

  render() {

    const option = {
      sizePerPage: 5, 
    }

    return (
      <div>
        <div style={{ width: 1000, marginLeft: 100, marginTop: 60 }}>
          <BootstrapTable search options={option} height='400px' pagination exportCSV data={this.state.users}>
            <TableHeaderColumn
              columnClassName="text-center align-middle"
              thStyle={{ width: 100 }}
              tdStyle={{ width: 100 }}
              dataField="id"
              isKey
            >
              ID
            </TableHeaderColumn>
            <TableHeaderColumn
              columnClassName="text-center align-middle"
              dataSort
              dataField="name"
            >
              Name
            </TableHeaderColumn>
            <TableHeaderColumn
              dataFormat={this.handlePicture}
              columnClassName="text-center align-middle"
              tdStyle={{ textAlign: "center" }}
              dataField="avatar"
            >
              Avatar
            </TableHeaderColumn>
            <TableHeaderColumn
              dataFormat={this.statusEditAction}
              columnClassName="text-center align-middle"
            >
              <span className="fs-sm">Action</span>
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    );
  }
}

export default App;
