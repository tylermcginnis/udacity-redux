import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import SearchBooks from './SearchBooks'
import BookResult from './BookResult'
import Nav from './Nav'
import {
  setAuthedUser,
  receiveUsers,
  receiveBooks,
  setOwners,
  setBorrowers,
} from '../actions'
import { getAllBooks, getUsers } from '../utils/api'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading'

function formatUsers (users) {
  return Object.keys(users)
    .reduce((formattedUsers, id) => {
      formattedUsers[id] = {
        id,
        name: users[id].name,
        avatarURL: users[id].avatarURL,
      }

      return formattedUsers
    }, {})
}

function parseOwners (userIds, users) {
  return userIds.reduce((owners, id) => {
    owners.allIds.push(id)
    owners.byId[id] = {
      ...users[id].books.own
    }
    return owners
  }, {byId: {}, allIds: []})
}

function parseBorrowers (userIds, users) {
  return userIds.reduce((borrowers, id) => {
    borrowers[id] = {
      ...users[id].books.borrowed
    }
    return borrowers
  }, {})
}

function parseBookIds (userIds, users) {
  return userIds.reduce((books, user) =>
    books.concat(
      Object.keys(users[user].books.own),
      Object.keys(users[user].books.borrowed)
    ), [])
}

function formatBooks (books) {
  return books.reduce((formatted, book) => {
    formatted[book.id] = book
    return formatted
  }, {})
}

class App extends Component {
  componentDidMount () {
    const { dispatch, loading  } = this.props

    if (loading === true) {
      getUsers().then((users) => {
        const userIds = Object.keys(users)

        dispatch(receiveUsers(formatUsers(users)))
        dispatch(setOwners(parseOwners(userIds, users)))
        dispatch(setBorrowers(parseBorrowers(userIds, users)))

        getAllBooks(parseBookIds(userIds, users))
          .then(formatBooks)
          .then((formattedBooks) => dispatch(receiveBooks(formattedBooks)))
          .then(() => dispatch(setAuthedUser('tylermcginnis33')))
      })
    }
  }
  render() {
    return (
      <Router>
        <div className='container'>
          <Nav />
          {this.props.loading === true
            ? <ReactLoading className='loading' type='spin' color='black' />
            : <div>
                <Route path='/' exact component={Dashboard} />
                <Route path='/books' exact component={SearchBooks} />
                <Route path='/books/:id' component={BookResult} />
              </div>}
        </div>
      </Router>
    )
  }
}

function mapStateToProps ({ authedId }) {
  return {
    loading: authedId === null
  }
}

export default connect(mapStateToProps)(App)