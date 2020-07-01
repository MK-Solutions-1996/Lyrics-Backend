import React, { useState, useEffect } from "react";
import DefaultPage from "./defaultes";
import { NavigationBar } from "../components/NavigationBar";
import $ from "jquery";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Message } from "primereact/message";
import { Dialog } from "primereact/dialog";
import { Spinner } from "primereact/spinner";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  get_all_songs_action,
  save_song_action,
  update_song_action,
  delete_song_action,
  get_all_artists_action,
  get_all_categories_action,
} from "../redux";
import {
  TopicContainer,
  SubTopicContainer,
  InputContainer,
  TextAreaContainer,
  SubButtonContainer,
  DeleteIconContainer,
  EditIconContainer,
  ViewIconContainer,
  SpanContainer,
  RefreshIconContainer,
  LongLabelContainer,
  MultiSelectContainer,
  MessageContainer,
  SpinnerContainer,
  AudioContainer,
  IgnoreButtonContainer,
} from "../components/Customs";

function Songs() {
  const location = useLocation();

  const [isUpdateSong, setIsUpdateSong] = useState(false);

  const [songId, setSongId] = useState("");
  const [sinhalaTitle, setSinhalaTitle] = useState("");
  const [singlishTitle, setSinglishTitle] = useState("");
  const [songType, setSongType] = useState("");
  const [artistId, setArtistId] = useState([]);
  const [category, setCategory] = useState([]);
  const [song, setSong] = useState("");
  const [likes, setLikes] = useState(0);
  const [file, setFile] = useState(null);
  const [audioAvailability, setAudioAvailability] = useState("true");

  //View Song Dialog states
  const [songForTemplate, setSongForTemplate] = useState("");
  const [titleForTemplate, setTitleForTemplate] = useState("");
  const [visible, setVisible] = useState(false);
  const [delVisible, setDelVisible] = useState(false);

  const song_state = useSelector((state) => state.song);
  const artist_state = useSelector((state) => state.artist);
  const category_state = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const { song_loading, songs, message, song_error } = song_state;
  const { artists } = artist_state;
  const { categories } = category_state;

  const [searchText, setSearchText] = useState("");
  const [searchArray, setSearchArray] = useState([]);

  useEffect(() => {
    dispatch(get_all_artists_action());
    dispatch(get_all_categories_action());
    dispatch(get_all_songs_action());
  }, []);

  useEffect(() => {
    if (!song_loading) {
      setSearchArray(songs);
    }
  }, [song_loading]);

  //dropdowns fetches
  const artist_dropdown = [];
  artists.map((data) => {
    const object = { label: data.singlishName, value: data._id };
    artist_dropdown.push(object);
  });
  const category_dropdown = [];
  categories.map((data) => {
    const object = { label: data.name, value: data.name };
    category_dropdown.push(object);
  });

  //search
  const searchFilter = (text) => {
    setSearchText(text);
    const lowerText = text.toLowerCase();
    const newData = songs.filter((item) => {
      const itemData = `${item.singlishTitle.toLowerCase()} ${
        item.sinhalaTitle
      } ${item.song}`;
      return itemData.indexOf(lowerText) > -1;
    });
    setSearchArray(newData);
  };

  var formData = new FormData();
  formData.append("sinhalaTitle", sinhalaTitle);
  formData.append("singlishTitle", singlishTitle);
  for (var i = 0; i < category.length; i++) {
    formData.append("categories[]", category[i]);
  }
  formData.append("song", song);
  formData.append("type", songType);
  formData.append("audioAvailability", audioAvailability);
  formData.append("audio", file);
  for (var i = 0; i < artistId.length; i++) {
    formData.append("artist[]", artistId[i]);
  }
  formData.append("likes", likes);

  const addSong = () => {
    dispatch(save_song_action(formData));
    refresh();
  };

  const updateSong = () => {
    dispatch(update_song_action(songId, formData));
    refresh();
  };

  //filling data for update
  const updateSongTemplate = (song) => {
    setIsUpdateSong(true);
    setSongId(song._id);
    setSinhalaTitle(song.sinhalaTitle);
    setSinglishTitle(song.singlishTitle);
    setSongType(song.type);
    setArtistId(song.artist);
    setCategory(song.categories);
    setSong(song.song);
    $("#myAudio").attr("src", song.audio.audio);
    setFile(song.audio);
    setLikes(song.likes);
  };

  const refresh = () => {
    setIsUpdateSong(false);
    setSongId("");
    setSinhalaTitle("");
    setSinglishTitle("");
    setSongType("");
    setArtistId([]);
    setCategory([]);
    setSong("");
    setLikes(0);
    setFile(null);
    setSearchText("");
    $("#myFile").val("");
    $("#myAudio").val("");
    $("#myAudio").attr("src", "");
  };

  //Song table column templates
  const song_name_sinhala_template = (rowData) => {
    return (
      <div className="center tableBody">
        <SpanContainer>{rowData.sinhalaTitle}</SpanContainer>
      </div>
    );
  };

  const song_name_singlish_template = (rowData) => {
    return (
      <div className="center tableBody">
        <SpanContainer>{rowData.singlishTitle}</SpanContainer>
      </div>
    );
  };

  const song_type_template = (rowData) => {
    return (
      <div className="center tableBody">
        <SpanContainer>{rowData.type}</SpanContainer>
      </div>
    );
  };

  const artists_template = (rowData) => {
    const artistArr = [];
    artists.map((artist) => {
      rowData.artist.forEach((id) => {
        if (artist._id === id) {
          artistArr.push(artist.singlishName);
        }
      });
    });
    return (
      <div className="center tableBody oppositedirection">
        {artistArr.map((artist) => (
          <SpanContainer>{artist}</SpanContainer>
        ))}
      </div>
    );
  };

  const categories_template = (rowData) => {
    return (
      <div className="center tableBody oppositedirection">
        {rowData.categories.map((category) => (
          <SpanContainer>{category}</SpanContainer>
        ))}
      </div>
    );
  };

  const song_likes_template = (rowData) => {
    return (
      <div className="center tableBody">
        <SpanContainer>{rowData.likes}</SpanContainer>
      </div>
    );
  };

  const delete_edit_view_btns_template = (rowData) => {
    return (
      <div className="center direction">
        <ViewIconContainer
          className="fas fa-eye"
          onClick={() => view__template(rowData)}
        />
        <Dialog
          header={titleForTemplate}
          visible={visible}
          style={{ width: "50vw" }}
          modal={true}
          onHide={() => setVisible(false)}
        >
          <textarea readOnly style={{ height: "40vh", width: "47.5vw" }}>
            {songForTemplate}
          </textarea>
        </Dialog>
        <EditIconContainer
          className="fas fa-edit"
          onClick={() => updateSongTemplate(rowData)}
        />
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
            Do you really want to delete this song - {rowData.singlishTitle}?
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
    dispatch(delete_song_action(rowData._id));
    refresh();
    setDelVisible(false);
  };

  //View song dialog template
  const view__template = (rowData) => {
    setTitleForTemplate(rowData.sinhalaTitle);
    setSongForTemplate(rowData.song);
    setVisible(true);
  };

  //success messages timeout function
  window.setTimeout(function () {
    $(".alert")
      .fadeTo(2000, 0)
      .slideUp(2000, function () {
        $(this).remove();
      });
  }, 3000);

  //audio preview function
  var $audio = $("#myAudio");
  $("#myFile").on("change", function (e) {
    var target = e.currentTarget;
    var file = target.files[0];
    var reader = new FileReader();
    setFile(file);

    if (target.files && file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $audio.attr("src", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  });

  return (
    <div>
      {location.state ? (
        <div className="background">
          <NavigationBar user={location.state} />
          <div className="center">
            <div className="card">
              <div className="direction">
                <div>
                  <div className="center direction">
                    <TopicContainer>Songs</TopicContainer>
                    <RefreshIconContainer
                      onClick={() => dispatch(get_all_songs_action())}
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
                  <div className="songsTable">
                    <DataTable
                      value={searchArray}
                      responsive
                      paginator={true}
                      rows={5}
                      rowHover
                      rowsPerPageOptions={[5, 10, 25, 50]}
                      emptyMessage="No songs found"
                      currentPageReportTemplate="{first} to {last} of {totalRecords} entries"
                      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    >
                      <Column
                        field="songTitleSinhala"
                        header="Song Title (Sinhala)"
                        body={song_name_sinhala_template}
                        style={{ width: "15%" }}
                      />
                      <Column
                        field="songTitleSinglish"
                        header="Song Title (Singlish)"
                        body={song_name_singlish_template}
                        style={{ width: "15%" }}
                      />
                      <Column
                        field="songType"
                        header="Song Type"
                        body={song_type_template}
                        style={{ width: "10%" }}
                      />
                      <Column
                        field="artists"
                        header="Artists"
                        body={artists_template}
                        style={{ width: "18%" }}
                      />
                      <Column
                        field="categories"
                        header="Categories"
                        body={categories_template}
                        style={{ width: "18%" }}
                      />
                      <Column
                        field="likes"
                        header="Likes"
                        body={song_likes_template}
                        style={{ width: "7%" }}
                      />
                      <Column
                        field="action"
                        header="Action"
                        body={delete_edit_view_btns_template}
                        style={{ width: "15%" }}
                      />
                    </DataTable>
                  </div>
                </div>
                <div className="center">
                  <div className="miniCard">
                    {isUpdateSong === true ? (
                      <div className="center">
                        <div className="center">
                          <SubTopicContainer>Update Song</SubTopicContainer>
                        </div>
                      </div>
                    ) : (
                      <div className="center">
                        <div className="center">
                          <SubTopicContainer>Add Song</SubTopicContainer>
                        </div>
                      </div>
                    )}
                    <div className="form-group center oppositedirection">
                      <InputContainer
                        type="text"
                        className="form-control"
                        id="title_name_sinhala"
                        name="title_name_sinhala"
                        placeholder="Title Name (Sinhala)"
                        value={sinhalaTitle}
                        onChange={(e) => setSinhalaTitle(e.target.value)}
                      ></InputContainer>
                      {song_error && song_error.data.sinhalaTitle && (
                        <Message
                          severity="error"
                          style={MessageContainer}
                          text={song_error.data.sinhalaTitle.message}
                        />
                      )}
                    </div>
                    <div className="form-group center oppositedirection">
                      <InputContainer
                        type="text"
                        className="form-control"
                        id="title_name_singlish"
                        name="title_name_singlish"
                        placeholder="Title Name (Singlish)"
                        value={singlishTitle}
                        onChange={(e) => setSinglishTitle(e.target.value)}
                      ></InputContainer>
                      {song_error && song_error.data.singlishTitle && (
                        <Message
                          severity="error"
                          style={MessageContainer}
                          text={song_error.data.singlishTitle.message}
                        />
                      )}
                    </div>
                    <div className="form-group center oppositedirection">
                      <div>
                        <div className="p-col-12">
                          <RadioButton
                            inputId="rb1"
                            name="type"
                            value="Solo"
                            onChange={(e) => setSongType(e.value)}
                            checked={songType === "Solo"}
                            style={{
                              margin: "0.2rem",
                            }}
                          />
                          <LongLabelContainer
                            htmlFor="rb1"
                            className="p-radiobutton-label"
                          >
                            Solo
                          </LongLabelContainer>
                        </div>
                        <div className="p-col-12">
                          <RadioButton
                            inputId="rb2"
                            name="type"
                            value="Duet"
                            onChange={(e) => setSongType(e.value)}
                            checked={songType === "Duet"}
                            style={{
                              margin: "0.2rem",
                            }}
                          />
                          <LongLabelContainer
                            htmlFor="rb2"
                            className="p-radiobutton-label"
                          >
                            Duet
                          </LongLabelContainer>
                        </div>
                        <div className="p-col-12">
                          <RadioButton
                            inputId="rb3"
                            name="type"
                            value="Group"
                            onChange={(e) => setSongType(e.value)}
                            checked={songType === "Group"}
                            style={{
                              marginLeft: "0.2rem",
                            }}
                          />
                          <LongLabelContainer
                            htmlFor="rb3"
                            className="p-radiobutton-label"
                          >
                            Group
                          </LongLabelContainer>
                        </div>
                      </div>
                      {song_error && song_error.data.type && (
                        <Message
                          severity="error"
                          style={MessageContainer}
                          text={song_error.data.type.message}
                        />
                      )}
                    </div>
                    <div className="form-group center oppositedirection">
                      <MultiSelect
                        className="dropdown"
                        value={artistId}
                        options={artist_dropdown}
                        onChange={(e) => setArtistId(e.value)}
                        style={MultiSelectContainer}
                        filter={true}
                        filterPlaceholder="Search"
                        placeholder="Choose Artists"
                      />
                    </div>
                    <div className="form-group center oppositedirection">
                      <MultiSelect
                        className="dropdown"
                        value={category}
                        options={category_dropdown}
                        onChange={(e) => setCategory(e.value)}
                        style={MultiSelectContainer}
                        filter={true}
                        filterPlaceholder="Search"
                        placeholder="Choose Categories"
                      />
                    </div>
                    <div className="center oppositedirection">
                      <div className="form-group">
                        <TextAreaContainer
                          rows="5"
                          className="form-control"
                          id="song_body"
                          name="song_body"
                          placeholder="Song"
                          value={song}
                          onChange={(e) => setSong(e.target.value)}
                        ></TextAreaContainer>
                      </div>
                      {song_error && song_error.data.song && (
                        <Message
                          severity="error"
                          style={MessageContainer}
                          text={song_error.data.song.message}
                        />
                      )}
                    </div>
                    <div className="form-group center oppositedirection">
                      <Spinner
                        value={likes}
                        size={30}
                        onChange={(e) => setLikes(e.value)}
                      />
                    </div>
                    <div className="center oppositedirection">
                      <InputContainer type="file" id="myFile" />
                      <AudioContainer controls id="myAudio"></AudioContainer>
                      {song_error && song_error.data.audio && (
                        <div className="center">
                          <Message
                            severity="error"
                            style={MessageContainer}
                            text={song_error.data.audio.message}
                          />
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setAudioAvailability(false)}
                            style={IgnoreButtonContainer}
                          >
                            Ignore
                          </button>
                        </div>
                      )}
                    </div>
                    {isUpdateSong === true ? (
                      <div className="center">
                        <SubButtonContainer onClick={updateSong}>
                          Update
                        </SubButtonContainer>
                        <SubButtonContainer onClick={refresh}>
                          Cancel
                        </SubButtonContainer>
                      </div>
                    ) : (
                      <div className="center oppositedirection">
                        <SubButtonContainer onClick={addSong}>
                          Add
                        </SubButtonContainer>
                        {message && (
                          <div class="alert alert-success message" role="alert">
                            <button
                              type="button"
                              className="close"
                              data-dismiss="alert"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                            <strong>Success!</strong> {message}
                          </div>
                        )}
                        {song_loading && (
                          <div className="center">
                            <SpinnerContainer className="spinner-border"></SpinnerContainer>
                          </div>
                        )}
                        {typeof song_error === "undefined" ? (
                          <Message
                            severity="error"
                            style={MessageContainer}
                            text="Server is not running this time"
                          />
                        ) : (
                          <div></div>
                        )}
                      </div>
                    )}
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

export default Songs;
