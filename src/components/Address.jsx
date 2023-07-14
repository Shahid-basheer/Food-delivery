import { Formik } from "formik";
import { Row, Form, Col, Button } from "react-bootstrap";
import * as Yup from "yup";
import { state } from "../utils/data";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import { Alert } from "./Alert";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

export const FormContainer = () => {
  const currency = "USD";
  const [status, setStatus] = useState(false);
  const [show, setShow] = useState(false);
  const amount = localStorage.getItem("amount");
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
    localStorage.setItem("amount", "");
  };
  return (
    <div className="flex justify-center  bg-primary w-full h-screen">
      {!status ? (
        <div className="w-600 h-500 border-3 p-3">
          <Formik
            initialValues={{ firstName: "", lastName: "", email: "" }}
            validationSchema={Yup.object({
              firstName: Yup.string()
                .max(7, "Must be 7 characters or less")
                .required("Required"),
              lastName: Yup.string()
                .max(7, "Must be 7 characters or less")
                .required("Required"),
              city: Yup.string().required("Required"),
              state: Yup.string().required("Required"),
              zip: Yup.string().required("Required"),
              address: Yup.string().required("Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setStatus(true);
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>FirstName</Form.Label>
                    <Form.Control
                      type="text"
                      {...formik.getFieldProps("firstName")}
                      placeholder="FirstName"
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <div className="text-red-400 p-2">
                        {formik.errors.firstName}
                      </div>
                    ) : null}
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>LastName</Form.Label>
                    <Form.Control
                      type="text"
                      {...formik.getFieldProps("lastName")}
                      placeholder="LastName"
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <div className="text-red-400 p-2">
                        {formik.errors.lastName}
                      </div>
                    ) : null}
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    {...formik.getFieldProps("address")}
                    placeholder="1234 Main St"
                  />
                  {formik.touched.address && formik.errors.address ? (
                    <div className="text-red-400 p-2">
                      {formik.errors.address}
                    </div>
                  ) : null}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress2">
                  <Form.Label>Address 2</Form.Label>
                  <Form.Control placeholder="Apartment, studio, or floor" />
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control {...formik.getFieldProps("city")} />
                    {formik.touched.city && formik.errors.city ? (
                      <div className="text-red-400 p-2">
                        {formik.errors.city}
                      </div>
                    ) : null}
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Select size="md" {...formik.getFieldProps("state")}>
                      {Object.values(state).map((states) => (
                        <option>{Object.values(states)}</option>
                      ))}
                    </Form.Select>
                    {formik.touched.state && formik.errors.state ? (
                      <div className="text-red-400 p-2">
                        {formik.errors.state}
                      </div>
                    ) : null}
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control {...formik.getFieldProps("zip")} />
                    {formik.touched.zip && formik.errors.zip ? (
                      <div className="text-red-400 p-2">
                        {formik.errors.zip}
                      </div>
                    ) : null}
                  </Form.Group>
                </Row>

                <Button
                  className="float-right bg-emerald-500 hover:bg-emerald-600 !border-emerald-500"
                  type="submit"
                >
                  Order
                </Button>
              </form>
            )}
          </Formik>
        </div>
      ) : (
        <PayPalScriptProvider
          options={{
            clientId: "test",
          }}
        >
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              });
            }}
            onApprove={async (data, action) => {
              return await action.order.capture().then(() => {
                setShow(true);
                clearCart();
              });
            }}
          />
        </PayPalScriptProvider>
      )}
      <Alert show={show} setShow={setShow} />
    </div>
  );
};
