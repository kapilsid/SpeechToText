from app import app

if __name__ == '__main__':
    context = ('/etc/ssl/certs/fullchain.pem', '/etc/ssl/private/privkey.pem')
    app.run()