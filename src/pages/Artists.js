import React, { useState, useEffect } from "react";
import { NavigationBar } from "../components/NavigationBar";
import $ from "jquery";
import {
  TopicContainer,
  SubTopicContainer,
  InputContainer,
  SubButtonContainer,
  ImageContainer,
  RefreshIconContainer,
  LongLabelContainer,
  SpanContainer,
  DeleteIconContainer,
  EditIconContainer,
  MessageContainer,
  SpinnerContainer
} from "../components/Customs";
import { default_image_icon } from "../constants/imports";
import { useSelector, useDispatch } from "react-redux";
import {
  get_all_artists_action,
  save_artist_action,
  delete_artist_action,
  update_artist_action
} from "../redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { RadioButton } from "primereact/radiobutton";
import { Message } from "primereact/message";

function Artists() {
  const [isUpdateArtist, setIsUpdateArtist] = useState(false);
  const [artistId, setArtistId] = useState("");
  const [sinhalaName, setSinhalaName] = useState("");
  const [singlishName, setSinglisName] = useState("");
  const [period, setPeriod] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const refresh = () => {
    setIsUpdateArtist(false);
    setArtistId("");
    setSinhalaName("");
    setSinglisName("");
    setPeriod("");
    setImagePreviewUrl(null);
    setSelectedFile(null);
  };

  const updateArtist = () => {
    dispatch(update_artist_action(artistId, formData));
    refresh();
  };

  const addArtist = () => {
    dispatch(save_artist_action(formData));
    refresh();
  };

  //filling data for update
  const updateArtistTemplate = artist => {
    setIsUpdateArtist(true);
    setArtistId(artist._id);
    setSinhalaName(artist.sinhalaName);
    setSinglisName(artist.singlishName);
    setPeriod(artist.period);
    setImagePreviewUrl(artist.image);
    setSelectedFile(artist.image);
  };

  const artist_state = useSelector(state => state.artist);
  const dispatch = useDispatch();
  const { artist_loading, artists, message, artist_error } = artist_state;

  useEffect(() => {
    dispatch(get_all_artists_action());
  }, []);

  var formData = new FormData();
  formData.append("sinhalaName", sinhalaName);
  formData.append("singlishName", singlishName);
  formData.append("period", period);
  formData.append("image", selectedFile);

  //artist image preview function
  const fileChangedHandler = event => {
    setSelectedFile(event.target.files[0]);
    let reader = new FileReader();

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };

    reader.readAsDataURL(event.target.files[0]);
  };

  const artist_name_sinhala_template = rowData => {
    return (
      <div className="center tableBody">
        <SpanContainer>{rowData.sinhalaName}</SpanContainer>
      </div>
    );
  };

  const artist_name_singlish_template = rowData => {
    return (
      <div className="center tableBody">
        <SpanContainer>{rowData.singlishName}</SpanContainer>
      </div>
    );
  };

  const image_template = rowData => {
    return (
      <div className="center tableBody">
        <img src={rowData.image} alt="loading..." width="40" height="40" />
      </div>
    );
  };

  const period_template = rowData => {
    return (
      <div className="center tableBody">
        <SpanContainer>{rowData.period}</SpanContainer>
      </div>
    );
  };

  const delete_edit_btns_template = rowData => {
    return (
      <div className="center direction">
        <EditIconContainer
          className="fas fa-edit"
          onClick={() => updateArtistTemplate(rowData)}
        />
        <DeleteIconContainer
          className="fas fa-trash"
          onClick={() => dispatch(delete_artist_action(rowData._id))}
        />
      </div>
    );
  };
  window.setTimeout(function() {
    $(".alert")
      .fadeTo(2000, 0)
      .slideUp(2000, function() {
        $(this).remove();
      });
  }, 3000);
  return (
    <div className="background">
      <NavigationBar />
      <div className="center">
        <div className="card">
          <div className="direction">
            <div>
              <div className="center">
                <TopicContainer>Artists</TopicContainer>
              </div>
              <RefreshIconContainer
                onClick={() => dispatch(get_all_artists_action())}
                className="fas fa-sync-alt"
              ></RefreshIconContainer>
              <div className="artistsTable">
                <DataTable
                  value={artists}
                  responsive
                  paginator={true}
                  rows={5}
                  rowHover
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  emptyMessage="No artists found"
                  currentPageReportTemplate="{first} to {last} of {totalRecords} entries"
                  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                >
                  <Column
                    field="artistNameSinhala"
                    header="Artist Name (Sinhala)"
                    body={artist_name_sinhala_template}
                  />
                  <Column
                    field="artistNameSinglish"
                    header="Artist Name (Singlish)"
                    body={artist_name_singlish_template}
                  />
                  <Column field="image" header="Image" body={image_template} />
                  <Column
                    field="period"
                    header="Period"
                    body={period_template}
                  />
                  <Column
                    field="action"
                    header="Action"
                    body={delete_edit_btns_template}
                  />
                </DataTable>
              </div>
            </div>
            <div className="center">
              <div className="miniCard">
                {isUpdateArtist === true ? (
                  <div className="center">
                    <SubTopicContainer>Update Artist</SubTopicContainer>
                  </div>
                ) : (
                  <div className="center">
                    <SubTopicContainer>Add Artist</SubTopicContainer>
                  </div>
                )}
                {imagePreviewUrl ? (
                  <div className="center oppositedirection">
                    <InputContainer
                      type="file"
                      name="avatar"
                      onChange={fileChangedHandler}
                    ></InputContainer>
                    <ImageContainer
                      src={imagePreviewUrl}
                      alt="icon"
                    ></ImageContainer>
                  </div>
                ) : (
                  <div className="center oppositedirection">
                    <InputContainer
                      type="file"
                      name="avatar"
                      onChange={fileChangedHandler}
                    ></InputContainer>
                    <ImageContainer
                      src={default_image_icon}
                      alt="icon"
                    ></ImageContainer>
                  </div>
                )}
                {artist_error && artist_error.data.image && (
                  <div className="center">
                    <Message
                      severity="error"
                      style={MessageContainer}
                      text={artist_error.data.image.message}
                    />
                  </div>
                )}
                <div className="form-group center oppositedirection">
                  <InputContainer
                    type="text"
                    className="form-control"
                    id="artist_name_sinhala"
                    name="artist_name_sinhala"
                    placeholder="Artist Name (Sinhala)"
                    value={sinhalaName}
                    onChange={e => setSinhalaName(e.target.value)}
                  ></InputContainer>
                  {artist_error && artist_error.data.sinhalaName && (
                    <div className="center">
                      <Message
                        severity="error"
                        style={MessageContainer}
                        text={artist_error.data.sinhalaName.message}
                      />
                    </div>
                  )}
                </div>

                <div className="form-group center oppositedirection">
                  <InputContainer
                    type="text"
                    className="form-control"
                    id="artist_name_singlish"
                    name="artist_name_singlish"
                    placeholder="Artist Name (Singlish)"
                    value={singlishName}
                    onChange={e => setSinglisName(e.target.value)}
                  ></InputContainer>
                  {artist_error && artist_error.data.singlishName && (
                    <Message
                      severity="error"
                      style={MessageContainer}
                      text={artist_error.data.singlishName.message}
                    />
                  )}
                </div>

                <div className="form-group center oppositedirection">
                  <div className="direction">
                    <div className="p-col-12">
                      <RadioButton
                        inputId="rb1"
                        name="period"
                        value="Old"
                        onChange={e => setPeriod(e.value)}
                        checked={period === "Old"}
                        style={{
                          margin: "0.2rem"
                        }}
                      />
                      <LongLabelContainer
                        htmlFor="rb1"
                        className="p-radiobutton-label"
                      >
                        Old
                      </LongLabelContainer>
                    </div>
                    <div className="p-col-12">
                      <RadioButton
                        inputId="rb2"
                        name="period"
                        value="New"
                        onChange={e => setPeriod(e.value)}
                        checked={period === "New"}
                        style={{
                          margin: "0.2rem"
                        }}
                      />
                      <LongLabelContainer
                        htmlFor="rb1"
                        className="p-radiobutton-label"
                      >
                        New
                      </LongLabelContainer>
                    </div>
                  </div>
                  {artist_error && artist_error.data.period && (
                    <Message
                      severity="error"
                      style={MessageContainer}
                      text={artist_error.data.period.message}
                    />
                  )}
                </div>
                {isUpdateArtist === true ? (
                  <div className="center">
                    <SubButtonContainer onClick={updateArtist}>
                      Update
                    </SubButtonContainer>
                    <SubButtonContainer onClick={refresh}>
                      Cancel
                    </SubButtonContainer>
                  </div>
                ) : (
                  <div className="center">
                    <SubButtonContainer onClick={addArtist}>
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
                  </div>
                )}
                {artist_loading && (
                  <div className="center">
                    <SpinnerContainer className="spinner-border"></SpinnerContainer>
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

export default Artists;
