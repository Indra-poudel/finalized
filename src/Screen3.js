import React, { useState, useEffect } from "react";
import Slider from "./Slider";
import {
  Button,
  Checkbox,
  CircularProgress,
  Backdrop,
} from "@material-ui/core";
import Aos from "aos";
import "aos/dist/aos.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CustomAlert from "./CustomAlert";
import { Cancel } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";

const Screen3 = ({ dataNeededFromOtherComponent }) => {
  const navigation = useHistory();

  const [imageValue, setImageValue] = useState(""); //Is this image valuable ['YES' || 'NOT']
  const [markAvailibility, setMarkAvailibility] = useState(""); // Is there a mark? ['YES' || 'NOT']
  const [marksValue, setMarksValue] = useState(""); // How many marks did we miss? ['NUMBER']
  const [locationTagIdentity, setLocationTagIdentity] = useState(""); // Is this location tag correctly identified ?['YES' || 'NOT']

  // Slide 1 feedback

  const [tagIdentityOne, setTagIdentityOne] = useState(""); // Is this tag correctly identified ['YES' || 'NOT']
  const [slideIndexOne, setSlideIndexOne] = useState(); // Is this tag correctly identified [imageIndex = number]

  // Slide 2 feedback

  const [tagIdentity2, setTagIdentity2] = useState(""); // Is this tag correctly identified ['YES' ||
  const [slideIndex2, setSlideIndex2] = useState(); // Is this tag correctly identified [imageIndex =   'NOT', number]

  // Slide 3 feedback

  const [tagIdentity3, setTagIdentity3] = useState(""); // Is this tag correctly identified ['YES' || 'NOT']
  const [slideIndex3, setSlideIndex3] = useState(); // Is this tag correctly identified [imageIndex = number]
  const [slideIndex, setSlideIndex] = useState(0); // Is this tag correctly identified [imageIndex = number]
  const [sqPresence, setSqPresence] = useState(""); // We don’t see SQ, are we right? ['YES' || 'NOT']

  // const [images, setImages] = useState([]); // Images for Screen 3

  const [sliderImages, setSliderImages] = useState([]); // Slider Images for Screen 3 Slider Images

  const [show, setShow] = useState(false);
  const [redirectLink, setRedirectLink] = useState("");

  const [importedData, setImportedData] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setImportedData(JSON.parse(localStorage.getItem("imageslist")));
  }, []);

  Aos.init();

  useEffect(() => {
    fetch(
      "https://pixabay.com/api/?key=19122540-fd49208c969016643570e0c98&q=yellow"
    )
      .then((response) => response.json())
      .then(({ hits }) => hits.map(({ webformatURL }) => webformatURL))
      .then((fetchedImages) => {
        // setImages(fetchedImages); //Images for feedback cards
        setSliderImages(fetchedImages.slice(0, 3));
      });
  }, []);

  const [Yeschecked, setYesChecked] = React.useState(false);
  const [Nochecked, setNoChecked] = React.useState(false);

  // function sliderImageSetter(arg) {
  //   if (slideIndex >= 0 && slideIndex <= 2) {
  //     return arg[slideIndex];
  //   }
  // }

  // function increment() {
  //   setSlideIndex((prevIndex) => prevIndex + 1);
  // }

  // function decrement() {
  //   setSlideIndex((prevIndex) => prevIndex - 1);
  // }

  const onPressSubmit = () => {
    setIsSubmitting(true);
    postMockApi().then(() => {
      setIsSubmitting(false);
      navigation.push("/imageslist");
    });
  };

  return (
    <>
      <div className="screen3">
        {show && (
          <CustomAlert
            alertMessage="If you proceed, all changes will be lost!"
            cancelBtn={
              <Cancel
                onClick={() => {
                  setShow(false);
                }}
                className="alert__close"
              />
            }
            redirectURL={redirectLink}
          />
        )}
        <div
          data-aos="fade-down"
          data-aos-duration="1000"
          data-aos-delay="250"
          data-aos-easing="ease-out"
          className="screen3__btnsSection "
        >
          <Button
            onClick={() => {
              setRedirectLink("/");
              setShow(true);
            }}
            variant="outlined"
            id="screen1__btn1"
          >
            Back to Dashboard
          </Button>
          <Button
            onClick={() => {
              setRedirectLink("/imageslist");
              setShow(true);
            }}
            variant="outlined"
            id="screen1__btn2"
          >
            Back to ImagesList
          </Button>
        </div>
        <div onClick={() => setShow(false)} className="screen3__lowerContent">
          {/* Section 1 */}

          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="800"
            data-aos-easing="ease-out"
            className="lowerContent__section1"
          >
            <h3 className="section__taglines">Is this image usefull?</h3>
            <img className="screen3__image" src={importedData?.link1} />
            <div className="section1__btns">
              <div className="inputYes">
                <span>Yes</span>
                <Checkbox
                  checked={Yeschecked}
                  onChange={(event) => {
                    setYesChecked(event.target.checked);
                    setNoChecked(false);
                    setImageValue("YES");
                  }}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </div>
              <div className="inputNo">
                <span>No</span>
                <Checkbox
                  checked={Nochecked}
                  onChange={(event) => {
                    setNoChecked(event.target.checked);
                    setYesChecked(false);
                    setImageValue("NO");
                  }}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </div>
            </div>
          </div>

          {/* Section 2 */}

          <div
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="250"
            data-aos-easing="ease-out"
            className="lowerContent__section2"
          >
            <h3 className="section__taglines">Is there a mark?</h3>
            <img
              className="screen3__image"
              src={importedData?.link2}
              alt="Image is missing"
            />
            <div className="section1__btns">
              <div className="inputYes">
                <span>Yes</span>
                <Checkbox
                  checked={Yeschecked}
                  onChange={(event) => {
                    setYesChecked(event.target.checked);
                    setNoChecked(false);
                    setMarkAvailibility("YES");
                  }}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </div>
              <div className="inputNo">
                <span>No</span>
                <Checkbox
                  checked={Nochecked}
                  onChange={(event) => {
                    setNoChecked(event.target.checked);
                    setYesChecked(false);
                    setMarkAvailibility("NO");
                  }}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </div>
            </div>
          </div>

          {/* Section 3 */}

          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="250"
            data-aos-easing="ease-out"
            className="lowerContent__section3"
          >
            <h3 className="section__taglines">How many marks did we miss?</h3>
            <img
              className="screen3__image"
              src={importedData?.link3}
              alt="Image is missing"
            />
            <div className="section3__inpusFeild">
              <input
                id="inputFeild"
                value={marksValue}
                onChange={(e) => setMarksValue(e.target.value)}
                type="text"
              />
              <Button id="section3__submitBtn">Submit</Button>
            </div>
          </div>

          {/* Section 4 */}

          <div
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="250"
            data-aos-easing="ease-out"
            className="lowerContent__section4"
          >
            <h3 className="section__taglines ">
              Is this location tag correctly identified ?
            </h3>
            <img
              className="screen3__image"
              src={importedData?.link4}
              alt="Image is missing"
            />
            <div className="section4__btns">
              <Button
                onClick={() => {
                  setLocationTagIdentity("YES");
                }}
                className={
                  locationTagIdentity === "YES" ? "selected-btn" : "btn"
                }
                id="section2__yesBtn"
              >
                Yes
              </Button>
              {/* {importedData[1]?.objKey2 && <span>{importedData[1].objKey2}</span>} */}
              <Button
                onClick={() => {
                  setLocationTagIdentity("NO");
                }}
                className={
                  locationTagIdentity === "NO" ? "selected-btn" : "btn"
                }
                id="section2__noBtn"
              >
                No
              </Button>
            </div>
          </div>

          <div
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="250"
            data-aos-easing="ease-out"
            className="lowerContent__sectionNew"
          >
            <h3 className="section__taglines section__taglineSlider">
              Is this tag correctly identified ?
            </h3>
            <div className="scrollable__div">
              <img src={sliderImages[0]} alt="" />

              <div className="imageFeedbackSec">
                <Button
                  onClick={() => {
                    setTagIdentityOne("YES");
                    setSlideIndexOne(0);
                  }}
                  className={tagIdentityOne === "YES" ? "selected-btn" : "btn"}
                  id="section2__yesBtn"
                >
                  Yes
                </Button>
                <Button
                  onClick={() => {
                    setTagIdentityOne("NO");
                    setSlideIndexOne(0);
                  }}
                  className={tagIdentityOne === "NO" ? "selected-btn" : "btn"}
                  id="section2__noBtn"
                >
                  No
                </Button>
              </div>
              <img src={sliderImages[1]} alt="" />

              <div className="imageFeedbackSec">
                <Button
                  onClick={() => {
                    setTagIdentity2("YES");
                    setSlideIndex2(1);
                  }}
                  className={tagIdentity2 === "YES" ? "selected-btn" : "btn"}
                  id="section2__yesBtn"
                >
                  Yes
                </Button>

                <Button
                  onClick={() => {
                    setTagIdentity2("NO");
                    setSlideIndex2(1);
                  }}
                  className={tagIdentity2 === "NO" ? "selected-btn" : "btn"}
                  id="section2__noBtn"
                >
                  No
                </Button>
              </div>

              <img src={sliderImages[2]} alt="" />

              <div className="imageFeedbackSec">
                <Button
                  onClick={() => {
                    setTagIdentity3("YES");
                    setSlideIndex3(2);
                  }}
                  className={tagIdentity3 === "YES" ? "selected-btn" : "btn"}
                  id="section2__yesBtn"
                >
                  Yes
                </Button>

                <Button
                  onClick={() => {
                    setTagIdentity3("NO");
                    setSlideIndex3(2);
                  }}
                  className={tagIdentity3 === "NO" ? "selected-btn" : "btn"}
                  id="section2__noBtn"
                >
                  No
                </Button>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          {/* <div className="sliderSection__wrapper">
          <h3 className="section__taglines slider__tagline">
            Is this tag correctly identified ?
          </h3>
          <Slider
            imageSrc={sliderImageSetter(sliderImages)}
            prevButton={
              <button
                disabled={slideIndex === 0}
                onClick={decrement}
                className="sliderBtn"
              >
                <ArrowBackIosIcon />
              </button>
            }
            forwardButton={
              <button
                disabled={slideIndex === 2}
                onClick={increment}
                className="sliderBtn"
              >
                <ArrowForwardIosIcon />
              </button>
            }
          ></Slider>

          {slideIndex === 0 && (
            <div
              data-aos="fade"
              data-aos-duration="500"
              data-aos-delay="100"
              data-aos-easing="ease-out"
              className="specialSection__feedbackBtns"
            >
              <Button
                onClick={() => {
                  setTagIdentityOne("YES");
                  setSlideIndexOne(slideIndex);
                }}
                className="greenBtn"
                variant="outlined"
              >
                Yes
              </Button>
              <Button
                onClick={() => {
                  setTagIdentityOne("NO"); // Slide One =>>> Tag Idendtity
                  setSlideIndexOne(slideIndex);
                }}
                className="redBtn"
                variant="outlined"
              >
                No
              </Button>
            </div>
          )}
          {slideIndex === 1 && (
            <div
              data-aos="fade"
              data-aos-duration="500"
              data-aos-delay="100"
              data-aos-easing="ease-out"
              className="specialSection__feedbackBtns"
            >
              <Button
                onClick={() => {
                  setTagIdentity2("YES");
                  setSlideIndex2(slideIndex);
                }}
                className="greenBtn"
                variant="outlined"
              >
                Yes
              </Button>
              <Button
                onClick={() => {
                  setTagIdentity2("NO");
                  setSlideIndex2(slideIndex);
                }}
                className="redBtn"
                variant="outlined"
              >
                No
              </Button>
            </div>
          )}
          {slideIndex === 2 && (
            <div
              data-aos="fade"
              data-aos-duration="500"
              data-aos-delay="100"
              data-aos-easing="ease-out"
              className="specialSection__feedbackBtns"
            >
              <Button
                onClick={() => {
                  setTagIdentity3("YES");
                  setSlideIndex3(slideIndex);
                }}
                className="greenBtn"
                variant="outlined"
              >
                Yes
              </Button>
              <Button
                onClick={() => {
                  setTagIdentity3("NO");
                  setSlideIndex3(slideIndex);
                }}
                className="redBtn"
                variant="outlined"
              >
                No
              </Button>
            </div>
          )}
        </div> */}

          {/* Section 6 */}

          <div
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="380"
            data-aos-easing="ease-out"
            className="lowerContent__section6"
          >
            <h3 className="section__taglines">
              We don’t see SQ, are we right?
            </h3>
            <img
              className="screen3__image"
              className="screen3__image"
              src={importedData?.link5}
              alt="Image is missing"
            />
            <div className="section6__btns">
              <Button
                onClick={() => {
                  setSqPresence("YES");
                }}
                className={sqPresence === "YES" ? "selected-btn" : "btn"}
                id="section6__yesBtn"
              >
                Yes
              </Button>
              <Button
                onClick={() => {
                  setSqPresence("NO");
                }}
                className={sqPresence === "NO" ? "selected-btn" : "btn"}
                id="section6__noBtn"
              >
                No
              </Button>
            </div>
          </div>
          {/* <Link to="imageslist"> */}
          <Button
            className="submit__btn"
            variant="outlined"
            onClick={onPressSubmit}
          >
            <span>Submit</span>
          </Button>
          {/* </Link> */}
        </div>
      </div>
      <Backdrop
        style={{
          zIndex: 1,
          color: "#fff",
        }}
        open={isSubmitting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Screen3;

export const postMockApi = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

  return promise;
};
