import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavigationBar } from "../../components/NavigationBar";
import {
  TopicContainer,
  ButtonContainer,
  DeleteIconButtonContainer,
  EditIconButtonContainer
} from "../../components/Customs";

function ViewCategory() {
  //sample data
  const [categories] = useState([
    { name: "John" },
    { name: "Mary" },
    { name: "July" }
  ]);

  const updateCategory = name => {
    // <Link to="/updateCategory" categoryName={name}></Link>;
  };
  return (
    <div className="background">
      <NavigationBar />
      <div className="center">
        <div className="card">
          <div className="center">
            <TopicContainer>View All Categories</TopicContainer>
          </div>
          <div className="direction">
            <div className="my-custom-scrollbar">
              <table class="table table-hover table-dark">
                <thead>
                  <tr className="thead-dark">
                    <th align="center">Category Name</th>
                    <th align="center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map(i => (
                    <tr className="table-light text-dark">
                      <td>{i.name}</td>
                      <td className="direction center">
                        <EditIconButtonContainer
                          onClick={() => updateCategory(i.name)}
                        >
                          <i class="fas fa-edit"></i>
                        </EditIconButtonContainer>
                        <DeleteIconButtonContainer>
                          <i class="fas fa-trash"></i>
                        </DeleteIconButtonContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="center">
              <Link to="/addCategory">
                <ButtonContainer>
                  <i class="fas fa-plus">New</i>
                </ButtonContainer>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCategory;
