import React, { useEffect } from 'react';
import './components/styles.css'
import './components/util.css'
import Navbar from '../../utils/Navbar'
import Footer from '../../utils/Footer'
import Breadcrumbs from '../../utils/Breadcrumb'
import { handleChangeLogin, handleSubmitLogin } from '../../utils/Functions'
import { Collapse, Button, CardBody, Card, Label, Col, CardTitle, CardText } from 'reactstrap';
import { encrypt, decrypt } from '../../utils/secureStorage'
import { useSelector, useDispatch } from 'react-redux'
import { register, signin } from '../../redux/actions/userActions';
import { isUndefined } from 'util';


export default function Login() {

  const [viewPassword, setViewPassword] = React.useState(false);
  const [viewSuccess, setViewSuccess] = React.useState(false);

  const [state, setState] = React.useState({
    email: null,
    password: null,
    formErrors: {
      email: "",
      password: "",
    }
  })

  const dispatch = useDispatch()
  //@ts-ignore
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;
  const errorEmail = error ? error.email : null
  const errorPassword = error ? error.password : null

  const setErrors = (error: loginErrorsProps) => {
    setState({ ...state, formErrors: { ...state.formErrors, email: error.email, password: error.password } })
  }

  const loginUser = (user: userPROPS) => {
    // console.log(user)



    dispatch(signin(user));
  }

  const handleSubmitForm = (e: React.FormEvent<EventTarget>) => {
    handleSubmitLogin(e, state, setErrors, loginUser)
  }

  const handleChangeText = (e: React.FormEvent<HTMLInputElement>) => {
    // console.log(e)
    handleChangeLogin(e, state.formErrors, state, setState)
  }

  const { formErrors } = state;
  const queryString = window.location.search;
  const queryDecrypted = queryString ? queryString.replace('?', '').toString() : ''
  // const hj = encrypt('fgfgfhg')
  const decr = decrypt(queryDecrypted)



  useEffect(() => {

    CardI()
  }, [])


  function removeParam() {
    window.location.href = window.location.href.split("?")[0]
  }

  const urlParams = new URLSearchParams(queryString);
  const checkout = urlParams.get('checkout')

  const CardI = () => {
    console.log(decr.replace(/['"]+/g, '') == "success", checkout)
    if (!checkout)
      if (decr)
        if (decr.replace(/['"]+/g, '') == "success") {
          setViewSuccess(true)
          setTimeout(() => {
            setViewSuccess(false)
           // removeParam()
          }, 2000)
        }
  }


  return (
    <div>
      <Navbar active />
      <div className='body-eshop'>
        <div className='breadcrumb-style'>
          <Breadcrumbs name="Connexion"/>
        </div>
        <div className="limiter">
          {viewSuccess ? <Card body style={{ borderColor: '#17cf00', backgroundColor: '#99ff8c', width: '80%', alignSelf: 'center', margin: '0 auto' }}>
            <CardText color='red' style={{ color: '#008006', textAlign: 'center' }}>Inscription réussi !</CardText>
          </Card> : null}
          <div className="container-login100">

            <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
              <form onSubmit={(e) => handleSubmitForm(e)} noValidate className="login100-form validate-form flex-sb flex-w">
                <span className="login100-form-title p-b-32">
                  Connectez-vous
					      </span>

                <div className='w-full  m-b-10'>
                  <span className="txt1 p-b-5">
                    E-mail
					      </span>
                  <div className="wrap-input100 validate-input m-b-10" data-validate="Merci d'entrer une adresse e-mail">
                    <input onChange={handleChangeText} required className="input100" type="text" name="email" datatype='email' />
                    <span className="focus-input100"></span>
                  </div>
                  {console.log(formErrors.email)}
                  {formErrors.email.length > 0 || errorEmail ? (<Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc' }}>
                    <CardText color='red' style={{ color: 'red' }}>{formErrors.email ? formErrors.email : error.email.length == 0 ? null : error.email}</CardText>
                  </Card>) : null}

                </div>

                <div className='w-full m-b-10'>
                  <span className="txt1 p-b-5">
                    Mot de passe
					      </span>
                  <div className="wrap-input100 validate-input m-b-10" data-validate="Mot de passe requis">
                    <span onClick={() => setViewPassword(!viewPassword)} className="btn-show-pass">
                      <i className={viewPassword ? "fa fa-eye" : 'fas fa-eye-slash'}></i>
                    </span>
                    <input onChange={handleChangeText} required name="password" className="input100" type={viewPassword ? 'text' : "password"} datatype='password' />
                    <span className="focus-input100"></span>
                  </div>
                  {formErrors.password.length > 0 || errorPassword ? (
                    <Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc' }}>
                      <CardText color='red' style={{ color: 'red' }}>{formErrors.password ? formErrors.password : !errorPassword ? null : errorPassword}</CardText>
                    </Card>):null}
                </div>

                <div className="flex-sb-m w-full ">


                  <div>
                    <a href="#" className="txt3">
                      Mot de passe oublié ?
							      </a>
                  </div>
                </div>

                <div className='p-b-48 w-full d-flex p-t-20 justify-content-center  align-items-center'>
                  <span className='fs-6 me-2 d-flex'>
                    Pas encore inscrit ?
                      </span>
                  <a href="/register" className="txt3 text-center">
                    Créer un compte
							      </a>
                </div>

                <div className="container-login100-form-btn">
                  <button className="login100-form-btn">
                    <i className="fal fa-lock pb-1"></i> Connexion
						      </button>
                </div>

              </form>
            </div>
          </div>
        </div>


        <div id="dropDownSelect1"></div>

        <Footer />
      </div>
    </div>
  )
}

interface loginProps {
  email: string | null
  password: string | null
  formErrors?: {
    email: string
    password: string,
  }
}

interface userPROPS {
  email: string
  password: string,
};

interface loginErrorsProps {
  email: string,
  password: string,
}