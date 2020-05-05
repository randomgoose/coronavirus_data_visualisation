import React from 'react'

class Bookmark extends React.Component {
    render() {
        return (
            <div>{localStorage.getItem("bookmarks")}</div>
        )
    }
}

export default Bookmark
