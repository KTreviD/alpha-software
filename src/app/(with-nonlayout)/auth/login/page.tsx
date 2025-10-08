// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Card,
//   CardBody,
//   Col,
//   Container,
//   Input,
//   Label,
//   Row,
//   Button,
//   Form,
//   FormFeedback,
//   Alert,
//   Spinner,
// } from "reactstrap";
// import ParticlesAuth from "../ParticlesAuth";
// import { useRouter } from "next/navigation";

// import { useSelector, useDispatch } from "react-redux";
// import Link from "next/link";
// import * as Yup from "yup";
// import { useFormik } from "formik";

// import { loginUser, socialLogin, resetLoginFlag } from "@slices/thunks";
// const logoAlpha = "/images/logo-alpha.png";
// import { createSelector } from "reselect";
// import Image from "next/image";

// const Login = () => {
//   const dispatch: any = useDispatch();
//   const router = useRouter();

//   const selectLayoutState = (state: any) => state;
//   const loginpageData = createSelector(selectLayoutState, state => ({
//     user: state.Account.user,
//     error: state.Login.error,
//     errorMsg: state.Login.errorMsg,
//   }));

//   const { user, error, errorMsg } = useSelector(loginpageData);

//   const [userLogin, setUserLogin] = useState<any>([]);
//   const [passwordShow, setPasswordShow] = useState<boolean>(false);
//   const [loader, setLoader] = useState<boolean>(false);

//   useEffect(() => {
//     if (user && user) {
//       const updatedUserData =
//         process.env.NEXT_PUBLIC_DEFAULTAUTH === "firebase"
//           ? user.multiFactor.user.email
//           : user.email;

//       const updatedUserPassword =
//         process.env.NEXT_PUBLIC_DEFAULTAUTH === "firebase"
//           ? ""
//           : user.confirm_password;
//       setUserLogin({
//         email: updatedUserData,
//         password: updatedUserPassword,
//       });
//     }
//   }, [user]);

//   const validation: any = useFormik({
//     enableReinitialize: true,
//     initialValues: {
//       email: userLogin.email || "carloscharlie4td@hotmail.com",
//       password: userLogin.password || "Arantza123!",
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().required("Please Enter Your Email Address"),
//       password: Yup.string().required("Please Enter Your Password"),
//     }),
//     onSubmit: values => {
//       dispatch(loginUser(values, router));
//       setLoader(true);
//     },
//   });

//   useEffect(() => {
//     if (errorMsg) {
//       setTimeout(() => {
//         dispatch(resetLoginFlag());
//         setLoader(false);
//       }, 3000);
//     }
//   }, [dispatch, errorMsg]);

//   return (
//     <React.Fragment>
//       <ParticlesAuth>
//         <div className="auth-page-content mt-lg-5">
//           <Container>
//             <Row className="justify-content-center">
//               <Col md={8} lg={6} xl={5}>
//                 <Card className="mt-5 card-bg-fill">
//                   <CardBody className="p-4">
//                     <div className="text-center text-white-50">
//                       <div>
//                         <Link href="/" className="d-inline-block auth-logo">
//                           <Image
//                             src={logoAlpha}
//                             alt=""
//                             height={80}
//                             width={80}
//                           />
//                         </Link>
//                       </div>
//                     </div>
//                     <div className="text-center mt-2">
//                       <h5 className="text-primary">Welcome</h5>
//                       <p className="text-muted">
//                         Log in to Alpha Software to continue.
//                       </p>
//                     </div>
//                     {error && <Alert color="danger">{error}</Alert>}
//                     <div className="p-2 mt-4">
//                       <Form
//                         onSubmit={e => {
//                           e.preventDefault();
//                           validation.handleSubmit();
//                           return false;
//                         }}
//                       >
//                         <div className="mb-3">
//                           <Label htmlFor="email" className="form-label">
//                             Email
//                           </Label>
//                           <Input
//                             name="email"
//                             className="form-control"
//                             placeholder="Enter email address"
//                             type="email"
//                             onChange={validation.handleChange}
//                             onBlur={validation.handleBlur}
//                             value={validation.values.email || ""}
//                             invalid={
//                               validation.touched.email &&
//                               !!validation.errors.email
//                             }
//                           />
//                           {validation.touched.email &&
//                             validation.errors.email && (
//                               <FormFeedback type="invalid">
//                                 {validation.errors.email}
//                               </FormFeedback>
//                             )}
//                         </div>

//                         <div className="mb-3">
//                           <div className="float-end">
//                             <Link
//                               href="/auth/forgot-password"
//                               className="text-muted"
//                             >
//                               Forgot password?
//                             </Link>
//                           </div>
//                           <Label
//                             className="form-label"
//                             htmlFor="password-input"
//                           >
//                             Password
//                           </Label>
//                           <div className="position-relative auth-pass-inputgroup mb-3">
//                             <Input
//                               name="password"
//                               value={validation.values.password || ""}
//                               type={passwordShow ? "text" : "password"}
//                               className="form-control pe-5"
//                               placeholder="Enter Password"
//                               onChange={validation.handleChange}
//                               onBlur={validation.handleBlur}
//                               invalid={
//                                 validation.touched.password &&
//                                 !!validation.errors.password
//                               }
//                             />
//                             {validation.touched.password &&
//                               validation.errors.password && (
//                                 <FormFeedback type="invalid">
//                                   {validation.errors.password}
//                                 </FormFeedback>
//                               )}
//                             <button
//                               className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
//                               type="button"
//                               id="password-addon"
//                               onClick={() => setPasswordShow(!passwordShow)}
//                             >
//                               <i className="ri-eye-fill align-middle"></i>
//                             </button>
//                           </div>
//                         </div>

//                         <div className="form-check">
//                           <Input
//                             className="form-check-input"
//                             type="checkbox"
//                             id="auth-remember-check"
//                           />
//                           <Label
//                             className="form-check-label"
//                             htmlFor="auth-remember-check"
//                           >
//                             Remember me
//                           </Label>
//                         </div>

//                         <div className="mt-4">
//                           <Button
//                             color="danger"
//                             disabled={loader}
//                             className="btn btn-danger w-100"
//                             type="submit"
//                           >
//                             {loader && (
//                               <Spinner size="sm" className="me-2">
//                                 Loading...
//                               </Spinner>
//                             )}
//                             Sign In
//                           </Button>
//                         </div>
//                       </Form>
//                     </div>
//                   </CardBody>
//                 </Card>
//                 <div className="mt-4 text-center">
//                   <p className="mb-0">
//                     Don't have an account?{" "}
//                     <Link
//                       href="/auth/register"
//                       className="fw-semibold text-primary text-decoration-underline"
//                     >
//                       Sign up
//                     </Link>
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

// export default Login;
import { Login } from "@ory/elements-react/theme";
import { getLoginFlow, OryPageParams } from "@ory/nextjs/app";

import config from "@/ory.config";

export default async function LoginPage(props: OryPageParams) {
  const flow = await getLoginFlow(config, props.searchParams);
  console.log({ flow });
  if (!flow) {
    return null;
  }

  return (
    <Login
      flow={flow}
      config={config}
      components={{
        Card: {},
      }}
    />
  );
}
