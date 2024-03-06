import { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap';
import '../../../../assets/css/style.css';

function Notification() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_ENDPOINT}api/Notis`)
      .then((response) => response.json())
      .then((data) => {
        // Sắp xếp mảng data theo thứ tự giảm dần của notiId
        const sortedPosts = data.sort((a, b) => b.notiId - a.notiId);
        setPosts(sortedPosts);
      })
      .catch((error) => console.error(error));
  }, []);

  const handlePostClick = (post) => {
    if (selectedPost && selectedPost.notiId === post.notiId) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
    }
  };
  return (
    <section id="faq" className="faq " data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1200">
      <div className="container">
        <div className="section-title wow animated fadeInUp animated">
          <p className="tilenofica">THÔNG BÁO</p>
          <h2> </h2>
        </div>
        <div className="faq-list">
          <Container className="py-3">
            <Row>
              <Col md={12}>
                <ListGroup>
                  {posts.map((post) => (
                    <ListGroup.Item
                      key={post.notiId}
                      action
                      onClick={() => handlePostClick(post)}
                      active={selectedPost && selectedPost.notiId === post.notiId}
                      style={{
                        display: 'block',
                        marginBottom: '1rem',
                        textAlign: 'center',
                        backgroundColor: '#D51F35',
                        color: 'white',
                      }}
                    >
                      {post.title}
                      {selectedPost && selectedPost.notiId === post.notiId && (
                        <Card>
                          <Card.Body>
                            <Card.Title style={{ color: '#000', textAlign: 'left' }}>{selectedPost.title}</Card.Title>
                            <Card.Text style={{ color: '#000', textAlign: 'left' }}>
                              {selectedPost.content}{' '}
                              <a href={selectedPost.link} style={{ display: 'inline' }}>
                                Tại đây
                              </a>
                            </Card.Text>
                          </Card.Body>
                          {/* <Card.Img
                            style={{ objectFit: 'cover', width: '70%', height: '80%' }}
                            className="img-fluid"
                            variant="top"
                            src={`data:image/jpeg;base64,${selectedPost.images}`}
                          /> */}
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
