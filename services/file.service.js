const fs = require('fs/promises');
const path = require('path');

const dbPath = path.join(process.cwd(), 'dataBase', 'users.json');

module.exports = {
    reader: async () => {
        try {
            const data = await fs.readFile(dbPath, {encoding: "utf8"});
            return data ? JSON.parse(data) : [];
        } catch (err) {
            console.error(err);
        }
    },

    writer: async (data) => {
        try {
            await fs.writeFile(dbPath, JSON.stringify(data));
        } catch (err) {
            console.error(err);
        }
    }
}