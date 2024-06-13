import { Card, Carousel } from "antd";

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const LandingPage = () => {
  return (
    <Card>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>Welcome to Dental Online Scheduling</h3>
        </div>
        <div>
          <h3 style={contentStyle}>Comprehensive Dental Care</h3>
        </div>
        <div>
          <h3 style={contentStyle}>Specialized Services</h3>
        </div>
        <div>
          <h3 style={contentStyle}>Easy Online Scheduling</h3>
        </div>
      </Carousel>
    </Card>
  );
};

export default LandingPage;
