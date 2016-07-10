import xs from 'xstream';
import {run} from '@cycle/xstream-run';
import {makeDOMDriver, div, input, p} from '@cycle/dom';

function main(sources){
    const sinks = {
        DOM: sources.DOM.select('input').events('change')
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
    DOM: makeDOMDriver('#app')
};

run(main, drivers);