// list of items


export const list = [
    { name: 'Hommes' },
    { name: 'Femmes' },
    { name: 'Enfants' },
    { name: 'Collection été' },
    { name: 'Promotions' },
  ];

  interface menuProps{
      text:string,
      selected:string
  }

  interface arrowProps{
    text:string,
    className:string
}



  // One item component
  // selected prop will be passed
  export const MenuItem = ({text, selected}:menuProps) => {
    const routeChange=()=> {
        window.location.href=`/${text}`
     }
    return <div
    onClick={routeChange}
      ><p className={`category-list-content`}>{text}</p></div>;
  };
   
  // All items component
  // Important! add unique key
  export const Menu = (list:Array<object>, selected:string) =>
    list.map((el:any) => {
      const {name} = el;
   
      return <MenuItem text={name} key={name} selected={selected}/>;
    });
   
   
    export const Arrow = ({ text, className }:arrowProps) => {
    return (
      <div
        className={className}
      >{text}</div>
    );
  };
   
   
  export const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
  export const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });
  export const selected = 'item1';