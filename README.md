# curotec-challenge

To run the application, go inside the /api folder and build and run the docker-compose file.

```docker-compose up```

After that, you can start the backend

```npm run dev```

After that, go to the /client folder, and start the front end

```npm run dev```

## Improvements

- Unit/e2e test
- The react app should be divided in separeted components
- Implement the missing bonus features in frontend: edit the todos title (backend already supports that)
- Implement the missing bonus features: reorder todos
- A Cache could be implemented to avoid hit the backend so many times with the same requests that have the same response
