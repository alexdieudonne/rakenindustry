import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardText } from "reactstrap";
import { detailsUser, signout, updateUser } from "../../../../redux/actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../../../../redux/constants/userConstants";
import Breadcrumbs from "../../../../utils/Breadcrumb";
import { handleChange, handleSubmitUpdate } from "../../../../utils/validator";
import NavigationLinks from "../navigation-links";
import '../styles.css'
import './components/styles.css'

function AccountInformation() {

  const [state, setState] = React.useState({
    firstname: null as null | string,
    lastname: null,
    email: null,
    phone_number: null,
    formErrors: {
      firstname: "",
      lastname: "",
      email: "",
      phone_number: ""
    }
  })
  const dispatch = useDispatch();
  //@ts-ignore
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  //@ts-ignore
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const setErrors = (error: any) => {
    //console.log(error.errors)
    setState({ ...state, formErrors: error.errors })
  }


  const handleChangeValue = (val: any) => {
    // console.log(val.target)
    handleChange(val, state.formErrors, state, setState)
  }

  useEffect(() => {

    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {

      setState({
        ...state,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone_number: user.phone_number,
      })
      // setName(user.name);
      // setEmail(user.email);

    }

  }, [dispatch, userInfo._id, user])

  const signoutHandler = () => {
    dispatch(signout());
  };


  const updateProfile = () => {
    dispatch(updateUser(state))
  }

  const handleSubmit = (e: any) => {
    handleSubmitUpdate(e, state, setErrors, updateProfile)
  }

  return (
    <div className='body-eshop'>
      <div className='breadcrumb-style'>
        <Breadcrumbs />
      </div>
      <div className='header-account'>

        {loading ? <div></div> : error ? <div></div> :

          <span>Bienvenue, {userInfo?.lastname}</span>}
        <a href='#' onClick={() => signoutHandler()}><span>Deconnexion</span></a>
      </div>
      <NavigationLinks>
        <aside className="col-md-9 col-sm-8 form-content">
          <div className="account-wrap cart-box">
            <form onSubmit={handleSubmit} className="gray-control">
              <div className="row">
                <div className="form-group col-sm-6">
                  <label> Prénom </label>
                  <input value={state.firstname as any} onChange={handleChangeValue} name="firstname" type="text" className="form-control" />

                  {state.formErrors.firstname.length > 0 ? <Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc', margin: '1rem 0' }}>
                    <CardText color='red' style={{ color: 'red' }}>{state.formErrors.firstname}</CardText>
                  </Card> : null}
                </div>

                <div className="form-group col-sm-6">
                  <label> Nom </label>
                  <input value={state.lastname as any} onChange={handleChangeValue} name="lastname" type="text" className="form-control" />
                  {state.formErrors.lastname.length > 0 ? <Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc', margin: '1rem 0' }}>
                    <CardText color='red' style={{ color: 'red' }}>{state.formErrors.lastname}</CardText>
                  </Card> : null}
                </div>
                <div className="form-group col-sm-6">
                  <label> Email </label>

                  <input value={state.email as any} onChange={handleChangeValue} name="email" type="text" className="form-control" />
                  {state.formErrors.email.length > 0 ? <Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc', margin: '1rem 0' }}>
                    <CardText color='red' style={{ color: 'red' }}>{state.formErrors.email}</CardText>
                  </Card> : null}
                </div>

                <div className="form-group col-sm-6">
                  <label> Numéro de téléphone </label>
                  <input value={state.phone_number as any} onChange={handleChangeValue} name="phone_number" type="number" className="form-control" />
                  {state.formErrors.phone_number.length > 0 ? <Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc', margin: '1rem 0' }}>
                    <CardText color='red' style={{ color: 'red' }}>{state.formErrors.phone_number}</CardText>
                  </Card> : null}
                </div>


                <a onClick={() => window.history.back()} href='#'><i className="fal fa-arrow-left"></i> retourner aux liens</a>
                <div className="pt-20 col-sm-12">
                  <button type="submit" className="btn btn-black update-btn"> <b> Mettre a jour </b> </button>
                </div>
              </div>
            </form>
          </div>
        </aside>


      </NavigationLinks>
    </div>
  )
}

export default AccountInformation


