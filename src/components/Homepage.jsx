import { Link } from 'react-router-dom';
import screenshot from '../imgs/dashboardScreenshot.png'

const Homepage = () => {
  return (
    <>
      <div className="heroContainer">
        <div className="container">
          <div className="row">
            <div className="col welcomeContainer">
              <h2>We Combine Accurate Weather Forecasts With Awesome Music</h2>
              <p>
                Tadpole was created for those who love to match their daily
                music listening to the weather outside. Whether you want to go
                out and celebrate or stay in bed all day, we've got you covered.
              </p>
              <div className="welcomeButtons">
                <Link to="/register" className="btn2">CREATE AN ACCOUNT</Link>

                <img src={screenshot} alt="screenshot of the tadpole dashboard" className="hiddenScreenshot"/>

              </div>
            </div>
            <div className="col screenshotContainer">
              <img src={screenshot} alt="screenshot of the tadpole dashboard" className="screenshot"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
