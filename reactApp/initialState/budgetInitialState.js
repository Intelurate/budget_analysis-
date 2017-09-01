import Immutable from 'immutable';

export default {
	budget : Immutable.fromJS({
		list: [],
		newBudget: {
			costitem : "",
			forecastamount : "", 
			actualamount: ""
		}
	})
}