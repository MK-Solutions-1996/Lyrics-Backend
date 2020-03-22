import React, { useState } from "react";
import { NavigationBar } from "../components/NavigationBar";
import {
  TopicContainer,
  SubTopicContainer,
  SubButtonContainer,
  DeleteIconButtonContainer,
  EditIconButtonContainer,
  InputContainer
} from "../components/Customs";

function Categories() {
  //sample data
  const [categories] = useState([
    { name: "John" },
    { name: "Mary" },
    { name: "July" }
  ]);

  const [categoryName, setCategoryName] = useState("");
  const [isUpdateCategory, setIsUpdateCategory] = useState(false);
  const updateCategory = category => {
    setIsUpdateCategory(true);
    setCategoryName(category.name);
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
              <div className="my-custom-scrollbar2">
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
                            onClick={() => updateCategory(i)}
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
                    value={categoryName}
                    onChange={e => setCategoryName(e.target.value)}
                  ></InputContainer>
                </div>
                {isUpdateCategory === true ? (
                  <div className="center">
                    <SubButtonContainer>Update</SubButtonContainer>
                  </div>
                ) : (
                  <div className="center">
                    <SubButtonContainer>Add</SubButtonContainer>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
