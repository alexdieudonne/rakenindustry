import React from 'react'
import { Accordion, Card } from 'react-bootstrap'

interface navProps{
    children?:any
}


function NavigationLinks(props:navProps) {
    return (
        <div className=' d-flex justify-content-between two-side-container'>
        <aside className="col-md-3 col-sm-4 prod-sidebar">
          <div className="widget-wrap">
            <h2 className="widget-title"> Les liens </h2>

            <div className="widget-content">
              <ul >
                <li><a href="/account/account-information"><i style={{fontSize:7, marginRight:'1em'}} className="fas fa-circle"></i> Les informations de votre compte</a></li>
                <li><a href="/account/change-password"><i style={{fontSize:7, marginRight:'1em'}} className="fas fa-circle"></i> Changer de mot de pase</a></li>
                <li><a href="/account/address-book"><i style={{fontSize:7, marginRight:'1em'}} className="fas fa-circle"></i> Vos adresses</a></li>
                <li><a href="/account/command-history"><i style={{fontSize:7, marginRight:'1em'}} className="fas fa-circle"></i> Historique de vos commandes</a></li>
                <li><a href="/account/returns"><i style={{fontSize:7, marginRight:'1em'}} className="fas fa-circle"></i> Retours</a></li>
                <li><a href="/account/newsletter"><i style={{fontSize:7, marginRight:'1em'}} className="fas fa-circle"></i> Newsletter</a></li>
              </ul>
            </div>

          </div>
        </aside>

        {props.children?props.children: <aside className='informations-page'>
          <Accordion defaultActiveKey="0">
            <div>
              <Accordion.Toggle as={Card.Header} className='title-Accordion title-Accordion1 ' eventKey="0">
                <span> Mon Compte</span>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body className='body-accordion'>
                  <div >
                    <div className="account-body">
                      <ul className="acnt-list list-unstyled">
                        <li>
                          <i className="fal fa-arrow-right icon-accordion"></i>
                          <a href="/account/account-information"> Modifier les informations de votre compte</a>
                        </li>
                        <li>
                          <i className="fal fa-arrow-right icon-accordion"></i>
                          <a href="/account/change-password"> Modifier votre mot de passe</a>
                        </li>
                        <li>
                          <i className="fal fa-arrow-right icon-accordion"></i>
                          <a href="/account/address-book"> Modifier vos adresses de livraisons</a>
                        </li>
                      </ul>
                    </div>
                  </div></Card.Body>
              </Accordion.Collapse>
            </div>
            <div>
              <Accordion.Toggle as={Card.Header} className='title-Accordion' eventKey="1">
                <span> Commandes</span>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body className='body-accordion'>
                  <div >
                    <div className="account-body">
                      <ul className="acnt-list list-unstyled">
                        <li>
                          <i className="fal fa-arrow-right icon-accordion"></i>
                          <a href="/account/command-history">Voir l'historique des commandes</a>
                        </li>
                        <li>
                          <i className="fal fa-arrow-right icon-accordion"></i>
                          <a href="/account/returns">Voir les retours</a>
                        </li>
                      </ul>
                    </div>
                  </div></Card.Body>
              </Accordion.Collapse>
            </div>
            <div>
              <Accordion.Toggle as={Card.Header} className='title-Accordion' eventKey="2">
                <span> NewsLetter</span>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="2">
                <Card.Body className='body-accordion'>
                  <div >
                    <div className="account-body">
                      <ul className="acnt-list list-unstyled">
                        <li>
                          <i className="fal fa-arrow-right icon-accordion"></i>
                          <a href="/account/newsletter">S'abonner a la newsletter</a>
                        </li>
                      </ul>
                    </div>
                  </div></Card.Body>
              </Accordion.Collapse>
            </div>
          </Accordion>
        </aside>}
      </div>
    )
}

export default NavigationLinks
