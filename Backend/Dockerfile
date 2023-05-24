FROM python:3.9-slim
ADD app.py /
ADD 0-1681955587526.xlsx /
RUN pip install Flask
RUN pip install Flask-RESTful
RUN pip install openpyxl
RUN pip install pandas
RUN pip install scikit-learn
EXPOSE 3333
CMD [ "python", "./app.py"]