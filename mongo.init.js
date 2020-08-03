use admin

db.admin("root", "secret")

use solid

db.createUser(
    {
        user: "root",
        pwd: "secret",
        roles: [
            {
                role: "readWrite",
                db: "solid"
            }
        ]
    }
);