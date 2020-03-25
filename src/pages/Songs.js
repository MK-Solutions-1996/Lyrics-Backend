import React, { useState, useEffect } from "react";
import { NavigationBar } from "../components/NavigationBar";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { RadioButton } from "primereact/radiobutton";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Message } from "primereact/message";
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
  MessageContainer
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

function Songs() {
  const [isUpdateSong, setIsUpdateSong] = useState(false);

  const [songId, setSongId] = useState("");
  const [sinhalaTitle, setSinhalaTitle] = useState("");
  const [singlishTitle, setSinglishTitle] = useState("");
  const [songType, setSongType] = useState("");
  const [artistId, setArtistId] = useState([]);
  const [artistName, setArtistName] = useState([]);
  const [category, setCategory] = useState([]);
  const [song, setSong] = useState("");

  const song_state = useSelector(state => state.song);
  const artist_state = useSelector(state => state.artist);
  const category_state = useSelector(state => state.category);
  const dispatch = useDispatch();
  const { loading, songs, message, song_error } = song_state;
  const { artists, artist_error } = artist_state;
  const { categories, category_error } = category_state;

  const artists_fetch_and_set_func = artistId => {
    console.log("ArtistId:", artistId);
    setArtistId(artistId);
    const artistNameArr = [];
    artists.map(artist => {
      artistId.forEach(id => {
        if (artist._id === id) {
          artistNameArr.push(artist.singlishName);
        }
      });
    });
    setArtistName(artistNameArr);
  };

  const payload = {
    sinhalaTitle: sinhalaTitle,
    singlishTitle: singlishTitle,
    type: songType,
    artistId: artistId,
    artistName: artistName,
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

  const refresh = () => {
    setIsUpdateSong(false);
    setSongId("");
    setSinhalaTitle("");
    setSinglishTitle("");
    setSongType("");
    setArtistId([]);
    setArtistName([]);
    setCategory([]);
    setSong("");
  };

  const updateSong = () => {
    dispatch(update_song_action(songId, payload));
    refresh();
  };

  const addSong = () => {
    dispatch(save_song_action(payload));
    refresh();
  };

  const updateSongTemplate = song => {
    artists_fetch_and_set_func(song.artistId);
    setIsUpdateSong(true);
    setSongId(song._id);
    setSinhalaTitle(song.sinhalaTitle);
    setSinglishTitle(song.singlishTitle);
    setSongType(song.type);
    setArtistName(song.artistName);
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
      <div className="center tableBody oppositedirection">
        {rowData.artistName.map(name => (
          <SpanContainer>{name}</SpanContainer>
        ))}
      </div>
    );
  };

  const categories_template = rowData => {
    return (
      <div className="center tableBody oppositedirection">
        {rowData.categories.map(category => (
          <SpanContainer>{category}</SpanContainer>
        ))}
      </div>
    );
  };

  const delete_edit_view_btns_template = rowData => {
    return (
      <div className="center direction">
        <ViewIconContainer className="fas fa-eye" />
        <EditIconContainer
          className="fas fa-edit"
          onClick={() => updateSongTemplate(rowData)}
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
              <RefreshIconContainer
                onClick={() => dispatch(get_all_songs_action())}
                className="fas fa-sync-alt"
              ></RefreshIconContainer>
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
                <div className="form-group center oppositedirection">
                  <InputContainer
                    type="text"
                    className="form-control"
                    id="title_name_sinhala"
                    name="title_name_sinhala"
                    placeholder="Title Name (Sinhala)"
                    value={sinhalaTitle}
                    onChange={e => setSinhalaTitle(e.target.value)}
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
                    onChange={e => setSinglishTitle(e.target.value)}
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
                        onChange={e => setSongType(e.value)}
                        checked={songType === "Solo"}
                        style={{
                          margin: "0.2rem"
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
                        onChange={e => setSongType(e.value)}
                        checked={songType === "Duet"}
                        style={{
                          margin: "0.2rem"
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
                        onChange={e => setSongType(e.value)}
                        checked={songType === "Group"}
                        style={{
                          marginLeft: "0.2rem"
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
                    onChange={e => artists_fetch_and_set_func(e.value)}
                    style={MultiSelectContainer}
                    filter={true}
                    filterPlaceholder="Search"
                    placeholder="Choose Artists"
                  />
                  {artist_error && artist_error.data.artistId && (
                    <Message
                      severity="error"
                      style={MessageContainer}
                      text={artist_error.data.artistId.message}
                    />
                  )}
                </div>
                <div className="form-group center oppositedirection">
                  <MultiSelect
                    className="dropdown"
                    value={category}
                    options={category_dropdown}
                    onChange={e => setCategory(e.value)}
                    style={MultiSelectContainer}
                    filter={true}
                    filterPlaceholder="Search"
                    placeholder="Choose Categories"
                  />
                  {category_error && category_error.data.category && (
                    <Message
                      severity="error"
                      style={MessageContainer}
                      text={category_error.data.category.message}
                    />
                  )}
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
                      onChange={e => setSong(e.target.value)}
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
                  <div className="center">
                    <SubButtonContainer onClick={addSong}>
                      Add
                    </SubButtonContainer>
                  </div>
                )}
                {message && (
                  <Message
                    severity="success"
                    style={MessageContainer}
                    text={message}
                  />
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
