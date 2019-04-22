import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="row" style={{backgroundColor: 'yellow',margin:"1%",height:"100px"}}>
          {/* Control the column width, and how they should appear on different devices */}

            Quảng cáo 1
        </div>

        <div className="row" style={{backgroundColor: 'red',margin:"1%"}}>
              <div className="col-sm-1" style={{backgroundColor: 'yellow',height:"100px"}}>
                Quảng cáo 2
              </div>
              <div className="col-sm-10" style={{backgroundColor: 'blue',height:"100px"}}>
              <div className="row" style={{backgroundColor: 'red',height:"20px"}}>
                <div className="col-sm-2" style={{backgroundColor: 'black',height:"20px"}}>
                logo
                </div>
                <div className="col-sm-2" style={{backgroundColor: 'green',height:"20px"}}>
                filter 1
                </div>
                <div className="col-sm-2" style={{backgroundColor: 'yellow',height:"20px"}}>
                filter 2
                </div>
                <div className="col-sm-3" style={{backgroundColor: 'purple',height:"20px"}}>
                  search box
                </div>
                <div className="col-sm-1" style={{backgroundColor: 'purple',height:"20px"}}>
                  search button
                </div>
                <div className="col-sm-2" style={{backgroundColor: 'lavender',height:"20px"}}>
                login logout buton
                </div>
              </div>
              <div className="row" style={{backgroundColor: 'red',height:"20px"}}>
              <div className="col-sm-1" style={{backgroundColor: 'blue',height:"20px"}}>
                </div>
                <div className="col-sm-10" style={{backgroundColor: 'purple',height:"20px"}}>
                  slide               
                </div>
                <div className="col-sm-1" style={{backgroundColor: 'lavender',height:"20px"}}>
                </div>
              </div>
              <div className="row" style={{backgroundColor: 'red',height:"20px"}}>
                TOP DICH VU TOT NHAT
              </div>
              <div className="row" style={{backgroundColor: 'red',height:"100px"}}>
 
                  <div className="col-sm-3" style={{backgroundColor: 'green',marginLeft:"0.5%",height:"20px"}}>
                    tin 1 
                    </div>
                    <div className="col-sm-3" style={{backgroundColor: 'purple',marginLeft:"0.5%",height:"20px"}}>
                    tin 1            
                    </div>
                    <div className="col-sm-3" style={{backgroundColor: 'lavender',marginLeft:"0.5%",height:"20px"}}>
                    tin 1 
                    </div>

              </div>

              </div>
        
              <div className="col-sm-1" style={{backgroundColor: 'green',height:"100px"}}>
                    Quảng cáo 3
              </div>
        </div>
      </div>
    );
  }
}

export default App;
