import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { Card, CardText } from "reactstrap";
import { signout, updateUser } from "../../../../redux/actions/userActions";
import Breadcrumbs from "../../../../utils/Breadcrumb";
import { handleChange, handleSubmitPassword } from "../../../../utils/validator";
import NavigationLinks from "../navigation-links";
import '../styles.css'
import './components/styles.css'



function ChangePassword() {
    const [state, setState] = React.useState({
        password: null as null | string,
        c_password: null,
        formErrors: {
            password: "",
            c_password: ""
        }
    })


    const setErrors = (error: any) => {
        //  console.log(error.errors)
        setState({ ...state, formErrors: error.errors })
    }


    const handleChangeValue = (val: any) => {
        // console.log(val.target)
        handleChange(val, state.formErrors, state, setState)
    }

    const dispatch = useDispatch();

    const changePassword = () => {
        dispatch(updateUser({ password: state.password }))
    }


    const handleSubmit = (e: any) => {
        handleSubmitPassword(e, state, setErrors, changePassword)
    }

    const signoutHandler = () => {
        dispatch(signout());
    };


    //@ts-ignore
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin


    return (
        <div className='body-eshop'>
            <div className='breadcrumb-style'>
                <Breadcrumbs name="Changer le mot de passe"/>
            </div>
            <div className='header-account'>
                {loading ? <div></div> : error ? <div></div> :
                    <span>Bienvenue, {userInfo?.lastname}</span>}
                <a href='#' onClick={() => signoutHandler()}><span>Deconnexion</span></a>
            </div>

            <NavigationLinks>
                <aside className="col-md-9 col-sm-8 form-content">
                    <div className="account-wrap cart-box">
                        <form onSubmit={handleSubmit} noValidate className="gray-control">
                            <div className="row">
                                <div className="form-group col-sm-6">
                                    <label> * Mot de passe </label>
                                    <input onChange={handleChangeValue} name="password" required className="form-control" type="password" />
                                    {state.formErrors.password.length > 0 ? <Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc', margin: '1rem 0' }}>
                                        <CardText color='red' style={{ color: 'red' }}>{state.formErrors.password}</CardText>
                                    </Card> : null}
                                </div>
                                <div className="form-group col-sm-6">
                                    <label> * Confirmation de mot de passe </label>
                                    <input onChange={handleChangeValue} name="c_password" className="form-control" required type="password" />
                                    {state.formErrors.c_password.length > 0 ? <Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc', margin: '1rem 0' }}>
                                        <CardText color='red' style={{ color: 'red' }}>{state.formErrors.c_password}</CardText>
                                    </Card> : null}
                                </div>
                                <div className='link-back'>
                                    <a onClick={() => window.history.back()} href='#'><i className="fal fa-arrow-left"></i> retourner aux liens</a>
                                </div>
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

export default ChangePassword
