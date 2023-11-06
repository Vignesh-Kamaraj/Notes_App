import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "./context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState, useEffect } from "react";

function notes() {
  let [data, setData] = useState([]);
  let { API_URL } = useContext(UserDataContext);
  let navigate = useNavigate();
  let handleDelete = async (id, index) => {
    let newArray = [...data];
    newArray.splice(index, 1);
    setData(newArray);
    try {
      let res = await axios.delete(`${API_URL}/${id}`);
      if (res.status == 200) {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      let res = await axios.get(API_URL);
      if (res.status == 200) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  let handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };
  return (
    <>
      <div className="container-fluid height">
        <div>
          <h1>MY NOTES</h1>
        </div>
        <div className="d-flex flex-row flex-wrap note">
          {data.map((e, i) => {
            return (
              <div className="card" id="card" key={i}>
                <div className="d-flex flex-row justify-content-between">
                  <h3>{e.title}</h3>
                  <div>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      onClick={() => handleDelete(e.id)}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      onClick={() => handleEdit(e.id)}
                    />
                  </div>
                </div>
                <p>{e.note}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default notes;
