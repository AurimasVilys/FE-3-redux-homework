import React from 'react';

class Filter extends React.Component {

    render() {

        const {
            genreId,
            name,
            click
        } = this.props;
        return (
            <a className="genre" key={genreId} value={ name } onClick={ click }>
                { name }
            </a>

        );
    }
}

export default Filter;