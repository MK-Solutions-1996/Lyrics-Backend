import React, { useState } from "react";
import { NavigationBar } from "../../components/NavigationBar";
import {
  TopicContainer,
  SubTopicContainer,
  SubButtonContainer,
  DeleteIconButtonContainer,
  EditIconButtonContainer,
  InputContainer
} from "../../components/Customs";
import UpdateCategory from "./updateCategory";

function ViewCategory(props) {
  //sample data
  const [categories] = useState([
    { name: "John" },
    { name: "Mary" },
    { name: "July" }
  ]);

  const [isUpdateCategory, setIsUpdateCategory] = useState(false);

  const updateCategory = e => {
    setIsUpdateCategory(true);
  };
  return (
    <div className="background">
      <NavigationBar />
      <div className="center">
        <div className="card">
          <div>
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
                          <EditIconButtonContainer onClick={updateCategory}>
                            <i class="fas fa-edit"></i>
                          </EditIconButtonContainer>

                          {isUpdateCategory && <UpdateCategory category={i} />}

                          <DeleteIconButtonContainer>
                            <i class="fas fa-trash"></i>
                          </DeleteIconButtonContainer>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <div className="center">
                  <SubTopicContainer>Add Category</SubTopicContainer>
                </div>
                <div className="form-group center">
                  <InputContainer
                    type="text"
                    className="form-control"
                    id="category_name"
                    name="category_name"
                    placeholder="Category Name"
                  ></InputContainer>
                </div>
                <div className="center">
                  <SubButtonContainer>Add New</SubButtonContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCategory;
