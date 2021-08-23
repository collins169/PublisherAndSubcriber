# PublisherAndSubcriber
Step 1: Clone the repo

```bash
git clone https://github.com/collins169/PublisherAndSubcriber.git
```

Step 2: Run docker compose to build and run the images

```bash
docker compose up -d
# API Endpoint : http://127.0.0.1:5000
```
## API

#### /subscribe/{topic}
* `POST` : To subscribe to a topic

#### /publish/{topic}
* `POST` : To publish to a topic