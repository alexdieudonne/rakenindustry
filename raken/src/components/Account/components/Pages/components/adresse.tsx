import Breadcrumbs from "../../../../../utils/Breadcrumb";
import NavigationLinks from "../../navigation-links";
import './styles.css'
import '../components/styles.css'
import { handleSubmitUpdate, handleChange, handleSubmitAdresse } from "../../../../../utils/validator";
import React, { useEffect } from "react";
import { Card, CardText } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { addAdress, getAdresse, updateListAdresses } from "../../../../../redux/actions/adressActions";
import Navbar from "../../../../../utils/Navbar";
import Footer from "../../../../../utils/Footer";
import ReactLoading from 'react-loading'

function Adresse(props: any) {
    const [id, setId] = React.useState(null)
    const [state, setState] = React.useState({
        alias: '',
        firstname: null as any,
        lastname: null as any,
        adress: null as any,
        adress_more: null as any,
        zip_code: null as any,
        city: null as any,
        country: null as any,
        phone_number: null as any,
        more_info: null as any,
        formErrors: {
            firstname: '',
            lastname: '',
            adress: '',
            zip_code: '',
            city: '',
            country: '',
            phone_number: '',
        }
    })

    const dispatch = useDispatch()
    //@ts-ignore
    const adresses = useSelector((state) => state.adresseGet);
    const { loading, error, adresse } = adresses;

    //@ts-ignore
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo} = userSignin


    const setErrors = (error: any) => {
        // console.log(error)
        setState({ ...state, formErrors: error })
    }

    const idAdress = props.match.params.id


    useEffect(() => {
        if (idAdress != "new") {
            if (!adresse) {
                setId(idAdress)
                dispatch(getAdresse(idAdress))
            } else {
                setState({
                    ...state,
                    alias: adresse.alias,
                    firstname: adresse.firstname,
                    lastname: adresse.lastname,
                    adress: adresse.adress,
                    adress_more: adresse.adress_more,
                    zip_code: adresse.zip_code,
                    city: adresse.city,
                    country: adresse.country,
                    phone_number: adresse.phone_number,
                    more_info: adresse.more_info
                })
            }
        }else if(userInfo){
            setState({
                ...state,
                firstname: userInfo.firstname,
                lastname: userInfo.lastname,
                phone_number: userInfo.phone_number,
            })
        }

    }, [dispatch, idAdress, adresse])



    const addAdresse = (adresse: any) => {
        dispatch(addAdress(adresse))
    }

    const handleChangeValue = (val: any) => {
        //  console.log(val.target)
        handleChange(val, state.formErrors, state, setState)

    }



    const handleSubmitForm = (e: any) => {
        if (idAdress != "new") {
            e.preventDefault()
            // console.log(state)
            dispatch(updateListAdresses(state, idAdress))

        } else {
            handleSubmitAdresse(e, state, setErrors, addAdresse)
        }

    }


    return (
        <>
            <Navbar active />
            <div className='body-eshop'>
                <div className='breadcrumb-style'>
                    <Breadcrumbs condition='Adresse' urlPath={"Nouvelle adresse"} />
                </div>
                {loading ? <div className='loading-spinner'> <ReactLoading type={'spinningBubbles'} className='loading-spinner-content' height={80} width={60} color={"#000"} /><h2 style={{ textAlign: 'center' }}>Chargement ...</h2></div> :
                    error ? <Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc', margin: "2rem" }}>
                        <CardText color='red' style={{ color: 'red' }}>{error}</CardText>
                    </Card > :
                        <NavigationLinks>
                            <aside className="col-md-9 col-sm-8 form-content">
                                <div className="account-wrap cart-box">
                                    <form onSubmit={handleSubmitForm} noValidate className="gray-control">
                                        <div className="row">
                                            <div className="form-group col-sm-6">
                                                <label> Alias (Facultatif) </label>
                                                <input value={state.alias} onChange={handleChangeValue} type="text" className="form-control" name='alias' />
                                            </div>
                                            <div className="form-group col-sm-6">
                                                <label> Prénom </label>
                                                <input value={state.firstname} onChange={handleChangeValue} required type="text" className="form-control" name='firstname' />
                                                {state.formErrors.firstname.length > 0 ? <Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc', margin: '1rem 0' }}>
                                                    <CardText color='red' style={{ color: 'red' }}>{state.formErrors.firstname}</CardText>
                                                </Card> : null}
                                            </div>
                                            <div className="form-group col-sm-6">
                                                <label> Nom </label>
                                                <input value={state.lastname} onChange={handleChangeValue} required type="text" className="form-control" name='lastname' />
                                                {state.formErrors.lastname.length > 0 ? <Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc', margin: '1rem 0' }}>
                                                    <CardText color='red' style={{ color: 'red' }}>{state.formErrors.lastname}</CardText>
                                                </Card> : null}
                                            </div>

                                            <div className="form-group col-sm-6">
                                                <label > Code postal </label>
                                                <input value={state.zip_code} onChange={handleChangeValue} required type="text" className="form-control" name='zip_code' />
                                                {state.formErrors.zip_code.length > 0 ? <Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc', margin: '1rem 0' }}>
                                                    <CardText color='red' style={{ color: 'red' }}>{state.formErrors.zip_code}</CardText>
                                                </Card> : null}
                                            </div>
                                            <div className="form-group col-sm-6">
                                                <label> Ville </label>
                                                <input value={state.city} onChange={handleChangeValue} required type="text" className="form-control" name='city' />
                                                {state.formErrors.city.length > 0 ? <Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc', margin: '1rem 0' }}>
                                                    <CardText color='red' style={{ color: 'red' }}>{state.formErrors.city}</CardText>
                                                </Card> : null}
                                            </div>

                                            <div className="form-group col-sm-6">
                                                <label >  Pays </label>
                                                <input value={state.country} onChange={handleChangeValue} required type="text" className="form-control" name='country' />
                                                {state.formErrors.country.length > 0 ? <Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc', margin: '1rem 0' }}>
                                                    <CardText color='red' style={{ color: 'red' }}>{state.formErrors.country}</CardText>
                                                </Card> : null}
                                            </div>

                                            <div className="form-group col-sm-6">
                                                <label> Numéro de téléphone </label>
                                                <input value={state.phone_number} onChange={handleChangeValue} required type="number" className="form-control" name='phone_number' />
                                                {state.formErrors.phone_number.length > 0 ? <Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc', margin: '1rem 0' }}>
                                                    <CardText color='red' style={{ color: 'red' }}>{state.formErrors.phone_number}</CardText>
                                                </Card> : null}
                                            </div>

                                            <div className="form-group col-sm-6">
                                                <label> Adresse </label>
                                                <input value={state.adress} onChange={handleChangeValue} required type="text" className="form-control" name='adress' />
                                                {state.formErrors.adress.length > 0 ? <Card body style={{ borderColor: 'red', backgroundColor: '#ffcccc', margin: '1rem 0' }}>
                                                    <CardText color='red' style={{ color: 'red' }}>{state.formErrors.adress}</CardText>
                                                </Card> : null}
                                            </div>
                                            <div className="form-group col-sm-6">
                                                <label> Complément d'adresse (Facultatif) </label>
                                                <textarea value={state.adress_more} name='adress_more' onChange={handleChangeValue} className="form-control" />
                                            </div>
                                            <div className="form-group col-sm-6">
                                                <label>Plus d'infos (Facultatif)</label>
                                                <textarea value={state.more_info} onChange={handleChangeValue} required className="form-control" name='more_info' />
                                            </div>


                                            <a onClick={() => window.history.back()} href='#'><i className="fal fa-arrow-left"></i> retourner aux liens</a>
                                            <div className="pt-20 col-sm-12">
                                                <button type="submit" className="btn btn-black update-btn"> <b>{idAdress != "new" ? "Mettre a jour" : "Créer"} </b> </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </aside>
                        </NavigationLinks>
                }
            </div>

            <Footer />

        </>
    )
}

export default Adresse
