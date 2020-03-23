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
  DeleteIconButtonContainer,
  EditIconButtonContainer,
  ViewIconButtonContainer
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
  //sample data
  // const [songs] = useState([
  //   {
  //     sinhalaTitle: "සංසාර සිහිනේ",
  //     singlishTitle: "Sansara Sihine",
  //     artistId: "50",
  //     categories: ["Sinhala", "Love"],
  //     song:
  //       "සංසාර සිහිනේ පෙර මග මා සිටියා කවදාද නුඹ එන්නේ ආදර දේදුන්නේ අඩවන් නෙතු විහිදා මා නුඹේ කුමරා සංසාර සිහිනයේ මා නුඹේ කුමරා මා නුඹේ කුමරා පියමැන එන්න මේ සිහිනේ සිරකාරිය වන්න තුරුලට එන්න පවසන් නුඹ මගෙමයි කියා කුමරී පියමැන එන්න මගේ සිහිනේ සිරකාරිය වන්න තුරුලට එන්න පවසන් නුඹ මගෙමයි කියා සංසාර සිහිනයේ මා නුඹේ කුමරා මා නුඹේ කුමරා මා නුඹේ කුමරා මා නුඹේ කුමරා සිහින දකින්න මේ සිහිනේ හිමිකාරිය වන්න දිවියට එන්න පවසන් නුඹ මගෙමයි කියා කුමරී සිහින දකින්න මගේ සිහිනේ හිමිකාරිය වන්න දිවියට එන්න පවසන් නුඹ මගෙමයි කියා සංසාර සිහිනයේ මා නුඹේ කුමරා සංසාර සිහිනේ පෙර මග මා සිටියා කවදාද නුඹ එන්නේ ආදර දේදුන්නේ අඩවන් නෙතු විහිදා මා නුඹේ කුමරා සංසාර සිහිනයේ මා නුඹේ කුමරා මා නුඹේ කුමරා මා නුඹේ කුමරා මා නුඹේ කුමරා",
  //     likes: 200
  //   }
  // ]);

  //sample data
  // const [artists] = useState([
  //   { label: "50", value: "50", id: "123" },
  //   { label: "51", value: "51", id: "113" }
  // ]);
  // const [categories] = useState([
  //   { label: "Sinhala", value: "Sinhala" },
  //   { label: "Love", value: "Love" }
  // ]);

  const [isUpdateSong, setIsUpdateSong] = useState(false);

  const [songId, setSongId] = useState("");
  const [sinhalaTitle, setSinhalaTitle] = useState("");
  const [singlishTitle, setSinglishTitle] = useState("");
  const [artistId, setArtistId] = useState("");
  const [category, setCategory] = useState([]);
  const [song, setSong] = useState("");
  //const [likes, setLikes] = useState(0);



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
    song: song,
    //likes: likes
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

  console.log('artist:', artistId);

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

    // const artist_id = song.artistId;
    // let artistName = '';
    // artists.map(data => {
    //   if (data._id === artist_id) {
    //     artistName = data.singlishName;
    //   }
    // });

    //setArtistId(artistName);
    setCategory(song.categories);
    setSong(song.song);
    //setLikes(song.likes);
  };



  console.log('payload:', payload);


  return (
    <div className="background">
      <NavigationBar />
      <div className="center">
        <div className="card">
          <div className="center">
            <TopicContainer>View All Songs</TopicContainer>
          </div>
          <div className="direction">
            <div className="my-custom-scrollbar">
              <table class="table table-hover table-dark">
                <thead>
                  <tr className="thead-dark">
                    <th align="center">Song Title (Sinhala)</th>
                    <th align="center">Song Title (Singlish)</th>
                    <th align="center">Artist Id</th>
                    <th align="center">Categories</th>
                    <th align="center">Likes</th>
                    <th align="center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {songs.map(i => (
                    <tr className="table-light text-dark">
                      <td>{i.sinhalaTitle}</td>
                      <td>{i.singlishTitle}</td>
                      <td>{i.artistId}</td>
                      <td>{i.categories}</td>
                      <td>{i.likes}</td>
                      <td className="direction center">
                        <ViewIconButtonContainer>
                          <i class="fas fa-eye"></i>
                        </ViewIconButtonContainer>
                        <EditIconButtonContainer onClick={() => updateSong(i)}>
                          <i class="fas fa-edit"></i>
                        </EditIconButtonContainer>
                        <DeleteIconButtonContainer
                          onClick={() => dispatch(delete_song_action(i._id))}
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
                <SubTopicContainer>Add Song</SubTopicContainer>
              </div>
              <div className="direction">
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
              </div>
              <div className="direction">
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
                  {/* <select value={artistId}
                    onChange={(e) => setArtistId({ artistId: e.target.value })}>
                    {artists.map((data) => <option key={data._id} value={data._id}>{data.sinhalaName}</option>)}
                  </select> */}


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
              </div>
              {/* <div className="form-group center">
                <InputContainer
                  type="number"
                  className="form-control"
                  id="no_of_likes"
                  name="no_of_likes"
                  placeholder="No of Likes"
                  value={likes}
                  onChange={e => setLikes(e.target.value)}
                ></InputContainer>
              </div> */}
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
  );
}

export default Songs;
