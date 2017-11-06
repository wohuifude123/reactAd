import React, { Component } from 'react';


var Parent = React.createClass({
    getInitialState: function() {
        return { data: null };
    },

    componentDidMount: function() {
        $.get('http://foobar.io/api/v1/listings/categories/').done(function(data) {
            this.setState({data: data});
        }.bind(this));
    },

    render: function() {
        if (this.state.data) {
            return <CategoriesSetup data={this.state.data} />;
        }

        return <div>Loading...</div>;
    }
});
