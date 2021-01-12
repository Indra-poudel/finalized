import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
class ImageSlider extends Component {
  // takes in images as props
  state = {
    index: 0,
    images: [],
    isOpen: false,
  };

  componentDidMount = () => {
    fetch(
      `https://pixabay.com/api/?key=19122540-fd49208c969016643570e0c98&q=yellow`
    ) // fetch to API by passing in query state
      .then((response) => response.json())
      .then(({ hits }) => hits.map(({ webformatURL }) => webformatURL)) // use object destructuring to grab image urls from json response
      .then((images) => this.setState({ images: images })); // call setImages to update images state with image urls
  };

  slideRight = () => {
    this.setState({
      index: (this.state.index + 1) % this.state.images.length,
    });
  };

  slideLeft = () => {
    const nextIndex = this.state.index - 1;
    if (nextIndex < 0) {
      this.setState({
        index: this.state.images.length - 1,
      });
    } else {
      this.setState({
        index: nextIndex,
      });
    }
  };

  removeImage = () => {
    let newImages = this.state.images;
    newImages.splice(this.state.index, 1);
    this.setState({
      images: newImages,
    });
  };

  handleShowDialog = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleClose = () => {
    this.setState({
      isOpen: false,
    });
  };
  render() {
    const { images } = this.state;
    const { index } = this.state;
    return (
      this.state.images.length > 0 && (
        <div style={{ margin: 100 }}>
          <div
            style={{
              margin: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              alignItems: "space-between",
            }}
          >
            <TextField
              id="date"
              label="Start Date"
              type="date"
              margin="dense"
              InputLabelProps={{
                shrink: true,
              }}
              style={{
                marginRight: 20,
              }}
            />
            <TextField
              id="date"
              label="End Date"
              type="date"
              margin="dense"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              justifyItems: "end",
              height: "50%",
            }}
          >
            <button
              style={{ height: 30, marginTop: 120 }}
              onClick={this.slideLeft}
            >
              {"<"}
            </button>
            <div
              style={{
                padding: 10,
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "space-between",
                border: "solid",
                borderColor: "grey",
                borderWidth: 2,
              }}
            >
              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "start",
                  alignItems: "space-between",
                }}
              >
                <img
                  onClick={this.handleShowDialog}
                  style={{
                    border: "solid",
                    borderColor: "grey",
                    borderWidth: 2,
                    height: 200,
                    width: 500,
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                  src={images[index]}
                  alt={index}
                />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    width: "100%",
                    alignItems: "space-between",
                  }}
                >
                  <p>Text 1</p>
                  <br />
                  <br />
                  <p>Text 2</p>
                  <br />
                  <br />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "space-between",
                }}
              >
                <Button
                  onClick={this.removeImage}
                  style={{ height: 30, marginRight: 10 }}
                  variant="contained"
                  color="primary"
                >
                  Yes
                </Button>
                <Button
                  onClick={this.removeImage}
                  style={{ height: 30 }}
                  variant="contained"
                  color="secondary"
                >
                  No
                </Button>
              </div>
              <Modal
                open={this.state.isOpen}
                onClose={this.handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                <img
                  style={{
                    width: 600,
                    marginTop: "10%",
                    marginLeft: "30%",
                  }}
                  src={images[index]}
                  alt={index}
                />
              </Modal>
            </div>
            <button
              style={{ height: 30, marginTop: 120 }}
              onClick={this.slideRight}
            >
              {">"}
            </button>
          </div>
        </div>
      )
    );
  }
}

export default ImageSlider;
