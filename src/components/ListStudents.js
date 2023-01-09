import React from "react";

import axios from "axios";
import { Link } from "react-router-dom";

const ListStudents = (props) => {
  const { students, setStudents } = props;

  const handleDelete = (student) => {
    axios
      .delete(`http://localhost:3004/students/${student.id}`)
      .then((res) => {
        const filteredStudents = students.filter(
          (item) => item.id !== student.id
        );
        setStudents(filteredStudents);
      })
      .catch((err) => {
        console.log(err);
        alert("Silme esnasında bir sorun oluştu");
      });
  };

  return (
    <div className="container my-1">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Sequence No.</th>
            <th scope="col">Student No</th>
            <th scope="col">Name</th>
            <th scope="col">Surname</th>
            <th scope="col">Class</th>
            <th scope="col">School</th>
            <th>Transactions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td className="text-center" colSpan={7}>
              No students registered yet..
              </td>
            </tr>
          ) : (
            <>
              {students.map((student, index) => (
                <tr key={student.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{student.studentNo}</td>
                  <td>{student.name}</td>
                  <td>{student.surname}</td>
                  <td>{student.studentClass}</td>
                  <td>{student.schoolName}</td>
                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example">
                      <button
                        onClick={() => handleDelete(student)}
                        type="button"
                        className="btn btn-sm btn-outline-danger">
                        Delete
                      </button>
                      <Link
                        to={`/edit-student/${student.id}`}
                        type="button"
                        className="btn btn-sm btn-outline-primary">
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListStudents;