import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavigationBar } from "../../components/NavigationBar";
import {
  TopicContainer,
  ButtonContainer,
  DeleteIconButtonContainer,
  EditIconButtonContainer,
  ViewIconButtonContainer
} from "../../components/Customs";

function ViewSongs() {
  //sample data
  const [songs] = useState([
    {
      sinhalaTitle: "සංසාර සිහිනේ",
      singlishTitle: "Sansara Sihine",
      artistId: "50",
      categories: ["Sinhala", "Love"],
      song:
        "සංසාර සිහිනේ පෙර මග මා සිටියා කවදාද නුඹ එන්නේ ආදර දේදුන්නේ අඩවන් නෙතු විහිදා මා නුඹේ කුමරා සංසාර සිහිනයේ මා නුඹේ කුමරා මා නුඹේ කුමරා පියමැන එන්න මේ සිහිනේ සිරකාරිය වන්න තුරුලට එන්න පවසන් නුඹ මගෙමයි කියා කුමරී පියමැන එන්න මගේ සිහිනේ සිරකාරිය වන්න තුරුලට එන්න පවසන් නුඹ මගෙමයි කියා සංසාර සිහිනයේ මා නුඹේ කුමරා මා නුඹේ කුමරා මා නුඹේ කුමරා මා නුඹේ කුමරා සිහින දකින්න මේ සිහිනේ හිමිකාරිය වන්න දිවියට එන්න පවසන් නුඹ මගෙමයි කියා කුමරී සිහින දකින්න මගේ සිහිනේ හිමිකාරිය වන්න දිවියට එන්න පවසන් නුඹ මගෙමයි කියා සංසාර සිහිනයේ මා නුඹේ කුමරා සංසාර සිහිනේ පෙර මග මා සිටියා කවදාද නුඹ එන්නේ ආදර දේදුන්නේ අඩවන් නෙතු විහිදා මා නුඹේ කුමරා සංසාර සිහිනයේ මා නුඹේ කුමරා මා නුඹේ කුමරා මා නුඹේ කුමරා මා නුඹේ කුමරා",
      likes: 200
    },
    {
      sinhalaTitle: "සංසාර සිහිනේ",
      singlishTitle: "Sansara Sihine",
      artistId: "50",
      categories: ["Sinhala", "Love"],
      song:
        "සංසාර සිහිනේ පෙර මග මා සිටියා කවදාද නුඹ එන්නේ ආදර දේදුන්නේ අඩවන් නෙතු විහිදා මා නුඹේ කුමරා සංසාර සිහිනයේ මා නුඹේ කුමරා මා නුඹේ කුමරා පියමැන එන්න මේ සිහිනේ සිරකාරිය වන්න තුරුලට එන්න පවසන් නුඹ මගෙමයි කියා කුමරී පියමැන එන්න මගේ සිහිනේ සිරකාරිය වන්න තුරුලට එන්න පවසන් නුඹ මගෙමයි කියා සංසාර සිහිනයේ මා නුඹේ කුමරා මා නුඹේ කුමරා මා නුඹේ කුමරා මා නුඹේ කුමරා සිහින දකින්න මේ සිහිනේ හිමිකාරිය වන්න දිවියට එන්න පවසන් නුඹ මගෙමයි කියා කුමරී සිහින දකින්න මගේ සිහිනේ හිමිකාරිය වන්න දිවියට එන්න පවසන් නුඹ මගෙමයි කියා සංසාර සිහිනයේ මා නුඹේ කුමරා සංසාර සිහිනේ පෙර මග මා සිටියා කවදාද නුඹ එන්නේ ආදර දේදුන්නේ අඩවන් නෙතු විහිදා මා නුඹේ කුමරා සංසාර සිහිනයේ මා නුඹේ කුමරා මා නුඹේ කුමරා මා නුඹේ කුමරා මා නුඹේ කුමරා",
      likes: 200
    },
    {
      sinhalaTitle: "සංසාර සිහිනේ",
      singlishTitle: "Sansara Sihine",
      artistId: "50",
      categories: ["Sinhala", "Love"],
      song:
        "සංසාර සිහිනේ පෙර මග මා සිටියා කවදාද නුඹ එන්නේ ආදර දේදුන්නේ අඩවන් නෙතු විහිදා මා නුඹේ කුමරා සංසාර සිහිනයේ මා නුඹේ කුමරා මා නුඹේ කුමරා පියමැන එන්න මේ සිහිනේ සිරකාරිය වන්න තුරුලට එන්න පවසන් නුඹ මගෙමයි කියා කුමරී පියමැන එන්න මගේ සිහිනේ සිරකාරිය වන්න තුරුලට එන්න පවසන් නුඹ මගෙමයි කියා සංසාර සිහිනයේ මා නුඹේ කුමරා මා නුඹේ කුමරා මා නුඹේ කුමරා මා නුඹේ කුමරා සිහින දකින්න මේ සිහිනේ හිමිකාරිය වන්න දිවියට එන්න පවසන් නුඹ මගෙමයි කියා කුමරී සිහින දකින්න මගේ සිහිනේ හිමිකාරිය වන්න දිවියට එන්න පවසන් නුඹ මගෙමයි කියා සංසාර සිහිනයේ මා නුඹේ කුමරා සංසාර සිහිනේ පෙර මග මා සිටියා කවදාද නුඹ එන්නේ ආදර දේදුන්නේ අඩවන් නෙතු විහිදා මා නුඹේ කුමරා සංසාර සිහිනයේ මා නුඹේ කුමරා මා නුඹේ කුමරා මා නුඹේ කුමරා මා නුඹේ කුමරා",
      likes: 200
    }
  ]);
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
              <Link to="/addSong">
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

export default ViewSongs;
