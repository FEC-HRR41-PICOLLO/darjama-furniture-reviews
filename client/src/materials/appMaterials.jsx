import Rotate from '../sectionBox.jsx'
import styled, {keyframes} from 'styled-components'
import Materials from './materials.jsx'

class AppMaterials extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isStarted: false
    };
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleOpen() {
    this.setState({
      isStarted: true,
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const MaterialsParentDiv = styled.div`
      display: block;
      width: 100%;
      min-height: 70px;
      vertical-align: center;
      border-top: 1px solid grey;

      :hover {
        background-color: ${props => this.state.isOpen ? "white" : "rgb(230, 240, 255)"};
      }`;
      const fadeIn = keyframes`
      from {
        transform: translate(0px,-20px);
        opacity: 0;
      }

      to {
        transform: translate(0px, 0px);
        opacity: 1;
      }
    `;

      const FadeInDiv = styled.div`
      animation: ${props => this.state.isStarted ? (this.state.isOpen ? fadeIn : "") : "" } .75s;
      animation-fill-mode: forwards;
      animation-direction: alternate;
    `;


    return(
      <div>
        <MaterialsParentDiv>
        <h5 onClick={this.toggleOpen}><Rotate isOpen={this.state.isOpen} isStarted={this.state.isStarted} >+</Rotate> Environment and Materials</h5>
        <FadeInDiv>
        {this.state.isStarted ? (this.state.isOpen ? <Materials /> : "") : "" }
    </FadeInDiv></MaterialsParentDiv>
      </div>
    )
  }
}

export default AppMaterials