import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectFilm, fetchPostsIfNeeded } from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

class App extends Component {
  static propTypes = {
    selectedCompany: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch, selectedCompany } = this.props
    dispatch(fetchPostsIfNeeded(selectedCompany))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedCompany !== this.props.selectedCompany) {
      const { dispatch, selectedCompany } = nextProps
      dispatch(fetchPostsIfNeeded(selectedCompany))
    }
  }
 
  // Combo
  handleChange = nextFilm => {
    this.props.dispatch(selectFilm(nextFilm))
  }

  render() {
    const { selectedCompany, posts, isFetching } = this.props
    const companies = posts.map(child => child.company).sort()
    const isEmpty = posts.length === 0
    const filteredPosts = posts.filter(post => post.company === selectedCompany)

    return (
      <div>
        { !selectedCompany.length ? <h2>Select a Company</h2> : '' }
        
        <Picker value={selectedCompany}
                onChange={this.handleChange}
                options={companies} />

        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts posts={filteredPosts} />
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selectedCompany, postsByCompany } = state
  const {
    isFetching,
    items: posts
  } = postsByCompany[selectedCompany] || {
    isFetching: true,
    items: []
  }

  return {
    selectedCompany,
    posts,
    isFetching
  }
}

export default connect(mapStateToProps)(App)
