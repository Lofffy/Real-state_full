import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import aboutVideo from "../../../assets/about-video.mp4"

const ContentSection = () => {
    return (
        <section className="content-section">
            <Container>
                <Row className="justify-content-between">
                    <Col md={7}>
                        <h4>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum, dicta neque quibusdam vero aliquam.</h4>
                        <br />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum deleniti odit, possimus nesciunt nulla aspernatur officia dicta necessitatibus modi accusamus quod. Porro libero animi repellendus? Amet eligendi nam iure quis.</p>
                        <br />
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, ab perspiciatis inventore quis optio maxime blanditiis velit sequi dolor, pariatur, eum vel! Quibusdam repellat deserunt ut ducimus laborum consequuntur minus?</p>
                        <br />
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores mollitia, iste placeat delectus dicta dolorum nam dignissimos magni natus tenetur dolor sequi cum facere corrupti quidem quod animi aliquid in.</p>
                    </Col>
                    <Col md={4}>
                        <video 
                            src={aboutVideo} 
                            className="video-section w-100" 
                            controls 
                            alt="About Us Video"
                        />
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ContentSection;
