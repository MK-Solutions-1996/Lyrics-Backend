import React, { useState, useEffect } from "react";
import { NavigationBar } from "../components/NavigationBar";
import {
  TopicContainer,
  SubTopicContainer,
  InputContainer,
  SubButtonContainer,
  DeleteIconButtonContainer,
  EditIconButtonContainer,
  ImageContainer
} from "../components/Customs";
import { default_image_icon } from "../constants/imports";
import { useSelector, useDispatch } from "react-redux";
import {
  get_all_artists_action,
  save_artist_action,
  delete_artist_action,
  update_artist_action
} from "../redux";

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
  };

  const artist_state = useSelector(state => state.artist);
  const dispatch = useDispatch();
  const { loading, artists, error } = artist_state;

  useEffect(() => {
    dispatch(get_all_artists_action());
  }, []);

  const payload = {
    sinhalaName: sinhalaName,
    singlishName: singlishName,
    period: period
  };

  //artist image preview function
  const fileChangedHandler = event => {
    setSelectedFile(event.target.files[0]);
    let reader = new FileReader();

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };

    reader.readAsDataURL(event.target.files[0]);
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
                <table className="table table-hover table-dark">
                  <thead>
                    <tr className="thead-dark">
                      <th align="center">Artist Name (Sinhala)</th>
                      <th align="center">Artist Name (Singlish)</th>
                      <th align="center">Period</th>
                      <th align="center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {artists.map(i => (
                      <tr className="table-light text-dark">
                        <td>{i.sinhalaName}</td>
                        <td>{i.singlishName}</td>
                        <td>{i.period}</td>
                        <td className="direction center">
                          <EditIconButtonContainer
                            onClick={() => updateArtist(i)}
                          >
                            <i className="fas fa-edit"></i>
                          </EditIconButtonContainer>
                          <DeleteIconButtonContainer
                            onClick={() =>
                              dispatch(delete_artist_action(i._id))
                            }
                          >
                            <i className="fas fa-trash"></i>
                          </DeleteIconButtonContainer>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                <div className="form-group center">
                  <InputContainer
                    type="text"
                    className="form-control"
                    id="period"
                    name="period"
                    placeholder="Period"
                    value={period}
                    onChange={e => setPeriod(e.target.value)}
                  ></InputContainer>
                </div>
                {isUpdateArtist === true ? (
                  <div className="center">
                    <SubButtonContainer
                      onClick={() =>
                        dispatch(update_artist_action(artistId, payload))
                      }
                    >
                      Update
                    </SubButtonContainer>
                  </div>
                ) : (
                  <div className="center">
                    <SubButtonContainer
                      onClick={() => dispatch(save_artist_action(payload))}
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
