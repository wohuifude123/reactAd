import React, { Component } from 'react';

var CategoriesSetup = React.createClass({
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
            return <Input type="select">{this.state.data.map(this.renderRow)}</Input>;
        }

        return <div>Loading...</div>;
    },

    renderRow: function(row) {
        return <OptionRow obj={row} />;
    }
});
