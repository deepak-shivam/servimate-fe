import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Container, Row, Col, Button } from 'react-bootstrap'
import AddServiceModal from '../../Components/Service/AddServiceModal'
import { getCities } from '../../redux/actions/cityAction'
import { getServices } from '../../redux/actions/serviceAction'
import DeleteModal from '../../Components/DeleteModal'




const Service = (props) => {
    const serviceRoot = useSelector(store => store.serviceRoot)
    const { loader, services } = serviceRoot
    const dispatch = useDispatch()
    const [addServiceModal, setAddServiceModal] = useState(false)
    // const [editCityModal, setEditCityModal] = useState(false)
    const [data, setData] = useState("")
    const [deleteModal, setDeleteModal] = useState(false)

    useEffect(() => {
        // dispatch(getCities())
        dispatch(getServices(props.match.params.serviceSubCategoryId))
    }, [props.match.params.serviceSubCategoryId])

    const deleteHandler = (service) => {
        const temp_data = {
            _id: service._id,
            name: service.serviceName,
            actionType: "delete_service"
        }
        setData(temp_data)
        setDeleteModal(true)
    }

    return (
        <>
            {deleteModal && <DeleteModal
                data={data}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
            />}
            {addServiceModal && <AddServiceModal serviceSubCategory={props.match.params.serviceSubCategoryId} addServiceModal={addServiceModal} setAddServiceModal={setAddServiceModal} />}
            <Container >
                <Row className="mt-5">
                    <Col md={2} >
                        <h6>{props.match.params.serviceSubCategoryName}</h6>
                        <Button variant="primary" type="button" onClick={() => setAddServiceModal(true)}>ADD NEW</Button>
                    </Col>
                    <Col md={10} >
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th className="text-center">S.No</th>
                                    <th className="text-center">Service</th>
                                    <th className="text-center">Actual Price</th>
                                    <th className="text-center">Discounted Price</th>
                                    {/* <th className="text-center">Price</th> */}
                                    <th className="text-center">IconUrl</th>
                                    <th className="text-center">ImgUrl</th>
                                    <th className="text-center">Includes</th>
                                    <th className="text-center">Update</th>
                                    <th className="text-center">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.length !== 0 ? services.map((service, index) =>
                                    <tr>
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-center">{service.serviceName}</td>
                                        <td className="text-center">{service.price[0].actualPrice}</td>
                                        <td className="text-center">{service.price[0].discountedPrice}</td>

                                        {/* <td className="text-center">{service.price}</td> */}
                                        <td className="text-center">{service.iconUrl}</td>
                                        <td className="text-center">{service.imgUrl}</td>
                                        <td className="text-center">{service.includes.join(', ')}</td>
                                        <td className="text-center"><Button variant="outline-info">Update</Button></td>
                                        <td className="text-center"><Button onClick={()=>deleteHandler(service)} variant="outline-info">Delete</Button></td>
                                    </tr>
                                ) : null}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>

        </>
    )
}


export default Service