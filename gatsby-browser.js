const ReactDOM = require('react-dom')

export function replaceHydrateFunction() {
    return (element, container, callback) => {
        ReactDOM.render(element, container, callback)
    }
}