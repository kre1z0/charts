import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: flex-end;
`;

const Bar = styled.div`
  height: 20px;
  width: ${({ length }) => `${100 / length}%`};
  left: ${({ index }) => `${index * 20}px`};
  background-color: green;
`;

class BarChart extends Component {
  render() {
    const { data } = this.props;

    return (
      <Container>
        {data &&
          data.map((num, i, array) => (
            <Bar num={num} index={i} key={`bar-${i}-${num}`} length={array.length} />
          ))}
      </Container>
    );
  }
}

export default BarChart;
