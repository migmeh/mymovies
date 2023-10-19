import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';




function Example({ime, tit, overview}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    return (
        <div className="cont-todo">

            <img className="imagen" alt={tit} src={`https://image.tmdb.org/t/p/w300/${ime}`} variant="primary" onClick={handleShow}/>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton  data-bs-theme="dark" className='bg-dark p-2'>
                    <Modal.Title>{tit}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="movieIm">
                        <img className="imagen" alt={tit} src={`https://image.tmdb.org/t/p/w300/${ime}`}/>

                    </div>
                     <div className="descripcion">
                        {overview}
                    </div>

                </Modal.Body>
                <Modal.Footer  data-bs-theme="dark" className='bg-dark p-2'>
                    <Button variant="success" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>


        </div>
    );
}





export default function App() {

    const [modalShow, setModalShow] = React.useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);

    // para implementar con el proxy del otro proyecto descarguelo, y corra el proxy despues use http://localhost:8080
    const apiKey = 'f5a8915645501a2493727d6b09cbabd0'; //comentar esta linea si usa el proxy
    //https://api.themoviedb.org/3
    const url = 'https://api.themoviedb.org/3'; //para usar el proxi cambiar por http://localhost:8080

    React.useEffect(() => {
        getPost();
    }, []);
    async function getPost() {


        let resp = await axios.get(`${url}/trending/movie/day?api_key=${apiKey}&media_type=movie`);
        setResults(resp.data.results);
        console.log(resp.data.results);
    }




    ////////////////

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        axios.get(`${url}/search/movie?api_key=${apiKey}`, { //para usar el proxi cambiar po http://localhost:8080/search
            params: {
                query: searchTerm
            }
        })
            .then((response) => {
                setResults(response.data.results);
                console.log(response.data.results);
            })
            .catch((error) => {
                console.error('Error al realizar la búsqueda:', error);
            });
    };



    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="http://localhost:3000">Welcome</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0"
                             style={{ maxHeight: '100px' }} >
                            <Nav.Link href="#" disabled>
                                Link
                            </Nav.Link>
                        </Nav>
                        <Form onSubmit={handleSearchSubmit} className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                name="form"
                                value={searchTerm} onChange={handleSearchChange}
                            />
                            <Button variant="success" onClick={handleSearchSubmit}>Search</Button>
                        </Form>





                    </Navbar.Collapse>
                </Container>

            </Navbar>
            <Container className="flex-container">



                    {results.map((result, index) => (
                        <Row className="flex-item" key={index}>
                            <Col>
                                <Example tit={result.original_title}  ime={result.poster_path} overview={result.overview} show={modalShow} onHide={() => setModalShow(false)} />

                                <div className='title'>
                                    {result.original_title}
                                </div>

                            </Col>
                        </Row>
                    ))}






            </Container>


        </div>

    );
}



