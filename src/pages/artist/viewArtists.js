import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavigationBar } from "../../components/NavigationBar";
import {
  TopicContainer,
  ButtonContainer,
  DeleteIconButtonContainer,
  EditIconButtonContainer
} from "../../components/Customs";

function ViewArtists() {
  const [artists] = useState([
    { sinhalaName: "සනුක", singlisName: "Sanuka", period: 21 },
    { sinhalaName: "උමාරියා", singlisName: "Umaria", period: 21 },
    { sinhalaName: "ලහිරු", singlisName: "Lahiru", period: 21 }
  ]);
  return (
    <div className="background">
      <NavigationBar />
      <div className="center">
        <div className="card">
          <div className="center">
            <TopicContainer>View All Artists</TopicContainer>
          </div>
          <div className="direction">
            <div className="my-custom-scrollbar">
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
                        <EditIconButtonContainer>
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
            <div className="center">
              <Link to="/addArtist">
                <ButtonContainer>
                  <i class="fas fa-plus">New</i>
                </ButtonContainer>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewArtists;
