import React from 'react'
import '../styles/tour-details.css'
import {Container, Row, Col, Form, ListGroup} from 'reactstrap'
import {useParams} from 'react-router-dom'
import tourData from '../assets/data/tours'
import calculateAvgRating from '../utils/avgRating'
import avatar from '../assets/images/avatar.jpg'
import { useRef, useState } from 'react'
const TourDetails = () => {

  const {id} = useParams()
  const reviewMsgRef = useRef('')
  const [tourRating, setTourRating] = useState(null)

  // this is an static data later we will call our API and load our data from database
  const tour = tourData.find(tour => tour.id === id)

  // destructure properties from tour object
  const {photo, title, desc, price, address ,reviews, city, distance, maxGroupSize} = tour

  const {totalRating, avgRating} = calculateAvgRating(reviews)

  //format date
  const options = {day: "numeric", month: "long", year: "numeric"}

  //submit request to the server
  const submitHandle = e =>{
    e.preventDefault()
    const reviewText = reviewMsgRef.current.value

    alert( `${reviewText}, ${tourRating}`)

    //later will call our api
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg='8'>
            <div className="tour__content">
              <img src={photo} alt="" />

              <div className="tour__info">
                <h2>{title}</h2>

                <div className="d-flex align-items-center gap-5">

                <span className='tour__rating d-flex align-items-center gap-1'>
                    <i className='ri-star-fill' style={{color: "var(--secondary-color)"}}></i> {calculateAvgRating === 0 ? null : avgRating}
                    {totalRating === 0 ? (
                        "Not rated"
                    ) : (
                        <span>({reviews?.length})</span>
                    )}
                </span>

                    <span>
                      <i className='ri-map-pin-user-fill'></i>{address}
                    </span>

                </div>

                <div className="tour__extra-details">
                  <span><i className='ri-map-pin-2-line'></i>{city}</span>
                  <span><i className='ri-money-dollar-circle-line'></i>${price}/per person</span>
                  <span><i className='ri-map-pin-time-line'></i>{distance} k/m</span>
                  <span><i className='ri-group-line'></i>{maxGroupSize} people</span>
                </div>

                <h5>Description</h5>
                <p>{desc}</p>

              </div>
              {/* ============tour reviews section ========== */}
              <div className="tour__reviews mt-4">
                  <h4>Reviews ({reviews?.length} reviews)</h4>

                  <Form onSubmit={submitHandle}>
                    <div className='rating__group d-flex align-items-center gap-3 mb-4'>
                      <span onClick={() => setTourRating(1)}>1<i className='ri-star-s-fill'></i></span>
                      <span onClick={() => setTourRating(2)}>2<i className='ri-star-s-fill'></i></span>
                      <span onClick={() => setTourRating(3)}>3<i className='ri-star-s-fill'></i></span>
                      <span onClick={() => setTourRating(4)}>4<i className='ri-star-s-fill'></i></span>
                      <span onClick={() => setTourRating(5)}>5<i className='ri-star-s-fill'></i></span>
                    </div>

                    <div className="review__input">
                      <input type="text" ref={reviewMsgRef} placeholder='share your thougnhts' required/>
                      <button className='btn primary__btn text-white' type='submit'>
                        Submit
                      </button>
                    </div>
                  </Form>
                  <ListGroup className='user__reviews'>
                    {
                      reviews?.map(review => (
                        <div className="review__item">
                          <img src={avatar} alt=""/>

                          <div className="w-100">
                            <div className="d-flex align-items-center justify-conten-between">
                              <div>
                                <h5>muhib</h5>
                                <p>
                                  {new Date("01-18-2013").toLocaleDateString("en-us", options)}
                                </p>
                              </div>
                              <span className=' sao d-flex align-items-center'>
                                5<i className='ri-star-s-fill'></i>
                              </span>
                            </div>
                            <h6>Amazing tour</h6>
                          </div>
                        </div>
                      ))
                    }
                  </ListGroup>
                </div>
                {/* ============tour reviews section end ========== */}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default TourDetails