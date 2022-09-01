import '../styles/Banner.css';
import logoblack from '../assets/logoblack.png';

function Banner() {
  return (
    <div className="gpm-banner">
        <img src={logoblack} alt="logo" className="gpm-banner-logo"/>
      <p>Le réseau social de l'entreprise</p>
    </div>
  );
}

export default Banner;