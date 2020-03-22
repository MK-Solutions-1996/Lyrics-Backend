import React, { useState, useEffect } from "react";
import { NavigationBar } from "../components/NavigationBar";
import {
  TopicContainer,
  SubTopicContainer,
  SubButtonContainer,
  DeleteIconButtonContainer,
  InputContainer
} from "../components/Customs";
import { useSelector, useDispatch } from "react-redux";
import {
  get_all_categories_action,
  save_category_action,
  delete_category_action
} from "../redux";

function Categories() {
  //sample data
  // const [categories] = useState([
  //   { name: "John" },
  //   { name: "Mary" },
  //   { name: "July" }
  // ]);

  const [name, setName] = useState("");

  const category_state = useSelector(state => state.category);
  const dispatch = useDispatch();
  const { loading, categories, error } = category_state;

  useEffect(() => {
    dispatch(get_all_categories_action());
  }, []);

  const payload = {
    name: name
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
                          {/* <EditIconButtonContainer
                            onClick={() => updateCategory(i)}
                          >
                            <i class="fas fa-edit"></i>
                          </EditIconButtonContainer> */}
                          <DeleteIconButtonContainer
                            onClick={() =>
                              dispatch(delete_category_action(i._id))
                            }
                          >
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
                    // value={name}
                    onChange={e => setName(e.target.value)}
                  ></InputContainer>
                </div>
                {/* {isUpdateCategory === true ? (
                  <div className="center">
                    <SubButtonContainer>Update</SubButtonContainer>
                  </div>
                ) : ( */}
                <div className="center">
                  <SubButtonContainer
                    onClick={() => dispatch(save_category_action(payload))}
                  >
                    Add
                  </SubButtonContainer>
                </div>
                {/* )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
