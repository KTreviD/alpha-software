// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   Row,
//   Col,
//   CardBody,
//   Card,
//   Alert,
//   Container,
//   Input,
//   Label,
//   Form,
//   FormFeedback,
//   Button,
//   Spinner,
// } from "reactstrap";

// // Formik Validation
// import * as Yup from "yup";
// import { useFormik } from "formik";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // action
// import { registerUser, resetRegisterFlag } from "@slices/thunks";

// //redux
// import { useSelector, useDispatch } from "react-redux";

// import Link from "next/link";

// //import images
// const logoLight = "/images/logo-alpha.png";
// import ParticlesAuth from "../ParticlesAuth";
// import { createSelector } from "reselect";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// const Register = () => {
//   const router = useRouter();
//   const dispatch: any = useDispatch();
//   const [loader, setLoader] = useState<boolean>(false);

//   const validation = useFormik({
//     // enableReinitialize : use this flag when initial values needs to be changed
//     enableReinitialize: true,

//     initialValues: {
//       email: "",
//       first_name: "",
//       password: "",
//       confirm_password: "",
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().required("Please Enter Your Email"),
//       first_name: Yup.string().required("Please Enter Your Username"),
//       password: Yup.string().required("Please Enter Your Password"),
//       confirm_password: Yup.string()
//         .oneOf([Yup.ref("password"), ""])
//         .required("Confirm Password is required"),
//     }),
//     onSubmit: values => {
//       dispatch(registerUser(values));
//       setLoader(true);
//     },
//   });

//   const selectLayoutState = (state: any) => state.Account;
//   const registerdatatype = createSelector(selectLayoutState, account => ({
//     success: account.success,
//     error: account.error,
//   }));
//   // Inside your component
//   const { error, success } = useSelector(registerdatatype);

//   useEffect(() => {
//     if (success) {
//       setTimeout(() => router.push("/login"), 3000);
//     }

//     setTimeout(() => {
//       dispatch(resetRegisterFlag());
//     }, 3000);
//   }, [dispatch, success, error, router]);

//   document.title =
//     "Basic SignUp | Velzon - Next.js TypeScript Admin & Dashboard Template";

