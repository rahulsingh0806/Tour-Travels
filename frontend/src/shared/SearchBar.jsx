
// import React, { useRef } from "react";
// import "./search-bar.css";
// import {  Form, FormGroup } from "reactstrap";
// import { BASE_URL } from "./../utils/config";
// import { useNavigate } from "react-router-dom";

// const SearchBar = () => {
//   const locationRef = useRef("");
//   const distanceRef = useRef(0);
//   const maxGroupSizeRef = useRef(0);
//   const navigate = useNavigate();

//   const searchHandler = async () => {
//     const location = locationRef.current.value;
//     const distance = distanceRef.current.value;
//     const maxGroupSize = maxGroupSizeRef.current.value;

//     if (location === "" || distance === "" || maxGroupSize === "") {
//       return alert("All fields are required!");
//     }

//     const res = await fetch(
//       `${BASE_URL}/tours/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`
//     );

//     if (!res.ok) alert("Something went wrong");

//     const result = await res.json();

//     navigate(
//       `/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`,
//       { state: result.data }
//     );
//   };

//   return (
//     <div className="search_bar">
//       <Form className="d-flex align-items-center gap-4">
//         <FormGroup className="d-flex gap-3 form_group form_group-fast">
//           <span>
//             <i className="ri-map-pin-line"></i>
//           </span>
//           <div>
//             <h6>Location</h6>
//             <input
//               type="text"
//               placeholder="Where are you going?"
//               ref={locationRef}
//             />
//           </div>
//         </FormGroup>
//         <FormGroup className="d-flex gap-3 form_group form_group-fast">
//           <span>
//             <i className="ri-map-pin-time-line"></i>
//           </span>
//           <div>
//             <h6>Distance</h6>
//             <input type="number" placeholder="Distance k/m" ref={distanceRef} />
//           </div>
//         </FormGroup>
//         <FormGroup className="d-flex gap-3 form_group form_group-last">
//           <span>
//             <i className="ri-group-line"></i>
//           </span>
//           <div>
//             <h6>Max People</h6>
//             <input type="number" placeholder="0" ref={maxGroupSizeRef} />
//           </div>
//         </FormGroup>
//         <span className="search_icon" type="submit" onClick={searchHandler}>
//           <i className="ri-search-line"></i>
//         </span>
//       </Form>
//     </div>
//   );
// };

// export default SearchBar;

import React, { useRef } from "react";
import "./search-bar.css";
import { Form, FormGroup, Button, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./../utils/config";

const SearchBar = () => {
  const locationRef = useRef("");
  const distanceRef = useRef(null);
  const maxGroupSizeRef = useRef(null);
  const navigate = useNavigate();

  const searchHandler = async (e) => {
    e.preventDefault();

    const location = locationRef.current.value;
    const distance = distanceRef.current.value || 0;
    const maxGroupSize = maxGroupSizeRef.current.value || 0;

    if (!location || distance <= 0 || maxGroupSize <= 0) {
      return alert("All fields are required and must be greater than zero!");
    }

    try {
      const res = await fetch(
        `${BASE_URL}/tours/search/getTourBySearch?city=${location}&distance<=${distance}&maxGroupSize<=${maxGroupSize}`
      );

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const result = await res.json();
      navigate(
        `/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`,
        { state: result.data }
      );
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="search_bar">
      <Form className="d-flex align-items-center gap-4" onSubmit={searchHandler}>
        <FormGroup className="d-flex gap-3 form_group form_group-fast">
          <span>
            <i className="ri-map-pin-line"></i>
          </span>
          <div>
            <h6>Location</h6>
            <Input
              type="text"
              placeholder="Where are you going?"
              innerRef={locationRef}
              required
            />
          </div>
        </FormGroup>
        <FormGroup className="d-flex gap-3 form_group form_group-fast">
          <span>
            <i className="ri-map-pin-time-line"></i>
          </span>
          <div>
            <h6>Distance</h6>
            <Input
              type="number"
              placeholder="Distance k/m"
              innerRef={distanceRef}
              min="1"
              required
            />
          </div>
        </FormGroup>
        <FormGroup className="d-flex gap-3 form_group form_group-last">
          <span>
            <i className="ri-group-line"></i>
          </span>
          <div>
            <h6>Max People</h6>
            <Input
              type="number"
              placeholder="0"
              innerRef={maxGroupSizeRef}
              min="1"
              required
            />
          </div>
        </FormGroup>
        <Button className="search_icon" type="submit">
          <i className="ri-search-line"></i>
        </Button>
      </Form>
    </div>
  );
};

export default SearchBar;
