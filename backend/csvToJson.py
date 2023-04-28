import csv
import json
   
with open('data.csv', 'r') as csvdata:
    reader = csv.DictReader(csvdata)
    json.dump([row for row in reader], open('output.json', 'w+'))