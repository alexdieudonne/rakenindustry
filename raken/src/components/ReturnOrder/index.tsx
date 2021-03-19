import React, { Component, useEffect } from 'react';
import './components/styles.css'
import Navbar from '../../utils/Navbar'
import Breadcrumbs from '../../utils/Breadcrumb'
import { Collapse, Button, CardBody, Card, Label, Col, CardTitle, CardText } from 'reactstrap';
import Select from 'react-select'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../../redux/actions/userActions';
import NavigationLinks from '../Account/components/navigation-links';
import { addReturn } from '../../redux/actions/returnActions';
import ReactLoading from 'react-loading';
import { detailsOrder } from '../../redux/actions/orderActions';
import * as animationData from "../../assets/sent-mail.json"
import * as animationError from "../../assets/error.json"
import Lottie from 'react-lottie';
import { MDBInput } from 'mdbreact';

export default function Returns() {


  const [state, setState] = React.useState({
    reasons: null as null | String,
    moreReason: null as null | String,
    articles: null,
    formErrors: {
      reasons: "",
      articles: "",
      moreReason: "",
      checkBox: ""
    }
  })

  const [orderUrl, setOrderUrl] = React.useState("")

  const dispatch = useDispatch()

  //@ts-ignore
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  //@ts-ignore
  const returnAdd = useSelector((state) => state.returnAdd);
  const returnOrder = returnAdd.return?.message;
  const returnLoading = returnAdd.loading;
  const returnError = returnAdd.error


  useEffect(() => {

    var url_string = new URL(document.location.href);
    var orderUrl = url_string.searchParams.get("order");
    if (orderUrl && orderUrl?.match(/^[0-9a-fA-F]{24}$/)) {
      setOrderUrl(orderUrl)
      dispatch(detailsOrder(orderUrl))
      setState({ ...state, reasons: options[0].value })

    } else {
      document.location.href = "/account/command-history"
    }
  }, [])


  const [checkedArticles, setCheckedArticles] = React.useState({ check: [""] });


  const createReturn = (returns: returnPROPS) => {
    dispatch(addReturn(returns));
  }

  const options = [
    { value: 'Article ne me convient pas', label: 'L\'article ne me convient pas ' },
    { value: 'Article différent de celui sur le site', label: 'L\'article est différent de celui sur le site' },
    { value: 'Arrivé en retard', label: 'L\'article est arrivé en retard' },
    { value: 'Qualité médiocre', label: 'L\'article à une qualité médiocre' },
    { value: 'Article reçu incorrect', label: 'L\'article reçu n\'est pas celui commandé' },
    { value: 'Article endommagé', label: 'L\'article est arrivé endommagé' },
  ]

  const customStyles = {
    menu: (provided: any, state: any) => ({
      ...provided,
      // width: "100%",
      // borderBottom: '1px dotted pink',
      color: "black",

      padding: 20,
    }),

    option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? "black"
          : isSelected
            ? "#e6e6e6bd"
            : isFocused
              ? "#b0b0b0bd"
              : null,
        color: isDisabled
          ? 'black'
          : isSelected
            ? "black"
              ? 'black'
              : '#e6e6e6bd'
            : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',

        ':active': {
          ...styles[':active'],
          backgroundColor:
            !isDisabled && (isSelected ? "#e6e6e6bd" : "#e6e6e6bd"),
        },
      };
    },

    control: (_: any, { selectProps: { width } }: any) => ({
      width: "100%",
      display: "flex",
      color: "black",
      border: "1px solid #e6e6e6bd;",
      fontSize: "1.2em"
    }),

    singleValue: (provided: any, state: any) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return { ...provided, opacity, transition };
    }
  }


  const handleSubmitForm = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    var filtered = checkedArticles.check.filter(function (el) {
      return el != "";
    });

    if (filtered.length == 0) {
      setState({ ...state, formErrors: { ...state.formErrors, checkBox: "Vous devez sélectionner un produit" } })
    } else {
      if (orderUrl) {
        createReturn({
          reasons: state.reasons,
          reason_more: state.moreReason,
          order: orderUrl,
          article: filtered
        })
      }
    }
   // console.log(filtered.length)
    //console.log(state.moreReason, state.reasons, orderUrl)
  }

  const optionsLottie = {
    loop: false,
    autoplay: true,
    //@ts-ignore
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const optionsErrorLottie = {
    loop: false,
    autoplay: true,
    //@ts-ignore
    animationData: animationError.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const handleChangeText = (e: any) => {
    //@ts-ignore
    setState({ ...state, moreReason: e.target.value })
  }

  const handleChangeCheckBox = (e: any) => {
    var filtered = checkedArticles.check.filter(function (el) {
      return el != "";
    });


    var checkedArticlesIncludes = (checkedArticles.check.indexOf(e) > -1);
    if (!checkedArticlesIncludes) {
      setCheckedArticles({ check: [...checkedArticles.check, e] })
      if (filtered.length > 0) {
        setState({ ...state, formErrors: { ...state.formErrors, checkBox: "" } })
      }
    } else {
      checkedArticles.check.splice(checkedArticles.check.indexOf(e), 1);
      //  checkedArticles.findIndex(e).
    }
  }

  const { formErrors } = state;

  return (
    <div>
      <Navbar active />
      <div className='body-eshop'>
        <div className='breadcrumb-style'>
          <Breadcrumbs name="Formulaire de retour" />
        </div>
        <NavigationLinks >
          {returnLoading ?
            <div className='loading-spinner'> <ReactLoading type={'spinningBubbles'} className='loading-spinner-content' height={80} width={60} color={"#000"} /><h2 style={{ textAlign: 'center' }}>Chargement ...</h2></div> :
            returnOrder ? <aside className="col-md-9 col-sm-8 form-content">
              <div className="card wish-list mb-4 commands-ordered return-form" >
                <div className="card-body">
                  <h5 className="mb-4 ">Formulaire de retour</h5>
                  <div className="limiter">
                    <Lottie options={optionsLottie}
                      // height={400}
                      width={350}
                    />
                    <h4 className="text-center demand-sent ">Votre demande a bien été envoyé...</h4>
                    <p>Nous nous excusons que votre expérience n'ait pas été a la hauteur de vos expérences.</p>
                    <div className='link-back mt-5'>
                      <a onClick={() => window.history.back()} href='#'><i className="fal fa-arrow-left"></i> retourner aux liens</a>
                    </div>
                  </div>
                </div>
              </div>
            </aside> :
              returnError ?
                <aside className="col-md-9 col-sm-8 form-content">
                  <div className="card wish-list mb-4 commands-ordered return-form" >
                    <div className="card-body">
                      <h5 className="mb-4 ">Formulaire de retour</h5>
                      <div className="limiter">
                        <Lottie options={optionsErrorLottie}
                          // height={400}
                          width={200}
                        />
                        <h4 className="text-center demand-sent mt-5">Une erreur s'est produite...</h4>
                        <p>{returnError?.includes("retour") ? "Votre demande à déjà été enregistré concernant cet article" : ""}</p>
                        <div className='link-back mt-5'>
                          <a onClick={() => window.history.back()} href='#'><i className="fal fa-arrow-left"></i> retourner aux liens</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </aside> :
                loading ? <div className='loading-spinner'> <ReactLoading type={'spinningBubbles'} className='loading-spinner-content' height={80} width={60} color={"#000"} /><h2 style={{ textAlign: 'center' }}>Chargement ...</h2></div> :
                  error ? <Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc', margin: "2rem" }}>
                    <CardText color='red' style={{ color: 'red' }}>{error}</CardText>
                  </Card> :
                    <aside className="col-md-9 col-sm-8 form-content">
                      <div className="card wish-list mb-4 commands-ordered return-form" >
                        <div className="card-body">
                          <h5 className="mb-4 ">Formulaire de retour</h5>
                          <div className="limiter">

                            <div className="container-login100 ">
                              <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55 mh-100">
                                {state.formErrors.checkBox ? <Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc', margin: "2rem" }}>
                                  <CardText color='red' style={{ color: 'red' }}>{state.formErrors.checkBox}</CardText>
                                </Card> : null}
                                <form noValidate onSubmit={(e) => handleSubmitForm(e)} className="login100-form validate-form flex-sb flex-w">
                                  <div className="d-flex flex-column mb-4">

                                    {order?.orderItem.map((item: any, key2: any) => {

                                      return (
                                        <div className="d-flex all-item">
                                          <div className="image-right-return-card">
                                            <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                                              {/* <img className="img-fluid w-100" src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12a.jpg" alt="Sample" /> */}
                                              <a href="#!">
                                                <div className="mask waves-effect waves-light">
                                                  <img className="img-fluid w-100" src={item.image} />
                                                  <div className="mask rgba-black-slight waves-effect waves-light"></div>
                                                </div>
                                              </a>
                                            </div>
                                          </div>

                                          <div className="right-side-return-card">
                                            <div className='d-flex flex-column h-100'>
                                              <div className="d-flex justify-content-right history">
                                                {/* nom du produit */}
                                                <div className=' card-title-return'>
                                                  <div className='product-title-div'>
                                                    <h4 className='product-name'>{item.name}</h4>
                                                  </div>
                                                  <p>Taille: {item.size}</p>
                                                  <p>Couleur: {item.color}</p>
                                                  <MDBInput className="checkbox-choose-return" type="checkbox" id="checkbox2" onChange={() => handleChangeCheckBox(item.product_id)} />
                                                </div>
                                                <div>

                                                </div>
                                                <div className=" quantit">
                                                  <span className='text-right right-0'></span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    })}

                                  </div>

                                  <div className='w-full  m-b-10'>
                                    <span className="txt-retour  p-b-5">
                                      Raison de votre retour
					                </span>
                                    <Select
                                      className="basic-single"
                                      classNamePrefix="..."
                                      placeholder="Choisissez une réponse"
                                      defaultValue={options[0]}
                                      onInputChange={(val) => console.log(val)}
                                      onChange={(e: any) => { setState({ ...state, reasons: e.value }) }}
                                      styles={customStyles}
                                      isClearable={false}
                                      isSearchable={false}
                                      name="returnsItems"
                                      options={options}
                                    />
                                  </div>

                                  <div className='w-full m-b-10'>
                                    <span className="txt-retour p-b-5">
                                      Informations complémentaires
					                </span>
                                    <div className="wrap-input100 validate-input m-b-10" data-validate="Ce champs est requis">
                                      <textarea onChange={handleChangeText} className="input100" name="firstName" required datatype='firstname' />
                                      <span className="focus-input100"></span>
                                    </div>

                                    {formErrors.moreReason.length > 0 && (<Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc' }}>
                                      <CardText color='red' style={{ color: 'red' }}>{formErrors.moreReason}</CardText>
                                    </Card>)}
                                  </div>

                                  <div className="pt-20 col-sm-12 button-return">
                                    <button type="submit" className="update-btn"> <b> Demander un retour </b> </button>
                                  </div>

                                </form>
                              </div>

                            </div>
                            <div className='link-back'>
                              <a onClick={() => window.history.back()} href='#'><i className="fal fa-arrow-left"></i> retourner aux liens</a>
                            </div>


                          </div>
                        </div>
                      </div>
                    </aside>
          }
        </NavigationLinks>
        <div id="dropDownSelect1"></div>
      </div>
    </div>
  )
}


interface returnPROPS {
  reasons: String | null,
  reason_more?: String | null,
  order: String | null,
  article: string[]
};
