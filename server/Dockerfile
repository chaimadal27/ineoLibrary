FROM python
WORKDIR /app
COPY . /app
RUN pip install --no-cache-dir -r requirements.txt
RUN mkdir -p /var/www/media
RUN chmod +x entrypoint.sh
EXPOSE 8000
ENTRYPOINT ["./entrypoint.sh"]