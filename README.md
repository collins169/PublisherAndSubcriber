# PublisherAndSubcriber
Step 1: Clone the repo

```bash
git clone https://github.com/collins169/PublisherServer.git
```

Step 2: Run docker compose to build and run the images

```bash
docker compose up
```
## API
BASE URL : http://127.0.0.1:5000
#### /subscribe/{topic}
* `POST` : To subscribe to a topic

#### /publish/{topic}
* `POST` : To publish to a topic

## Sample subscribers
* http://172.17.0.1:5001/{param}
* http://172.17.0.1:5002/{param}
