import React, { useState, useEffect } from "react";
import DefaultPage from "./defaultes";
import { NavigationBar } from "../components/NavigationBar";
import $ from "jquery";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Message } from "primereact/message";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  get_all_categories_action,
  save_category_action,
  delete_category_action,
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
  SpinnerContainer,
} from "../components/Customs";

function Categories() {
  const location = useLocation();

  const [name, setName] = useState("");
  const [delVisible, setDelVisible] = useState(false);

  const category_state = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const {
    category_loading,
    categories,
    message,
    category_error,
  } = category_state;

  const [searchText, setSearchText] = useState("");
  const [searchArray, setSearchArray] = useState([]);

  useEffect(() => {
    dispatch(get_all_categories_action());
  }, []);

  useEffect(() => {
    if (!category_loading) {
      setSearchArray(categories);
    }
  }, [category_loading]);

  const payload = {
    name: name,
  };

  //search
  const searchFilter = (text) => {
    setSearchText(text);
    const lowerText = text.toLowerCase();
    const newData = categories.filter((item) => {
      const itemData = `${item.name.toLowerCase()} ${item.name}`;
      return itemData.indexOf(lowerText) > -1;
    });
    setSearchArray(newData);
  };

  const refresh = () => {
    $("#category_name").val("");
  };

  const addCategory = (payload) => {
    dispatch(save_category_action(payload));
    refresh();
  };

  //Category table column templates
  const category_name_template = (rowData) => {
    return (
      <div className="center tableBody">
        <SpanContainer>{rowData.name}</SpanContainer>
      </div>
    );
  };

  const delete_btn_template = (rowData) => {
    return (
      <div className="center">
        <DeleteIconContainer
          className="fas fa-trash"
          onClick={() => setDelVisible(true)}
        />
        <Dialog
          visible={delVisible}
          style={{ width: "50vw" }}
          modal={true}
          onHide={() => setDelVisible(false)}
        >
          <label className="center" style={{ fontSize: "1rem" }}>
            Do you really want to delete this category - {rowData.name}?
          </label>
          <div className="center direction">
            <Button
              label="Yes"
              icon="pi pi-check"
              onClick={() => del_template(rowData)}
            />
            <Button
              label="No"
              icon="pi pi-times"
              onClick={() => setDelVisible(false)}
              className="p-button-secondary"
            />
          </div>
        </Dialog>
      </div>
    );
  };

  //Delete dialog template
  const del_template = (rowData) => {
    dispatch(delete_category_action(rowData._id));
    refresh();
    setDelVisible(false);
  };

  //success messages timeout function
  window.setTimeout(function () {
    $(".alert")
      .fadeTo(2000, 0)
      .slideUp(500, function () {
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
                    <RefreshIconContainer
                      onClick={() => dispatch(get_all_categories_action())}
                      className="fas fa-sync-alt"
                    ></RefreshIconContainer>
                  </div>
                  <div className="direction">
                    <InputContainer
                      type="text"
                      className="form-control"
                      id="search"
                      name="search"
                      placeholder="Search"
                      value={searchText}
                      onChange={(e) => searchFilter(e.target.value)}
                      style={{ margin: "0.5rem" }}
                    />
                  </div>
                  <div className="categoriesTable">
                    <DataTable
                      value={searchArray}
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
                        onChange={(e) => setName(e.target.value)}
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
