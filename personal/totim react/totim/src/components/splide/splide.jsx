import SubstackLogo from '../../assets/substack-logo.png';


function CustomSplide (props) {
  return (
    <>
      <a href="http://" target="_blank" rel="noopener noreferrer">
        <img src={props.image} alt={props.alt || 'Slide image'} />
        <div className="slide-info flex justify-between">
          <div className="slide-text-container">
            <h3> {props.slideHeading}</h3>
            <p> {props.author}</p>
            <p>
              <em>
                <span className="text-decoration-underline">
                  {props.location}
                </span>
              </em>
            </p>
          </div>
          <img className='w-28 h-11 bg-contain' id="substack-logo" src={SubstackLogo} alt="Substack Logo" />
        </div>
    </a>
    </>
  )
}

export default CustomSplide