//   return (
//     <React.Fragment>
//       <ParticlesAuth>
//         <div className="auth-page-content mt-lg-5">
//           <Container>
//             <Row className="justify-content-center">
//               <Col md={8} lg={6} xl={5}>
//                 <Card className="mt-5">
//                   <CardBody className="p-4">
//                     <div className="text-center text-white-50">
//                       <div>
//                         <Link href="/" className="d-inline-block auth-logo">
//                           <Image
//                             src={logoLight}
//                             alt=""
//                             height={80}
//                             width={80}
//                           />
//                         </Link>
//                       </div>
//                     </div>
//                     <div className="text-center mt-2">
//                       <h5 className="text-primary">Create New Account</h5>
//                       <p className="text-muted">
//                         Get your free Alpha Solutions account now
//                       </p>
//                     </div>
//                     <div className="p-2 mt-4">
//                       <Form
//                         onSubmit={e => {
//                           e.preventDefault();
//                           validation.handleSubmit();
//                           return false;
//                         }}
//                         className="needs-validation"
//                         action="#"
//                       >
//                         {success && success ? (
//                           <>
//                             {toast("Your Redirect To Login Page...", {
//                               position: "top-right",
//                               hideProgressBar: false,
//                               className: "bg-success text-white",
//                               progress: undefined,
//                               toastId: "",
//                             })}
//                             <ToastContainer autoClose={2000} limit={1} />
//                             <Alert color="success">
//                               Register User Successfully and Your Redirect To
//                               Login Page...
//                             </Alert>
//                           </>
//                         ) : null}
//                         {error && error ? (
//                           <Alert color="danger">
//                             <div>
//                               Email has been Register Before, Please Use Another
//                               Email Address...{" "}
//                             </div>
//                           </Alert>
//                         ) : null}
//                         <div className="mb-3">
//                           <Label htmlFor="useremail" className="form-label">
//                             Email <span className="text-danger">*</span>
//                           </Label>
//                           <Input
//                             id="email"
//                             name="email"
//                             className="form-control"
//                             placeholder="Enter email address"
//                             type="email"
//                             onChange={validation.handleChange}
//                             onBlur={validation.handleBlur}
//                             value={validation.values.email || ""}
//                             invalid={
//                               validation.touched.email &&
//                               validation.errors.email
//                                 ? true
//                                 : false
//                             }
//                           />
//                           {validation.touched.email &&
//                           validation.errors.email ? (
//                             <FormFeedback type="invalid">
//                               <div>{validation.errors.email}</div>
//                             </FormFeedback>
//                           ) : null}
//                         </div>
//                         <div className="mb-3">
//                           <Label htmlFor="username" className="form-label">
//                             Username <span className="text-danger">*</span>
//                           </Label>
//                           <Input
//                             name="first_name"
//                             type="text"
//                             placeholder="Enter username"
//                             onChange={validation.handleChange}
//                             onBlur={validation.handleBlur}
//                             value={validation.values.first_name || ""}
//                             invalid={
//                               validation.touched.first_name &&
//                               validation.errors.first_name
//                                 ? true
//                                 : false
//                             }
//                           />
//                           {validation.touched.first_name &&
//                           validation.errors.first_name ? (
//                             <FormFeedback type="invalid">
//                               <div>{validation.errors.first_name}</div>
//                             </FormFeedback>
//                           ) : null}
//                         </div>
//                         <div className="mb-3">
//                           <Label htmlFor="userpassword" className="form-label">
//                             Password <span className="text-danger">*</span>
//                           </Label>
//                           <Input
//                             name="password"
//                             type="password"
//                             placeholder="Enter Password"
//                             onChange={validation.handleChange}
//                             onBlur={validation.handleBlur}
//                             value={validation.values.password || ""}
//                             invalid={
//                               validation.touched.password &&
//                               validation.errors.password
//                                 ? true
//                                 : false
//                             }
//                           />
//                           {validation.touched.password &&
//                           validation.errors.password ? (
//                             <FormFeedback type="invalid">
//                               <div>{validation.errors.password}</div>
//                             </FormFeedback>
//                           ) : null}
//                         </div>
//                         <div className="mb-2">
//                           <Label
//                             htmlFor="confirmPassword"
//                             className="form-label"
//                           >
//                             Confirm Password{" "}
//                             <span className="text-danger">*</span>
//                           </Label>
//                           <Input
//                             name="confirm_password"
//                             type="password"
//                             placeholder="Confirm Password"
//                             onChange={validation.handleChange}
//                             onBlur={validation.handleBlur}
//                             value={validation.values.confirm_password || ""}
//                             invalid={
//                               validation.touched.confirm_password &&
//                               validation.errors.confirm_password
//                                 ? true
//                                 : false
//                             }
//                           />
//                           {validation.touched.confirm_password &&
//                           validation.errors.confirm_password ? (
//                             <FormFeedback type="invalid">
//                               <div>{validation.errors.confirm_password}</div>
//                             </FormFeedback>
//                           ) : null}
//                         </div>
//                         <div className="mb-4">
//                           <p className="mb-0 fs-12 text-muted fst-italic">
//                             By registering you agree to the{" "}
//                             <Link
//                               href="#"
//                               className="text-primary text-decoration-underline fst-normal fw-medium"
//                             >
//                               Alpha Software Terms of Use
//                             </Link>
//                           </p>
//                         </div>
//                         <div className="mt-4">
//                           <Button
//                             color="danger"
//                             className="w-100"
//                             type="submit"
//                             disabled={loader && true}
//                           >
//                             {loader && (
//                               <Spinner size="sm" className="me-2">
//                                 {" "}
//                                 Loading...{" "}
//                               </Spinner>
//                             )}
//                             Sign Up
//                           </Button>
//                         </div>
//                       </Form>
//                     </div>
//                   </CardBody>
//                 </Card>
//                 <div className="mt-4 text-center">
//                   <p className="mb-0">
//                     Already have an account ?{" "}
//                     <Link
//                       href="/auth/login"
//                       className="fw-semibold text-primary text-decoration-underline"
//                     >
//                       {" "}
//                       Sign in{" "}
//                     </Link>{" "}
//                   </p>
//                 </div>
//               </Col>
//             </Row>
//           </Container>
//         </div>
//       </ParticlesAuth>
//     </React.Fragment>
//   );
// };

// export default Register;
"use client";
import { useEffect, useState } from "react";
import { Registration } from "@ory/elements-react/theme";
import { getRegistrationFlow, OryPageParams } from "@ory/nextjs/app";
import config from "@/ory.config";

export default function RegistrationPage(props: OryPageParams) {
  const [flow, setFlow] = useState<any>(null);

  useEffect(() => {
    async function initFlow() {
      const f = await getRegistrationFlow(config, props.searchParams);
      console.log("------------------");
      console.log({ f });
      console.log("------------------");
      setFlow(f);
    }
    initFlow();
  }, [props.searchParams]);
  console.log({ flow });
  // Después del registro: obtener sesión y crear usuario en tu backend
  useEffect(() => {
    async function sendSessionToBackend() {
      if (!flow) return;

      try {
        const sessionRes = await fetch(`${process.env.BACKEND_URL}/api/me`, {
          credentials: "include", // importante para cookies de Ory
        });
        if (!sessionRes.ok) return;

        const sessionData = await sessionRes.json();

        // Crear usuario en tu DB
        await fetch(`${process.env.BACKEND_URL}/api/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            oryId: sessionData.oryId,
            email: sessionData.traits.email,
            name: sessionData.traits.name,
          }),
        });
      } catch (err) {
        console.error(err);
      }
    }

    sendSessionToBackend();
  }, [flow]);

  if (!flow) return <p>Cargando...</p>;

  return <Registration flow={flow} config={config} components={{ Card: {} }} />;
}
