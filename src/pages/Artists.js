import React, { useState, useEffect } from "react";
import { NavigationBar } from "../components/NavigationBar";
import {
  TopicContainer,
  SubTopicContainer,
  InputContainer,
  SubButtonContainer,
  DeleteIconButtonContainer,
  EditIconButtonContainer
} from "../components/Customs";

import { useSelector, useDispatch } from "react-redux";
import {
  get_all_artists_action,
  save_artist_action,
  delete_artist_action,
  update_artist_action
} from "../redux";

function Artists() {
  // const [artists] = useState([
  //   { sinhalaName: "සනුක", singlishName: "Sanuka", period: "21" },
  //   { sinhalaName: "උමාරියා", singlishName: "Umaria", period: "21" },
  //   { sinhalaName: "ලහිරු", singlishName: "Lahiru", period: "21" }
  // ]);

  const [artistId, setArtistId] = useState("");
  const [sinhalaName, setSinhalaName] = useState("");
  const [singlishName, setSinglisName] = useState("");
  const [period, setPeriod] = useState("");
  const [isUpdateArtist, setIsUpdateArtist] = useState(false);
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

  return (
    <div className="background">
      <NavigationBar />
      <div className="center">
        <div className="card">
          <div>
            <div className="center">
              <TopicContainer>View All Artists</TopicContainer>
            </div>
            <div className="direction">
              <div className="my-custom-scrollbar3">
                <table class="table table-hover table-dark">
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
                            <i class="fas fa-edit"></i>
                          </EditIconButtonContainer>
                          <DeleteIconButtonContainer
                            onClick={() =>
                              dispatch(delete_artist_action(i._id))
                            }
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
                  <SubTopicContainer>Add Artist</SubTopicContainer>
                </div>
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
