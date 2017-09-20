import React, { Component } from 'react';
import data from './data.json';

if (!process.env.PRERENDER)
{
    require('./periodic-table.css');
}
    

export default class PeriodicTable extends Component {
    constructor(props) {
        super(props);
        const _this = this;
        this.state = {};
        data.elementGroups.forEach((g, i) => {
            setTimeout(function () {
                console.log(g, 'show')
                g.show = true;
                _this.forceUpdate();
            }, 200 * i + 200);
        })
        if (!props.id) throw Error("Periodic table requires a unique Id.");
        this.handleResize = this.handleResize.bind(this);
    }
    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }
    render() {
        const groups = [{}, ...data.elementGroups].reduce((root, elem) => {
            root[elem.id] = elem;
            return root;
        });
        console.log(groups);
        var counter = 0;
        const rows = data.entries.map((row, i) => {
            const elements = row.map((element, j) => {
                return (
                    <div className="elementContainer" key={j}>
                        {(() => {
                            if (element) {
                                counter++;
                                const group = groups[element.groupId];
                                const show = group.show;
                                return (
                                    <div title={element.title} className={`element ${group.title} ${show ? 'show' : ''}`} style={{ backgroundColor: group.color, fontSize: `${this.state.width}px` }}>
                                        <small className="elementNumber">{counter}</small>
                                        <h1 className="elementAbbreviation">{element.abbreviation || 'Te'}</h1>
                                        <p className="elementTitle">{element.title || 'Test'}</p>
                                    </div>
                                );
                            }
                        })()}
                    </div>
                );
            });
            return <div key={i} className="row">{elements}</div>
        });
        return (
            <div id={this.props.id} className="periodicTable">
                <div className="rows">{rows}</div>
            </div>
        );
    }
    handleResize(e) {
        this.setState(state => {
            console.log(this.props.id);

            state.width = document.getElementById(this.props.id).getBoundingClientRect().width / 50;
            console.log(state.width);
            return state;
        })
    }
}
console.log('dpone peridoc table')