import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function Example({ime, tit, overview}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);




    return (
        <div>

            <img className="imagen" src={`https://image.tmdb.org/t/p/w300/${ime}`} variant="primary" onClick={handleShow}/>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{tit}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {overview}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>


        </div>
    );
}

export default function App() {
    const [modalShow, setModalShow] = React.useState(false);
    const [post, setPost] = React.useState(null);


    React.useEffect(() => {
        getPost();
    }, []);
    async function getPost() {
        // para implementar con el proxy del otro proyecto use httP://localhost:8080
        const apiKey = 'f5a8915645501a2493727d6b09cbabd0';
        let resp = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&media_type=movie`);
        setPost(resp.data.results);
        console.log(resp.data.results);
    }



    if (!post) return "No post!"


    return (
<div>


    <Container className="flex-container">
        <div className="mytitulo"><h1>Welcome</h1></div>
        {post.map((item) =>
            <Row className="flex-item" key={item.id}>
                <Col>

                    <Example tit={item.original_title}  ime={item.poster_path} overview={item.overview} show={modalShow} onHide={() => setModalShow(false)} />

                    <div className='title'>
                        {item.original_title}
                    </div>
                </Col>


            </Row>
        )}




    </Container>

</div>
    );
}