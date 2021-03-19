import React, { Component } from 'react';
import './components/styles.css'
import Navbar from '../../utils/Navbar'
import Footer from '../../utils/Footer'
import Breadcrumbs from '../../utils/Breadcrumb'
import Checkbox, { CheckboxProps, } from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { withStyles } from '@material-ui/core/styles';
import { Collapse, Button, CardBody, Card, Label, Col, CardTitle, CardText } from 'reactstrap';
import { handleChange, handleSubmit } from '../../utils/Functions'
import Radio, { RadioProps } from '@material-ui/core/Radio';
import {useSelector, useDispatch} from 'react-redux'
import { register } from '../../redux/actions/userActions';


export default function Register() {


    //@ts-ignore
    const userRegister = useSelector((state) => state.userRegister);
    const { error} = userRegister

  // checkBox state
  const [checked, setChecked] = React.useState({
    box1:false,
    box2:false,
    formError:{
      box1:""
    }
  });
  const [state, setState] = React.useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    birthday: null,
    gender: null as null | string,
    formErrors: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      birthday: '',
      gender:''
    }
  })



  const BlackRadio = withStyles({
    root: {
        color: 'grey',
        '&$checked': {
            color: 'grey',
        },
    },
    checked: {
        color: 'grey',
        '&$checked': {
            color: 'black',
        },
    },
})((props: RadioProps) => <Radio color="default" {...props} />);


  const [viewPassword, setViewPassword] = React.useState(false);

  const setErrors = (error: stateProps) => {
    setState({ ...state, formErrors:{...state.formErrors, email:error.email, password:error.password,
      firstName: error.firstName,
    lastName: error.lastName, 
    birthday:  error.birthday,
    gender: error.gender} })
  }

  const setErrorCheckBox = (error: Checked) => {
    setChecked({ ...checked, formError: error })
  }
  

  const dispatch = useDispatch()

  const addUser = (user:userPROPS)=>{
    dispatch(register(user));
  }




  const handleSubmitForm = (e: React.FormEvent<EventTarget>) => {
    handleSubmit(e, state, setErrors,checked, setErrorCheckBox,  addUser)
  }

  const handleChangeText = (e: React.FormEvent<HTMLInputElement>) => {
    // console.log(e)
    handleChange(e, state.formErrors,state, setState)
  }



  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({...state, gender:event.target.value, formErrors:{...state.formErrors, gender:''}})
  };
  const { formErrors } = state;

  const { formError } = checked;


  const BlackCheckbox = withStyles({
    root: {
      color: '#d9d9d9',
      padding: '0px 5px 0px 0px',

      '&$checked': {
        color: '#000000',
      },
      
    },
    checked: {},
  })((props: CheckboxProps) => <Checkbox color="default" {...props} />);



  return (
    <div>
      <Navbar active />
      <div className='body-eshop'>
        <div className='breadcrumb-style'>
          <Breadcrumbs />
        </div>
        <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
              <form noValidate onSubmit={(e) => handleSubmitForm(e)} className="login100-form validate-form flex-sb flex-w">
                <span className="login100-form-title p-b-32">
                  CRÉEZ VOTRE COMPTE
					      </span>

                {error?.includes("Error")   && (<Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc', marginBottom:"1.5em" }}>
                    <CardText color='red' style={{ color: 'red' }}>{error ? error  : null}</CardText>
                  </Card>) }

                <div className='w-full m-b-15'>
                    <span className="txt1 p-b-5">
                        Genre
                    </span>
                    <div className='d-flex '>
                        <div className='me-3'>
                              <BlackRadio
                                // onSubmit={(val: any) => (console.log(val))}
                                // checked={()=>setStjate({...state, gender:'Mr'})}
                                onChange={handleCheck}
                                checked={state.gender === 'Mr'}
                                value="Mr"
                                required
                                className={formErrors.gender.length > 0? 'error-required gender-check':'gender-check'}
                                color="default"
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': 'E' }}
                                size="small"
                              />
                          <span className='title-check-gender'>Homme</span>
                        </div>
                        <div className='me-3'>
                              <BlackRadio
                                // onSubmit={(val: any) => (console.log(val))}
                                // checked={()=>setState({...state, gender:'Mr'})}
                                onChange={handleCheck}
                                checked={state.gender === 'Mme'}
                                className={formErrors.gender.length > 0? 'error-required gender-check':'gender-check'}
                                value="Mme"
                                required
                                color="default"
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': 'E' }}
                                size="small"
                              />
                                  <span className='title-check-gender'>Femme</span>

                        </div>

                        <div className='me-3'>
                              <BlackRadio
                                // onSubmit={(val: any) => (console.log(val))}
                                // checked={()=>setState({...state, gender:'Mr'})}
                                onChange={handleCheck}
                                checked={state.gender === 'Other'}
                                className={formErrors.gender.length > 0? 'error-required gender-check':'gender-check'}
                                value="Other"
                                required
                                color={"primary"}
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': 'E' }}
                                size="small"
                              />
                                  <span className='title-check-gender'>Autre</span>
                        </div>
                       
                    </div>
                </div>

                <div className='w-full m-b-10'>
                  <span className="txt1 p-b-5">
                    Prénom
					      </span>
                  <div className="wrap-input100 validate-input m-b-10" data-validate="Ce champs est requis">
                    <input onChange={handleChangeText} className="input100" type="text" name="firstName" required datatype='firstname' />
                    <span className="focus-input100"></span>
                  </div>

                  {formErrors.firstName.length > 0 && (<Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc' }}>
                    <CardText color='red' style={{ color: 'red' }}>{formErrors.firstName}</CardText>
                  </Card>)}
                </div>


                <div className='w-full m-b-10'>
                  <span className="txt1 p-b-5">
                    Nom
					      </span>
                  <div className="wrap-input100 validate-input m-b-10" data-validate="Ce champs est requis">
                    <input onChange={handleChangeText} required className="input100" type="text" name="lastName" datatype='lastname' />
                    <span className="focus-input100"></span>
                  </div>
                  {formErrors.lastName.length > 0 && (<Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc' }}>
                    <CardText color='red' style={{ color: 'red' }}>{formErrors.lastName}</CardText>
                  </Card>)}
                </div>


                <div className='w-full  m-b-10'>
                  <span className="txt1 p-b-5">
                    E-mail
					      </span>
                  <div className="wrap-input100 validate-input m-b-10" data-validate="Merci d'entrer une adresse e-mail">
                    <input onChange={handleChangeText} required className="input100" type="text" name="email" datatype='email' />
                    <span className="focus-input100"></span>
                  </div>

                  {formErrors.email.length > 0 ||  error?.includes("email")    && (<Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc' }}>
                    <CardText color='red' style={{ color: 'red' }}>{formErrors.email || error ? error.includes("email") ? error : null : null}</CardText>
                  </Card>) }
                </div>

                <div className='w-full m-b-10'>
                  <span className="txt1 p-b-5">
                    Mot de passe
					      </span>
                  <div className="wrap-input100 validate-input m-b-10" data-validate="Mot de passe requis">
                    <span onClick={() => setViewPassword(!viewPassword)} className="btn-show-pass">
                      <i className={viewPassword ? "fa fa-eye" : 'fas fa-eye-slash'}></i>
                    </span>
                    <input onChange={handleChangeText} required className="input100" type={viewPassword ? 'text' : "password"} name="password" datatype='password' />
                    <span className="focus-input100"></span>
                  </div>
                  {formErrors.password.length > 0 && (<Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc' }}>
                    <CardText color='red' style={{ color: 'red' }}>{formErrors.password}</CardText>
                  </Card>)}
                </div>



                <div className='w-full m-b-10'>
                  <span className="txt1 p-b-11">
                    Date de naissance (Facultatif)
					      </span>
                  <div className="wrap-input100 validate-input m-b-10" >
                    <input  maxLength={10} onChange={handleChangeText} pattern='^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$' type="date" placeholder='DD/MM/YYYY' className="input100" name="birthday" />
                    <span className="focus-input100"></span>
                  </div>
                  {formErrors.birthday.length > 0 && (<Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc' }}>
                    <CardText color='red' style={{ color: 'red' }}>{formErrors.birthday}</CardText>
                  </Card>)}
                </div>
                <div className="flex w-full flex-column ">
                  <div className="contact100-form-checkbox">
                    {/* <input className="input-checkbox100  text-left" id="ckb1" type="checkbox" name="remember-me" /> */}
                    <FormControlLabel
                      checked={checked.box1}
                      onChange={() => setChecked({...checked, box1:!checked.box1})}
                      control={
                        <BlackCheckbox
                          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                          checkedIcon={<CheckBoxIcon fontSize="small" />}
                          name="checkedI"
                          required
                        />
                      }
                      label="J'accepte les conditions générales et la politique de confidentialité"
                    />
                    {formError.box1.length > 0 && (<FormHelperText className='error-required'>Merci d'accepter les conditions</FormHelperText>)}
                    <div style={{ height: '.7em' }} />
                    <FormControlLabel
                      checked={checked.box2}
                      onChange={() => setChecked({...checked, box2:!checked.box2})}
                      control={

                        <BlackCheckbox
                          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                          checkedIcon={<CheckBoxIcon fontSize="small" />}
                          name="checkedI"
                          
                        />
                      }
                      label="Recevoir notre newsletter"
                    />
                    <div style={{ marginLeft: '1.4rem' }}><i style={{ fontSize: '.7em' }}>(Vous pouvez vous désinscrire à tout moment. Vous trouverez pour cela nos informations de contact dans les conditions d'utilisation du site.)</i></div>
                  </div>
                </div>

                <div className='p-b-48 w-full d-flex p-t-20 justify-content-center  align-items-center'>
                  <span className='fs-6 me-2 d-flex'>
                    Vous avez déja un compte ?
                      </span>
                  <a href="/connexion" className="txt3 text-center">
                    Se connecter
							      </a>
                </div>

                <div className="container-login100-form-btn">
                  <button className="login100-form-btn">
                    <i className="fal fa-user"></i>  Inscription
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

interface stateProps {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  birthday: string,
  gender:string,
}


interface userPROPS {
    gender: string,
    firstname: string
    lastname: string, 
    email: string
    password: string, 
    birthday?: Date
    newsletter:  boolean
};

interface Checked {
    box1:string
}