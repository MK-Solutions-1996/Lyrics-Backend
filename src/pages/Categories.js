import React, { useState, useEffect } from "react";
import DefaultPage from "./defaultes";
import { NavigationBar } from "../components/NavigationBar";
import $ from "jquery";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Message } from "primereact/message";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  get_all_categories_action,
  save_category_action,
  delete_category_action
} from "../redux";
import {
  TopicContainer,
  SubTopicContainer,
  SubButtonContainer,
  InputContainer,
  SpanContainer,
  DeleteIconContainer,
  RefreshIconContainer,
  MessageContainer,
  SpinnerContainer
} from "../components/Customs";

function Categories() {
  const location = useLocation();

  const [name, setName] = useState("");

  const category_state = useSelector(state => state.category);
  const dispatch = useDispatch();
  const {
    category_loading,
    categories,
    message,
    category_error
  } = category_state;

  useEffect(() => {
    dispatch(get_all_categories_action());
  }, []);

  const payload = {
    name: name
  };

  const refresh = () => {
    setName("");
  };

  const addCategory = payload => {
    dispatch(save_category_action(payload));
    refresh();
  };

  //Category table column templates
  const category_name_template = rowData => {
    return (
      <div className="center tableBody">
        <SpanContainer>{rowData.name}</SpanContainer>
      </div>
    );
  };

  const delete_btn_template = rowData => {
    return (
      <div className="center">
        <DeleteIconContainer
          className="fas fa-trash"
          onClick={() => dispatch(delete_category_action(rowData._id))}
        />
      </div>
    );
  };

  //success messages timeout function
  window.setTimeout(function() {
    $(".alert")
      .fadeTo(2000, 0)
      .slideUp(500, function() {
        $(this).remove();
      });
  }, 3000);

  return (
    <div>
      {location.state ? (
        <div className="background">
          <NavigationBar user={location.state} />
          <div className="center">
            <div className="card">
              <div className="direction">
                <div>
                  <div className="center">
                    <TopicContainer>Categories</TopicContainer>
                  </div>
                  <RefreshIconContainer
                    onClick={() => dispatch(get_all_categories_action())}
                    className="fas fa-sync-alt"
                  ></RefreshIconContainer>
                  <div className="categoriesTable">
                    <DataTable
                      value={categories}
                      responsive
                      paginator={true}
                      rows={10}
                      rowHover
                      rowsPerPageOptions={[5, 10, 25, 50]}
                      emptyMessage="No categories found"
                      currentPageReportTemplate="{first} to {last} of {totalRecords} entries"
                      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
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
                </div>
                <div className="center">
                  <div className="miniCard">
                    <div className="center">
                      <SubTopicContainer>Add Category</SubTopicContainer>
                    </div>
                    <div className="form-group center oppositedirection">
                      <InputContainer
                        type="text"
                        className="form-control"
                        id="category_name"
                        name="category_name"
                        placeholder="Category Name"
                        onChange={e => setName(e.target.value)}
                      ></InputContainer>
                      {category_error && category_error.data.name && (
                        <Message
                          severity="error"
                          style={MessageContainer}
                          text={category_error.data.name.message}
                        />
                      )}
                    </div>
                    <div className="center oppositedirection">
                      <SubButtonContainer onClick={() => addCategory(payload)}>
                        Add
                      </SubButtonContainer>
                      {message && (
                        <div class="alert alert-success message" role="alert">
                          <button
                            type="button"
                            class="close"
                            data-dismiss="alert"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                          <strong>Success!</strong> {message}
                        </div>
                      )}
                      {category_loading && (
                        <div className="center">
                          <SpinnerContainer className="spinner-border"></SpinnerContainer>
                        </div>
                      )}
                      {typeof category_error === "undefined" ? (
                        <Message
                          severity="error"
                          style={MessageContainer}
                          text="Server is not running this time"
                        />
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <DefaultPage />
      )}
    </div>
  );
}

export default Categories;
