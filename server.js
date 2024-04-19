const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
	console.log(`Ramadhan Kareem Team 3! http://localhost:${PORT}`);
});
