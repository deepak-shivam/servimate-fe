import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux'
import { getServiceSubCategories, setServiceSubCategories } from "../../redux/actions/serviceAction";
import ServiceSubCategoryModal from "../../Components/ServiceSubCategory/AddServiceSubCategoryModal";
import DeleteModal from '../../Components/DeleteModal'

const ServiceSubCategory = (props) => {
  const serviceRoot = useSelector((store) => store.serviceRoot);
  const { loader, serviceSubCategories } = serviceRoot;
  const dispatch = useDispatch();
  const [addServiceSubCategoryModal, setAddServiceSubCategoryModal] = useState(false);
  const [data, setData] = useState("")
  const [deleteModal, setDeleteModal] = useState(false)

  useEffect(()=>{
    dispatch(getServiceSubCategories(props.match.params.serviceCategoryId))
    localStorage.setItem("service-category", props.match.params.serviceCategoryId)
    return ()=>{
      dispatch(setServiceSubCategories([]))
    }
  },[props.match.params.serviceCategoryId])

  const deleteHandler = (serviceSubCategory)=>{
    const temp_data = {
      _id: serviceSubCategory._id,
      name: serviceSubCategory.name,
      actionType: "delete_service_sub_category"
    }
    setData(temp_data)
    setDeleteModal(true)
  }

  return (
    <>
     {deleteModal && <DeleteModal
        data = {data}
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
      />}
      {addServiceSubCategoryModal && <ServiceSubCategoryModal
        addServiceSubCategoryModal={addServiceSubCategoryModal}
        setAddServiceSubCategoryModal={setAddServiceSubCategoryModal}
        serviceCategory={props.match.params.serviceCategoryId}
      />}
      <Container>
        <Row className="mt-5">
          <Col md={2} className="mt-5">
          <h5>{props.match.params.serviceCategoryName}</h5>
            <Button onClick={() => setAddServiceSubCategoryModal(true)}>
              ADD NEW
            </Button>
          </Col>
          <Col md={10} className="mt-5">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th className="text-center">S.No</th>
                                    <th className="text-center">Service-Sub-Category</th>
                                    <th className="text-center">IconUrl</th>
                                    <th className="text-center">Update</th>
                                    <th className="text-center">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {serviceSubCategories.length !== 0 ? serviceSubCategories.map((serviceSubCategory, index) =>
                                    <tr>
                                        <td className="text-center">{index +  1}</td>
                                        <td className="text-center"><Link to={`/serviceSubCategory/${serviceSubCategory.name}/${serviceSubCategory._id}`}>{serviceSubCategory.name}</Link></td>
                                        <td className="text-center">{serviceSubCategory.iconUrl}</td>
                                        <td className="text-center"><Button variant="outline-info">Update </Button></td>
                                        <td className="text-center"><Button onClick={()=>deleteHandler(serviceSubCategory)} variant="outline-info">Delete</Button></td>
                                    </tr>
                                ): null}
                            </tbody>
                        </Table>
                    </Col>
        </Row>
      </Container>
    </>
  );
};

export default ServiceSubCategory;
