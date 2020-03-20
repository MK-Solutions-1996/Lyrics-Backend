import styled from "styled-components";

export const ButtonContainer = styled.button`
  text-transform: capitalize;
  font-size: 1.4rem;
  font-weight: bold;
  background: transparent;
  border: 0.05rem solid var(--mainBlack); /*From App.css*/
  border-color: var(--mainBlack);
  border-radius: 0.5rem;
  color: var(--mainBlack) !important;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  margin: 0.2rem 0.5rem 0.2rem 0;
  transition: all 0.5s ease-in-out;
  &:hover {
    background: var(--mainBlack) !important;
    color: var(--mainRed) !important;
  }
  &:focus {
    outline: none;
  }
`;

export const TopicContainer = styled.label`
  text-align: center;
  font-size: 2.1rem;
  font-weight: bolder;
  color: var(--mainBlack);
  margin: 0.5rem;
`;

export const InputContainer = styled.input`
  width: 20vw;
  margin: 0.3rem;
  padding: 0.2rem;
  height: 2rem;
  border-radius: 0.3rem;
`;

export const LongLabelContainer = styled.label`
  font-size: 1rem;
  margin: 0.1rem;
  padding: 0.1rem;
  height: auto;
  width: auto;
  color: var(--mainBlack);
`;

export const TextAreaContainer = styled.textarea`
  font-size: 1rem;
  height: auto;
  width: 20vw;
  margin: 0.1rem;
  padding: 0.1rem;
  color: var(--mainBlack);
`;
