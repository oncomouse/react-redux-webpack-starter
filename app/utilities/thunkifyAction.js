// Wrap any action in thunk middleware so it can be chained w/ .then():
export default function thunkifyAction(action) {
	return (dispatch) => {
		return new Promise((resolve) => {
			dispatch(action);
			resolve(action);
		});
	}
}