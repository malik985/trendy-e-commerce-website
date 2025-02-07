import Carousel from 'react-bootstrap/Carousel';
import img1 from'../logo/p1.jpg'
import img2 from'../logo/p2.jpg'
import img3 from'../logo/p3.jpg'

function Carousele() {
  return (
    <Carousel>
      <Carousel.Item interval={1200}>
        <img
          className="cimg"
          src={img3}
          alt="First slide"
        />

      </Carousel.Item>
      <Carousel.Item interval={1200}>
        <img
          className="cimg"
          src={img1}
          alt="Second slide"
        />


      </Carousel.Item>
      <Carousel.Item interval={1200}>
        <img
          className="cimg"
          src={img2}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousele;