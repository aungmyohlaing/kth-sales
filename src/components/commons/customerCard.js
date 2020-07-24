import React, { Component } from "react";
import { Col, Card, Button, Dropdown } from "react-bootstrap";
import userlogo from "../images/businessman.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoadCustomerById } from '../../redux/actions';
import Storage from "../commons/localStogare";



const CustomToogle = React.forwardRef(({ children, onClick }, ref) => (
  <Button
    variant="link"
    size="sm"
    style={{
      color: "black",
      textDecoration: "none",
      boxShadow: "none",
      width: "30px",
      height: "40px",
    }}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <span className="threeDots"></span>
  </Button>
));
class customerCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userinfo: {
        fullname: "",
        email: "",
        usertype: "",
      }
    }

    this.cardOnClick = this.cardOnClick.bind(this);
    this.onSalesClick = this.onSalesClick.bind(this);
   
  }

  cardOnClick(id){
    const { history } = this.props;
    
    history.push("/customer/detail/" + id);   
    // this.context.router.push("/customer/detail/" + id);   
  }

  onSalesClick(id){
    const { history } = this.props;

    // Get Customer from Redux by Customer Id
    this.props.LoadCustomerById(id);
    history.push("/newvoucher/" + id); 
  }

  componentDidMount() {
    var userinfo = Storage(localStorage).get("userinfo");
    this.setState({ userinfo: userinfo });
  }
  

  render() {
    const self = this;
    const { dataList, handleModalShow } = this.props;
    return dataList.map(function (item) {
      return (
        
          <Col
            key={item._id}
            xs={12}
            sm={6}
            md={3}
            lg={3}
            style={{ marginBottom: "15px" }}
          >
            <div 
              // onClick={() => self.cardOnClick(item._id)}
              style={{ textDecoration: "none", cursor: 'pointer', zIndex: '0' }}
            >
              {/* <div>
              <Image src={userlogo} className="cusmedia" thumbnail />
              <h4>{item.name}</h4>
              <p>Amount: {item.salesamount} Ks</p>
            </div> */}
              <Card className="cusmedia" bg="light" text="dark" >
              <Dropdown
                  style={{ position: "absolute", right: "0px", zInder: '1000' }}
                  alignRight
                >
                  <Dropdown.Toggle as={CustomToogle} />
                  <Dropdown.Menu size="sm" title="">
                    <Dropdown.Item onClick={() => self.onSalesClick(item._id)}>
                      Sales
                    </Dropdown.Item>
                    <Dropdown.Item>Collect</Dropdown.Item>
                    <Dropdown.Item>Returns</Dropdown.Item>
                    {self.state.userinfo.usertype === "Admin" ? (
                      <div>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={() => handleModalShow(item._id)}>
                          {" "}
                          <FontAwesomeIcon icon={faTrashAlt} /> Delete
                        </Dropdown.Item>
                      </div>
                    ) : (
                      ""
                    )}
                    
                  </Dropdown.Menu>
                </Dropdown>
                <div onClick={() => self.cardOnClick(item._id)} >
                <Card.Img variant="top" src={userlogo} />
                <Card.Body>
                
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>Amount: {item.salesamount} MMK</Card.Text>
                </Card.Body>
                </div>
              </Card>
              
            </div>            
          </Col>
          
        
      );
    });
  }
}

const mapStateToProps = (state) => {            
  return {
      customer: state.customer     
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    LoadCustomerById: (id) => dispatch(LoadCustomerById(id))      
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(customerCard));