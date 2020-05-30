from app import app

config = {
    "development": "config.Development"
}

if __name__ == '__main__':
    app.config.from_object(config["development"])
    app.run(host='0.0.0.0',port=8090)