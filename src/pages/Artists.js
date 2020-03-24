import React, { useState, useEffect } from "react";
import { NavigationBar } from "../components/NavigationBar";
import {
  TopicContainer,
  SubTopicContainer,
  InputContainer,
  SubButtonContainer,
  ImageContainer,
  RadioButtonContainer,
  LongLabelContainer,
  SpanContainer,
  DeleteIconContainer,
  EditIconContainer
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

function Artists() {
  const [isUpdateArtist, setIsUpdateArtist] = useState(false);
  const [artistId, setArtistId] = useState("");
  const [sinhalaName, setSinhalaName] = useState("");
  const [singlishName, setSinglisName] = useState("");
  const [period, setPeriod] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  //filling data for update
  const updateArtist = artist => {
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
  const { loading, artists, error } = artist_state;

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
          onClick={() => updateArtist(rowData)}
        />
        <DeleteIconContainer
          className="fas fa-trash"
          onClick={() => dispatch(delete_artist_action(rowData._id))}
        />
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
                <TopicContainer>Artists</TopicContainer>
              </div>
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
                {error && error.data.image && (
                  <div className="form-group center">
                    {error.data.image.message}
                  </div>
                )}
                <div className="form-group center">
                  <InputContainer
                    type="text"
                    className="form-control"
                    id="artist_name_sinhala"
                    name="artist_name_sinhala"
                    placeholder="Artist Name (Sinhala)"
                    value={sinhalaName}
                    onChange={e => setSinhalaName(e.target.value)}
                  ></InputContainer>
                </div>
                {error && error.data.sinhalaName && (
                  <div className="form-group center">
                    {error.data.sinhalaName.message}
                  </div>
                )}
                <div className="form-group center">
                  <InputContainer
                    type="text"
                    className="form-control"
                    id="artist_name_singlish"
                    name="artist_name_singlish"
                    placeholder="Artist Name (Singlish)"
                    value={singlishName}
                    onChange={e => setSinglisName(e.target.value)}
                  ></InputContainer>
                </div>
                {error && error.data.singlishName && (
                  <div className="form-group center">
                    {error.data.singlishName.message}
                  </div>
                )}

                <div className="form-group center">
                  {/* <fieldset id="group1"> */}
                  <RadioButtonContainer
                    type="radio"
                    value="Old"
                    name="group1"
                    onChange={e => setPeriod(e.target.value)}
                  />
                  <LongLabelContainer for="Old">Old</LongLabelContainer>
                  <RadioButtonContainer
                    type="radio"
                    type="radio"
                    value="New"
                    name="group1"
                    onChange={e => setPeriod(e.target.value)}
                  />
                  {error && error.data.period && (
                    <div className="form-group center">
                      {error.data.period.message}
                    </div>
                  )}
                  <LongLabelContainer for="New">New</LongLabelContainer>
                </div>
                {isUpdateArtist === true ? (
                  <div className="center">
                    <SubButtonContainer
                      onClick={() =>
                        dispatch(update_artist_action(artistId, formData))
                      }
                    >
                      Update
                    </SubButtonContainer>
                  </div>
                ) : (
                  <div className="center">
                    <SubButtonContainer
                      onClick={() => dispatch(save_artist_action(formData))}
                    >
                      Add
                    </SubButtonContainer>
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
