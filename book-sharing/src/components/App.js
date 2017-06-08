import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import AddBook from './AddBook'
import SearchBooks from './SearchBooks'
import BookResult from './BookResult'

export default function App () {
  return (
    <Router>
      <div>
        <nav>NAV</nav>
        <Route path='/' exact component={Dashboard} />
        <Route path='/add' component={AddBook} />
        <Route path='/books' exact component={SearchBooks} />
        <Route path='/books/:id' component={BookResult} />
      </div>
    </Router>
  )
}