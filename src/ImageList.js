import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import TablePagination from "@material-ui/core/TablePagination";
import Modal from "@material-ui/core/Modal";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import { Button } from "@material-ui/core";

class ImageList extends Component {
  state = {
    rowsPerPage: 5,
    page: 0,
    index: 0,
    images: [],
    selectedImages: [],
    isOpen: false,
    dialogueImage: "",
    dialogueIndex: "",
    dataToBeTransfered: {
      link1:
        "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg",
      link2:
        "https://media.istockphoto.com/photos/happy-family-mother-father-children-son-and-daughter-runing-and-on-picture-id1206622213?b=1&k=6&m=1206622213&s=170667a&w=0&h=nerRK3CI11u4uGCVVH1NlZIZid7S-TWla2inQ8MOKvg=",
      link3:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
      link4:
        "https://cdn.pixabay.com/photo/2016/11/14/04/45/elephant-1822636__340.jpg",
      link5:
        "https://cdn.pixabay.com/photo/2018/02/08/22/27/flower-3140492__340.jpg",
    },
  };

  // Sending data to localStorage.

  onSetterClick = () => {
    localStorage.setItem(
      `imageslist`,
      JSON.stringify(this.state.dataToBeTransfered)
    );
  };

  componentDidMount = () => {
    Aos.init({});
    setTimeout(() => {
      fetch(
        `https://pixabay.com/api/?key=19122540-fd49208c969016643570e0c98&q=yellow`
      ) // fetch to API by passing in query state
        .then((response) => response.json()) // covert to JSON fromat
        .then(({ hits }) => hits.map(({ webformatURL }) => webformatURL)) // use object destructuring to grab image urls from json response
        .then((images) => {
          this.setState({
            images: images,
            selectedImages: images.slice(0, 5),
          });
        }); // call setImages to update images state with image urls
    }, 0);
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

  handleChangePage = (event, newPage) => {
    let selectedImages = this.state.images.slice(newPage * 5, newPage * 5 + 5);
    this.setState({
      page: newPage,
      selectedImages: selectedImages,
    });
  };

  handleShowDialog = (image, index) => {
    this.setState({
      isOpen: !this.state.isOpen,
      dialogueImage: image,
      dialogueIndex: index,
    });
  };
  handleClose = () => {
    this.setState({
      isOpen: false,
    });
  };
  render() {
    const { selectedImages } = this.state;
    return (
      this.state.images.length > 0 && (
        <div
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="600"
          data-aos-easing="ease-out"
          style={{ margin: 50 }}
        >
          <div style={styles.contentWrapper}>
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
          <div style={styles.imagesContianer}>
            {selectedImages.map((image, index) => (
              <div
                className="image__container"
                key={index}
                style={{
                  marginTop: 10,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "space-between",
                  border: "solid",
                  borderColor: "rgb(216, 216, 216)",
                  borderWidth: 1,
                }}
              >
                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <img
                    className="screen2__image"
                    onClick={(event) => this.handleShowDialog(image, index)}
                    style={styles.mainImage}
                    src={image}
                    alt={index}
                  />
                  <Link
                    to="/screen3"
                    onClick={() => {
                      this.onSetterClick(this.state.dataToBeTransfered);
                    }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "end",
                      width: "100%",
                      alignItems: "space-between",
                    }}
                  >
                    <div className="texts__section">
                      <p class="text text1">Text 1</p>
                      <br />
                      <br />
                      <p class="text text2">Text 2</p>
                      <br />
                      <br />
                    </div>
                  </Link>
                </div>
              </div>
            ))}

            <Modal
              open={this.state.isOpen}
              onClose={this.handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <img
                style={{
                  width: 500,
                  marginTop: "10%",
                  marginLeft: "30%",
                }}
                src={this.state.dialogueImage}
                alt={this.state.dialogueIndex}
              />
            </Modal>
          </div>
          <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={this.state.images.length}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onChangePage={this.handleChangePage}
          />
        </div>
      )
    );
  }
}

const styles = {
  contentWrapper: {
    margin: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "space-between",
  },

  imagesContianer: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    justifyItems: "end",
    height: "50%",
  },

  mainImage: {
    border: "solid",
    borderColor: " rgb(216, 216, 216)",
    borderWidth: 1,
    width: 260,
    marginLeft: 10,
    marginRight: 10,
    zIndex: "100",
  },
};

export default ImageList;
