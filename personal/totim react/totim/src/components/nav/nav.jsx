import TOTIMlogo from '../../assets/totim-logo.png'



function Nav() {

  return (
    <>
    <header className="nav flex items-center justify-between px-4 py-2 h-16">
        <img className="bg-contain h-14" src={TOTIMlogo} alt="Totim icon" />
        <button className="bg-orange-400 p-0.5 pl-4 pr-4" type="button">DONATE</button>
    </header>
    </>
  )
}

export default Nav