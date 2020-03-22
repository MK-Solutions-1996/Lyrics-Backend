import React, { useState } from "react";
import { NavigationBar } from "../components/NavigationBar";
import {
  TopicContainer,
  SubTopicContainer,
  InputContainer,
  SubButtonContainer,
  DeleteIconButtonContainer,
  EditIconButtonContainer
} from "../components/Customs";

function Artists() {
  const [artists] = useState([
    { sinhalaName: "සනුක", singlisName: "Sanuka", period: "21" },
    { sinhalaName: "උමාරියා", singlisName: "Umaria", period: "21" },
    { sinhalaName: "ලහිරු", singlisName: "Lahiru", period: "21" }
  ]);
  const [sinhalaName, setSinhalaName] = useState("");
  const [singlisName, setSinglisName] = useState("");
  const [period, setPeriod] = useState("");
  const [isUpdateArtist, setIsUpdateArtist] = useState(false);
  const updateArtist = artist => {
    setIsUpdateArtist(true);
    setSinhalaName(artist.sinhalaName);
    setSinglisName(artist.singlisName);
    setPeriod(artist.period);
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
                        <td>{i.singlisName}</td>
                        <td>{i.period}</td>
                        <td className="direction center">
                          <EditIconButtonContainer
                            onClick={() => updateArtist(i)}
                          >
                            <i class="fas fa-edit"></i>
                          </EditIconButtonContainer>
                          <DeleteIconButtonContainer>
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
                    value={singlisName}
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
                    <SubButtonContainer>Update</SubButtonContainer>
                    {console.log(
                      "Data:",
                      sinhalaName,
                      "",
                      singlisName,
                      "",
                      period
                    )}
                  </div>
                ) : (
                  <div className="center">
                    <SubButtonContainer>Add</SubButtonContainer>
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
