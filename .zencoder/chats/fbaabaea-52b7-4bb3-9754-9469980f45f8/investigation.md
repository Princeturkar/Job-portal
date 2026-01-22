# Bug Investigation - MongoDB Authentication Failed

## Bug Summary
The backend fails to connect to MongoDB Atlas with the error `MongoServerError: bad auth : authentication failed`. This indicates that the credentials (username or password) provided in the connection string are incorrect or the user does not have the necessary permissions.

## Root Cause Analysis
The connection string in `backend/.env` is:
`MONGODB_URI=mongodb+srv://princeturkar1_db_user:mernapp@cluster1.gv9qnfi.mongodb.net/mernapp?retryWrites=true&w=majority&appName=Cluster1`

The error `bad auth` explicitly comes from the MongoDB server during the handshake process, confirming that the provided credentials for `princeturkar1_db_user` are being rejected.

## Affected Components
- `backend/server.js`: Where the connection is initiated.
- `backend/.env`: Where the connection string is stored.

## Proposed Solution
1. Verify if the username `princeturkar1_db_user` and password `mernapp` are correct in the MongoDB Atlas dashboard.
2. Check if the IP address of the current environment is whitelisted in MongoDB Atlas.
3. If credentials are correct, try URL-encoding the password if it contained special characters (though `mernapp` does not).
4. As a test, try to connect using a known working connection string or check if a local MongoDB instance should be used instead.
