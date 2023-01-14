import React from 'react'
import { Link } from 'react-router-dom'

const HeaderComponent = () => {
  return (
    <div>
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark px-3">
                <div>
                <Link to="/" className="navbar-brand">
                Employee Management Application
                  </Link>
                </div>

            </nav>
        </header>
    </div>
  )
}

export default HeaderComponent