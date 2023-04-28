import { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Card } from "react-bootstrap";
import '../../../../assets/css/style.css';

function Notification() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  useEffect(() => {
    fetch("https://my-json-server.typicode.com/PhucChiVas161/FE-Intern/News")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error(error));
  }, []);
  const handlePostClick = (post) => {
    if (selectedPost && selectedPost.id === post.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
    }
  };
  return (
    <section id="faq" className="faq "   data-aos="fade-down-right"  data-aos-delay="100"  data-aos-duration="1200" >
      <div className="container" >
        <div
          className="section-title wow animated fadeInUp animated"          
        >
          <p className="tilenofica"  >THÔNG BÁO</p>
          <h2> </h2>
        </div>
        <div className="faq-list">
          <Container className="py-3" > 
            <Row>
              <Col md={12}>
                <ListGroup >
                  {posts.map((post) => (
                    <ListGroup.Item
                      key={post.id}
                      action
                      onClick={() => handlePostClick(post)}
                      active={selectedPost && selectedPost.id === post.id}
                      style={{
                        display: "block",
                        marginBottom: "1rem",
                        textAlign: "center",
                        backgroundColor:'#bebbb7'
                      }}
                    >
                      {post.title_content}
                      {selectedPost && selectedPost.id === post.id && (
                        <Card>
                          <Card.Body>
                            <Card.Title
                              style={{ color: "#000", textAlign: "left" }}
                            >
                              {selectedPost.title_content}
                            </Card.Title>
                            <Card.Text
                              style={{ color: "#000", textAlign: "left" }}
                            >
                              {selectedPost.content}
                            </Card.Text>
                          </Card.Body>
                          <Card.Img
                            className="img-fluid"
                            variant="top"
                            src={selectedPost.img}
                          />
                        </Card>
                      )}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </section>
  );
}

export default Notification;
