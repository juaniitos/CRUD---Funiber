import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import axios from 'axios';

const Formulario = () => {
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [names, setNames] = useState("");
  const [lastNames, setLastNames] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [comments, setComments] = useState("");
  const [acceptPrivacyPolicy, setAcceptPrivacyPolicy] = useState(false);
  const endpoint = 'http://localhost:8000/api/form';

  const areasAndPrograms = [
    {
      area: "Department of Environment and Sustainability",
      programs: ["Master's Degree in Environmental Management and Audits"]
    },
    {
      area: "Department of Innovation, Business and New Technologies",
      programs: [
        "Master's Degree in Strategic Management with a Specialization in Management",
        "Master's Degree in Strategic Management with a Specialization in Information Technologies",
        "Master's Degree in Strategic Management with a specialization in Telecommunications"
      ]
    },
    {
      area: "Department of Language, Education and Communications Sciences",
      programs: [
        "Master's Degree in Training of Teachers of Spanish as a Foreign Language",
        "Master's Degree in Education with a specialization in Higher Education",
        "Master's Degree in Education with a specialization in Organization and Management of Educational Centers"
      ]
    },
    {
      area: "Department of Health Sciences",
      programs: [
        "Master's Degree in Physical Activity: Training and Sports Management",
        "Master's Degree in Naturopathic Sciences"
      ]
    },
    {
      area: "Department of Projects",
      programs: [
        "Master's Degree in Project Design, Management and Direction",
        "Master's Degree in Design, Management and Project Management with specialization in Innovation and Products",
        "Master's Degree in Design, Management and Project Management with a specialization in Architecture and Urban Planning"
      ]
    }
  ];

  const handleAreaChange = (event) => {
    const selectedArea = event.target.value;
    setSelectedArea(selectedArea);
    setSelectedProgram("");
  };

  const isFormValid = () => {
    if (!selectedArea || !selectedProgram) {
      return false;
    }
    if (!names || !lastNames || !email || !phone || !country || !state || !city) {
      return false;
    }
    if (!acceptPrivacyPolicy) {
      return false;
    }  else {
      return true; 
    }
  };

  const store = async (e) => {
    e.preventDefault()

    if (!isFormValid()) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    try {
      await axios.post(endpoint, {
        area: selectedArea, 
        program: selectedProgram, 
        names: names,
        last_names: lastNames,
        email: email,
        phone: phone,
        country: country,
        state: state,
        city: city,
        comments: comments,
        privacy_policy: acceptPrivacyPolicy,
      });
  
      setSelectedArea("");
      setSelectedProgram("");
      setNames("");
      setLastNames("");
      setEmail("");
      setPhone("");
      setCountry("");
      setState("");
      setCity("");
      setComments("");
      setAcceptPrivacyPolicy(false);

      console.log("¡Formulario enviado con éxito!");

    } catch (error) {
      console.error("Error al enviar el formulario: ", error);
    }
  }

  return (
    <div className="formulario">
      <h3>Request Information</h3>
      <Form method="post" >
        <Row className="mb-2">
          <Col>
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Knowledge Areas
            </label>
            <select
              id="area"
              name="area"
              className="form-select form-select-sm"
              aria-label="Small select example"
              onChange={handleAreaChange}
              value={selectedArea}
              required
            >
              <option value="" disabled>
                Select an area
              </option>
              {areasAndPrograms.map((areaObj, index) => (
                <option key={index} value={areaObj.area}>
                  {areaObj.area}
                </option>
              ))}
            </select>
          </Col>
          <Col>
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Program
            </label>
            <select
              id="program"
              name="program"
              className="form-select form-select-sm"
              aria-label="Small select example"
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a program
              </option>
              {areasAndPrograms
                .find((areaObj) => areaObj.area === selectedArea)
                ?.programs.map((program, index) => (
                  <option key={index} value={program}>
                    {program}
                  </option>
                ))}
            </select>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Names
            </label>
            <input
              className="form-control form-control-sm"
              name="names"
              type="text"
              placeholder="Names"
              aria-label=".form-control-sm example"
              value={names}
              onChange={(e) => setNames(e.target.value)}
              required
            />
          </Col>
          <Col>
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Last names
            </label>
            <input
              className="form-control form-control-sm"
              name="lastNames"
              type="text"
              placeholder="Last names"
              aria-label=".form-control-sm example"
              value={lastNames}
              onChange={(e) => setLastNames(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <label htmlFor="exampleFormControlInput1" className="form-label">
              E-mail
            </label>
            <input
              className="form-control form-control-sm"
              name="email"
              type="text"
              placeholder="E-mail"
              aria-label=".form-control-sm example"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Col>
          <Col>
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Phone
            </label>
            <input
              className="form-control form-control-sm"
              name="phone"
              type="text"
              placeholder="Phone"
              aria-label=".form-control-sm example"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Country of residence
            </label>
            <CountryDropdown
              className="form-select form-select-sm"
              name="country"
              value={country}
              onChange={(val) => setCountry(val)}
              required
            />
          </Col>
          <Col>
            <label htmlFor="exampleFormControlInput1" className="form-label">
              State
            </label>
            <RegionDropdown
              className="form-select form-select-sm"
              name="region"
              country={country}
              value={state}
              onChange={(val) => setState(val)}
              blankOptionLabel="Select state"
              required
            />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <label htmlFor="exampleFormControlInput1" className="form-label">
              City
            </label>
            <input
              className="form-select form-select-sm"
              name="city"
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Col>
          <Col>
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Comments
            </label>
            <textarea
              className="form-control"
              name="comments"
              placeholder="Comments"
              id="floatingTextarea"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            ></textarea>
          </Col>
        </Row>
      </Form>
      <div className="form-check">
        <input
          className="form-check-input"
          name="privacy"
          type="checkbox"
          value={acceptPrivacyPolicy}
          id="flexCheckDefault"
          onChange={(e) => setAcceptPrivacyPolicy(e.target.checked)}
          required
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          I accept the <span style={{ color: "blue" }}>privacy policy</span>
        </label>
      </div>
      <div className="submit">
        <button type="submit" className="btn btn-primary" onClick={store}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-send-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"
            />
          </svg>{" "}
          Send
        </button>
      </div>
    </div>
  );
};

export default Formulario;
