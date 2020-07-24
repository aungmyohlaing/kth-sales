import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import DeleteModal from '../../commons/modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FetchUserData, DeleteUser, isModalShow, getUserId } from '../../../redux/actions';
import Loading from '../../commons/loading';

class UserList extends Component {
   
    constructor(props){
        super(props)

        this.state ={
            modalBodyText: [
                {
                  heading: 'Are you sure to delete this customer?',
                  bodyText: ''
                }
              ]
        }
        
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalShow = this.handleModalShow.bind(this);
        this.onYesClick = this.onYesClick.bind(this);
    }

    handleModalClose() {
        this.props.isModalShow(false);        
    }

    handleModalShow(id) {          
        this.props.getUserId(id);    
        this.props.isModalShow(true);
    }

    onYesClick(){                
        this.props.deleteUser(this.props.userId);        
    }

    componentDidMount(){               
        this.props.fetchUserData();
    }

    render() {        

        if (this.props.isLoading) {
            return  <Loading />
        }

        return (
            <div>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Full Name</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>User Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.items.length > 0 ?
                            this.props.items.map((item, index) => {
                                return (<tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.fullname}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.userType}</td>
                                    <td>
                                        <Button size="sm" variant="danger" 
                                            onClick={()=> this.handleModalShow(item._id)} 
                                            >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                                )
                            })
                            : <tr className="text-center"><td colSpan={6}><h3> NO RECORD FOUND! </h3></td></tr>
                        }
                        
                    </tbody>
                </Table>
                <DeleteModal show={this.props.showModal}
                    title="User Deleting..."
                    bodyText={this.state.modalBodyText}
                    onNo={this.handleModalClose}
                    onYes={this.onYesClick} />
            </div>
        )
    }
}

UserList.propTypes = {
    fetchUserData: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    deleteUser: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    showModal: PropTypes.bool.isRequired,
    isModalShow: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    getUserId: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {            
    return {
        items: state.users,
        isLoading: state.itemsIsLoading,
        showModal: state.isModalShow,
        userId: state.getUserId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserData: () => dispatch(FetchUserData()),
        deleteUser:(id) => dispatch(DeleteUser(id)),
        isModalShow:(show) => dispatch(isModalShow(show)),
        getUserId:(id) => dispatch(getUserId(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);