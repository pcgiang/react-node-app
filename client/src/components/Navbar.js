import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header>
      <div className='container'>
        <div className='title-header'>
          <Link to="/">
            <h1> Meowtal health </h1>
          </Link>
          <img className='logo-img' src={require('../assets/cat-logo.png')}/>
        </div>

      </div>
    </header>
  )
}

export default Navbar