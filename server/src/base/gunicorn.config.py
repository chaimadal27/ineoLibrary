bind = '0.0.0.0:8000'  # Change this to your server IP and port
workers = 4  # Change this to the number of workers you want to run
worker_class = 'gevent'  # Change this to your desired worker class
timeout = 60  # Change this to your desired timeout value
# Change this to the maximum number of requests each worker can handle before being restarted
max_requests = 1000
# Set this to True to preload the application code before forking worker processes
preload_app = True
