import xs from 'xstream';
import {run} from '@cycle/xstream-run';
import {makeDOMDriver, div, input, p, button} from '@cycle/dom';

function main(sources){
    const sinks = {
        HEADER: sources.props.map((prop) => {
            return div('ANDRES');
        }),
        CONTENT: sources.props.map((prop) => {
            return div('SAINZ DE AJA');
        }),
        DOM: sources.props.map((prop) => {
                return div('.app', [
                    button('.btn', 'Get Random User')
                ]);
            }),
        DOMANDRES: sources.DOMANDRES.select('input').events('change')
            .map(ev => ev.target.checked)
            .startWith(JSON.parse(localStorage.getItem('cyclejs.todo.sample-checked')) || false)
            .map(checked => {
                window.localStorage.setItem('cyclejs.todo.sample-checked', checked);
                return div([
                    input({
                        attrs: {type: 'checkbox', checked: checked},
                    }), 'toggle me', p(checked ? 'ON': 'OFF')
                ]);
            })
    };

    return sinks;
}

const drivers = {
    props: () => xs.of({
        appName: 'CycleJS Todo List'
    }),
    HEADER: makeDOMDriver('#header'),
    CONTENT: makeDOMDriver('#content'),
    DOM: makeDOMDriver('#app'),
    DOMANDRES: makeDOMDriver('#appContent'),
};

run(main, drivers);