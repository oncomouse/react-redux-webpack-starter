import _ from 'lodash';
//import {errorMessage} from 'actions/errorActions';
//import thunkifyAction from 'utilities/thunkifyAction';

export function callAPIMiddleware({ dispatch, getState }) {
	return next => action => {
		const {
			types,
			callAPI,
			shouldCallAPI = () => true,
			payload = {}
		} = action

		if (!types) {
			// Normal action: pass it on
			return next(action)
		}

		if (
			!Array.isArray(types) ||
			types.length !== 3 ||
			!types.every(type => typeof type === 'string')
		) {
			throw new Error('Expected an array of three string types.')
		}

		if (typeof callAPI !== 'function') {
			throw new Error('Expected fetch to be a function.')
		}

		const [ requestType, successType, failureType ] = types

		if (!shouldCallAPI(getState())) {
			return
		}

		dispatch(Object.assign({}, payload, {
			type: requestType
		}))
		
		// Rewrite the fetch request to only accept JSON responses:
		let fetchRequest = callAPI(getState());
		//fetchRequest.headers = fetchRequest.headers.set('Accept', 'application/json')

		return fetch(fetchRequest).then(
			(response) => {
				if(response.status === 200 || response.status === 202 || response.status === 0) {
					response.json().then((json) => {
						dispatch(Object.assign({}, payload, {
								json,
								type: successType
						}))
					});
				} else {
					response.json().then((json) => {
						// Wrap the denied action in thunk middleware so we can chain w/ .then() and
						// dispatch the error message:
						dispatch(Object.assign({}, payload, {
							json,
							type: failureType
						}));
						//dispatch(thunkifyAction(Object.assign({}, payload, {
						//		json,
						//		type: failureType
						//}))).then(() => dispatch(errorMessage({
						//	text: json.message || json.error
						//})));
					});
				}
			}
		);
	}
}