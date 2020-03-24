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
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

function Categories() {
  const [name, setName] = useState("");

  const category_state = useSelector(state => state.category);
  const dispatch = useDispatch();
  const { loading, categories, error } = category_state;

  useEffect(() => {
    dispatch(get_all_categories_action());
  }, []);

  //temporary
  const payload = {
    name: name
  };

  // const [globalFilter, setGlobalFilter] = useState(null);

  // let header = (
  //   <div style={{ textAlign: "left" }}>
  //     <i className="pi pi-search" style={{ margin: "4px 4px 0 0" }}></i>
  //     <InputText
  //       type="search"
  //       onInput={e => setGlobalFilter(e.target.value)}
  //       placeholder="Global Search"
  //       size="50"
  //     />
  //   </div>
  // );

  const category_name_template = rowData => {
    return (
      <div className="center">
        <span
          style={{
            verticalAlign: "middle",
            marginLeft: ".5em",
            fontSize: "0.8rem"
          }}
        >
          {rowData.name}
        </span>
      </div>
    );
  };

  const delete_btn_template = rowData => {
    return (
      <div className="center">
        <DeleteIconButtonContainer
          onClick={() => dispatch(delete_category_action(rowData._id))}
        >
          <i className="fas fa-trash"></i>
        </DeleteIconButtonContainer>
      </div>
    );
  };

  return (
    <div className="background">
      <NavigationBar />
      <div className="center">
        <div className="card">
          <div className="direction">
            <div>
              <div className="center">
                <TopicContainer>Categories</TopicContainer>
              </div>
              <div className="categoriesTable">
                <DataTable
                  value={categories}
                  responsive
                  paginator={true}
                  rows={5}
                  rowHover
                  rowsPerPageOptions={[5, 10, 15, 20, 25, 50]}
                  emptyMessage="No categories found"
                  currentPageReportTemplate="{first} to {last} of {totalRecords} entries"
                  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                  // header={header}
                  // globalFilter={globalFilter}
                >
                  <Column
                    field="categoryName"
                    header="Category Name"
                    body={category_name_template}
                  />
                  <Column
                    field="action"
                    header="Action"
                    body={delete_btn_template}
                  />
                </DataTable>
              </div>
              {/* <div className="categoriesTable">
                <table className="table table-hover table-dark">
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
                          <DeleteIconButtonContainer
                            onClick={() =>
                              dispatch(delete_category_action(i._id))
                            }
                          >
                            <i className="fas fa-trash"></i>
                          </DeleteIconButtonContainer>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div> */}
            </div>
            <div className="center">
              <div className="miniCard">
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
                    onChange={e => setName(e.target.value)}
                  ></InputContainer>
                </div>
                <div className="center">
                  <SubButtonContainer
                    onClick={() => dispatch(save_category_action(payload))}
                  >
                    Add
                  </SubButtonContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
