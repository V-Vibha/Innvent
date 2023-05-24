from flask import Flask, jsonify
from flask_restful import Resource, Api

import pandas as pd

app = Flask(__name__)
api = Api(app)

attData = {"Completed Phases":"SC_Completed_Phases","Active Phases":"SC_Active_Phases","Item":"item","Document Type":"documentType","Company Code":"companyCode","Business Area":"businessArea","Vendor":"vendor"}

data = pd.read_excel('0-1681955587526.xlsx')

class Welcome (Resource):
    def get(self):
        target = data.loc[:, ['Status']]

        new_data = data.drop(['Status','SubStatus','State','Compliance Issues','Scenario Instance Id','Document Number','Cycle Time','Late Payment','Invoiced Manually','Critical Vendor','Invoice Value','Early Payment'], axis=1)

        cols = new_data.columns

        from sklearn.preprocessing import LabelEncoder

        data_X = new_data.loc[: , cols]
        x1 = data_X.apply(LabelEncoder().fit_transform)

        y1 = target.apply(LabelEncoder().fit_transform)

        from sklearn.feature_selection import mutual_info_classif

        from sklearn.model_selection import train_test_split
        X_train,X_test,y_train,y_test=train_test_split(x1, y1
            ,
            test_size=0.3,
            random_state=42)
        mutual_info = mutual_info_classif(X_train, y_train.values.ravel())

        mutual_info = pd.Series(mutual_info)
        mutual_info.index = X_train.columns
        series = mutual_info.sort_values(ascending=False)
        result = []
        for _ in range(len(series)):
            result.append({
            "label":series.index[_],
            "key":attData[series.index[_]]
        })

        return jsonify(result)


api.add_resource(Welcome, '/')

if __name__ == '__main__':
    app.run('0.0.0.0','3333')   