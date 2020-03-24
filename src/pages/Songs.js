import React, { useState, useEffect } from "react";
import { NavigationBar } from "../components/NavigationBar";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import {
  TopicContainer,
  SubTopicContainer,
  InputContainer,
  TextAreaContainer,
  SubButtonContainer,
  DeleteIconContainer,
  EditIconContainer,
  ViewIconContainer,
  SpanContainer
} from "../components/Customs";

import { useSelector, useDispatch } from "react-redux";
import {
  get_all_songs_action,
  save_song_action,
  update_song_action,
  delete_song_action,
  get_all_artists_action,
  get_all_categories_action
} from "../redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function Songs() {
  const [isUpdateSong, setIsUpdateSong] = useState(false);

  const [songId, setSongId] = useState("");
  const [sinhalaTitle, setSinhalaTitle] = useState("");
  const [singlishTitle, setSinglishTitle] = useState("");
  const [artistId, setArtistId] = useState("");
  const [category, setCategory] = useState([]);
  const [song, setSong] = useState("");

  const song_state = useSelector(state => state.song);
  const artist_state = useSelector(state => state.artist);
  const category_state = useSelector(state => state.category);
  const dispatch = useDispatch();
  const { songs } = song_state;
  const { artists } = artist_state;
  const { categories } = category_state;

  const payload = {
    sinhalaTitle: sinhalaTitle,
    singlishTitle: singlishTitle,
    artistId: artistId,
    categories: category,
    song: song
  };

  useEffect(() => {
    dispatch(get_all_artists_action());
    dispatch(get_all_categories_action());
    dispatch(get_all_songs_action());
  }, []);

  const artist_dropdown = [];
  artists.map(data => {
    const object = { label: data.singlishName, value: data._id };
    artist_dropdown.push(object);
  });

  const category_dropdown = [];
  categories.map(data => {
    const object = { label: data.name, value: data.name };
    category_dropdown.push(object);
  });

  const updateSong = song => {
    setIsUpdateSong(true);
    setSongId(song._id);
    setSinhalaTitle(song.sinhalaTitle);
    setSinglishTitle(song.singlishTitle);
    setCategory(song.categories);
    setSong(song.song);
  };

  console.log("payload:", payload);

  const song_name_sinhala_template = rowData => {
    return (
      <div className="center tableBody">
        <SpanContainer>{rowData.sinhalaTitle}</SpanContainer>
      </div>
    );
  };

  const song_name_singlish_template = rowData => {
    return (
      <div className="center tableBody">
        <SpanContainer>{rowData.singlishTitle}</SpanContainer>
      </div>
    );
  };

  const artists_template = rowData => {
    return (
      <div className="center tableBody">
        <SpanContainer>{rowData.artistId}</SpanContainer>
      </div>
    );
  };

  const categories_template = rowData => {
    return (
      <div className="center tableBody">
        <SpanContainer>{rowData.categories}</SpanContainer>
      </div>
    );
  };

  const delete_edit_view_btns_template = rowData => {
    return (
      <div className="center direction">
        <ViewIconContainer class="fas fa-eye" />
        <EditIconContainer
          className="fas fa-edit"
          onClick={() => updateSong(rowData)}
        />
        <DeleteIconContainer
          className="fas fa-trash"
          onClick={() => dispatch(delete_song_action(rowData._id))}
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
                <TopicContainer>Songs</TopicContainer>
              </div>
              <div className="songsTable">
                <DataTable
                  value={songs}
                  responsive
                  paginator={true}
                  rows={10}
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
                  />
                  <Column
                    field="songTitleSinglish"
                    header="Song Title (Singlish)"
                    body={song_name_singlish_template}
                  />
                  <Column
                    field="artists"
                    header="Artists"
                    body={artists_template}
                  />
                  <Column
                    field="categories"
                    header="Categories"
                    body={categories_template}
                  />
                  <Column
                    field="action"
                    header="Action"
                    body={delete_edit_view_btns_template}
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
                <div className="form-group center">
                  <InputContainer
                    type="text"
                    className="form-control"
                    id="title_name_sinhala"
                    name="title_name_sinhala"
                    placeholder="Title Name (Sinhala)"
                    value={sinhalaTitle}
                    onChange={e => setSinhalaTitle(e.target.value)}
                  ></InputContainer>
                </div>
                <div className="form-group center">
                  <InputContainer
                    type="text"
                    className="form-control"
                    id="title_name_singlish"
                    name="title_name_singlish"
                    placeholder="Title Name (Singlish)"
                    value={singlishTitle}
                    onChange={e => setSinglishTitle(e.target.value)}
                  ></InputContainer>
                </div>
                <div className="form-group center">
                  <Dropdown
                    className="dropdown"
                    value={artistId}
                    options={artist_dropdown}
                    ariaLabel="Test"
                    onChange={e => setArtistId(e.value)}
                    placeholder="Choose Artist Id"
                    optionLabel="label"
                    style={{
                      width: "20vw",
                      height: "2rem",
                      borderRadius: "0.4rem",
                      margin: "0.3rem"
                    }}
                    filter={true}
                    filterPlaceholder="Search"
                  />
                </div>
                <div className="form-group center">
                  <MultiSelect
                    className="dropdown"
                    value={category}
                    options={category_dropdown}
                    onChange={e => setCategory(e.value)}
                    style={{
                      width: "20vw",
                      height: "2rem",
                      borderRadius: "0.4rem",
                      margin: "0.3rem"
                    }}
                    filter={true}
                    filterPlaceholder="Search"
                    placeholder="Choose Categories"
                  />
                </div>
                <div className="center">
                  <div className="form-group">
                    <TextAreaContainer
                      rows="5"
                      className="form-control"
                      id="song_body"
                      name="song_body"
                      placeholder="Song"
                      value={song}
                      onChange={e => setSong(e.target.value)}
                    ></TextAreaContainer>
                  </div>
                </div>
                {isUpdateSong === true ? (
                  <div className="center">
                    <SubButtonContainer
                      onClick={() =>
                        dispatch(update_song_action(songId, payload))
                      }
                    >
                      Update
                    </SubButtonContainer>
                  </div>
                ) : (
                  <div className="center">
                    <SubButtonContainer
                      onClick={() => dispatch(save_song_action(payload))}
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

export default Songs;
