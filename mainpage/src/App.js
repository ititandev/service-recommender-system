import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import ItemsCarousel from 'react-items-carousel';
import range from 'lodash/range';
class App extends Component {

  componentWillMount() {
    this.setState({
      children: [],
      activeItemIndex: 0,
    });

    setTimeout(() => {
      this.setState({
        children: this.createChildren(20),
      })
    }, 100);
  }

  createChildren = (n) => range(n).map(i => <div key={i} style={{ height: "45vh", background: '#4286f4',width:"45vh" }}>slide {i}</div>);

  changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });
  render() {
    const {
      activeItemIndex,
      children,
    } = this.state;

    return (
      <div className="App">
        <div className="row" style={{backgroundColor: 'yellow',margin:"1%",height:"15vh"}}>
          {/* Control the column width, and how they should appear on different devices */}

            Quảng cáo 1
        </div>

        <div className="row" style={{backgroundColor: 'red',marginTop:"1%",marginLeft:"1%",marginRight:"1%"}}>
              <div className="col-sm-1" style={{backgroundColor: 'yellow',height:"100vh"}}>
                Quảng cáo 2
              </div>
              <div className="col-sm-10" style={{backgroundColor: 'blue',height:"100vh"}}>
              <div className="row" style={{backgroundColor: 'red',height:"10vh"}}>
                <div className="col-sm-2" style={{backgroundColor: 'yellow',height:"9vh"}}>
                  <h3>SERVICY</h3>
                </div>
                <div className="col-sm-2" style={{backgroundColor: 'green',height:"9vh"}}>
                  <div className="row-sm-4" style={{paddingTop:"2%"}}>
                    <label>Địa điểm </label> 
                  </div>
                  <div className="row-sm-8" >
                    <Select style={{width:"70%"}}>
                        <option value="volvo">Ho Chi Minh</option>
                        <option value="saab">Hanoi</option>
                        <option value="mercedes">Hai Phong</option>
                    </Select>
                  </div>
                  
                
                </div>
                <div className="col-sm-2" style={{backgroundColor: 'yellow',height:"9vh"}}>
                  <div className="row-sm-4" style={{paddingTop:"2%"}}>
                      <label> Loại dịch vụ </label> 
                    </div>
                    <div className="row-sm-8" >
                      <Select style={{width:"70%"}}>
                          <option value="volvo">Food</option>
                          <option value="saab">Security</option>
                          <option value="mercedes">Insurance</option>
                      </Select>
                    </div>
                </div>
                <div className="col-sm-4" style={{backgroundColor: 'purple',height:"9vh",padding:"1%"}}>
                <div className="search">
                  <input type="text" className="searchTerm" placeholder="bạn đang tìm gì " />
                  <button type="submit" className="searchButton">
                    <i className="fa fa-search" />
                  </button>
                </div>

                </div>
                <div className="col-sm-2" style={{backgroundColor: 'lavender',height:"9vh"}}>
                  <div className="row-sm-6" style={{padding:"1%"}}>
                    <Button variant="contained" color="primary" style={{width:"60%",height:"45%",fontSize:"12px"}}>
                    ĐĂNG KÝ
                  </Button>
                  </div>
                
                  <div className="row-sm-6" style={{padding:"1%"}}>
                    <Button variant="contained" color="primary" style={{width:"60%",height:"45%",fontSize:"12px"}}>
                    ĐĂNG NHẬP 
                  </Button>
                  </div>
                </div>
              </div>
              <div className="row" style={{backgroundColor: 'orange',height:"50vh"}}>
              <div className="col-sm-1" style={{backgroundColor: 'blue',height:"50vh"}}>
                </div>
                <div className="col-sm-10" style={{height:"50vh",paddingTop:"2%"}}>
                    <ItemsCarousel
                      // Placeholder configurations
                      enablePlaceholder
                      numberOfPlaceholderItems={5}
                      minimumPlaceholderTime={1000}
                      placeholderItem={<div style={{ height: 200, background: '#4286f4' }}>Placeholder</div>}

                      // Carousel configurations
                      numberOfCards={3}
                      gutter={12}
                      showSlither={true}
                      firstAndLastGutter={true}
                      freeScrolling={false}

                      // Active item configurations
                      requestToChangeActive={this.changeActiveItem}
                      activeItemIndex={activeItemIndex}
                      activePosition={'center'}

                      chevronWidth={50}
                      rightChevron={'>>'}
                      leftChevron={'<<'}
                      outsideChevron={false}
                    >
                      {children}
                    </ItemsCarousel>               
                </div>
                <div className="col-sm-1" style={{backgroundColor: 'lavender',height:"50vh"}}>
                </div>
              </div>
              <div className="row" style={{backgroundColor: 'blue',height:"7vh"}}>
                <h3>TOP DỊCH VỤ TỐT NHẤT</h3>
              </div>
              <div className="row" style={{backgroundColor: 'red',height:"33vh"}}>
                    <div className="col-sm-1"></div>
                    <div className="col-sm-3" style={{backgroundColor: 'green',marginLeft:"1%",marginRight:"1%",height:"32vh"}}>
                      <article>
                        <h1>Mì quảng Cô Ba</h1>
                        <img src="img/tin3.jpg"style={{width:"100%",height:"100px"}} ></img>
                        <p > <b>Địa chỉ</b>: 166 Trần Văn Quang, phường 10, Quận Tân Bình, TPHCM</p>
                        <p > <b>Rating</b>: 3.5</p>
                      </article>
                    </div>
                    <div className="col-sm-3" style={{backgroundColor: 'green',marginLeft:"1%",marginRight:"1%",height:"32vh"}}>
                      <article>
                        <h1>Mì quảng Cô Ba</h1>
                        <img src="img/tin3.jpg"style={{width:"100%",height:"100px"}} ></img>
                        <p > <b>Địa chỉ</b>: 166 Trần Văn Quang, phường 10, Quận Tân Bình, TPHCM</p>
                        <p > <b>Rating</b>: 3.5</p>
                      </article>
                    </div>
                    <div className="col-sm-3" style={{backgroundColor: 'green',marginLeft:"1%",marginRight:"1%",height:"32vh"}}>
                      <article>
                        <h1>Mì quảng Cô Ba</h1>
                        <img src="img/tin3.jpg"style={{width:"100%",height:"100px"}} ></img>
                        <p > <b>Địa chỉ</b>: 166 Trần Văn Quang, phường 10, Quận Tân Bình, TPHCM</p>
                        <p > <b>Rating</b>: 3.5</p>
                      </article>
                    </div>
                    <div className="col-sm-1"></div>

              </div>

              </div>
        
              <div className="col-sm-1" style={{backgroundColor: 'green',height:"100vh"}}>
                    Quảng cáo 3
              </div>
        </div>
        <footer >
  <div className="container-fluid bg-primary py-3" style={{height:"15vh"}} >
    <div className="container">
      <div className="row">
        <div className="col-md-7">
          <div className="row py-0">
            <div className="col-sm-1 hidden-md-down">
              
            </div>
            <div className="col-sm-11 text-white">
              <div><h4>&nbsp;&nbsp;Copyright</h4>
              <h5>&nbsp;&nbsp;Bach Khoa University</h5>
                <p>&nbsp;&nbsp;&nbsp;<span className="header-font"></span><span className="header-font"></span>Servicy By Group3@2019</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3" style={{padding:"1%"}}>
        <img className="float-right" src="img/bachkhoa.png" width="80" height="80"></img>
        </div>
        <div className="col-md-2" style={{padding:"1%"}}>

        <img src="img/footer1.png" width="80" height="80"></img>
        </div>

      </div>
    </div>
  </div>
</footer>
      </div>
    );
  }
}

export default App;
