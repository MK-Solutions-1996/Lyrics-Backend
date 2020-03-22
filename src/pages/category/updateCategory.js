import React from "react";
import { NavigationBar } from "../../components/NavigationBar";
import {
  ButtonContainer,
  TopicContainer,
  InputContainer
} from "../../components/Customs";

function UpdateCategory(props) {
  const category = props.category;
  return (
    <div className="background">
      <NavigationBar />
      <div className="center">
        <div className="card">
          <div className="center">
            <TopicContainer>Update Category</TopicContainer>
          </div>
          <div className="form-group center">
            <InputContainer
              type="text"
              className="form-control"
              id="category_name"
              name="category_name"
              // placeholder="Category Name"
            >
              {console.log("Testing", category)}
            </InputContainer>
          </div>
          <div className="center">
            <ButtonContainer>Update Category</ButtonContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateCategory;
