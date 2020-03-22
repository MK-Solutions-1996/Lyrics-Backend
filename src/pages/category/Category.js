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

function Category() {
  const [isUpdateCategory, setIsUpdateCategory] = useState(false);

  const updateCategory = e => {
    setIsUpdateCategory(true);
  };

  return <div></div>;
}

export default Category;
