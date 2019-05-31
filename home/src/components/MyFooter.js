import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPage = () => {
  return (
    <MDBFooter color="blue" className="font-small pt-4 mt-4" style={{flex:1,flexDirection: 'column',display: 'flex',justifyContent: 'center',alignItems: 'center',marginBottom: 0}}>
      <MDBContainer fluid className="text-center text-md-left">

            <p style={{fontSize: 30,margin: 5,fontWeight: '600',textAlign: 'center'}}>SERVICY</p>
            <p style={{fontSize: 18,margin: 5}}>
              We are willing to provide the best services for you!
            </p>

      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="/"> servicy.herokuapp.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;
